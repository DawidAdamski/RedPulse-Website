import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const posts = await getCollection('blogPl', ({ data }) => !data.draft);
  return rss({
    title: 'RedPulse Innovations — Blog',
    description: 'Praktyczne spojrzenie na automatyzację, AI i open source dla firm.',
    site: context.site ?? 'https://redpulse.tech',
    items: posts
      .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf())
      .map((post) => ({
        title: post.data.title,
        description: post.data.description,
        pubDate: post.data.pubDate,
        link: `/blog/${post.id}/`,
      })),
    customData: `<language>pl-pl</language>`,
  });
}
