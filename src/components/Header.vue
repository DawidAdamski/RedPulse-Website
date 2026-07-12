<script setup lang="ts">
import { ref, computed } from 'vue';

const props = defineProps<{
  t: {
    nav: {
      home: string;
      about: string;
      services: string;
      faq: string;
      contact: string;
      blog: string;
    };
  };
  currentLocale: string;
  basePath?: string;
}>();

const base = props.basePath ?? '';
const anchor = (hash: string) => `${base}${hash}`;
const logoHref = base || '#';

const blogPath = computed(() => props.currentLocale === 'en' ? '/en/blog' : '/blog');

const menuOpen = ref(false);

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value;
};

const closeMenu = () => {
  menuOpen.value = false;
};

const otherLocale = (locale: string) => locale === 'pl' ? 'en' : 'pl';
const localePath = (locale: string) => locale === 'pl' ? '/' : '/en/';

const navLabel = computed(() => props.currentLocale === 'en' ? 'Main navigation' : 'Główna nawigacja');
</script>

<template>
  <header class="header">
    <div class="container header-container">
      <a :href="logoHref" class="logo">
        <span class="logo-red">Red</span><span class="logo-pulse">Pulse</span>
      </a>

      <nav class="nav" :aria-label="navLabel">
        <a :href="anchor('#about')" class="nav-link">{{ t.nav.about }}</a>
        <a :href="anchor('#services')" class="nav-link">{{ t.nav.services }}</a>
        <a :href="anchor('#faq')" class="nav-link">{{ t.nav.faq }}</a>
        <a :href="anchor('#contact')" class="nav-link">{{ t.nav.contact }}</a>
        <a :href="blogPath" class="nav-link">{{ t.nav.blog }}</a>
      </nav>

      <div class="header-actions">
        <a
          :href="localePath(otherLocale(currentLocale))"
          class="lang-switch"
          :aria-label="`Switch to ${otherLocale(currentLocale).toUpperCase()}`"
        >
          {{ otherLocale(currentLocale).toUpperCase() }}
        </a>
        <a :href="anchor('#contact')" class="btn btn-primary btn-sm">{{ t.nav.contact }}</a>
      </div>
      
      <button
        class="mobile-menu-btn"
        :class="{ active: menuOpen }"
        aria-label="Menu"
        :aria-expanded="menuOpen ? 'true' : 'false'"
        aria-controls="mobile-menu"
        @click="toggleMenu"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </button>
    </div>

  </header>

  <Teleport to="body">
    <div
      id="mobile-menu"
      class="mobile-menu"
      :class="{ open: menuOpen }"
      :inert="!menuOpen"
      :aria-hidden="!menuOpen"
    >
      <nav class="mobile-nav" :aria-label="navLabel">
        <a :href="anchor('#about')" class="mobile-nav-link" @click="closeMenu">{{ t.nav.about }}</a>
        <a :href="anchor('#services')" class="mobile-nav-link" @click="closeMenu">{{ t.nav.services }}</a>
        <a :href="anchor('#faq')" class="mobile-nav-link" @click="closeMenu">{{ t.nav.faq }}</a>
        <a :href="anchor('#contact')" class="mobile-nav-link" @click="closeMenu">{{ t.nav.contact }}</a>
        <a :href="blogPath" class="mobile-nav-link" @click="closeMenu">{{ t.nav.blog }}</a>
      </nav>
      <div class="mobile-menu-actions">
        <a
          :href="localePath(otherLocale(currentLocale))"
          class="lang-switch"
          :aria-label="`Switch to ${otherLocale(currentLocale).toUpperCase()}`"
        >
          {{ otherLocale(currentLocale).toUpperCase() }}
        </a>
        <a :href="anchor('#contact')" class="btn btn-primary" @click="closeMenu">{{ t.nav.contact }}</a>
      </div>
    </div>
  </Teleport>
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
  align-items: center;
  justify-content: center;
  gap: 6px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  min-width: 44px;
  min-height: 44px;
}

.mobile-menu-btn span {
  width: 24px;
  height: 2px;
  background: var(--black);
  transition: all var(--transition-fast);
}

.mobile-menu-btn.active span:nth-child(1) {
  transform: translateY(8px) rotate(45deg);
}

.mobile-menu-btn.active span:nth-child(2) {
  opacity: 0;
}

.mobile-menu-btn.active span:nth-child(3) {
  transform: translateY(-8px) rotate(-45deg);
}

@media (max-width: 768px) {
  .nav,
  .header-actions {
    display: none;
  }

  .mobile-menu-btn {
    display: flex;
  }

}
</style>

<style>
.mobile-menu {
  display: none;
}

@media (max-width: 768px) {
  .mobile-menu {
    display: block;
    position: fixed;
    top: 80px;
    left: 0;
    right: 0;
    bottom: 0;
    background: #ffffff;
    padding: 2rem;
    transform: translateX(100%);
    transition: transform 0.3s ease;
    z-index: 999;
  }

  .mobile-menu.open {
    transform: translateX(0);
  }

  .mobile-nav {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .mobile-nav-link {
    font-family: var(--font-mono);
    font-size: 1rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--gray-600);
    padding: 1rem 0;
    border-bottom: 1px solid var(--gray-200);
    transition: color var(--transition-fast);
  }

  .mobile-nav-link:hover {
    color: var(--black);
  }

  .mobile-menu-actions {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    margin-top: 2rem;
  }
}
</style>
