#!/usr/bin/env bash
set -euo pipefail

APP_NAME="autoberndl"
DEFAULT_DIR="/opt/${APP_NAME}"
DEFAULT_BRANCH="main"

prompt() {
  local message="$1"
  local default_value="$2"
  local input
  read -r -p "${message} [${default_value}]: " input
  if [[ -z "${input}" ]]; then
    echo "${default_value}"
  else
    echo "${input}"
  fi
}

echo "=== Auto Berndl Deploy Helper ==="

echo "Bitte Repo-URL angeben (SSH oder HTTPS)."
echo "Beispiele: git@github.com:org/repo.git oder https://github.com/org/repo.git"
read -r -p "Repo URL: " REPO_URL
if [[ -z "${REPO_URL}" ]]; then
  echo "Repo URL fehlt. Abbruch."
  exit 1
fi

BRANCH=$(prompt "Branch" "${DEFAULT_BRANCH}")
APP_DIR=$(prompt "Installationsverzeichnis" "${DEFAULT_DIR}")

if ! command -v git >/dev/null 2>&1; then
  echo "git ist nicht installiert. Bitte zuerst installieren."
  exit 1
fi

if ! command -v node >/dev/null 2>&1; then
  echo "node ist nicht installiert. Bitte Node.js 18+ installieren."
  exit 1
fi

if ! command -v npm >/dev/null 2>&1; then
  echo "npm ist nicht installiert. Bitte npm installieren."
  exit 1
fi

if [[ -d "${APP_DIR}/.git" ]]; then
  echo "Repo vorhanden. Update wird ausgefuehrt..."
  git -C "${APP_DIR}" fetch --all
  git -C "${APP_DIR}" checkout "${BRANCH}"
  git -C "${APP_DIR}" pull --ff-only
else
  if [[ -d "${APP_DIR}" ]]; then
    echo "Verzeichnis existiert, ist aber kein Git-Repo: ${APP_DIR}"
    echo "Bitte ein leeres Zielverzeichnis waehlen oder manuell bereinigen."
    exit 1
  fi
  echo "Clone Repo..."
  git clone --branch "${BRANCH}" "${REPO_URL}" "${APP_DIR}"
fi

cd "${APP_DIR}"

if [[ ! -f ".env.local" ]]; then
  if [[ -f ".env.example" ]]; then
    echo "Erstelle .env.local aus .env.example..."
    cp .env.example .env.local
    echo "Bitte .env.local mit Ihren Secrets fuellen."
  else
    echo "Warnung: .env.example fehlt. Bitte .env.local manuell anlegen."
  fi
fi

if [[ -f "package-lock.json" ]]; then
  npm ci
else
  npm install
fi

npm run build

echo "Build abgeschlossen."

read -r -p "Systemd-Service einrichten? (erfordert sudo) [y/N]: " SETUP_SERVICE
if [[ "${SETUP_SERVICE}" =~ ^[Yy]$ ]]; then
  SERVICE_FILE="/etc/systemd/system/${APP_NAME}.service"
  sudo tee "${SERVICE_FILE}" >/dev/null <<SERVICE
[Unit]
Description=Auto Berndl Next.js App
After=network.target

[Service]
Type=simple
WorkingDirectory=${APP_DIR}
Environment=NODE_ENV=production
Environment=PORT=3000
EnvironmentFile=${APP_DIR}/.env.local
ExecStart=${APP_DIR}/node_modules/.bin/next start -p 3000
Restart=on-failure
RestartSec=5

[Install]
WantedBy=multi-user.target
SERVICE

  sudo systemctl daemon-reload
  sudo systemctl enable --now "${APP_NAME}.service"
  echo "Service gestartet: ${APP_NAME}.service"
else
  echo "Sie koennen die App manuell starten mit: npm run start"
fi

echo "Fertig."
