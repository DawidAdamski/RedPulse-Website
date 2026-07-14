// Content collections for the bilingual (PL/EN) blog.
//
// PL and EN are two INDEPENDENT, non-paired collections: an English post is
// NOT required to have a Polish counterpart (or vice versa). Each language has
// its own folder under src/content/blog/ and its own set of entries. They share
// one identical schema (blogSchema) purely for consistency — there is no linkage
// between an entry in blogPl and an entry in blogEn.
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blogSchema = z.object({
  title: z.string(),
  description: z.string(),
  pubDate: z.coerce.date(),
  updatedDate: z.coerce.date().optional(),
  heroImage: z.string().optional(),
  tags: z.array(z.string()).default([]),
  draft: z.boolean().default(false),
  // Depth levels: 1–5 layered readings of the same topic. Each level has its
  // own per-post name + audience (who it's for) and its markdown body. The
  // first level is the required "surface"; a single level renders as a plain
  // article, two or more turn on the interactive depth reader.
  levels: z
    .array(
      z.object({
        name: z.string(),
        audience: z.string(),
        body: z.string(),
      })
    )
    .min(1)
    .max(5),
});

const blogPl = defineCollection({
  loader: glob({ base: './src/content/blog/pl', pattern: '**/*.md' }),
  schema: blogSchema,
});

const blogEn = defineCollection({
  loader: glob({ base: './src/content/blog/en', pattern: '**/*.md' }),
  schema: blogSchema,
});

// Site sections — one file per language (pl.json / en.json) in each folder, so
// each section is its own CMS entry (About, Services, FAQ), grouped by language.
const about = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/about' }),
  schema: z.object({
    title: z.string(),
    subtitle: z.string(),
    description: z.string(),
    stats: z.array(z.object({ value: z.string(), label: z.string() })).default([]),
    highlights: z.array(z.object({ icon: z.string(), title: z.string(), description: z.string() })).default([]),
  }),
});

const services = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/services' }),
  schema: z.object({
    title: z.string(),
    subtitle: z.string(),
    // `price` is an optional "od ..." / "wycena za rezultat" line shown on the card.
    items: z.array(z.object({ icon: z.string(), title: z.string(), price: z.string().optional(), description: z.string() })).default([]),
  }),
});

const faq = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/faq' }),
  schema: z.object({
    title: z.string(),
    subtitle: z.string(),
    items: z.array(z.object({ question: z.string(), answer: z.string() })).default([]),
  }),
});

// Contact block — moved out of i18n so it is CMS-editable. `phone` is optional:
// when empty it is hidden on the site, and it appears once filled in via /admin.
const contact = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/contact' }),
  schema: z.object({
    title: z.string(),
    subtitle: z.string(),
    description: z.string(),
    emailLabel: z.string(),
    email: z.string(),
    phoneLabel: z.string(),
    phone: z.string().optional().default(''),
    consultationLabel: z.string(),
    consultationCta: z.string(),
    socialLabel: z.string(),
    cta: z.string(),
  }),
});

export const collections = { blogPl, blogEn, about, services, faq, contact };
