<script setup lang="ts">
import SectionIcon from './SectionIcon.vue';

defineProps<{
  about: {
    title: string;
    subtitle: string;
    description: string;
    stats: { value: string; label: string }[];
    highlights: { icon: string; title: string; description: string }[];
  };
}>();
</script>

<template>
  <section id="about" class="about section">
    <div class="container">
      <div class="about-header">
        <h2 class="about-title">{{ about.title }}</h2>
        <p class="about-subtitle">{{ about.subtitle }}</p>
      </div>

      <div class="about-content">
        <div class="about-text">
          <p class="about-description">
            {{ about.description }}
          </p>

          <div class="about-stats">
            <div v-for="s in about.stats" :key="s.label" class="stat">
              <span class="stat-value">{{ s.value }}</span>
              <span class="stat-label">{{ s.label }}</span>
            </div>
          </div>
        </div>

        <div class="about-highlights">
          <div v-for="h in about.highlights" :key="h.title" class="highlight-card">
            <div class="highlight-icon">
              <SectionIcon :name="h.icon" :size="32" />
            </div>
            <h3 class="highlight-title">{{ h.title }}</h3>
            <p class="highlight-description">{{ h.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about {
  background: var(--gray-50);
  position: relative;
}

.about::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(to right, transparent, var(--gray-300), transparent);
}

.about-header {
  text-align: center;
  margin-bottom: 4rem;
}

.section-label {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: var(--gray-600);
  margin-bottom: 1rem;
  display: block;
}

.about-title {
  margin-bottom: 1rem;
}

.about-subtitle {
  font-size: 1.25rem;
  color: var(--gray-600);
  max-width: 600px;
  margin: 0 auto;
}

.about-content {
  /* Stacked: intro + stats full-width on top, then the proof cards in a full-
     width 3-col row below. (Side-by-side squeezed the longer case-study cards
     into one-word-per-line columns.) */
  display: flex;
  flex-direction: column;
  gap: 3.5rem;
}

.about-text {
  text-align: center;
}

.about-description {
  font-size: 1.125rem;
  line-height: 1.9;
  color: var(--gray-700);
  margin: 0 auto 2.5rem;
  max-width: 820px;
}

.about-stats {
  display: flex;
  gap: 3rem;
  justify-content: center;
}

.stat {
  display: flex;
  flex-direction: column;
}

.stat-value {
  font-family: var(--font-display);
  font-size: 2.75rem;
  font-weight: 600;
  color: var(--red-500);
  line-height: 1;
}

.stat-label {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--gray-600);
  margin-top: 0.5rem;
}

/* Flex rather than a fixed 3-column grid: the number of proof cards changes as
   material is added or retired, and two cards should centre instead of leaving
   an empty cell. */
.about-highlights {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1.5rem;
}

.highlight-card {
  flex: 1 1 300px;
  max-width: 400px;
  background: var(--white);
  padding: 2rem;
  border: 1px solid var(--gray-200);
  transition: all var(--transition-base);
  position: relative;
  overflow: hidden;
}

.highlight-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 3px;
  background: var(--red-500);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform var(--transition-base);
}

.highlight-card:hover {
  border-color: var(--gray-300);
  box-shadow: 0 10px 40px -10px rgba(0, 0, 0, 0.1);
}

.highlight-card:hover::before {
  transform: scaleX(1);
}

.highlight-icon {
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--gray-100);
  color: var(--gray-600);
  margin-bottom: 1.5rem;
  transition: all var(--transition-base);
}

.highlight-card:hover .highlight-icon {
  background: var(--red-500);
  color: var(--white);
}

.highlight-title {
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
  color: var(--black);
}

.highlight-description {
  font-size: 0.9375rem;
  color: var(--gray-600);
  line-height: 1.7;
}

@media (max-width: 1024px) {
  .about-content {
    grid-template-columns: 1fr;
  }

  .highlight-card {
    max-width: none;
  }
}

@media (max-width: 640px) {
  .about-stats {
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
  }
}
</style>
