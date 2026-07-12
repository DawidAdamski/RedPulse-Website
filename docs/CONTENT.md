# Content guide

This is a friendly, step-by-step guide to writing blog posts for the RedPulse
website. You do **not** need to be a programmer to use it. A blog post is just a
plain text file with a short "info block" at the top and your writing below it.

If you get stuck, skim the [Quick cheat-sheet](#quick-cheat-sheet) near the
bottom — it fits the most common things you'll do onto one screen.

---

## The big picture in 30 seconds

1. A post is one text file ending in `.md` (a "Markdown" file).
2. Polish posts go in `src/content/blog/pl/`, English posts in
   `src/content/blog/en/`.
3. The **file name becomes the web address** (URL). `moj-wpis.md` becomes
   `https://redpulse.tech/blog/moj-wpis`.
4. Each file has two parts: a **frontmatter** block (the info block at the top,
   between two `---` lines) and the **body** (your actual article, written in
   Markdown).
5. Pictures go in the `public/media/` folder and are written in posts as
   `/media/your-file.jpg`.
6. When you're happy, you commit the file to git and push to `main`; the post
   goes live after the server container is restarted (see
   [Publishing](#c-publishing)).

You can write posts two ways: with the built-in visual editor (the **CMS**, easiest
if you don't like typing symbols) or **by hand** in a text editor. Both create the
exact same file — pick whichever you prefer.

---

## Where posts live & languages

The blog is bilingual, but the two languages are **completely independent**:

- Polish posts: `src/content/blog/pl/`
- English posts: `src/content/blog/en/`

There is **no forced translation**. You can publish a Polish-only post, an
English-only post, or both — nothing links a PL post to an EN post. If you want the
"same" article in both languages, you simply create two files (one in each folder)
and write each one.

**The file name = the URL slug.** Choose the file name carefully and use
`lowercase-words-separated-by-dashes` (this is called *kebab-case*). Examples:

| File you create                                | Web address it becomes                  |
| ---------------------------------------------- | --------------------------------------- |
| `src/content/blog/pl/moj-wpis.md`              | `https://redpulse.tech/blog/moj-wpis`   |
| `src/content/blog/en/hello-world.md`           | `https://redpulse.tech/en/blog/hello-world` |

Tips for file names:
- Use only lowercase letters `a-z`, numbers, and dashes `-`.
- No spaces, no Polish accented characters (ą, ć, ż…), no uppercase — these can
  break the link or look ugly in the address bar.
- Keep it short but descriptive: `automatyzacja-fakturowania.md` is great.

Images live in `public/media/` and are referenced in content as `/media/...`.
More on that in [Images](#images-in-depth).

---

## The frontmatter (the info block at the top)

Every post starts with a **frontmatter** block: a few lines of settings wrapped
between two lines that each contain only three dashes `---`. It must be the very
first thing in the file, with nothing above it.

### Every field explained

These are all the fields the site understands (defined in
`src/content.config.ts`):

| Field         | Required? | What it is                                                                                     |
| ------------- | --------- | ---------------------------------------------------------------------------------------------- |
| `title`       | **Yes**   | The headline of the post. Shown as the big title and in the browser tab.                       |
| `description` | **Yes**   | One or two sentences. Shown on the blog listing card **and** used as the SEO/meta description (what Google shows under the link). Write it for a human. |
| `pubDate`     | **Yes**   | Publish date in `YYYY-MM-DD` format, e.g. `2026-07-12`. Shown as "Published".                  |
| `updatedDate` | No        | Date you last revised it, same `YYYY-MM-DD` format. If present, shown as "Updated". Omit it for brand-new posts. |
| `heroImage`   | No        | Path to a big image shown at the top of the post, e.g. `/media/my-photo.jpg`. Leave it out for no hero image. |
| `tags`        | No        | A list of short topic labels shown as little chips, e.g. `automatyzacja`, `AI`. If you omit it, the post simply has no tags. |
| `draft`       | No        | `true` or `false`. `true` **hides the post from the live website** (great while you're still writing). `false` (or leaving it out) publishes it. Note: drafts **still appear** when you preview locally, so you can see your work in progress. |

### Copy-paste frontmatter template

Copy this to the very top of a new post and fill it in. The `#` lines are
comments — you can delete them, they're just notes for you.

```markdown
---
title: Your headline goes here            # required
description: One or two sentences that sell the post and become the Google snippet.  # required
pubDate: 2026-07-12                        # required — format YYYY-MM-DD
updatedDate: 2026-07-15                    # optional — delete this line if not revised yet
heroImage: /media/my-hero.jpg             # optional — delete this line if no top image
tags:                                      # optional — delete these lines if no tags
  - automatyzacja
  - AI
draft: true                                # true = hidden while you write; false = live
---

Your article starts here...
```

### Things that trip people up in frontmatter

- The three-dash lines `---` are required both **above** and **below** the info
  block. Don't remove them.
- Dates have **no quotes** and use dashes: `2026-07-12` (year-month-day).
- If a title or description contains a colon `:`, wrap the whole value in quotes,
  e.g. `title: "AI: co warto wiedzieć"`. Otherwise the file can fail to load.
- Indentation matters for lists like `tags`. Each tag is on its own line, starting
  with two spaces, then a dash, then a space: `  - AI`. (An inline form
  `tags: ["AI", "automatyzacja"]` also works — the existing sample post uses it.)

---

## Writing the body (Markdown cheat-sheet)

Below the closing `---`, you write your article in **Markdown**. Markdown is a
simple way to add formatting using ordinary punctuation. You type plain text plus a
few symbols; the site turns it into nicely styled HTML. Here's everything the blog
supports, with what it looks like once published.

> Heads-up about headings: the big `#` (H1) heading is reserved for the post
> **title**, which comes from `title:` in the frontmatter. So **don't** start body
> headings with a single `#`. Start your section headings at `##`.

### Headings

```markdown
## A big section heading
### A smaller sub-heading
```

`##` becomes a large section heading; `###` a smaller one. Use them to break a long
post into scannable sections. (`####` also works but is rarely needed.)

### Bold and italic

```markdown
This is **bold** and this is *italic*.
```

`**text**` renders as **bold**, `*text*` renders as *italic*. Use them for
emphasis, sparingly.

### Bullet lists and numbered lists

```markdown
- First point
- Second point
  - An indented sub-point (two spaces before the dash)

1. Step one
2. Step two
3. Step three
```

A dash `-` starts a bullet; `1.` `2.` `3.` starts a numbered list. On the site
these get comfortable spacing between items.

### Links

```markdown
Read our [homepage](https://redpulse.tech) for more.
```

The words in `[square brackets]` become the clickable link text; the address in
`(parentheses)` is where it goes. Links appear in red and underlined. You can link
to other pages of the site with a path like `[the blog](/blog)`.

### Blockquotes

```markdown
> This is a quote or a callout. It gets a red bar on the left and italic text.
```

Start a line with `>` to make a blockquote. Good for pulling out a key sentence or
quoting someone.

### Inline code and code blocks

For a short snippet inside a sentence, wrap it in single backticks:

```markdown
Run `bun run dev` to start the site.
```

`bun run dev` renders in a monospace font with a light grey background.

For a whole block of code or commands, use three backticks on their own line before
and after (optionally name the language after the first three):

````markdown
```sh
git add .
git commit -m "new post"
```
````

This renders as a grey, bordered box that scrolls sideways if a line is long.

### Tables

```markdown
| Column A | Column B |
| -------- | -------- |
| Row 1    | Value    |
| Row 2    | Value    |
```

The line of dashes under the header row is required — it separates the header from
the body of the table.

### Horizontal rule (divider)

```markdown
---
```

Three dashes **on their own line inside the body** draw a thin horizontal divider
line. (Don't confuse this with the frontmatter dashes at the very top of the file.)

---

## Images (in depth)

This is the part most people ask about, so here's the full story.

### Where the image files go

All pictures live in the folder `public/media/`. If that folder doesn't exist yet,
just create it (it's a normal folder). Drop your image files straight in there,
e.g. `public/media/zespol.jpg`.

**Important quirk:** even though the file physically sits in `public/media/`, you
refer to it in posts **without** the word `public` — you write `/media/zespol.jpg`.
(This is because of the site's configuration, `public_folder: /media`.) So:

- File on disk: `public/media/zespol.jpg`
- What you type in the post: `/media/zespol.jpg`

### The hero image (big image at the top of the post)

Set it in the frontmatter:

```markdown
heroImage: /media/zespol.jpg
```

It renders full-width at the top of the post, right under the title and date. Leave
the line out entirely if you don't want one.

### Inline images (pictures inside the article body)

Anywhere in the body, use this pattern:

```markdown
![Zespół RedPulse przy pracy](/media/zespol.jpg)
```

Breaking that down:
- The `!` at the start means "this is an image" (not a link).
- The text in `[square brackets]` is the **alt text** — a short description of the
  picture. **Always write it.** Screen readers read it aloud to blind visitors, and
  search engines use it to understand the image. Describe what's in the photo, e.g.
  `![Wykres oszczędności czasu po automatyzacji](/media/wykres.png)`.
- The path in `(parentheses)` is `/media/your-file`.

Inline images automatically shrink to fit the page width, so you don't need to
worry about them overflowing.

### The easy way: upload through the CMS

If you use the built-in editor (Sveltia CMS, see below), you don't have to think
about any of the paths. When you click the image field or the "insert image" button
in the body editor and pick a file from your computer, the CMS:
1. copies the file into `public/media/` for you, and
2. inserts the correct `/media/...` path automatically.

This is the recommended path if typing file paths feels fiddly.

### Practical image tips

- **Format:** prefer `.webp` (smallest, modern) or a well-compressed `.jpg` for
  photos. Use `.png` for graphics, logos, or anything needing transparency.
- **Size:** a hero image around **1600px wide is plenty** — bigger just slows the
  page down. Inline images can be smaller.
- **Compress before adding.** A phone photo can be 5–10 MB; that's far too heavy
  for the web. Run it through a free tool (e.g. Squoosh, TinyPNG) to get it down to
  a few hundred KB.
- **Always write alt text** (see above) — it's good for accessibility and SEO.
- **Name files** in `lowercase-with-dashes`, no spaces or accents:
  `wdrozenie-ai-2026.jpg`, not `Wdrożenie AI (final).JPG`.

> This guide references example images like `/media/zespol.jpg` for illustration.
> No such files ship with the project — add your own real images to `public/media/`
> before using those paths, or the picture will simply appear broken.

---

## How you write posts: two options

You can create the same Markdown file either way.

### a) Local editing with the CMS

Sveltia CMS runs locally with no server, OAuth, or proxy — it uses the browser's
File System Access API (Chrome or Edge only).

1. Start the dev server:
   ```sh
   bun run dev
   ```
2. Open http://localhost:4321/admin/
3. Click **"Work with Local Repository"** and grant access to the project folder
   when the browser prompts.
4. Create or edit posts in the **Blog (PL)** and **Blog (EN)** collections. Saving
   writes the Markdown file directly into your working tree.
5. Review the changes and commit them with git:
   ```sh
   git add src/content public/media
   git commit -m "content: new post"
   git push
   ```

The CMS only saves to disk — it does not commit for you.

### b) Writing a post by hand

Create a `.md` file in the correct language folder. Filename becomes part of the
URL slug, so use kebab-case, e.g. `src/content/blog/pl/moj-pierwszy-post.md`.

Frontmatter fields:

| Field         | Type            | Required | Notes                                  |
| ------------- | --------------- | -------- | -------------------------------------- |
| `title`       | string          | yes      | Post title                             |
| `description` | string          | yes      | Short summary / meta description       |
| `pubDate`     | date            | yes      | `YYYY-MM-DD`                           |
| `updatedDate` | date            | no       | `YYYY-MM-DD`                           |
| `heroImage`   | string (path)   | no       | e.g. `/media/hero.jpg`                 |
| `tags`        | list of strings | no       | e.g. `[astro, seo]`                    |
| `draft`       | boolean         | no       | `true` hides the post; defaults `false`|

Example (`src/content/blog/pl/moj-pierwszy-post.md`):

```markdown
---
title: Mój pierwszy post
description: Krótkie wprowadzenie do bloga RedPulse.
pubDate: 2026-07-12
updatedDate: 2026-07-13
heroImage: /media/pierwszy-post.jpg
tags:
  - astro
  - blog
draft: false
---

Treść posta w Markdown. Obrazy wstawiaj jako `/media/...`:

![Opis](/media/pierwszy-post.jpg)
```

Set `draft: true` to keep a post out of the published site while you work on it.

---

## c) Draft to publish workflow

Writing and publishing are two separate steps. Nothing goes live by accident.

1. **While writing**, keep `draft: true` in the frontmatter. The post is hidden
   from the live site but **still visible when you preview locally** with
   `bun run dev` (http://localhost:4321/blog), so you can see exactly how it looks.
2. **When ready to publish**, change it to `draft: false` (or delete the `draft`
   line entirely — the default is "published").
3. **Commit and push** your content to `main`:
   ```sh
   git add src/content public/media
   git commit -m "content: new post"
   git push
   ```
4. Pushing to `main` triggers the GitHub Actions workflow, which builds the Docker
   image (nginx serving the Astro `dist/`) and publishes it.
5. The post goes live only after the owner **restarts the container on the mikr.us
   VPS** to pull the newly built image. A push alone does not update the live site.
   The exact restart steps are in [`docs/DEPLOY.md`](./DEPLOY.md).

---

## A complete worked example

Here's an entire, realistic post you can copy into a new file (for example
`src/content/blog/pl/automatyzacja-fakturowania.md`) and adapt. It uses a hero
image, a section heading, a bullet list, a link, and one inline image.

```markdown
---
title: Jak zautomatyzowaliśmy fakturowanie w małej firmie
description: Praktyczny przykład, jak prosta automatyzacja oszczędziła zespołowi kilka godzin miesięcznie.
pubDate: 2026-07-12
heroImage: /media/automatyzacja-hero.jpg
tags:
  - automatyzacja
  - case study
draft: false
---

Powtarzalne fakturowanie to klasyczny kandydat do automatyzacji. W tym wpisie
pokazujemy, jak **w jeden dzień** usprawniliśmy ten proces u naszego klienta.

## Problem

Zespół co miesiąc ręcznie kopiował dane między arkuszem a systemem księgowym.
Zajmowało to sporo czasu i łatwo było o pomyłkę. Najczęstsze bolączki to:

- ręczne przepisywanie tych samych danych,
- literówki w kwotach i numerach faktur,
- brak jednego źródła prawdy.

## Rozwiązanie

Zbudowaliśmy prosty przepływ, który pobiera dane raz i rozsyła je automatycznie.
Więcej o naszym podejściu przeczytasz na [stronie głównej](https://redpulse.tech).

![Schemat automatycznego przepływu faktur](/media/automatyzacja-schemat.png)

Efekt? Kilka godzin odzyskanych każdego miesiąca i zero literówek. Prostota wygrywa.
```

That's a complete, publishable post. Change the file name, the frontmatter, and the
words, add your own images to `public/media/`, and you're done.

---

## Quick cheat-sheet

| I want to…                     | I type…                                             |
| ------------------------------ | --------------------------------------------------- |
| New Polish post                | Create `src/content/blog/pl/my-slug.md`             |
| New English post               | Create `src/content/blog/en/my-slug.md`             |
| A section heading              | `## Heading`                                         |
| A sub-heading                  | `### Sub-heading`                                    |
| Bold                           | `**bold**`                                           |
| Italic                         | `*italic*`                                           |
| Bullet list                    | `- item` (one per line)                             |
| Numbered list                  | `1. item` (one per line)                            |
| A link                         | `[text](https://example.com)`                       |
| A quote / callout              | `> quoted text`                                     |
| Inline code                    | `` `code` ``                                        |
| Hero image (top of post)       | `heroImage: /media/photo.jpg` (in frontmatter)      |
| Inline image                   | `![alt text](/media/photo.jpg)`                     |
| Hide while writing             | `draft: true` (in frontmatter)                      |
| Publish                        | `draft: false`, then commit + push, then restart container |

---

## d) Hosted editing (future)

Editing through the live site at https://redpulse.tech/admin/ is not enabled yet.
Sveltia's `github` backend needs a GitHub OAuth relay to authenticate in the
browser — the recommended one is the
[sveltia-cms-auth](https://github.com/sveltia/sveltia-cms-auth) Cloudflare Worker.
Once that relay is deployed and its URL configured, `/admin/` on the live site will
allow editing directly on GitHub. No change to `public/admin/config.yml` is needed
for that — the `github` backend is already set.

Until then, edit locally as described in section (a).
