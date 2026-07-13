<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';

type LevelKey = 'surface' | 'dive' | 'depth';

interface LevelLabel {
  name: string;
  persona: string;
}

const props = defineProps<{
  surfaceHtml: string;
  diveHtml?: string | null;
  depthHtml?: string | null;
  labels: {
    surface: LevelLabel;
    dive: LevelLabel;
    depth: LevelLabel;
    goDeeper: string; // e.g. "Zanurkuj głębiej"
    readingTime: string; // e.g. "min czytania"
    levelLabel: string; // e.g. "Poziom"
  };
}>();

interface Level {
  key: LevelKey;
  name: string;
  persona: string;
  html: string;
  minutes: number;
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

const isNonEmpty = (v?: string | null): v is string =>
  typeof v === 'string' && v.trim().length > 0;

const levels = computed<Level[]>(() => {
  const list: Level[] = [
    {
      key: 'surface',
      name: props.labels.surface.name,
      persona: props.labels.surface.persona,
      html: props.surfaceHtml,
      minutes: readingMinutes(props.surfaceHtml),
    },
  ];

  if (isNonEmpty(props.diveHtml)) {
    list.push({
      key: 'dive',
      name: props.labels.dive.name,
      persona: props.labels.dive.persona,
      html: props.diveHtml,
      minutes: readingMinutes(props.diveHtml),
    });
  }

  if (isNonEmpty(props.depthHtml)) {
    list.push({
      key: 'depth',
      name: props.labels.depth.name,
      persona: props.labels.depth.persona,
      html: props.depthHtml,
      minutes: readingMinutes(props.depthHtml),
    });
  }

  return list;
});

const hasDepth = computed(() => levels.value.length >= 2);

// openLevel = how many levels are revealed (1..levels.length)
const openLevel = ref(1);

const revealThrough = (index: number) => {
  // index is 1-based level position
  if (index > openLevel.value) {
    openLevel.value = Math.min(index, levels.value.length);
  }
};

const scrollToKey = (key: LevelKey) => {
  if (typeof document === 'undefined') return;
  const el = document.getElementById(key);
  if (el && typeof el.scrollIntoView === 'function') {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

const setHash = (key: LevelKey) => {
  if (typeof window === 'undefined') return;
  try {
    window.history.replaceState(null, '', `#${key}`);
  } catch {
    window.location.hash = key;
  }
};

const onStepClick = (index: number, key: LevelKey) => {
  revealThrough(index);
  setHash(key);
  // wait a tick for v-show to reveal the target before scrolling
  requestAnimationFrame(() => scrollToKey(key));
};

const onGoDeeper = () => {
  const next = Math.min(openLevel.value + 1, levels.value.length);
  openLevel.value = next;
  const nextLevel = levels.value[next - 1];
  if (nextLevel) {
    setHash(nextLevel.key);
    requestAnimationFrame(() => scrollToKey(nextLevel.key));
  }
};

onMounted(() => {
  if (typeof window === 'undefined') return;
  const hash = window.location.hash.replace(/^#/, '');
  if (!hash) return;
  const idx = levels.value.findIndex((l) => l.key === hash);
  if (idx >= 0) {
    revealThrough(idx + 1);
    requestAnimationFrame(() => scrollToKey(levels.value[idx].key));
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
        :key="level.key"
        type="button"
        class="depth-step"
        :class="{
          'is-active': i + 1 === openLevel,
          'is-revealed': i + 1 <= openLevel,
          'is-locked': i + 1 > openLevel,
        }"
        :aria-current="i + 1 === openLevel ? 'true' : undefined"
        @click="onStepClick(i + 1, level.key)"
      >
        <span class="depth-step-index">{{ labels.levelLabel }} {{ i + 1 }}</span>
        <span class="depth-step-name">{{ level.name }}</span>
        <span class="depth-step-meta">
          {{ level.persona }} · ~{{ level.minutes }} {{ labels.readingTime }}
        </span>
      </button>
    </nav>

    <template v-for="(level, i) in levels" :key="level.key">
      <!-- Every level stays in the DOM for SEO; hidden via v-show (display:none) -->
      <section
        :id="level.key"
        class="depth-level"
        :class="`depth-level--${i + 1}`"
        v-show="i + 1 <= openLevel"
      >
        <header class="depth-level-header">
          {{ level.name }} · {{ level.persona }} · ~{{ level.minutes }}
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
