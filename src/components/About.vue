<script setup lang="ts">
defineProps<{
  t: {
    about: {
      title: string;
      subtitle: string;
      description: string;
      highlight1: { title: string; description: string };
      highlight2: { title: string; description: string };
      highlight3: { title: string; description: string };
    };
  };
}>();
</script>

<template>
  <section id="about" class="about section">
    <div class="container">
      <div class="about-header">
        <h2 class="about-title">{{ t.about.title }}</h2>
        <p class="about-subtitle">{{ t.about.subtitle }}</p>
      </div>
      
      <div class="about-content">
        <div class="about-text">
          <p class="about-description">
            {{ t.about.description }}
          </p>
          
          <div class="about-stats">
            <div class="stat">
              <span class="stat-value">100%</span>
              <span class="stat-label">Open Source Focus</span>
            </div>
            <div class="stat">
              <span class="stat-value">24h</span>
              <span class="stat-label">Response Time</span>
            </div>
          </div>
        </div>
        
        <div class="about-highlights">
          <div class="highlight-card">
            <div class="highlight-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
              </svg>
            </div>
            <h3 class="highlight-title">{{ t.about.highlight1.title }}</h3>
            <p class="highlight-description">{{ t.about.highlight1.description }}</p>
          </div>
          
          <div class="highlight-card">
            <div class="highlight-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M12 2a4 4 0 0 1 4 4v4a4 4 0 0 1-8 0V6a4 4 0 0 1 4-4z"/>
                <path d="M16 10v2a4 4 0 0 1-8 0v-2"/>
                <path d="M12 18v4M8 22h8"/>
              </svg>
            </div>
            <h3 class="highlight-title">{{ t.about.highlight2.title }}</h3>
            <p class="highlight-description">{{ t.about.highlight2.description }}</p>
          </div>
          
          <div class="highlight-card">
            <div class="highlight-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <circle cx="12" cy="12" r="10"/>
                <path d="M8 12l2 2 4-4"/>
              </svg>
            </div>
            <h3 class="highlight-title">{{ t.about.highlight3.title }}</h3>
            <p class="highlight-description">{{ t.about.highlight3.description }}</p>
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
  color: var(--red-500);
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
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 4rem;
  align-items: start;
}

.about-description {
  font-size: 1.125rem;
  line-height: 1.9;
  color: var(--gray-700);
  margin-bottom: 2.5rem;
}

.about-stats {
  display: flex;
  gap: 3rem;
}

.stat {
  display: flex;
  flex-direction: column;
}

.stat-value {
  font-family: var(--font-display);
  font-size: 2.5rem;
  font-weight: 800;
  color: var(--red-500);
  line-height: 1;
}

.stat-label {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--gray-500);
  margin-top: 0.5rem;
}

.about-highlights {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

.highlight-card {
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
  color: var(--red-500);
  margin-bottom: 1.5rem;
  transition: all var(--transition-base);
}

.highlight-card:hover .highlight-icon {
  background: var(--red-500);
  color: var(--white);
}

.highlight-title {
  font-size: 1.125rem;
  font-weight: 700;
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
  
  .about-highlights {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .about-stats {
    flex-direction: column;
    gap: 1.5rem;
  }
}
</style>
