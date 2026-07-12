<script setup lang="ts">
import { ref } from 'vue';

defineProps<{
  faq: {
    title: string;
    subtitle: string;
    items: Array<{ question: string; answer: string }>;
  };
}>();

const openIndex = ref<number | null>(0);

function toggle(index: number) {
  openIndex.value = openIndex.value === index ? null : index;
}
</script>

<template>
  <section id="faq" class="faq section">
    <div class="container">
      <header class="faq-header">
        <h2 class="faq-title">{{ faq.title }}</h2>
        <p class="faq-subtitle">{{ faq.subtitle }}</p>
      </header>

      <div class="faq-list">
        <div
          v-for="(item, index) in faq.items"
          :key="index"
          class="faq-item"
          :class="{ 'is-open': openIndex === index }"
        >
          <button
            :id="`faq-question-${index}`"
            class="faq-question"
            :aria-expanded="openIndex === index"
            :aria-controls="`faq-answer-${index}`"
            @click="toggle(index)"
          >
            <span>{{ item.question }}</span>
            <svg
              class="faq-icon"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              aria-hidden="true"
            >
              <polyline points="6,9 12,15 18,9" />
            </svg>
          </button>
          <div
            :id="`faq-answer-${index}`"
            class="faq-answer"
            role="region"
            :aria-labelledby="`faq-question-${index}`"
            v-show="openIndex === index"
          >
            <p>{{ item.answer }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.faq {
  background: var(--white);
}

.faq-header {
  text-align: center;
  max-width: 640px;
  margin: 0 auto 3rem;
}

.faq-title {
  margin-bottom: 1rem;
}

.faq-subtitle {
  color: var(--gray-600);
  font-size: 1.125rem;
}

.faq-list {
  max-width: 820px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.faq-item {
  border: 1px solid var(--gray-200);
  background: var(--white);
  transition: border-color var(--transition-base);
}

.faq-item.is-open {
  border-color: var(--red-500);
}

.faq-question {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  padding: 1.25rem 1.5rem;
  background: transparent;
  border: none;
  text-align: left;
  font-family: inherit;
  font-size: 1rem;
  font-weight: 600;
  color: var(--black);
  cursor: pointer;
  transition: background var(--transition-fast);
}

.faq-question:hover {
  background: var(--gray-50, #fafafa);
}

.faq-icon {
  flex-shrink: 0;
  color: var(--gray-500);
  transition: transform var(--transition-base);
}

.faq-item.is-open .faq-icon {
  transform: rotate(180deg);
  color: var(--red-500);
}

.faq-answer {
  padding: 0 1.5rem 1.5rem;
  color: var(--gray-700);
  line-height: 1.7;
}

@media (max-width: 640px) {
  .faq-question {
    padding: 1rem 1.25rem;
    font-size: 0.9375rem;
  }

  .faq-answer {
    padding: 0 1.25rem 1.25rem;
  }
}
</style>
