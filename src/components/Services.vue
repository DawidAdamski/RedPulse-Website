<script setup lang="ts">
import SectionIcon from './SectionIcon.vue';

defineProps<{
  services: {
    title: string;
    subtitle: string;
    items: { icon: string; title: string; price?: string; description: string }[];
  };
}>();
</script>

<template>
  <section id="services" class="services section">
    <div class="container">
      <div class="services-header">
        <h2 class="services-title">{{ services.title }}</h2>
        <p class="services-subtitle">{{ services.subtitle }}</p>
      </div>

      <div class="services-grid">
        <div
          v-for="(item, index) in services.items"
          :key="index"
          class="service-card"
          :style="{ '--delay': `${index * 0.1}s` }"
        >
          <div class="service-number">{{ String(index + 1).padStart(2, '0') }}</div>

          <div class="service-icon">
            <SectionIcon :name="item.icon" :size="28" />
          </div>

          <h3 class="service-title">{{ item.title }}</h3>
          <p v-if="item.price" class="service-price">{{ item.price }}</p>
          <p class="service-description">{{ item.description }}</p>

          <div class="service-arrow">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true" focusable="false">
              <path d="M7 17L17 7M17 7H7M17 7V17"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.services {
  background: var(--white);
  position: relative;
}

.services-header {
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

.services-title {
  margin-bottom: 1rem;
}

.services-subtitle {
  font-size: 1.25rem;
  color: var(--gray-600);
  max-width: 600px;
  margin: 0 auto;
}

.services-grid {
  display: grid;
  /* Four services → a balanced 2×2 grid (a 3-col grid left one card orphaned). */
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  max-width: 900px;
  margin: 0 auto;
}

.service-card {
  position: relative;
  padding: 2.5rem;
  background: var(--white);
  border: 1px solid var(--gray-200);
  transition: all var(--transition-base);
  cursor: pointer;
  overflow: hidden;
}

.service-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, var(--red-500), var(--red-700));
  opacity: 0;
  transition: opacity var(--transition-base);
}

.service-card:hover {
  border-color: transparent;
  box-shadow: 0 20px 40px -15px rgba(220, 38, 38, 0.3);
}

.service-card:hover::before {
  opacity: 1;
}

.service-card .service-number,
.service-card .service-icon,
.service-card .service-title,
.service-card .service-price,
.service-card .service-description,
.service-card .service-arrow {
  position: relative;
  z-index: 1;
}

.service-card:hover .service-number,
.service-card:hover .service-icon,
.service-card:hover .service-title,
.service-card:hover .service-price,
.service-card:hover .service-description,
.service-card:hover .service-arrow {
  color: var(--white);
}

.service-number {
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--gray-300);
  font-weight: 700;
  transition: color var(--transition-base);
}

.service-icon {
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

.service-card:hover .service-icon {
  background: rgba(255, 255, 255, 0.2);
  color: var(--white);
}

.service-title {
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: var(--black);
  transition: color var(--transition-base);
}

.service-price {
  font-family: var(--font-mono);
  font-size: 0.9375rem;
  font-weight: 700;
  color: var(--red-500);
  margin-bottom: 1rem;
  transition: color var(--transition-base);
}

.service-description {
  font-size: 0.9375rem;
  color: var(--gray-600);
  line-height: 1.7;
  transition: color var(--transition-base);
}

.service-arrow {
  position: absolute;
  bottom: 1.5rem;
  right: 1.5rem;
  opacity: 0;
  transform: translate(-10px, 10px);
  transition: all var(--transition-base);
  color: var(--white);
}

.service-card:hover .service-arrow {
  opacity: 1;
  transform: translate(0, 0);
}

@media (max-width: 1024px) {
  .services-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .services-grid {
    grid-template-columns: 1fr;
  }
}
</style>
