#!/bin/bash
# ─── NextRead – Quick Start ────────────────────────────────────────────────
# Usage: ./start.sh

set -e
ROOT="$(cd "$(dirname "$0")" && pwd)"

echo ""
echo "  📚 NextRead – Riadh MNASRI"
echo "──────────────────────────────────────────────────────────────────────────"
echo ""

# ── Backend ──────────────────────────────────────────────────────────────────
echo "▶  Starting Spring Boot backend on port 8089 …"
cd "$ROOT/backend"
mvn spring-boot:run -q &
BACKEND_PID=$!

# ── Frontend ─────────────────────────────────────────────────────────────────
echo "▶  Installing Angular dependencies (first run may take a minute) …"
cd "$ROOT/frontend"
npm install --silent

echo "▶  Starting Angular dev server on http://localhost:4209 …"
npx ng serve --proxy-config proxy.conf.json --port 4209 --open &
FRONTEND_PID=$!

# ── Cleanup on exit ───────────────────────────────────────────────────────────
trap "echo ''; echo 'Stopping…'; kill $BACKEND_PID $FRONTEND_PID 2>/dev/null" SIGINT SIGTERM

echo ""
echo "  Backend    → http://localhost:8089"
echo "  Frontend   → http://localhost:4209"
echo "  H2 Console → http://localhost:8089/h2-console  (JDBC: jdbc:h2:file:~/nextread-data/nextread)"
echo ""
echo "  Press Ctrl+C to stop both servers."
echo ""

wait
