# Auto Berndl - Next.js App

Dieses README erklaert Schritt fuer Schritt, wie du die Website in einem LXC (Proxmox) installierst, deployest, betreibst und aktualisierst. Der Fokus liegt auf einem einfachen und sicheren Ablauf.

## Stack
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS

## Voraussetzungen (LXC)
- LXC Container mit Debian/Ubuntu (empfohlen: Ubuntu 22.04 oder Debian 12)
- SSH Zugriff auf den Container
- Private GitHub Repo (SSH Deploy Key)
- Node.js 18+ und npm
- git

### Pakete installieren (Beispiel Debian/Ubuntu)
```bash
sudo apt update
sudo apt install -y git curl build-essential

# Node.js 18 (Nodesource)
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs
```

## Zugriff auf GitHub Repo
### Oeffentliches Repo (einfachster Weg)
Du kannst direkt per HTTPS klonen, kein Deploy Key noetig:
```bash
git clone https://github.com/ORG/REPO.git
```

### Privates Repo (Deploy Key)
1) SSH Key erstellen:
```bash
ssh-keygen -t ed25519 -C "autoberndl-lxc"
```
2) Public Key anzeigen:
```bash
cat ~/.ssh/id_ed25519.pub
```
3) In GitHub Repo unter **Settings -> Deploy keys** als **Read-only** hinterlegen.
4) Testen:
```bash
ssh -T git@github.com
```

## Schnellstart mit Deploy-Script (empfohlen)
Das Script liegt im Repo unter `scripts/lxc-deploy.sh` und fuehrt dich durch Installation und Updates.

### Variante A: Repo direkt in den Zielordner klonen
```bash
# Zielordner (public per HTTPS oder privat per SSH)
git clone https://github.com/ORG/REPO.git /opt/autoberndl
cd /opt/autoberndl

# Script starten
bash scripts/lxc-deploy.sh
```

### Variante B: Repo irgendwo klonen und Script nutzen
```bash
git clone https://github.com/ORG/REPO.git ~/autoberndl-setup
cd ~/autoberndl-setup
bash scripts/lxc-deploy.sh
```
Im Script gibst du dann als Installationsverzeichnis `/opt/autoberndl` an.

### Was das Script macht
- Repo klonen oder aktualisieren
- `.env.local` aus `.env.example` anlegen (falls nicht vorhanden)
- Dependencies installieren
- `npm run build`
- Optional: systemd Service erstellen und starten

## Umgebungsvariablen (.env.local)
Die Datei `.env.local` liegt **nur** auf dem Server und wird nicht ins Repo committet.

Beispiel (siehe `.env.example`):
```
SITE_URL=https://www.autoberndl.de
MOBILE_DE_USERNAME=...
MOBILE_DE_PASSWORD=...
MOBILE_DE_CUSTOMER_NUMBER=...
LOG_RETENTION_DAYS=14
```

**Wichtig:** Secrets nie mit `NEXT_PUBLIC_` prefixen, sonst landen sie im Frontend.

## Betrieb (systemd)
Wenn du den Service im Script aktiviert hast:
```bash
sudo systemctl status autoberndl
sudo systemctl restart autoberndl
sudo systemctl stop autoberndl
journalctl -u autoberndl -f
```

## Updates (per GitHub)
Ein Update ist jederzeit moeglich, ohne die Umgebung neu aufzusetzen.

### Schnell: Script erneut ausfuehren
```bash
bash scripts/lxc-deploy.sh
```

### Manuell (falls noetig)
```bash
cd /opt/autoberndl

git pull --ff-only
npm ci
npm run build
sudo systemctl restart autoberndl
```

## Rollback auf eine vorherige Version
```bash
cd /opt/autoberndl

git log --oneline
# Beispiel: auf Commit zurueckgehen
git checkout <commit-sha>

npm ci
npm run build
sudo systemctl restart autoberndl
```

## Reverse Proxy (nginx Beispiel)
```nginx
server {
  listen 80;
  server_name example.com;

  location / {
    proxy_pass http://127.0.0.1:3000;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
  }
}
```

## Checks nach dem Go-Live
- `https://deine-domain/robots.txt`
- `https://deine-domain/sitemap.xml`
- 404 Seite testen: `https://deine-domain/irgendwas`
- Fahrzeuge laden und Links zu Mobile.de pruefen

## Lokale Entwicklung
```bash
npm install
npm run dev
# http://localhost:3000
```
