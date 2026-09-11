/**
 * Rasterises the sygnet (public/favicon.svg) into the PNG sizes that SVG
 * cannot cover: iOS ignores SVG for apple-touch-icon, and Google's
 * Organization schema wants a raster logo.
 *
 * One source of truth — edit favicon.svg, then: bun run icons
 */
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = fileURLToPath(new URL('..', import.meta.url));
const svg = await readFile(`${root}public/favicon.svg`);

const targets = [
  { file: 'apple-touch-icon.png', size: 180 },
  { file: 'logo-512.png', size: 512 },
];

for (const { file, size } of targets) {
  await sharp(svg, { density: 512 }).resize(size, size).png().toFile(`${root}public/${file}`);
  console.log(`${file} — ${size}x${size}`);
}
