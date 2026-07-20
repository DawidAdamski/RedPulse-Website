<script setup lang="ts">
import SectionIcon from './SectionIcon.vue';
import { CALENDLY_URL } from '../config';

defineProps<{
  process: {
    title: string;
    subtitle: string;
    steps: { icon: string; title: string; duration?: string; description: string }[];
    cta: string;
  };
}>();
</script>

<template>
  <section id="process" class="process section">
    <div class="container">
      <div class="process-header">
        <h2>{{ process.title }}</h2>
        <p class="process-subtitle">{{ process.subtitle }}</p>
      </div>

      <ol class="process-steps">
        <li v-for="(step, index) in process.steps" :key="step.title" class="step">
          <div class="step-marker">
            <span class="step-number">{{ index + 1 }}</span>
            <SectionIcon :name="step.icon" :size="24" />
          </div>
          <h3 class="step-title">{{ step.title }}</h3>
          <p v-if="step.duration" class="step-duration">{{ step.duration }}</p>
          <p class="step-description">{{ step.description }}</p>
        </li>
      </ol>

      <div class="process-cta">
        <a :href="CALENDLY_URL" target="_blank" rel="noopener noreferrer" class="btn btn-primary">
          {{ process.cta }}
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true" focusable="false">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.process {
  background: var(--white);
}

.process-header {
  text-align: center;
  margin-bottom: 4rem;
}

.process-subtitle {
  font-size: 1.25rem;
  color: var(--gray-600);
  max-width: 640px;
  margin: 1rem auto 0;
}

.process-steps {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  list-style: none;
  counter-reset: none;
}

.step {
  padding: 2rem;
  border: 1px solid var(--gray-200);
  background: var(--white);
  transition: all var(--transition-base);
}

.step:hover {
  border-color: var(--gray-300);
  box-shadow: 0 10px 40px -10px rgba(0, 0, 0, 0.1);
}

.step-marker {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: var(--gray-600);
  margin-bottom: 1.25rem;
}

.step-number {
  font-family: var(--font-mono);
  font-size: 0.875rem;
  font-weight: 700;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--gray-100);
  color: var(--gray-600);
}

.step-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--black);
  margin-bottom: 0.25rem;
}

.step-duration {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  letter-spacing: 0.05em;
  color: var(--red-500);
  margin-bottom: 1rem;
}

.step-description {
  font-size: 0.9375rem;
  line-height: 1.7;
  color: var(--gray-600);
}

.process-cta {
  display: flex;
  justify-content: center;
  margin-top: 3rem;
}

@media (max-width: 900px) {
  .process-steps {
    grid-template-columns: 1fr;
  }
}
</style>
