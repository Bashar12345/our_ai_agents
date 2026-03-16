#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/source"

if [ -d .venv ]; then
  # shellcheck disable=SC1091
  source .venv/bin/activate
fi

if [[ "streamlit run ai_data_analyst.py" == adk* ]] && ! command -v adk >/dev/null 2>&1; then
  echo "ADK CLI is not installed. Install it first for this demo."
  echo "Command needed: streamlit run ai_data_analyst.py"
  exit 1
fi

echo "Running: streamlit run ai_data_analyst.py"
exec streamlit run ai_data_analyst.py
