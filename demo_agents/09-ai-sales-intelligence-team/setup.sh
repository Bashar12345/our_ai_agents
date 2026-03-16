#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/source"

if [ ! -d .venv ]; then
  if ! python3 -m venv .venv 2>/tmp/venv_error.log; then
    echo "python3 -m venv failed; using virtualenv fallback..."
    python3 -m pip install --user virtualenv
    python3 -m virtualenv .venv
  fi
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
