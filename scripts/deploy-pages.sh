#!/usr/bin/env bash
# Builds the static export and publishes it to the gh-pages branch, which GitHub Pages
# serves at https://markelmallakh-blip.github.io/Glio/.
set -euo pipefail

cd "$(dirname "$0")/.."
npm run build:pages
rm -f out/_viewport.html # local preview helper, never published

remote="$(git remote get-url origin)"
publish="$(mktemp -d)"
cp -R out/. "$publish"
cd "$publish"
git init -q -b gh-pages
git add -A
git commit -q -m "Deploy $(git -C "$OLDPWD" rev-parse --short HEAD)"
git push -q -f "$remote" gh-pages
rm -rf "$publish"
echo "Published to https://markelmallakh-blip.github.io/Glio/"
