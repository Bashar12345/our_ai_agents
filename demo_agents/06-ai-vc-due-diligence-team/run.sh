#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/source"

if [ -d .venv ]; then
  # shellcheck disable=SC1091
  source .venv/bin/activate
fi

if [[ "adk web --project vc_diligence" == adk* ]] && ! command -v adk >/dev/null 2>&1; then
  echo "ADK CLI is not installed. Install it first for this demo."
  echo "Command needed: adk web --project vc_diligence"
  exit 1
fi

echo "Running: adk web --project vc_diligence"
exec adk web --project vc_diligence
