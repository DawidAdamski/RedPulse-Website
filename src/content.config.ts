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
  // Depth levels: layered content, from decision-maker to engineer.
  surface: z.string(),            // required — the "what & why" layer
  dive: z.string().optional(),    // "how it works" layer
  depth: z.string().optional(),   // "configs & code" layer
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
    items: z.array(z.object({ icon: z.string(), title: z.string(), description: z.string() })).default([]),
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

export const collections = { blogPl, blogEn, about, services, faq };
