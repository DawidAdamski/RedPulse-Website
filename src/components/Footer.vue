<script setup lang="ts">
const props = defineProps<{
  t: {
    footer: {
      tagline: string;
      copyright: string;
      privacyPolicy: string;
      privacyPolicyUrl: string;
      cookieSettings: string;
      lastUpdated: string;
    };
    nav: {
      about: string;
      services: string;
      faq: string;
      contact: string;
      blog: string;
    };
  };
  lastUpdated?: string;
  locale?: string;
  basePath?: string;
}>();

const currentYear = new Date().getFullYear();

const formattedLastUpdated = props.lastUpdated
  ? new Date(props.lastUpdated).toLocaleDateString(
      props.locale === 'en' ? 'en-GB' : 'pl-PL',
      { year: 'numeric', month: 'long', day: 'numeric' }
    )
  : '';

const base = props.basePath ?? '';
const anchor = (hash: string) => `${base}${hash}`;
const logoHref = base || '#';
</script>

<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-content">
        <div class="footer-brand">
          <a :href="logoHref" class="footer-logo">
            <span class="logo-red">Red</span><span class="logo-pulse">Pulse</span>
          </a>
          <p class="footer-tagline">{{ t.footer.tagline }}</p>
          <address class="footer-company">
            <span>RedPulse Innovations Dawid Adamski</span>
            <span>al. Ratuszowa 14 lok. 2</span>
            <span>88-100 Inowrocław</span>
            <span>NIP: 5562805527 · REGON: 526676500</span>
            <a href="mailto:kontakt@redpulse.tech">kontakt@redpulse.tech</a>
          </address>
        </div>
        
        <nav class="footer-nav">
          <a :href="anchor('#about')">{{ t.nav.about }}</a>
          <a :href="anchor('#services')">{{ t.nav.services }}</a>
          <a :href="anchor('#faq')">{{ t.nav.faq }}</a>
          <a :href="anchor('#contact')">{{ t.nav.contact }}</a>
          <a :href="t.footer.privacyPolicyUrl">{{ t.footer.privacyPolicy }}</a>
          <a href="#" data-cc-open-preferences>{{ t.footer.cookieSettings }}</a>
        </nav>
        
        <div class="footer-social">
          <a 
            href="https://www.linkedin.com/company/red-pulse-innovations/" 
            target="_blank" 
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            class="social-icon"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>
          <a 
            href="https://github.com/DawidAdamski" 
            target="_blank" 
            rel="noopener noreferrer"
            aria-label="GitHub"
            class="social-icon"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
          </a>
        </div>
      </div>
      
      <div class="footer-bottom">
        <p class="copyright">© {{ currentYear }} {{ t.footer.copyright }}</p>
        <p v-if="formattedLastUpdated" class="last-updated">
          {{ t.footer.lastUpdated }}: <time :datetime="props.lastUpdated">{{ formattedLastUpdated }}</time>
        </p>
        <p class="made-with">
          Made with
          <span class="heart">♥</span>
          in Poland
        </p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background: var(--black);
  color: var(--white);
  padding: 3rem 0 1.5rem;
  border-top: 1px solid var(--gray-800);
}

.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 2rem;
  border-bottom: 1px solid var(--gray-800);
}

.footer-brand {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.footer-logo {
  font-family: var(--font-display);
  font-size: 1.25rem;
  font-weight: 800;
  letter-spacing: -0.02em;
}

.logo-red {
  color: var(--red-500);
}

.logo-pulse {
  color: var(--white);
}

.footer-tagline {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--gray-500);
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.footer-company {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
  margin-top: 0.75rem;
  font-style: normal;
  font-size: 0.75rem;
  color: var(--gray-500);
  line-height: 1.4;
}

.footer-company a {
  color: var(--gray-400);
  transition: color var(--transition-fast);
}

.footer-company a:hover {
  color: var(--white);
}

.footer-nav {
  display: flex;
  gap: 2rem;
}

.footer-nav a {
  font-family: var(--font-mono);
  font-size: 0.875rem;
  color: var(--gray-400);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  transition: color var(--transition-fast);
}

.footer-nav a:hover {
  color: var(--white);
}

.footer-social {
  display: flex;
  gap: 1rem;
}

.social-icon {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--gray-800);
  color: var(--gray-400);
  transition: all var(--transition-fast);
}

.social-icon:hover {
  background: var(--red-500);
  color: var(--white);
}

.footer-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1.5rem;
}

.copyright {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--gray-500);
}

.last-updated {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  color: var(--gray-600);
}

.made-with {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--gray-500);
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.heart {
  color: var(--red-500);
  animation: pulse 1.5s infinite;
}

@media (max-width: 768px) {
  .footer-content {
    flex-direction: column;
    gap: 2rem;
    text-align: center;
  }
  
  .footer-nav {
    flex-wrap: wrap;
    justify-content: center;
    gap: 1rem;
  }
  
  .footer-bottom {
    flex-direction: column;
    gap: 0.5rem;
    text-align: center;
  }
}
</style>
