<script setup lang="ts">
defineProps<{
  t: {
    nav: {
      home: string;
      about: string;
      services: string;
      contact: string;
      blog: string;
    };
  };
  currentLocale: string;
}>();

const otherLocale = (locale: string) => locale === 'pl' ? 'en' : 'pl';
const localePath = (locale: string) => locale === 'pl' ? '/' : '/en/';
</script>

<template>
  <header class="header">
    <div class="container header-container">
      <a href="#" class="logo">
        <span class="logo-red">Red</span><span class="logo-pulse">Pulse</span>
      </a>
      
      <nav class="nav">
        <a href="#about" class="nav-link">{{ t.nav.about }}</a>
        <a href="#services" class="nav-link">{{ t.nav.services }}</a>
        <a href="#contact" class="nav-link">{{ t.nav.contact }}</a>
        <a href="/blog" class="nav-link" target="_blank">{{ t.nav.blog }}</a>
      </nav>
      
      <div class="header-actions">
        <a 
          :href="localePath(otherLocale(currentLocale))" 
          class="lang-switch"
          :aria-label="`Switch to ${otherLocale(currentLocale).toUpperCase()}`"
        >
          {{ otherLocale(currentLocale).toUpperCase() }}
        </a>
        <a href="#contact" class="btn btn-primary btn-sm">{{ t.nav.contact }}</a>
      </div>
      
      <button class="mobile-menu-btn" aria-label="Menu">
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>
  </header>
</template>

<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--gray-200);
}

.header-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 80px;
}

.logo {
  font-family: var(--font-display);
  font-size: 1.5rem;
  font-weight: 800;
  letter-spacing: -0.02em;
}

.logo-red {
  color: var(--red-500);
}

.logo-pulse {
  color: var(--black);
}

.nav {
  display: flex;
  gap: 2.5rem;
}

.nav-link {
  font-family: var(--font-mono);
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--gray-600);
  transition: color var(--transition-fast);
}

.nav-link:hover {
  color: var(--black);
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.lang-switch {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  font-weight: 700;
  padding: 0.5rem 1rem;
  border: 2px solid var(--gray-300);
  transition: all var(--transition-fast);
}

.lang-switch:hover {
  border-color: var(--black);
  background: var(--black);
  color: var(--white);
}

.btn-sm {
  padding: 0.75rem 1.5rem;
  font-size: 0.75rem;
}

.mobile-menu-btn {
  display: none;
  flex-direction: column;
  gap: 6px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
}

.mobile-menu-btn span {
  width: 24px;
  height: 2px;
  background: var(--black);
  transition: all var(--transition-fast);
}

@media (max-width: 768px) {
  .nav,
  .header-actions .btn {
    display: none;
  }
  
  .mobile-menu-btn {
    display: flex;
  }
}
</style>
