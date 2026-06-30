# Debugging Journal — MetricPulse (Module 15)

Minimum 3 documented failures with pattern, recovery, and outcome.

---

## Failure 1 — Migration lock provider mismatch

**What happened:** `npx prisma migrate deploy` failed with `P3019`: datasource provider `sqlite` did not match `migration_lock.toml`.

**Failure pattern (Module 10):** Broken architecture / dependency conflict (schema vs migration history out of sync)

**Recovery:**
1. STOP — did not patch schema blindly
2. Compared `migration_lock.toml` to working FocusFlow project
3. Fixed file to `provider = "sqlite"` and re-ran `prisma migrate deploy`

**Outcome:** Migration applied; seed and tests passed.

**Prevention:** Copy `migration_lock.toml` from `prisma migrate dev` output, never hand-edit provider line incorrectly.

---

## Failure 2 — TypeScript build errors on client

**What happened:** `npm run build` failed — `import.meta.env` unknown; CSS import not typed.

**Failure pattern:** Skipped Plan Mode / incomplete scaffold (missing `vite-env.d.ts`)

**Recovery:**
1. Added `src/vite-env.d.ts` with Vite client types and `VITE_API_URL`
2. Re-ran `tsc --noEmit && vite build`

**Outcome:** Production build succeeded.

**Prevention:** Scaffold Vite React TS template files (`vite-env.d.ts`) in Task 4 spec before Edit Mode.

---

## Failure 3 — PowerShell command chaining

**What happened:** Setup script using `&&` failed on Windows PowerShell 5 — directories created but `npm install` never ran in server folder.

**Failure pattern:** Environment assumption (bash syntax on Windows shell)

**Recovery:**
1. Used `;` separators instead of `&&`
2. Re-ran `npm install` in `metricpulse-server` explicitly

**Outcome:** Dependencies installed; server tests green.

**Prevention:** Document Windows setup with semicolon-separated commands in README.

---

## Failure 4 — Seed before migration

**What happened:** `db:seed` failed — table `Sale` does not exist — because migrate failed first (Failure 1).

**Failure pattern:** Circular repair symptom (fixing seed before fixing root migrate error)

**Recovery:** Fixed migration first, then deleted empty `dev.db`, re-deployed migration, then seed.

**Outcome:** 324 sales seeded successfully.

**Prevention:** Follow implementation sequence: schema ? migrate ? seed ? services.
