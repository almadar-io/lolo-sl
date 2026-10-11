#!/usr/bin/env node
// The pack's shape: what `orb` and `@almadar/core` read. Coverage against English
// (missing words, collisions, operator parity) is checked where English lives: the
// Almadar monorepo's i18n gate and `orb` itself when it loads the pack.
import { readFileSync } from 'node:fs';

const SECTIONS = ['keywords', 'shapes', 'tags', 'categories', 'capabilities', 'annotations', 'sigils', 'effects', 'types', 'units', 'literals', 'reservedEvents', 'orb', 'operators'];
const manifest = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8'));
const block = manifest.orbVocabulary;
const problems = [];
if (!block || typeof block.compiler !== 'string' || typeof block.vocabulary !== 'string') {
  problems.push('package.json: `orbVocabulary` needs `compiler` and `vocabulary`');
} else {
  const vocabulary = JSON.parse(readFileSync(new URL(`../${block.vocabulary}`, import.meta.url), 'utf8'));
  const meta = vocabulary.meta ?? {};
  if (!/^[a-z]{2,3}(-[A-Za-z0-9]{2,8})*$/.test(meta.code ?? '') || meta.code === 'en') problems.push(`meta.code ${JSON.stringify(meta.code)} is not a language code other than en`);
  if (typeof meta.name !== 'string' || typeof meta.rtl !== 'boolean') problems.push('meta needs { code, name, rtl }');
  for (const section of SECTIONS) {
    const value = vocabulary[section] ?? {};
    if (typeof value !== 'object' || Array.isArray(value)) { problems.push(`${section} is not an object`); continue; }
    for (const [key, word] of Object.entries(value)) {
      if (typeof word !== 'string' || word === '') problems.push(`${section}.${key} is not a non-empty string`);
    }
  }
  for (const key of Object.keys(vocabulary)) {
    if (key !== 'meta' && !SECTIONS.includes(key)) problems.push(`unknown section ${key}`);
  }
}
if (problems.length > 0) {
  console.error(`${manifest.name}: ${problems.length} problem(s)\n  ${problems.join('\n  ')}`);
  process.exit(1);
}
console.log(`${manifest.name}: ok`);
