# @almadar/lolo-sl

The Slovenian (Slovenščina) language pack for the Almadar `.lolo` / `.orb` language. With it installed, `orb` reads and writes programs whose keywords, effects, operators and `.orb` keys are spelled in Slovenian. English is built into `orb`; every other language is a pack like this one.

`orb setup` installs this pack. To add it to a project yourself:

```sh
orb language install @almadar/lolo-sl
```

## Writing a language pack

A language pack is any npm package whose `package.json` declares:

```json
"orbVocabulary": { "compiler": ">=17.11.2", "vocabulary": "vocabulary.json" }
```

`vocabulary.json` maps each English word to its spelling, section by section (`keywords`, `shapes`, `tags`, `categories`, `capabilities`, `annotations`, `sigils`, `effects`, `types`, `units`, `literals`, `reservedEvents`, `orb`, `operators`), plus `meta: { code, name, rtl }`. `orb` refuses a pack that makes a program ambiguous: two English words with one spelling, or a first-word spelling another installed language already uses. A word the pack does not translate stays legal in English.
