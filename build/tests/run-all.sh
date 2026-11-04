#!/bin/sh
# Runs every test. Needs Node.js; the browser test also needs Chromium.
cd "$(dirname "$0")/.." || exit 1
echo "== analysis"; node tests/analysis.test.js | tail -1 || exit 1
echo "== counter (takes about a minute)"; node tests/counter.test.js | tail -1 || exit 1
if command -v chromium >/dev/null 2>&1; then
  echo "== browser (clicking, add-to-log, tabs)"
  chromium --headless --disable-gpu --allow-file-access-from-files --virtual-time-budget=15000 --dump-dom "file://$PWD/tests/ui.test.html" 2>/dev/null | grep -o -E "(ALL PASSED|SOME FAILED)</pre>"
fi
