#!/usr/bin/env bash
set -euo pipefail

APP_NAME="autoberndl"
DEFAULT_DIR="/opt/${APP_NAME}"
DEFAULT_BRANCH="main"
AUTO_YES="${AUTO_YES:-0}"

prompt() {
  local message="$1"
  local default_value="$2"
  local input
  if [[ "${AUTO_YES}" =~ ^[Yy1]$ ]]; then
    echo "${default_value}"
    return
  fi
  read -r -p "${message} [${default_value}]: " input
  if [[ -z "${input}" ]]; then
    echo "${default_value}"
  else
    echo "${input}"
  fi
}

confirm() {
  local message="$1"
  local default_value="${2:-Y}"
  local input
  if [[ "${AUTO_YES}" =~ ^[Yy1]$ ]]; then
    [[ "${default_value}" =~ ^[Yy]$ ]]
    return
  fi
  read -r -p "${message} [${default_value}]: " input
  if [[ -z "${input}" ]]; then
    input="${default_value}"
  fi
  [[ "${input}" =~ ^[Yy]$ ]]
}

is_truthy() {
  case "${1:-}" in
    1|true|TRUE|yes|YES|y|Y) return 0 ;;
    *) return 1 ;;
  esac
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
REPO_URL="${REPO_URL:-}"
if [[ -z "${REPO_URL}" ]]; then
  read -r -p "Repo URL: " REPO_URL
fi
if [[ -z "${REPO_URL}" ]]; then
  echo "Repo URL fehlt. Abbruch."
  exit 1
fi

BRANCH="${BRANCH:-}"
if [[ -z "${BRANCH}" ]]; then
  BRANCH=$(prompt "Branch" "${DEFAULT_BRANCH}")
fi

APP_DIR="${APP_DIR:-}"
if [[ -z "${APP_DIR}" ]]; then
  APP_DIR=$(prompt "Installationsverzeichnis" "${DEFAULT_DIR}")
fi

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

NODE_MAJOR="$(node -v | sed 's/v//' | cut -d. -f1)"
if [[ "${NODE_MAJOR}" -lt 20 ]]; then
  echo "Warnung: Node.js ${NODE_MAJOR} ist alt. Empfohlen: 20+."
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
  if [[ -z "${EDIT_ENV:-}" ]]; then
    if confirm "ENV jetzt bearbeiten?" "Y"; then
      EDIT_ENV="1"
    else
      EDIT_ENV="0"
    fi
  fi
  if is_truthy "${EDIT_ENV:-0}"; then
    EDITOR_CMD="$(pick_editor)"
    if [[ -n "${EDITOR_CMD}" ]]; then
      "${EDITOR_CMD}" "${ENV_FILE}"
    else
      echo "Kein Editor gefunden. Bitte ${ENV_FILE} manuell bearbeiten."
    fi
  fi
fi

if [[ -z "${CONTINUE_BUILD:-}" ]]; then
  if confirm "Mit Build fortfahren?" "Y"; then
    CONTINUE_BUILD="1"
  else
    CONTINUE_BUILD="0"
  fi
fi
if ! is_truthy "${CONTINUE_BUILD:-1}"; then
  echo "Build uebersprungen."
  exit 0
fi

if [[ -z "${CLEAN_INSTALL:-}" ]]; then
  if confirm "Saubere Installation (node_modules/.next loeschen)?" "N"; then
    CLEAN_INSTALL="1"
  else
    CLEAN_INSTALL="0"
  fi
fi
if is_truthy "${CLEAN_INSTALL:-0}"; then
  rm -rf node_modules .next
fi

if [[ -z "${UPDATE_DEPS:-}" ]]; then
  if confirm "Dependencies auf aktuellste kompatible Versionen aktualisieren (npm update)?" "Y"; then
    UPDATE_DEPS="1"
  else
    UPDATE_DEPS="0"
  fi
fi

if is_truthy "${UPDATE_DEPS:-0}"; then
  npm install --no-audit --no-fund
  npm update --no-audit --no-fund
else
  if [[ -f "package-lock.json" ]]; then
    npm ci --no-audit --no-fund
  else
    npm install --no-audit --no-fund
  fi
fi

if [[ -z "${AUDIT_DEPS:-}" ]]; then
  if confirm "npm audit ausfuehren (nur Produktion)?" "Y"; then
    AUDIT_DEPS="1"
  else
    AUDIT_DEPS="0"
  fi
fi
if is_truthy "${AUDIT_DEPS:-0}"; then
  if ! npm audit --omit=dev; then
    echo "npm audit meldet Schwachstellen. Bitte npm audit fix pruefen."
  fi
fi

npm run build

echo "Build abgeschlossen."

if [[ -z "${SETUP_SERVICE:-}" ]]; then
  if confirm "Systemd-Service einrichten? (erfordert sudo)" "N"; then
    SETUP_SERVICE="1"
  else
    SETUP_SERVICE="0"
  fi
fi
if is_truthy "${SETUP_SERVICE:-0}"; then
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

if command -v systemctl >/dev/null 2>&1; then
  if systemctl list-unit-files | grep -q "^${APP_NAME}.service"; then
    if [[ -z "${RESTART_SERVICE:-}" ]]; then
      if confirm "Service ${APP_NAME}.service jetzt neu starten?" "Y"; then
        RESTART_SERVICE="1"
      else
        RESTART_SERVICE="0"
      fi
    fi
    if is_truthy "${RESTART_SERVICE:-0}"; then
      sudo systemctl restart "${APP_NAME}.service"
      echo "Service neu gestartet: ${APP_NAME}.service"
    fi
  fi
fi

echo "Fertig."
