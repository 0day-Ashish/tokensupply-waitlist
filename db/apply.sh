#!/usr/bin/env bash
# Applies the waitlist migration to the database in DATABASE_URL.
#
#   ./db/apply.sh
#
# Reads .env.local (git-ignored) so the connection string never lands in shell
# history. Safe to re-run: every statement is IF NOT EXISTS.
set -euo pipefail

cd "$(dirname "$0")/.."

if [[ ! -f .env.local ]]; then
  echo "error: .env.local not found (expected DATABASE_URL)" >&2
  exit 1
fi

set -a
# shellcheck disable=SC1091
. ./.env.local
set +a

: "${DATABASE_URL:?DATABASE_URL is not set in .env.local}"

# psql wants sslmode on the URL; the app driver sets SSL in code instead, so it
# is not baked into DATABASE_URL. Add it here just for these commands.
export PGSSLMODE=require

echo "==> Connecting"
psql "$DATABASE_URL" -qtAc "select 'connected to ' || current_database() || ' as ' || current_user;"

echo "==> Applying db/001_create_waitlist.sql"
psql "$DATABASE_URL" -v ON_ERROR_STOP=1 -f db/001_create_waitlist.sql

echo "==> Verifying"
psql "$DATABASE_URL" -c "\d waitlist"
psql "$DATABASE_URL" -qtAc "select count(*) || ' rows in waitlist' from waitlist;"

echo "==> Done"
