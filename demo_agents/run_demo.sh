#!/usr/bin/env bash
set -euo pipefail

if [ $# -lt 1 ]; then
  echo "Usage: ./run_demo.sh <demo-index-or-folder>"
  echo "Example: ./run_demo.sh 01"
  echo "Example: ./run_demo.sh 03-multi-mcp-agent-router"
  exit 1
fi

arg="$1"
base="$(cd "$(dirname "$0")" && pwd)"

if [[ "$arg" =~ ^[0-9]{1,2}$ ]]; then
  idx=$(printf "%02d" "$arg")
  folder=$(find "$base" -maxdepth 1 -mindepth 1 -type d -name "${idx}-*" | head -n 1)
else
  folder="$base/$arg"
fi

if [ -z "${folder:-}" ] || [ ! -d "$folder" ]; then
  echo "Demo folder not found for: $arg"
  exit 1
fi

echo "Using demo folder: $folder"
cd "$folder"
./setup.sh
./run.sh
