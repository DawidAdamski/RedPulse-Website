<script setup lang="ts">
defineProps<{
  t: {
    services: {
      title: string;
      subtitle: string;
      analysis: { title: string; description: string };
      automation: { title: string; description: string };
      integration: { title: string; description: string };
      consulting: { title: string; description: string };
      infrastructure: { title: string; description: string };
    };
  };
}>();

const services = [
  { key: 'analysis', icon: 'search' },
  { key: 'automation', icon: 'zap' },
  { key: 'integration', icon: 'link' },
  { key: 'consulting', icon: 'lightbulb' },
  { key: 'infrastructure', icon: 'server' },
];
</script>

<template>
  <section id="services" class="services section">
    <div class="container">
      <div class="services-header">
        <h2 class="services-title">{{ t.services.title }}</h2>
        <p class="services-subtitle">{{ t.services.subtitle }}</p>
      </div>
      
      <div class="services-grid">
        <div 
          v-for="(service, index) in services" 
          :key="service.key"
          class="service-card"
          :style="{ '--delay': `${index * 0.1}s` }"
        >
          <div class="service-number">{{ String(index + 1).padStart(2, '0') }}</div>
          
          <div class="service-icon">
            <!-- Analysis Icon -->
            <svg v-if="service.icon === 'search'" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <circle cx="11" cy="11" r="8"/>
              <path d="M21 21l-4.35-4.35"/>
              <path d="M11 8v6M8 11h6"/>
            </svg>
            
            <!-- Automation Icon -->
            <svg v-if="service.icon === 'zap'" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
            </svg>
            
            <!-- Integration Icon -->
            <svg v-if="service.icon === 'link'" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
            </svg>
            
            <!-- Consulting Icon -->
            <svg v-if="service.icon === 'lightbulb'" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M9 18h6M10 22h4"/>
              <path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14"/>
            </svg>
            
            <!-- Infrastructure Icon -->
            <svg v-if="service.icon === 'server'" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <rect x="2" y="2" width="20" height="8" rx="2" ry="2"/>
              <rect x="2" y="14" width="20" height="8" rx="2" ry="2"/>
              <line x1="6" y1="6" x2="6.01" y2="6"/>
              <line x1="6" y1="18" x2="6.01" y2="18"/>
            </svg>
          </div>
          
          <h3 class="service-title">{{ t.services[service.key as keyof typeof t.services].title }}</h3>
          <p class="service-description">{{ t.services[service.key as keyof typeof t.services].description }}</p>
          
          <div class="service-arrow">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
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
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
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
.service-card .service-description,
.service-card .service-arrow {
  position: relative;
  z-index: 1;
}

.service-card:hover .service-number,
.service-card:hover .service-icon,
.service-card:hover .service-title,
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
  margin-bottom: 1rem;
  color: var(--black);
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
