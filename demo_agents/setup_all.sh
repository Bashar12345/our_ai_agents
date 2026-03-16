#!/usr/bin/env bash
set -euo pipefail

base="$(cd "$(dirname "$0")" && pwd)"
for d in "$base"/*/; do
  [ -d "$d" ] || continue
  [ -f "$d/setup.sh" ] || continue
  echo "======================================="
  echo "Setting up: $(basename "$d")"
  (cd "$d" && ./setup.sh)
done
