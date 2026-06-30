# Module 15 Capstone Submission — MetricPulse

**Course:** Vibe Coding with Claude + Cursor  
**Option:** B — Analytics Dashboard (easiest minimum path)  
**Date:** June 30, 2026

---

## Project Choice Rationale

| Option | Why not chosen |
|--------|----------------|
| A — AI business tool | Requires Claude API key + integration |
| C — Team productivity | Auth + PostgreSQL + roles — more complex |
| D — Support chatbot | Streaming + admin UI — more complex |
| E — Custom | Requires extra justification |
| **B — Analytics dashboard** | **Selected:** No auth, SQLite seed data, Recharts only |

---

## All 11 Deliverables

| # | Deliverable | Location |
|---|-------------|----------|
| 1 | Project Proposal (Idea Brief) | [01_IDEA_BRIEF.md](./01_IDEA_BRIEF.md) |
| 2 | PRD (9 sections) | [02_PRD.md](./02_PRD.md) |
| 3 | Technical Architecture (6 sections) | [03_ARCHITECTURE.md](./03_ARCHITECTURE.md) |
| 4 | Vibe Coding Spec (8 sections) | [04_VIBE_CODING_SPEC.md](./04_VIBE_CODING_SPEC.md) |
| 5 | Annotated Prompt Library (8+) | [05_PROMPT_LIBRARY.md](./05_PROMPT_LIBRARY.md) |
| 6 | Git Repository (10+ commits) | `module-15/` — run `git log` after init |
| 7 | Deployed Application URL | Update in README after Vercel deploy |
| 8 | README | [README.md](./README.md) |
| 9 | API Documentation | [docs/API.md](./docs/API.md) |
| 10 | Debugging Journal (3+ failures) | [06_DEBUGGING_JOURNAL.md](./06_DEBUGGING_JOURNAL.md) |
| 11 | Retrospective (200+ words) | [07_RETROSPECTIVE.md](./07_RETROSPECTIVE.md) |

**Self-assessment:** [08_SELF_ASSESSMENT.md](./08_SELF_ASSESSMENT.md)

---

## Phase Checklist (Minimum)

| Phase | Deliverable | Status |
|-------|-------------|--------|
| 1 — Brief | Idea Brief + requirements | Done |
| 2 — PRD | 9 sections, 5+ out of scope | Done |
| 3 — Architecture | 6 sections, APIs specified | Done |
| 4 — Spec + Prompts | 8 sections, 8+ prompts | Done |
| 5 — Sprint 1 | Core app + local run | Done |
| 6 — Sprint 2 | Errors, loading, responsive | Done |
| 7 — Test + Doc | Tests, README, API, security notes | Done |
| 8 — Retro | Journal + retrospective + rubric | Done |

---

## Local Verification

```bash
# Terminal 1
cd metricpulse-server && npm run dev

# Terminal 2
cd metricpulse-client && npm run dev
```

Open http://localhost:5173 — adjust filters; charts and summary should update.

```bash
cd metricpulse-server && npm test
```

---

## Next Steps for Submission

1. `git init` in `module-15`, push to GitHub (10+ commits)
2. Deploy backend to Railway/Render, frontend to Vercel
3. Update deployed URL in this file and `08_SELF_ASSESSMENT.md`
4. Upload/submit this document + links in TalentLMS Assignment unit
