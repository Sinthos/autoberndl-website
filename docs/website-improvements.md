# Website-Verbesserungen

## Ziele
- Navigation mit passenden Ankerbereichen versehen.
- Klarere Handlungsaufforderungen im Hero und bei Kontakt/Ankauf anbieten.
- Visuelle Tiefe durch Liquid-Glass-Elemente und dezente Hintergrunde schaffen.
- Leere Fahrzeuglisten sinnvoll abfangen.

## Durchgefuhrte Aenderungen
- `src/app/globals.css`: Liquid-Glass-Tokens eingebunden, Smooth-Scrolling mit Reduced-Motion-Fallback ergaenzt.
- `src/components/Hero.tsx`: CTA-Buttons, Trust-Kacheln, optimiertes Hero-Bild und Hintergrundakzente integriert.
- `src/components/WhyChooseUs.tsx`: Features als Glass-Card-Layout umgesetzt (derzeit nicht im Layout eingebunden).
- `src/app/page.tsx`: Bereiche fuer `#ankauf` und `#kontakt` hinzugefuegt, Inhalte strukturiert.
- `src/components/MostSearchedCars.tsx`: Fallback-Panel bei leerem Fahrzeugbestand.
- `src/components/Footer.tsx`: ARIA-Labels fuer Social-Icons ergaenzt.
- `src/components/Navbar.tsx`: Unbenutzte Imports entfernt.
- `src/app/page.tsx`: Abschnitt `#ueber-uns` entfernt, um doppelte Inhalte zu vermeiden.
- `src/components/Navbar.tsx`: Navigation auf `#ankauf` statt `#ueber-uns` ausgerichtet.
- `src/components/Navbar.tsx`: Ankerlinks auf die Startseite umgestellt, damit sie von Unterseiten funktionieren.
- `src/components/Hero.tsx`: Typografie im oberen Bereich gestrafft, Textbreite fuer bessere Lesbarkeit limitiert.
- `src/components/Hero.tsx`: Hero-Layout vereinheitlicht, Features als Karten, Showcase mit Parallax- und Float-Effekten umgesetzt.
- `src/app/globals.css`: Hero-spezifische Utilities und Animationen fuer den Showcase ergaenzt.
- `src/components/Hero.tsx`: Bild statisch nach links gesetzt, Inhalte in eine Karte gebuendelt und Hoehe reduziert.
- `src/components/Hero.tsx`: Bunte Hintergrundakzente im Header entfernt.
- `src/lib/mobile-de-api.ts`: HTML-Entities robust dekodiert, PS statt kW ausgegeben, API-Abruf stabilisiert und Detailfelder abgesichert.
- `src/components/MostSearchedCars.tsx`: Stabilen Key fuer Fahrzeuge auf Basis der Ad-ID gesetzt.
- `src/components/CookieBanner.tsx`: DSGVO-Hinweis fuer technisch notwendige Cookies hinzugefuegt.
- `src/app/layout.tsx`: SEO-Metadaten erweitert und Cookie-Banner eingebunden.
- `src/app/globals.css`: Showcase-Animationen entfernt, da im Hero nicht mehr verwendet.
- `src/components/VehicleCard.tsx`: "Details ansehen" verlinkt jetzt zur Mobile.de-Anzeige im neuen Tab.
- `src/lib/mobile-de-api.ts`: Mobile.de-Link pro Fahrzeug aus der Ad-ID aufgebaut.
- `src/app/impressum/page.tsx`: Impressum-Seite mit offiziellen Angaben hinzugefuegt.
- `src/app/impressum/page.tsx`: Navbar/Footer und Ruecklink zur Startseite eingebunden.
- `src/components/Footer.tsx`: Social-Links entfernt.
- `src/app/datenschutz/page.tsx`: Datenschutzerkl&auml;rung mit Hosting, Cookies und externen Inhalten hinzugef&uuml;gt.
- `src/app/datenschutz/page.tsx`: Cookie-Speicherdauer im Text auf 12 Monate (365 Tage) praezisiert.
- `src/app/robots.ts`: robots.txt via App Router Metadata Route hinzugefuegt.
- `src/app/sitemap.ts`: sitemap.xml via App Router Metadata Route hinzugefuegt.
- `src/app/not-found.tsx`: 404-Seite mit Header/Footer ergaenzt.
- `.env.example`: Vorlage fuer Server-Secrets und SITE_URL hinzugefuegt.
- `src/app/datenschutz/page.tsx`: Log-Retention fuer Server-Logs auf 14 Tage konkretisiert.
- `next.config.mjs`: Bildformate (AVIF/WEBP) und Cache-TTL fuer Remote-Images ergaenzt.
- `scripts/lxc-deploy.sh`: Interaktives Deploy- und Update-Skript fuer LXC/Proxmox hinzugefuegt.
- `README.md`: Ausfuehrliche LXC-Installations-, Betriebs- und Update-Anleitung hinzugefuegt.
- `README.md`: Anleitung fuer oeffentliche GitHub-Repos (HTTPS) ergaenzt.
- `scripts/lxc-deploy.sh`: Hinweis auf SSH oder HTTPS Repo-URL ergaenzt.
- `src/app/page.tsx`: Kontaktsektion auf korrekte Adresse, Telefon und E-Mail aktualisiert.
- `src/components/Footer.tsx`: Adresse und Telefonnummer aktualisiert.

## Hinweise
- Adresse und Telefonnummer sind weiterhin Platzhalter und sollten fuer die reale Website angepasst werden.
