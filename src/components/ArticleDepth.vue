<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';

interface LevelInput {
  name: string;
  audience: string;
  html: string;
}

const props = defineProps<{
  levels: LevelInput[];
  labels: {
    goDeeper: string; // e.g. "Zanurkuj głębiej"
    readingTime: string; // e.g. "min czytania"
    levelLabel: string; // e.g. "Poziom"
  };
}>();

interface Level {
  id: string;
  name: string;
  audience: string;
  html: string;
  minutes: number;
  color: string;
  tint: string;
}

const stripTags = (html: string): string =>
  html
    .replace(/<[^>]*>/g, ' ')
    .replace(/&[a-z0-9#]+;/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();

const readingMinutes = (html: string): number => {
  const text = stripTags(html);
  const words = text ? text.split(' ').filter(Boolean).length : 0;
  return Math.max(1, Math.round(words / 200));
};

// Identification color per level: interpolate teal → amber → red across however
// many levels a post has, so the first is always calm and the deepest is always
// brand red — for 2 levels, 3, 4 or 5.
const STOPS: [number, number, number][] = [
  [13, 148, 136], // teal-600 — surface
  [217, 119, 6], // amber-600 — middle
  [220, 38, 38], // brand red — deepest
];

const lerp = (a: number, b: number, t: number) => Math.round(a + (b - a) * t);

const levelRgb = (index: number, count: number): [number, number, number] => {
  const t = count <= 1 ? 0 : index / (count - 1);
  const seg = t <= 0.5 ? 0 : 1;
  const u = t <= 0.5 ? t / 0.5 : (t - 0.5) / 0.5;
  const from = STOPS[seg];
  const to = STOPS[seg + 1];
  return [lerp(from[0], to[0], u), lerp(from[1], to[1], u), lerp(from[2], to[2], u)];
};

const levels = computed<Level[]>(() =>
  props.levels.map((lvl, i) => {
    const [r, g, b] = levelRgb(i, props.levels.length);
    return {
      id: `level-${i + 1}`,
      name: lvl.name,
      audience: lvl.audience,
      html: lvl.html,
      minutes: readingMinutes(lvl.html),
      color: `rgb(${r}, ${g}, ${b})`,
      tint: `rgba(${r}, ${g}, ${b}, 0.08)`,
    };
  })
);

const hasDepth = computed(() => levels.value.length >= 2);

// openLevel = how many levels are revealed (1..levels.length)
const openLevel = ref(1);

const revealThrough = (index: number) => {
  if (index > openLevel.value) {
    openLevel.value = Math.min(index, levels.value.length);
  }
};

const scrollToId = (id: string) => {
  if (typeof document === 'undefined') return;
  const el = document.getElementById(id);
  if (el && typeof el.scrollIntoView === 'function') {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

const setHash = (id: string) => {
  if (typeof window === 'undefined') return;
  try {
    window.history.replaceState(null, '', `#${id}`);
  } catch {
    window.location.hash = id;
  }
};

const onStepClick = (index: number, id: string) => {
  revealThrough(index);
  setHash(id);
  requestAnimationFrame(() => scrollToId(id));
};

const onGoDeeper = () => {
  const next = Math.min(openLevel.value + 1, levels.value.length);
  openLevel.value = next;
  const nextLevel = levels.value[next - 1];
  if (nextLevel) {
    setHash(nextLevel.id);
    requestAnimationFrame(() => scrollToId(nextLevel.id));
  }
};

onMounted(() => {
  if (typeof window === 'undefined') return;
  const hash = window.location.hash.replace(/^#/, '');
  if (!hash) return;
  const idx = levels.value.findIndex((l) => l.id === hash);
  if (idx >= 0) {
    revealThrough(idx + 1);
    requestAnimationFrame(() => scrollToId(levels.value[idx].id));
  }
});
</script>

<template>
  <!-- Single level: a normal article, no depth UI -->
  <div v-if="!hasDepth" class="prose" v-html="levels[0].html"></div>

  <!-- Multiple levels: interactive depth reader -->
  <div v-else class="article-depth">
    <nav class="depth-meter" :aria-label="labels.levelLabel">
      <button
        v-for="(level, i) in levels"
        :key="level.id"
        type="button"
        class="depth-step"
        :style="{ '--level-color': level.color, '--level-tint': level.tint }"
        :class="{
          'is-active': i + 1 === openLevel,
          'is-revealed': i + 1 <= openLevel,
          'is-locked': i + 1 > openLevel,
        }"
        :aria-current="i + 1 === openLevel ? 'true' : undefined"
        @click="onStepClick(i + 1, level.id)"
      >
        <span class="depth-step-index">{{ labels.levelLabel }} {{ i + 1 }}</span>
        <span class="depth-step-name">{{ level.name }}</span>
        <span class="depth-step-meta">
          {{ level.audience }} · ~{{ level.minutes }} {{ labels.readingTime }}
        </span>
      </button>
    </nav>

    <template v-for="(level, i) in levels" :key="level.id">
      <!-- Every level stays in the DOM for SEO; hidden via v-show (display:none) -->
      <section
        :id="level.id"
        class="depth-level"
        :style="{ '--level-color': level.color, '--level-tint': level.tint }"
        v-show="i + 1 <= openLevel"
      >
        <header class="depth-level-header">
          {{ level.name }} · {{ level.audience }} · ~{{ level.minutes }}
          {{ labels.readingTime }}
        </header>
        <div class="prose" v-html="level.html"></div>
      </section>

      <!-- goDeeper appears between the last revealed level and the next hidden one -->
      <div
        v-if="i + 1 === openLevel && i + 1 < levels.length"
        class="go-deeper-wrap"
      >
        <button type="button" class="go-deeper" @click="onGoDeeper">
          <span>{{ labels.goDeeper }}</span>
          <svg
            class="go-deeper-chevron"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
            focusable="false"
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </button>
      </div>
    </template>
  </div>
</template>
