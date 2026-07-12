<script setup lang="ts">
// Available icon names (keep in sync with the CMS icon picker config):
// Core set: search, zap, link, lightbulb, server, layers, cpu, check
// Extra set: shield, cloud, code, rocket, cog, database, chart, puzzle, lock, bot
// Unknown names fall back to a simple circle.

const props = withDefaults(
  defineProps<{
    name: string
    size?: number
  }>(),
  { size: 28 }
)

const icons: Record<string, string> = {
  search:
    '<circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/><path d="M11 8v6M8 11h6"/>',
  zap: '<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>',
  link:
    '<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>',
  lightbulb:
    '<path d="M9 18h6M10 22h4"/><path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14"/>',
  server:
    '<rect x="2" y="2" width="20" height="8" rx="2" ry="2"/><rect x="2" y="14" width="20" height="8" rx="2" ry="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/>',
  layers: '<path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>',
  cpu:
    '<path d="M12 2a4 4 0 0 1 4 4v4a4 4 0 0 1-8 0V6a4 4 0 0 1 4-4z"/><path d="M16 10v2a4 4 0 0 1-8 0v-2"/><path d="M12 18v4M8 22h8"/>',
  check: '<circle cx="12" cy="12" r="10"/><path d="M8 12l2 2 4-4"/>',

  // Extra icons
  shield: '<path d="M12 2l8 3v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V5l8-3z"/>',
  cloud:
    '<path d="M7 18a4 4 0 0 1-.5-7.97A6 6 0 0 1 18 9.5 3.5 3.5 0 0 1 17.5 18H7z"/>',
  code: '<path d="M8 8l-4 4 4 4"/><path d="M16 8l4 4-4 4"/><path d="M13 5l-2 14"/>',
  rocket:
    '<path d="M12 3c3.5 1.5 6 5 6 9l-3 2H9l-3-2c0-4 2.5-7.5 6-9z"/><path d="M9 14l-2 3M15 14l2 3"/><circle cx="12" cy="9" r="1.5"/>',
  cog:
    '<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M19.1 4.9L17 7M7 17l-2.1 2.1"/>',
  database:
    '<ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v6c0 1.66 3.58 3 8 3s8-1.34 8-3V5"/><path d="M4 11v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6"/>',
  chart:
    '<path d="M3 3v18h18"/><path d="M7 15v3M12 10v8M17 6v12"/>',
  puzzle:
    '<path d="M10 4a2 2 0 0 1 4 0v1h4v4h1a2 2 0 0 1 0 4h-1v4h-4v-1a2 2 0 0 0-4 0v1H6v-4H5a2 2 0 0 1 0-4h1V5h4V4z"/>',
  lock:
    '<rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/>',
  bot:
    '<rect x="4" y="8" width="16" height="12" rx="2"/><path d="M12 4v4M9 13h.01M15 13h.01M8 20v2M16 20v2"/><path d="M2 13h2M20 13h2"/>'
}

const fallback = '<circle cx="12" cy="12" r="9"/>'
</script>

<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.5"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
    focusable="false"
    v-html="icons[name] ?? fallback"
  />
</template>
