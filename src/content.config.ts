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
});

const blogPl = defineCollection({
  loader: glob({ base: './src/content/blog/pl', pattern: '**/*.md' }),
  schema: blogSchema,
});

const blogEn = defineCollection({
  loader: glob({ base: './src/content/blog/en', pattern: '**/*.md' }),
  schema: blogSchema,
});

export const collections = { blogPl, blogEn };
