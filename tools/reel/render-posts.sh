#!/usr/bin/env bash
# Render every still whose ID starts with a prefix, e.g. `./render-posts.sh Nov` → out/posts/Nov18-TagScreen.png …
# Extra arguments go to `remotion still`, e.g. --props='{"winner":"@ana.novak"}'.
set -euo pipefail
cd "$(dirname "$0")"

prefix="${1:?Usage: ./render-posts.sh <id prefix> [remotion still options]}"
shift
mkdir -p out/posts

ids=$(npx remotion compositions --quiet | tr ' ' '\n' | grep -E "^${prefix}" || true)
if [ -z "$ids" ]; then
  echo "No compositions start with \"${prefix}\"." >&2
  exit 1
fi

for id in $ids; do
  npx remotion still "$id" "out/posts/${id}.png" --log=error "$@"
  echo "out/posts/${id}.png"
done
