<script setup lang="ts">
/**
 * The RedPulse mark, built to the construction in the brand book §4: three
 * pulse dots growing 7 / 10 / 14 px at 30% / 60% / 100% opacity with 5 px
 * between them, then a 14 px gap, then the "RedPulse" logotype in IBM Plex
 * Sans 700 at −0.02em tracking.
 *
 * The dots are SVG; the logotype is real text, so it uses the same webfont as
 * the rest of the site, stays selectable, and is read out by screen readers
 * without an aria-label standing in for it.
 *
 * The dots never animate and the logotype is a single colour — §4 forbids both
 * rearranging the dots and setting the logotype in anything but Plex Sans 700.
 */
withDefaults(
  defineProps<{
    /**
     * light — dots Puls Red, logotype Ink (on Paper and Sand)
     * dark  — dots lifted to Signal Red, logotype Paper (on Ink)
     * mono  — everything Paper (on full red, or over a photograph)
     */
    variant?: 'light' | 'dark' | 'mono';
    /** Cap height of the logotype in px. The dots scale with it. */
    size?: number;
  }>(),
  { variant: 'light', size: 22 }
);
</script>

<template>
  <span class="logo-lockup" :class="`is-${variant}`" :style="{ '--logo-size': `${size}px` }">
    <svg
      class="logo-dots"
      viewBox="0 0 41 14"
      width="41"
      height="14"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="3.5" cy="7" r="3.5" class="dot" opacity="0.3" />
      <circle cx="17" cy="7" r="5" class="dot" opacity="0.6" />
      <circle cx="34" cy="7" r="7" class="dot" />
    </svg>
    <span class="logo-word">RedPulse</span>
  </span>
</template>

<style scoped>
.logo-lockup {
  display: inline-flex;
  align-items: center;
  /* The 14 px gap of the construction, expressed against the logotype size so
     the whole lockup scales as one piece. */
  gap: calc(var(--logo-size) * 0.636);
  line-height: 1;
}

.logo-dots {
  /* Dot group is 41 × 14 at nominal size; height tracks the logotype. */
  height: calc(var(--logo-size) * 0.636);
  width: auto;
  flex-shrink: 0;
}

.logo-word {
  font-family: var(--font-sans);
  font-weight: 700;
  font-size: var(--logo-size);
  letter-spacing: -0.02em;
}

.is-light .dot {
  fill: var(--puls-red);
}

.is-light .logo-word {
  color: var(--ink);
}

.is-dark .dot {
  fill: var(--signal-red);
}

.is-dark .logo-word {
  color: var(--paper);
}

.is-mono .dot {
  fill: var(--paper);
}

.is-mono .logo-word {
  color: var(--paper);
}
</style>
