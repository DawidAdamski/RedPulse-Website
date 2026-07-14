<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';

// "Listen to this article" using the browser's built-in Web Speech API
// (speechSynthesis). No external service. Long text is split into sentence
// chunks and queued, which also sidesteps Chrome's ~15s single-utterance cutoff.

const props = defineProps<{
  text: string;
  lang: string; // e.g. "pl-PL" | "en-US"
  labels: { play: string; pause: string; resume: string };
}>();

type State = 'idle' | 'playing' | 'paused';

const supported = ref(false);
const state = ref<State>('idle');

let chunks: string[] = [];
let index = 0;
let cancelledByUs = false;

const chunkText = (text: string): string[] => {
  const sentences = text.match(/[^.!?…]+[.!?…]+|\S[^.!?…]*$/g) ?? [text];
  const out: string[] = [];
  let buf = '';
  for (const s of sentences) {
    const piece = s.trim();
    if (!piece) continue;
    if ((buf + ' ' + piece).trim().length > 220 && buf) {
      out.push(buf.trim());
      buf = piece;
    } else {
      buf = (buf + ' ' + piece).trim();
    }
  }
  if (buf) out.push(buf.trim());
  return out;
};

const speakFrom = (i: number) => {
  if (i >= chunks.length) {
    state.value = 'idle';
    index = 0;
    return;
  }
  index = i;
  const u = new SpeechSynthesisUtterance(chunks[i]);
  u.lang = props.lang;
  const match = window.speechSynthesis
    .getVoices()
    .find((v) => v.lang === props.lang) ||
    window.speechSynthesis.getVoices().find((v) => v.lang.startsWith(props.lang.slice(0, 2)));
  if (match) u.voice = match;
  u.onend = () => {
    if (state.value === 'playing') speakFrom(i + 1);
  };
  u.onerror = () => {
    if (!cancelledByUs) state.value = 'idle';
  };
  window.speechSynthesis.speak(u);
};

const start = () => {
  cancelledByUs = true;
  window.speechSynthesis.cancel();
  cancelledByUs = false;
  chunks = chunkText(props.text);
  state.value = 'playing';
  speakFrom(0);
};

const toggle = () => {
  if (!supported.value) return;
  if (state.value === 'idle') {
    start();
  } else if (state.value === 'playing') {
    window.speechSynthesis.pause();
    state.value = 'paused';
  } else if (state.value === 'paused') {
    window.speechSynthesis.resume();
    state.value = 'playing';
  }
};

const stop = () => {
  cancelledByUs = true;
  window.speechSynthesis.cancel();
  cancelledByUs = false;
  state.value = 'idle';
  index = 0;
};

const buttonLabel = computed(() => {
  if (state.value === 'playing') return props.labels.pause;
  if (state.value === 'paused') return props.labels.resume;
  return props.labels.play;
});

onMounted(() => {
  supported.value =
    typeof window !== 'undefined' &&
    'speechSynthesis' in window &&
    props.text.trim().length > 0;
  // Warm up the voice list (some browsers populate it lazily).
  if (supported.value) window.speechSynthesis.getVoices();
});

onBeforeUnmount(() => {
  if (supported.value) window.speechSynthesis.cancel();
});
</script>

<template>
  <div v-if="supported" class="listen-bar">
    <button
      type="button"
      class="listen-btn"
      :class="{ 'is-active': state !== 'idle' }"
      :aria-pressed="state !== 'idle'"
      @click="toggle"
    >
      <svg
        v-if="state !== 'playing'"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
        focusable="false"
      >
        <path d="M8 5v14l11-7z" />
      </svg>
      <svg
        v-else
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
        focusable="false"
      >
        <rect x="6" y="5" width="4" height="14" />
        <rect x="14" y="5" width="4" height="14" />
      </svg>
      <span>{{ buttonLabel }}</span>
    </button>

    <button
      v-if="state !== 'idle'"
      type="button"
      class="listen-stop"
      aria-label="Stop"
      @click="stop"
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
        focusable="false"
      >
        <rect x="6" y="6" width="12" height="12" />
      </svg>
    </button>
  </div>
</template>
