/**
 * Renders the link-preview images from the dev server's /og/<lang> pages.
 *
 * Headless Chrome at --window-size=1200,630 gives the exact OG canvas with the
 * site's own CSS and webfonts, so the preview can never drift from the site —
 * re-run it whenever the mark, the type or the promise changes.
 *
 * Needs `bun run dev` in another shell. Usage: bun run og
 */
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { fileURLToPath } from 'node:url';

const run = promisify(execFile);
const root = fileURLToPath(new URL('..', import.meta.url));

const CHROME =
  process.env.CHROME_BIN ?? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const ORIGIN = process.env.OG_ORIGIN ?? 'http://localhost:4321';

// The slug is the output name, not a locale: with prefixDefaultLocale false,
// Astro's i18n strips `/pl` out of any path, so /og/pl is unreachable.
const targets = ['og-image', 'og-image-en'];

try {
  const res = await fetch(`${ORIGIN}/og/${targets[0]}`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
} catch (err) {
  console.error(`Cannot reach ${ORIGIN}/og/${targets[0]} — start the dev server first (bun run dev).`);
  console.error(String(err));
  process.exit(1);
}

for (const name of targets) {
  const out = `${root}public/${name}.png`;
  await run(CHROME, [
    '--headless',
    '--disable-gpu',
    '--hide-scrollbars',
    '--force-device-scale-factor=1',
    '--window-size=1200,630',
    // The fonts are still streaming in when the first frame paints; without
    // this the headline lands in the fallback stack.
    '--virtual-time-budget=4000',
    `--screenshot=${out}`,
    `${ORIGIN}/og/${name}`,
  ]);
  console.log(`${name}.png — ${ORIGIN}/og/${name}`);
}
