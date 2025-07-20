#!/usr/bin/env bash
set -euo pipefail

# ────────────────────────────────
# 0. Create new folder skeleton
# ────────────────────────────────
mkdir -p \
  app/api/contacts \
  src/{lib,db,migrations,types} \
  src/modules/contacts/{api,service,model} \
  tests/{unit,integration,e2e} \
  .github/workflows \
  docker \
  .devcontainer \
  docs/adr

# ────────────────────────────────
# 1. Move / rename existing source files
# ────────────────────────────────
git mv pages/api/contacts/POST.ts                       app/api/contacts/route.ts
git mv lib/validate.ts                                  src/modules/contacts/model/contact.schema.ts
git mv scripts/dbCheck.ts                               src/db/dbCheck.ts
git mv drizzle.config.ts                                drizzle.config.ts          # stays at root, but re‑added so Git tracks new path if changed
git mv schema.sql                                       src/db/LEGACY_schema.sql   # kept only for reference, safe to delete later
git mv tsconfig.json                                    tsconfig.json              # remain at root
git mv .eslintrc.js                                     .eslintrc.cjs             # rename to CJS per new config

# ────────────────────────────────
# 2. Add stub placeholders for NEW files promised in the plan
# ────────────────────────────────
touch \
  src/lib/env.ts \
  src/lib/log.ts \
  src/lib/api/errorToResponse.ts \
  src/lib/api/rateLimiter.ts \
  src/db/client.ts \
  src/db/migrate.ts \
  src/db/seed.ts \
  src/db/schema.ts \
  src/modules/contacts/service/createContact.ts \
  tests/unit/validateContact.test.ts \
  tests/integration/createContact.test.ts \
  tests/e2e/submitContact.spec.ts \
  docker/Dockerfile \
  docker/docker-compose.yaml \
  .devcontainer/devcontainer.json \
  .github/workflows/ci.yml \
  README.md \
  LICENSE \
  CONTRIBUTING.md \
  ROADMAP.md

# ────────────────────────────────
# 3. Delete obsolete artefacts
# ────────────────────────────────
git rm -f package-lock.json yarn.lock 2>/dev/null || true   # switching to pnpm
git rm -rf pages                                           # no longer used with App Router

echo "✅  Folder restructuring complete. Commit when satisfied."
