/**
 * Regenerates the icon registry in src/components/SectionIcon.vue from
 * lucide-static.
 *
 * Brand book §11 requires one icon set — Lucide or Phosphor, never a mix —
 * drawn at 1.5 px with square terminals. Copying the paths in rather than
 * shipping a runtime dependency keeps the 18 icons we actually use (and only
 * those) in the bundle; lucide-static stays a devDependency so this can be
 * re-run when the set changes.
 *
 * Usage: bun run icons:registry
 */
import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));

// Our name → the Lucide icon that carries it.
const MAP = {
  search: 'search',
  zap: 'zap',
  link: 'link',
  lightbulb: 'lightbulb',
  server: 'server',
  layers: 'layers',
  cpu: 'cpu',
  check: 'circle-check',
  shield: 'shield',
  cloud: 'cloud',
  code: 'code-xml',
  rocket: 'rocket',
  cog: 'settings',
  database: 'database',
  chart: 'chart-column',
  puzzle: 'puzzle',
  lock: 'lock',
  bot: 'bot',
};

const entries = [];
for (const [name, lucide] of Object.entries(MAP)) {
  const svg = await readFile(`${root}node_modules/lucide-static/icons/${lucide}.svg`, 'utf8');
  // Everything between <svg …> and </svg>, with the presentation attributes
  // (stroke, width, linecap…) left behind — the wrapper in SectionIcon owns those.
  const inner = svg
    .replace(/[\s\S]*?<svg[^>]*>/, '')
    .replace(/<\/svg>[\s\S]*/, '')
    .replace(/\s+/g, ' ')
    .trim();
  if (!inner) throw new Error(`empty icon: ${lucide}`);
  entries.push(`  // lucide/${lucide}\n  ${name}: '${inner.replace(/'/g, "\\'")}',`);
}

const registry = `const icons: Record<string, string> = {\n${entries.join('\n')}\n}`;

const p = `${root}src/components/SectionIcon.vue`;
const src = await readFile(p, 'utf8');
const next = src.replace(/const icons: Record<string, string> = \{[\s\S]*?\n\}/, registry);
if (next === src) throw new Error('registry block not found in SectionIcon.vue');
await writeFile(p, next);
console.log(`${entries.length} icons written to src/components/SectionIcon.vue`);
