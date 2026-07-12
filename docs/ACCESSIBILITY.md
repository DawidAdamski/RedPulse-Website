# Accessibility notes

This site aims to meet **WCAG 2.1 AA** in spirit. This note records what is in place and how to keep it that way when editing the site or adding blog posts.

## What's implemented

**Structure & navigation**
- **Skip link** — a "Skip to content" / "Przejdź do treści" link is the first focusable element on every page (`Layout.astro`), targeting `#main-content` on each page's `<main>`.
- **Landmarks** — each page has a single `<main id="main-content">`; `<nav>` elements carry distinguishing `aria-label`s (main navigation vs. footer) since there is more than one.
- **Headings** — one `<h2>` per section, `<h3>` for sub-items; levels are not skipped. In blog posts the `#`/H1 is the post title, so body headings start at `##`.

**Keyboard & focus**
- **Visible focus** — `:focus-visible { outline: 2px solid var(--red-500) }` in `global.css`.
- **Mobile menu** (`Header.vue`) — the hamburger is a real `<button>` with `aria-expanded` / `aria-controls`; when the menu is closed it is `inert` + `aria-hidden`, so its off-screen links are not keyboard-reachable.
- **FAQ accordion** (`FAQ.vue`) — real `<button>` toggles with `aria-expanded` and `aria-controls`; answer panels are `role="region"` with accessible names. Enter/Space work natively.

**Motion**
- `@media (prefers-reduced-motion: reduce)` in `global.css` neutralises animations/transitions and forces faded-in content to its visible final state (so nothing is stuck invisible).

**Perceivable content**
- Decorative inline SVGs (icons, arrows, hamburger, social glyphs) are `aria-hidden="true" focusable="false"`; icon links keep a text `aria-label`.
- Brand palette (red `#dc2626`, black, white) meets AA contrast for body text; keep it that way (see below).
- Tap targets on mobile are ≥44px.

**Language**
- Each page sets the correct `lang` (`pl` / `en`) and `hreflang` alternates so screen readers announce the right language.

## Keep it accessible when editing

- **Blog images** — always write real alt text: `![what the image shows](/media/file.jpg)`. Empty alt only for purely decorative images.
- **New interactive controls** — if it does something on click, make it a `<button>`/`<a>`, give it an accessible name, and make sure it works with the keyboard (Tab to it, Enter/Space to activate).
- **New icons** — decorative ⇒ `aria-hidden="true"`; meaningful ⇒ give the control a text label.
- **Headings** — don't skip levels; don't use a heading purely for size.
- **Colour** — don't put light-grey text on white for anything that must be read; keep text on the established red/black/white combinations.
- **Motion** — new animations should still respect the existing `prefers-reduced-motion` block (avoid inline styles that force motion).

## Not yet done / worth doing later

- No formal screen-reader pass (VoiceOver/NVDA) or automated audit (axe/Lighthouse) has been run — recommended before a major launch.
- The Calendly and cookie-consent widgets are third-party; their internal accessibility is not controlled here.

Accessibility problems? Email **kontakt@redpulse.tech**.
