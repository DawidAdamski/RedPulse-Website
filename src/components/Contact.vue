<script setup lang="ts">
defineProps<{
  t: {
    contact: {
      title: string;
      subtitle: string;
      description: string;
      email: string;
      emailAddress: string;
      consultation: string;
      consultationCta: string;
      social: string;
      cta: string;
    };
  };
}>();

const socialLinks = [
  {
    name: 'LinkedIn Personal',
    url: 'https://www.linkedin.com/in/dawid-adamski/',
    icon: 'linkedin'
  },
  {
    name: 'LinkedIn Company',
    url: 'https://www.linkedin.com/company/red-pulse-innovations/',
    icon: 'linkedin'
  },
  {
    name: 'GitHub',
    url: 'https://github.com/DawidAdamski',
    icon: 'github'
  }
];
</script>

<template>
  <section id="contact" class="contact section">
    <div class="contact-bg">
      <div class="contact-pattern"></div>
    </div>
    
    <div class="container">
      <div class="contact-content">
        <div class="contact-info">
          <h2 class="contact-title">{{ t.contact.title }}</h2>
          <p class="contact-subtitle">{{ t.contact.subtitle }}</p>
          <p class="contact-description">{{ t.contact.description }}</p>
          
          <div class="contact-methods">
            <div class="contact-method">
              <div class="method-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
              </div>
              <div class="method-content">
                <span class="method-label">{{ t.contact.email }}</span>
                <a :href="'mailto:' + t.contact.emailAddress" class="method-value">{{ t.contact.emailAddress }}</a>
              </div>
            </div>

            <div class="contact-method">
              <div class="method-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                  <line x1="16" y1="2" x2="16" y2="6"/>
                  <line x1="8" y1="2" x2="8" y2="6"/>
                  <line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
              </div>
              <div class="method-content">
                <span class="method-label">{{ t.contact.consultation }}</span>
                <a href="https://calendly.com/dawid-adamski-redpulse/30min" target="_blank" rel="noopener noreferrer" class="method-value">{{ t.contact.consultationCta }}</a>
              </div>
            </div>
          </div>
        </div>
        
        <div class="contact-card">
          <div class="card-header">
            <h3 class="card-title">{{ t.contact.social }}</h3>
          </div>
          
          <div class="social-links">
            <a 
              v-for="link in socialLinks" 
              :key="link.url"
              :href="link.url"
              target="_blank"
              rel="noopener noreferrer"
              class="social-link"
            >
              <div class="social-icon">
                <svg v-if="link.icon === 'linkedin'" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                <svg v-if="link.icon === 'github'" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </div>
              <div class="social-content">
                <span class="social-name">{{ link.name }}</span>
                <span class="social-url">{{ link.url.replace('https://', '').replace('www.', '') }}</span>
              </div>
              <div class="social-arrow">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M7 17L17 7M17 7H7M17 7V17"/>
                </svg>
              </div>
            </a>
          </div>
          
          <a :href="'mailto:' + t.contact.emailAddress" class="btn btn-primary btn-full">
            {{ t.contact.cta }}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.contact {
  position: relative;
  background: var(--black);
  color: var(--white);
  overflow: hidden;
}

.contact-bg {
  position: absolute;
  inset: 0;
  z-index: 0;
}

.contact-pattern {
  position: absolute;
  inset: 0;
  background-image: 
    radial-gradient(circle at 20% 50%, rgba(220, 38, 38, 0.15) 0%, transparent 50%),
    radial-gradient(circle at 80% 50%, rgba(220, 38, 38, 0.1) 0%, transparent 50%);
}

.contact-content {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
}

.section-label {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: var(--red-400);
  margin-bottom: 1rem;
  display: block;
}

.contact-title {
  color: var(--white);
  margin-bottom: 1rem;
}

.contact-subtitle {
  font-size: 1.25rem;
  color: var(--gray-300);
  margin-bottom: 1rem;
}

.contact-description {
  color: var(--gray-400);
  margin-bottom: 2.5rem;
  line-height: 1.8;
}

.contact-methods {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.contact-method {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
}

.method-icon {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--gray-800);
  color: var(--red-400);
  flex-shrink: 0;
}

.method-content {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.method-label {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--gray-500);
}

.method-value {
  font-size: 1rem;
  color: var(--white);
  transition: color var(--transition-fast);
}

.method-value:hover {
  color: var(--red-400);
}

.contact-card {
  background: var(--gray-900);
  border: 1px solid var(--gray-800);
  padding: 2.5rem;
}

.card-header {
  margin-bottom: 2rem;
}

.card-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--white);
}

.social-links {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
}

.social-link {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: var(--gray-800);
  border: 1px solid var(--gray-700);
  transition: all var(--transition-base);
}

.social-link:hover {
  background: var(--gray-700);
  border-color: var(--red-500);
  transform: translateX(4px);
}

.social-icon {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--gray-700);
  color: var(--gray-400);
  transition: all var(--transition-base);
}

.social-link:hover .social-icon {
  background: var(--red-500);
  color: var(--white);
}

.social-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.social-name {
  font-weight: 600;
  color: var(--white);
  font-size: 0.9375rem;
}

.social-url {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--gray-500);
}

.social-arrow {
  color: var(--gray-500);
  transition: all var(--transition-base);
}

.social-link:hover .social-arrow {
  color: var(--red-400);
  transform: translate(2px, -2px);
}

.btn-full {
  width: 100%;
  justify-content: center;
}

@media (max-width: 1024px) {
  .contact-content {
    grid-template-columns: 1fr;
  }
}
</style>
