# SED Handbook — website

Statische HTML/CSS/JavaScript-website. Bewerk de bestanden rechtstreeks; er is geen generator of buildstap.

## Bestanden

```text
index.html                 Homepage
handbook.html              Interactief handbook
projects/                  De drie projectpagina's
assets/css/style.css       Vormgeving, inclusief mobiele weergave
assets/js/site.js          Menu, handbookstappen en liggerberekening
assets/js/language.js      NL/EN-wissel en onthouden van de taalkeuze
assets/js/translations.js  Nederlandse teksten met Engelse vertalingen
assets/images/             Logo's, projectbeelden en favicon
reports/                   De drie oorspronkelijke PDF-verslagen
.nojekyll                  Directe publicatie van bestanden via GitHub Pages
.git/                      Lokale versiegeschiedenis en GitHub-koppeling
```

## Bekijken en aanpassen

Open `index.html` in een browser. Na wijzigingen sla je de bestanden op en vernieuw je de pagina. Test het onthouden van de taalkeuze tussen pagina's bij voorkeur op GitHub Pages; browsers kunnen lokale bestanden anders behandelen.

- Pas gewone Nederlandse paginainhoud aan in de HTML-bestanden.
- Pas de interactieve stappen en rekenvoorbeeldteksten aan in `assets/js/site.js`.
- Pas Engelse vertalingen aan in `assets/js/translations.js`. Links van de dubbele punt staat de exacte Nederlandse tekst; rechts de Engelse vertaling. Wijzig bij een Nederlandse tekstwijziging ook de bijbehorende sleutel. De taalwissel gebruikt exacte tekstvergelijking.
- Pas kleuren, afstanden en mobiele indeling aan in `assets/css/style.css`.
- Voeg afbeeldingen toe aan `assets/images/` en gebruik relatieve verwijzingen. Vanuit een projectpagina begint de verwijzing met `../assets/`.
- Controleer na wijzigingen de NL- en EN-weergave, projectlinks, afbeeldingen, het mobiele menu en het interactieve handbook.

De PDF-verslagen en tekst in afbeeldingen behouden hun oorspronkelijke taal.

## Publiceren

Deze map is de Git-repository voor https://github.com/vigodegroot14/SED-Handbook.

Voer vanuit deze map uit, nadat je de wijzigingen hebt bekeken:

```powershell
git status
git add .
git commit -m "Beschrijving van de wijziging"
git push origin main
```

GitHub Pages publiceert vanuit branch `main`, map `/(root)`.

Website: https://vigodegroot14.github.io/SED-Handbook/

Bewaar `.git/` om de bestaande versiegeschiedenis en repositorykoppeling te behouden. De originele aangeleverde afbeeldingen staan een niveau hoger in `originele-afbeeldingen/` en worden niet meegepubliceerd.
