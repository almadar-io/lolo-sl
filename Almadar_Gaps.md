<!-- Gap ledger for this repo: the source of truth for its open gaps. -->
# @almadar/lolo-sl — open gaps

Every open gap this repo owns lives here. This file is the source of truth; the monorepo's `docs/Almadar_Gaps.md` only rolls it up.

- **One entry per gap:** `- **<code>** — <what is wrong and where>. <owning package> [mechanical|architectural] — <evidence, prevention rung>`.
- **Codes:** new gaps use this repo's prefix `G-LOLO-SL-`. Take the "Next code" below, then bump it in the same edit. Codes are never reused or renamed.
- **Close by deleting.** Remove the entry in the same commit as the fix.

Next code: `G-LOLO-SL-002`

- **G-LOLO-SL-001** — `vocabulary.json` repeats six keys inside the `operators` object (`random-bytes`, `credential-status`, `credential-forget`, `oauth-authorize`, `oauth-connection-status`, `oauth-connection-forget`, each three times with the same value). JSON keeps the last, so behavior is unchanged, but any tool that round-trips the file through a JSON parser silently deletes lines (found 2026-10-18 while adding `invariant`/`holds`). Fix: drop the repeats and make the i18n coverage gate (`checkI18nCoverage`, `@almadar/core/i18n`) refuse a duplicate key. @almadar/lolo-sl [mechanical] — prevention rung: tooling (the i18n gate), none of the language rungs (data file hygiene).
