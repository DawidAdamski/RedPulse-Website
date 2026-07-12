import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const posts = await getCollection('blogEn', ({ data }) => !data.draft);
  return rss({
    title: 'RedPulse Innovations — Blog',
    description: 'A practical take on automation, AI and open source for business.',
    site: context.site ?? 'https://redpulse.tech',
    items: posts
      .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf())
      .map((post) => ({
        title: post.data.title,
        description: post.data.description,
        pubDate: post.data.pubDate,
        link: `/en/blog/${post.id}/`,
      })),
    customData: `<language>en-us</language>`,
  });
}
