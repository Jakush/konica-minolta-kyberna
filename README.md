# 🖨️ Instalace tiskárny – Konica Minolta bizhub C220
 
Návod pro připojení síťové tiskárny **Konica Minolta bizhub C220** přes TCP/IP port ve Windows.
  
| Parametr | Hodnota |
|---|---|
| Model | Konica Minolta bizhub C220 |
| IP adresa | `10.1.5.70` |
| Ovladač | stáhnout ze stránek [Konica Minolta](https://aka.jakush.space/konica-minolta-drivers) (soubor `.inf`) |
 
## 🔧 Installation steps
1. **Stáhnutí a rozbal ovladače** |
   Stáhni ovladače ze stránky https://aka.jakush.space/konica-minolta-drivers (soubor `.inf`).
1. **Otevři nastavení tiskáren** | 
   `Nastavení` → `Zařízení` → `Tiskárny a skenery`
   (nebo `Ovládací panely` → `Zařízení a tiskárny`)
2. **Přidat tiskárnu** | 
   Klikni na `Přidat tiskárnu nebo skener`.
3. **Tiskárna není v seznamu** | 
   Počkej na dohledání, poté klikni na
   `Požadovaná tiskárna není uvedena na seznamu`.
4. **Vytvoř nový port** | 
   Vyber možnost `Přidat místní tiskárnu nebo síťovou tiskárnu pomocí ručního nastavení`
   → `Vytvořit nový port` → typ portu `Standard TCP/IP Port`.
5. **Zadej IP adresu** | 
   Do pole *Název hostitele nebo IP adresa* zadej:
```
   10.1.5.70
```
   Nech ostatní volby výchozí a pokračuj (Další).
 
6. **Vyber ovladač**
   Až se zobrazí výběr ovladače, klikni na `Man (Vlastní disk)` / `Have Disk`
   a najdi stažený `.inf` soubor ovladače Konica Minolta.
7. **Dokonči instalaci**
   Zadej název tiskárny, případně ji nastav jako výchozí (nepovinný), a dokonči průvodce.
8. **Vytiskni testovací stránku**
   Ověř, že tiskárna funguje správně.
9. **Hotovo**
   Pokud jsi postupoval správně, tiskárna by měla fungovat a reagovat na požadavky na tisk.

&nbsp;

### ❓ Řešení problémů
 
- **Tiskárna nereaguje** → ověř, že IP adresa `10.1.5.70` je dostupná (`ping 10.1.5.70` v příkazové řádce).
- **Ovladač nejde vybrat** → zkontroluj, že jsi `.inf` soubor rozbalil (nezůstal v `.zip`).
- **Špatná IP adresa** → IP adresu tiskárny lze ověřit přímo na displeji zařízení nebo vytištěním konfigurační stránky.

---

## 🤝 Contributing
We're open to any contributions. Please open an issue if you'd like to suggest a change or report a bug.
If you have any suggested changes, please open a pull request. There are few rules to the contributing though.

1. Be respectful to others (especially contributors, as they do it in their free time)
2. Try to be specific
3. In case of any PR's, you need to follow [Conventional Commits Stylesheet](https://gist.github.com/qoomon/5dfcdf8eec66a051ecd85625518cfd13)
4. Respect project's license, you can see more about license below
5. Maintainer is anyone who is in the **Core** Team

### 🧾 License
This repository is not licensed under any license. Feel free to use however you want ;)

&nbsp;

### 🙌 Contributors
Thanks to all our amazing contributors!

[![Contributors](https://contrib.rocks/image?repo=jakofakt-cz/research)](https://github.com/Jakush/konica-minolta-kyberna/graphs/contributors)
 
