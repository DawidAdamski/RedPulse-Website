<script setup lang="ts">
defineProps<{
  t: {
    nav: {
      services: string;
    };
    hero: {
      tagline: string;
      title: string;
      subtitle: string;
      description: string;
      cta: string;
    };
  };
}>();
</script>

<template>
  <section class="hero">
    <div class="hero-bg">
      <div class="hero-grid"></div>
      <div class="hero-gradient"></div>
    </div>
    
    <div class="container hero-container">
      <div class="hero-content">
        <div class="hero-badge animate-fade-in-up">
          <span class="pulse-dot"></span>
          {{ t.hero.tagline }}
        </div>
        
        <h1 class="hero-title animate-fade-in-up animate-delay-100">
          <span class="title-line">{{ t.hero.title.split(' ')[0] }}</span>
          <span class="title-line title-accent">{{ t.hero.title.split(' ').slice(1).join(' ') }}</span>
        </h1>
        
        <p class="hero-subtitle animate-fade-in-up animate-delay-200">
          {{ t.hero.subtitle }}
        </p>
        
        <p class="hero-description animate-fade-in-up animate-delay-300">
          {{ t.hero.description }}
        </p>
        
        <div class="hero-actions animate-fade-in-up animate-delay-400">
          <a href="#contact" class="btn btn-primary">
            {{ t.hero.cta }}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
          <a href="#services" class="btn btn-outline">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"/>
              <polygon points="10 8 16 12 10 16 10 8"/>
            </svg>
            {{ t.nav.services }}
          </a>
        </div>
      </div>
      
      <div class="hero-visual">
        <div class="visual-box">
          <div class="code-block">
            <div class="code-header">
              <span class="dot red"></span>
              <span class="dot yellow"></span>
              <span class="dot green"></span>
            </div>
            <pre class="code-content"><code><span class="keyword">const</span> <span class="variable">innovation</span> = {
  <span class="property">automation</span>: <span class="boolean">true</span>,
  <span class="property">ai</span>: <span class="string">"enabled"</span>,
  <span class="property">simplicity</span>: <span class="string">"always"</span>
};

<span class="comment">// Make it happen</span>
<span class="function">transform</span>(innovation);</code></pre>
          </div>
        </div>
      </div>
    </div>
    
    <div class="scroll-indicator">
      <span class="scroll-text">Scroll</span>
      <div class="scroll-line"></div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  min-height: 100vh;
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

.hero-grid {
  position: absolute;
  inset: 0;
  background-image: 
    linear-gradient(to right, var(--gray-200) 1px, transparent 1px),
    linear-gradient(to bottom, var(--gray-200) 1px, transparent 1px);
  background-size: 60px 60px;
  opacity: 0.5;
}

.hero-gradient {
  position: absolute;
  top: -50%;
  right: -20%;
  width: 80%;
  height: 150%;
  background: radial-gradient(ellipse at center, rgba(220, 38, 38, 0.08) 0%, transparent 70%);
}

.hero-container {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
}

.hero-content {
  max-width: 600px;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  font-family: var(--font-mono);
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: var(--red-500);
  margin-bottom: 1.5rem;
  opacity: 0;
}

.pulse-dot {
  width: 8px;
  height: 8px;
  background: var(--red-500);
  border-radius: 50%;
  animation: pulse 2s infinite;
}

.hero-title {
  margin-bottom: 1.5rem;
  opacity: 0;
}

.title-line {
  display: block;
}

.title-accent {
  color: var(--red-500);
}

.hero-subtitle {
  font-size: clamp(1.25rem, 3vw, 1.5rem);
  font-weight: 600;
  color: var(--black);
  margin-bottom: 1rem;
  opacity: 0;
}

.hero-description {
  font-size: 1.125rem;
  color: var(--gray-600);
  margin-bottom: 2.5rem;
  line-height: 1.8;
  opacity: 0;
}

.hero-actions {
  display: flex;
  gap: 1rem;
  opacity: 0;
}

.hero-visual {
  display: flex;
  justify-content: center;
  align-items: center;
}

.visual-box {
  position: relative;
  width: 100%;
  max-width: 500px;
}

.code-block {
  background: var(--gray-900);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 
    0 25px 50px -12px rgba(0, 0, 0, 0.25),
    0 0 0 1px rgba(255, 255, 255, 0.1);
  transform: perspective(1000px) rotateY(-5deg) rotateX(5deg);
  transition: transform var(--transition-slow);
}

.code-block:hover {
  transform: perspective(1000px) rotateY(0deg) rotateX(0deg);
}

.code-header {
  display: flex;
  gap: 8px;
  padding: 1rem 1.5rem;
  background: var(--gray-800);
  border-bottom: 1px solid var(--gray-700);
}

.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.dot.red { background: #ef4444; }
.dot.yellow { background: #eab308; }
.dot.green { background: #22c55e; }

.code-content {
  padding: 1.5rem;
  font-family: var(--font-mono);
  font-size: 0.875rem;
  line-height: 1.8;
  color: var(--gray-300);
  overflow-x: auto;
}

.code-content code {
  font-family: inherit;
}

.keyword { color: #c084fc; }
.variable { color: #60a5fa; }
.property { color: #34d399; }
.string { color: #fbbf24; }
.boolean { color: #f87171; }
.comment { color: var(--gray-500); }
.function { color: #60a5fa; }

.scroll-indicator {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.scroll-text {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: var(--gray-400);
}

.scroll-line {
  width: 1px;
  height: 40px;
  background: linear-gradient(to bottom, var(--gray-400), transparent);
  animation: scroll 2s infinite;
}

@keyframes scroll {
  0%, 100% {
    opacity: 0;
    transform: scaleY(0);
    transform-origin: top;
  }
  50% {
    opacity: 1;
    transform: scaleY(1);
  }
}

@media (max-width: 1024px) {
  .hero-container {
    grid-template-columns: 1fr;
    text-align: center;
  }
  
  .hero-content {
    max-width: 100%;
  }
  
  .hero-actions {
    justify-content: center;
  }
  
  .hero-visual {
    display: none;
  }
}

@media (max-width: 640px) {
  .hero-actions {
    flex-direction: column;
  }
  
  .btn {
    width: 100%;
  }
}
</style>
