const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({ acceptDownloads: true });
  const page = await context.newPage();

  await page.goto('https://dl.konicaminolta.eu/en/?productName=bizhub+C220', {
    waitUntil: 'networkidle',
  });

  await page.getByRole('button', { name: 'Go' }).click();
  await page.getByRole('button', { name: 'Go' }).click();
  await page.getByRole('heading', { name: 'Drivers' }).click();

  // POZOR: .nth(1) je pozičně založený selektor (vybírá např. ikonu OS).
  // Pokud KM změní pořadí ikon na stránce, tohle je první místo, kde to praskne.
  await page.getByRole('img').nth(1).click();

  await page.getByRole('checkbox', { name: 'Accept License agreement' }).check();

  const downloadPromise = page.waitForEvent('download');
  // Název souboru obsahuje verzi (např. UPDPCL6Win_3913100MU.zip), proto
  // matchujeme jen stabilní prefix, ne celý název - ten se s update mění.
  await page.getByRole('link', { name: /^UPDPCL6Win.*\.zip/ }).click();
  const download = await downloadPromise;

  const outPath = path.join(process.cwd(), 'driver_package.zip');
  await download.saveAs(outPath);

  console.log('DOWNLOADED_FILE=' + outPath);
  console.log('SUGGESTED_NAME=' + download.suggestedFilename());

  await browser.close();
})().catch((err) => {
  console.error('Chyba při stahování ovladače:', err);
  process.exit(1);
});
