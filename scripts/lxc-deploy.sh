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

pick_editor() {
  if [[ -n "${EDITOR:-}" ]] && command -v "${EDITOR}" >/dev/null 2>&1; then
    echo "${EDITOR}"
    return
  fi

  for candidate in nano vi vim; do
    if command -v "${candidate}" >/dev/null 2>&1; then
      echo "${candidate}"
      return
    fi
  done

  echo ""
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

if [[ ! -f "package.json" ]]; then
  echo "package.json nicht gefunden in ${APP_DIR}."
  echo "Bitte pruefen, ob das Installationsverzeichnis korrekt ist."
  exit 1
fi

ENV_FILE="${APP_DIR}/.env.local"

if [[ ! -f "${ENV_FILE}" ]]; then
  if [[ -f ".env.example" ]]; then
    echo "Erstelle .env.local aus .env.example..."
    cp .env.example "${ENV_FILE}"
    echo "Bitte .env.local mit Ihren Secrets fuellen."
  else
    echo "Warnung: .env.example fehlt. Leere .env.local wird erstellt."
    touch "${ENV_FILE}"
  fi
fi

if [[ -f "${ENV_FILE}" ]]; then
  read -r -p "ENV jetzt bearbeiten? [Y/n]: " EDIT_ENV
  if [[ -z "${EDIT_ENV}" || "${EDIT_ENV}" =~ ^[Yy]$ ]]; then
    EDITOR_CMD="$(pick_editor)"
    if [[ -n "${EDITOR_CMD}" ]]; then
      "${EDITOR_CMD}" "${ENV_FILE}"
    else
      echo "Kein Editor gefunden. Bitte ${ENV_FILE} manuell bearbeiten."
    fi
  fi
fi

read -r -p "Mit Build fortfahren? [Y/n]: " CONTINUE_BUILD
if [[ "${CONTINUE_BUILD}" =~ ^[Nn]$ ]]; then
  echo "Build uebersprungen."
  exit 0
fi

if [[ -f "package-lock.json" ]]; then
  npm ci --no-audit --no-fund
else
  npm install --no-audit --no-fund
fi

npm run build

echo "Build abgeschlossen."

read -r -p "Systemd-Service einrichten? (erfordert sudo) [y/N]: " SETUP_SERVICE
if [[ "${SETUP_SERVICE}" =~ ^[Yy]$ ]]; then
  SERVICE_FILE="/etc/systemd/system/${APP_NAME}.service"
  NODE_BIN="$(command -v node)"
  NEXT_BIN="${APP_DIR}/node_modules/next/dist/bin/next"
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
ExecStart=${NODE_BIN} ${NEXT_BIN} start -p 3000
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
