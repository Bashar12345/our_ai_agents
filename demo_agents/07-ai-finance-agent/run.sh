#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/source"

if [ -d .venv ]; then
  # shellcheck disable=SC1091
  source .venv/bin/activate
fi

if [[ "python3 xai_finance_agent.py" == adk* ]] && ! command -v adk >/dev/null 2>&1; then
  echo "ADK CLI is not installed. Install it first for this demo."
  echo "Command needed: python3 xai_finance_agent.py"
  exit 1
fi

echo "Running: python3 xai_finance_agent.py"
exec python3 xai_finance_agent.py
