<script setup lang="ts">
import { CALENDLY_URL } from '../config';

defineProps<{
  t: {
    hero: {
      eyebrow: string;
      title: string;
      titleAccent: string;
      description: string;
      cta: string;
      ctaSecondary: string;
      ctaNote: string;
      portraitAlt: string;
      portraitName: string;
      portraitRole: string;
    };
  };
}>();
</script>

<template>
  <!-- The promise carries the hero, with a face next to it (docs/REDESIGN.md,
       A1) — we sell "one person who takes responsibility", so that person is
       visible. The portrait is deliberately small: the current file is a
       400x400 avatar, so anything larger goes soft on high-DPI screens. -->
  <section class="hero">
    <div class="hero-bg">
      <div class="hero-gradient"></div>
    </div>

    <div class="container hero-container">
      <div class="hero-content">
        <p class="hero-eyebrow animate-fade-in-up">{{ t.hero.eyebrow }}</p>

        <!-- H1 is the promise. The company name lives in the logo only. -->
        <h1 class="hero-title animate-fade-in-up animate-delay-100">
          <span class="title-line">{{ t.hero.title }}</span>
          <span class="title-line title-accent">{{ t.hero.titleAccent }}</span>
        </h1>

        <p class="hero-description animate-fade-in-up animate-delay-200">
          {{ t.hero.description }}
        </p>

        <div class="hero-actions animate-fade-in-up animate-delay-300">
          <a :href="CALENDLY_URL" target="_blank" rel="noopener noreferrer" class="btn btn-primary">
            {{ t.hero.cta }}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true" focusable="false">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
          <a href="#services" class="btn btn-outline">
            {{ t.hero.ctaSecondary }}
          </a>
        </div>

        <!-- The call is paid, so the price is stated at the button rather than
             discovered after clicking. -->
        <p class="hero-cta-note animate-fade-in-up animate-delay-400">
          {{ t.hero.ctaNote }}
        </p>
      </div>

      <figure class="hero-portrait animate-fade-in-up animate-delay-200">
        <img
          src="/dawid-adamski.jpg"
          :alt="t.hero.portraitAlt"
          width="400"
          height="400"
          loading="eager"
          decoding="async"
        />
        <figcaption>
          <span class="portrait-name">{{ t.hero.portraitName }}</span>
          <span class="portrait-role">{{ t.hero.portraitRole }}</span>
        </figcaption>
      </figure>
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  min-height: 78vh;
  display: flex;
  align-items: center;
  padding-top: 80px;
  overflow: hidden;
}

.hero-bg {
  position: absolute;
  inset: 0;
  z-index: 0;
}

.hero-gradient {
  position: absolute;
  top: -50%;
  right: -20%;
  width: 80%;
  height: 150%;
  background: radial-gradient(ellipse at center, rgba(193, 39, 45, 0.05) 0%, transparent 70%);
}

.hero-container {
  position: relative;
  z-index: 1;
  display: grid;
  /* Text column takes the room; the portrait column is only as wide as the
     photo can be shown sharply. */
  grid-template-columns: minmax(0, 1fr) auto;
  gap: clamp(2rem, 6vw, 4.5rem);
  align-items: center;
  padding-top: clamp(3rem, 8vw, 5rem);
  padding-bottom: clamp(3rem, 8vw, 5rem);
}

.hero-content {
  position: relative;
  z-index: 2;
  max-width: 720px;
  min-width: 0;
}

.hero-portrait {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 240px;
  opacity: 0;
}

.hero-portrait img {
  display: block;
  width: 240px;
  height: 240px;
  object-fit: cover;
  /* Thin red edge instead of a decorative frame — the accent colour earns its
     place by outlining the person, not by drawing a gadget. */
  border-bottom: 3px solid var(--red-500);
}

.hero-portrait figcaption {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.portrait-name {
  font-weight: 700;
  font-size: 1rem;
  color: var(--black);
}

.portrait-role {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  letter-spacing: 0.05em;
  color: var(--gray-600);
}

.hero-eyebrow {
  font-family: var(--font-mono);
  font-size: 0.8125rem;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: var(--gray-600);
  margin-bottom: 1.5rem;
  opacity: 0;
}

.hero-title {
  font-size: clamp(2.25rem, 5.5vw, 3.75rem);
  letter-spacing: -0.03em;
  margin-bottom: 1.75rem;
  opacity: 0;
}

.title-line {
  display: block;
}

.title-accent {
  color: var(--red-500);
}

.hero-description {
  font-size: 1.125rem;
  color: var(--gray-600);
  margin-bottom: 2.5rem;
  line-height: 1.8;
  max-width: 660px;
  opacity: 0;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  opacity: 0;
}

.hero-cta-note {
  margin-top: 1rem;
  max-width: 520px;
  font-size: 0.875rem;
  line-height: 1.6;
  color: var(--gray-600);
  opacity: 0;
}

@media (max-width: 860px) {
  .hero-container {
    grid-template-columns: minmax(0, 1fr);
  }

  /* On narrow screens the face comes first — it is the introduction. */
  .hero-portrait {
    order: -1;
    width: 160px;
  }

  .hero-portrait img {
    width: 160px;
    height: 160px;
  }
}

@media (max-width: 640px) {
  .hero {
    min-height: auto;
  }

  .hero-title {
    font-size: clamp(1.875rem, 8vw, 2.5rem);
    overflow-wrap: break-word;
  }

  .hero-actions {
    flex-direction: column;
  }

  .btn {
    width: 100%;
  }
}
</style>
