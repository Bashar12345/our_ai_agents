#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/source"

if [ ! -f .venv/bin/activate ]; then
  if python3 -m venv .venv >/tmp/venv_create.log 2>&1; then
    :
  else
    echo "python3 -m venv failed; trying virtualenv fallback..."
    python3 -m pip install --user virtualenv >/tmp/venv_virtualenv_install.log 2>&1 || true
    python3 -m virtualenv .venv >/tmp/venv_virtualenv_create.log 2>&1 || true
  fi
fi

if [ ! -f .venv/bin/activate ]; then
  echo "Failed to create virtual environment for $(basename "$(pwd)")."
  echo "Install venv support and retry: sudo apt install python3.12-venv"
  exit 1
fi

# shellcheck disable=SC1091
source .venv/bin/activate
python -m pip install --upgrade pip >/dev/null

if [ -f requirements.txt ]; then
  python -m pip install -r requirements.txt
elif [ -f pyproject.toml ]; then
  python -m pip install -e .
else
  echo "No requirements.txt or pyproject.toml found. Install dependencies manually if needed."
fi

echo "Setup complete for $(basename "$(pwd)")."
