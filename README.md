<div align="center">

# @almadar/lolo-sl

**The Slovenian (Slovenščina) language pack for `.lolo` and `.orb`: write and read Almadar programs in Slovenian.**

[![CI](https://github.com/almadar-io/lolo-sl/actions/workflows/ci.yml/badge.svg)](https://github.com/almadar-io/lolo-sl/actions/workflows/ci.yml)
[![Publish](https://github.com/almadar-io/lolo-sl/actions/workflows/publish.yml/badge.svg)](https://github.com/almadar-io/lolo-sl/actions/workflows/publish.yml)
[![npm](https://img.shields.io/npm/v/@almadar/lolo-sl)](https://www.npmjs.com/package/@almadar/lolo-sl)
[![license](https://img.shields.io/badge/license-BSL--1.1-blue)](./LICENSE)

</div>

With this pack installed, `orb` reads and writes programs whose keywords, effects, operators and `.orb` keys are spelled in Slovenian. English is built into `orb`; every other language is a pack like this one. The package is one file, `vocabulary.json`.

## Where this fits

```mermaid
flowchart TB
  subgraph kernel["Kernel and substrate"]
    core["orbital-core<br/>IR · evaluator · kernel"]
    canvas["orbital-canvas<br/>2D/3D render primitives"]
  end
  subgraph lang["Language"]
    lolo["orbital-lolo<br/>.lolo → .orb"]
    compiler["orbital-compiler<br/>validate · codegen"]
  end
  subgraph hosts["Shells and hosts"]
    ts["orbital-shell-typescript<br/>web · node · @almadar/core"]
    rs["orbital-shell-rust<br/>desktop · tui"]
    py["orbital-shell-python"]
    ios["orbital-shell-ios"]
    android["orbital-shell-android"]
    os["orbital-shell-os"]
    wasm["orbital-wasm<br/>browser kernel"]
    ffi["orbital-ffi<br/>C ABI for mobile"]
    router["orbital-router"]
  end
  cli["orbital-cli<br/>the orb binary"]
  ws["orbital-rust<br/>workspace · cross-crate tests"]
  dist["orb<br/>npm · releases"]
  subgraph pkgs["Language packages"]
    std["almadar-std<br/>@almadar/std substrate"]
    beh["behaviors<br/>themed organisms"]
    langs["lolo-ar · lolo-sl<br/>language packs"]
  end
  subgraph apps["Apps and sites"]
    builder["builder (studio)"]
    kflow["kflow-academy"]
    nata["nata"]
    rawi["rawi"]
    site["almadar (websites)"]
  end
  core --> lolo & compiler & ts & rs & py & ios & android & os & wasm & ffi & router
  canvas --> ts & rs & ffi
  lolo --> compiler
  compiler --> cli
  ts & rs & py & ios & android & os --> cli
  cli --> dist
  ws -.pins.-> core & lolo & compiler & cli
  dist --> std
  std --> beh
  std --> langs
  beh --> builder & kflow & nata & rawi & site
  click core "https://github.com/almadar-io/orbital-core"
  click canvas "https://github.com/almadar-io/orbital-canvas"
  click lolo "https://github.com/almadar-io/orbital-lolo"
  click compiler "https://github.com/almadar-io/orbital-compiler"
  click ts "https://github.com/almadar-io/orbital-shell-typescript"
  click rs "https://github.com/almadar-io/orbital-shell-rust"
  click py "https://github.com/almadar-io/orbital-shell-python"
  click ios "https://github.com/almadar-io/orbital-shell-ios"
  click android "https://github.com/almadar-io/orbital-shell-android"
  click os "https://github.com/almadar-io/orbital-shell-os"
  click wasm "https://github.com/almadar-io/orbital-wasm"
  click ffi "https://github.com/almadar-io/orbital-ffi"
  click router "https://github.com/almadar-io/orbital-router"
  click cli "https://github.com/almadar-io/orbital-cli"
  click ws "https://github.com/almadar-io/orbital-rust"
  click dist "https://github.com/almadar-io/orb"
  click std "https://github.com/almadar-io/almadar-std"
  click beh "https://github.com/almadar-io/behaviors"
  click langs "https://github.com/almadar-io/lolo-ar"
  click builder "https://github.com/itechdom/almadar-studio"
  click kflow "https://github.com/almadar-io/almadar-kflow-academy"
  click nata "https://github.com/almadar-io/almadar-nata"
  click rawi "https://github.com/almadar-io/almadar-rawi"
  click site "https://github.com/almadar-io/almadar"
  classDef here fill:#2563eb,color:#fff,stroke:#1e40af,stroke-width:3px
  class langs here
```

| Upstream (this repo depends on) | Downstream (depends on this repo) |
|---|---|
| [orb](https://github.com/almadar-io/orb): the binary that loads and enforces the pack | [almadar-std](https://github.com/almadar-io/almadar-std): lists both packs as dev dependencies |
| `@almadar/core`: owns the language data (`orbLanguage.version`) the pack's `language` range is checked against | |

## Quick start

```bash
orb language install @almadar/lolo-sl
```

`orb setup` installs the packs too. Node 22 or newer.

## What's inside

| File | What it is |
|---|---|
| `vocabulary.json` | Maps each English word to its Slovenian spelling, section by section: `keywords`, `shapes`, `tags`, `categories`, `capabilities`, `annotations`, `sigils`, `effects`, `types`, `units`, `literals`, `reservedEvents`, `orb`, `operators`, plus `meta: { code, name, rtl }` (here `{ "code": "sl", "name": "Slovenian", "rtl": false }`) |
| `scripts/check.mjs` | The shape check run by `pnpm test` and by CI |

### Pack contract

A language pack is any npm package whose `package.json` declares:

```json
"orbVocabulary": { "language": "^1", "vocabulary": "vocabulary.json" }
```

`language` is a range over the language-data version `@almadar/core` publishes as `orbLanguage.version`; the pack is usable only while the installed language satisfies it. `orb` refuses a pack that makes a program ambiguous: two English words with one spelling, or a first-word spelling another installed language already uses. A word the pack does not translate stays legal in English.

## Development

```bash
node scripts/check.mjs   # also pnpm test
pnpm exec eslint --no-warn-ignored --max-warnings 0 <files you touched>
```

Coverage against English (missing words, collisions, operator parity) is checked in the monorepo's i18n gate and by `orb` when it loads the pack, not here. Open gaps are tracked in [`Almadar_Gaps.md`](./Almadar_Gaps.md). Work on `main` only; releases go through the monorepo cascade and a `v*` tag.

## Docs

[Orb documentation](https://orb.almadar.io/docs): the language, the `orb` CLI and how the pieces fit

## License

Business Source License 1.1 (see [LICENSE](./LICENSE)). Converts to Apache 2.0 on 2030-02-01.
