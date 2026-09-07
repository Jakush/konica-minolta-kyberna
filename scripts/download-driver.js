const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({ acceptDownloads: true });
  const page = await context.newPage();

  try {
    await page.goto('https://dl.konicaminolta.eu/en/?productName=bizhub+C220', {
      waitUntil: 'networkidle',
    });

    // Cookie/consent banner - lokálně bývá už odklikaný z dřívějška,
    // v čistém CI browseru se objeví znovu a může blokovat kliky pod sebou.
    const cookieButtons = [
      page.getByRole('button', { name: /accept/i }),
      page.getByRole('button', { name: /agree/i }),
      page.getByRole('button', { name: /souhlas/i }),
    ];
    for (const btn of cookieButtons) {
      if (await btn.first().isVisible({ timeout: 2000 }).catch(() => false)) {
        await btn.first().click();
        break;
      }
    }

    await page.getByRole('button', { name: 'Go' }).click();
    await page.waitForLoadState('networkidle');
    await page.getByRole('heading', { name: 'Drivers' }).click();
    await page.waitForLoadState('networkidle');

    // Explicitně nastavíme OS na Windows 11 - spolehlivější než klikání na
    // ikonu podle pozice, protože nezávisí na výchozím stavu stránky.
    await page.getByRole('combobox').nth(3).selectOption('string:Windows 11');
    await page.waitForLoadState('networkidle');

    // POZOR: .nth(1) je pozičně založený selektor (vybírá řádek/ikonu
    // konkrétního driveru v tabulce). Pokud KM přidá/ubere řádek nad ním,
    // tohle je další místo, kde to může sklouznout na jiný soubor.
    await page.getByRole('img').nth(1).click();
    await page.waitForLoadState('networkidle');

    await page.getByRole('checkbox', { name: 'Accept License agreement' }).check();

    // Odkaz může otevřít download buď na stejné stránce, nebo v nové záložce -
    // posloucháme oba případy najednou.
    const linkLocator = page.getByRole('link', { name: /^UPDPCL6Win.*\.zip/ });
    const [download] = await Promise.all([
      Promise.race([
        page.waitForEvent('download', { timeout: 30000 }),
        context.waitForEvent('page', { timeout: 30000 }).then((p) => p.waitForEvent('download')),
      ]),
      linkLocator.click(),
    ]);

    const outPath = path.join(process.cwd(), 'driver_package.zip');
    await download.saveAs(outPath);

    console.log('DOWNLOADED_FILE=' + outPath);
    console.log('SUGGESTED_NAME=' + download.suggestedFilename());
  } catch (err) {
    console.error('Chyba při stahování ovladače:', err);
    // Debug artefakty - screenshot a HTML aktuálního stavu stránky
    await page.screenshot({ path: 'debug-screenshot.png', fullPage: true }).catch(() => {});
    const html = await page.content().catch(() => '');
    require('fs').writeFileSync('debug-page.html', html);
    process.exitCode = 1;
  } finally {
    await browser.close();
  }
})();
