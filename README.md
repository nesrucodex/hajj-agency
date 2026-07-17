# Gora Belu Travel — Hajj & Umrah

An elegant, bilingual (Amharic + English) marketing site for **Gora Belu Travel Agent**,
built with Next.js 16, Tailwind v4 and Motion.

- **Amharic is the default language**; visitors can switch to English with the
  toggle in the header. The choice is remembered (localStorage).
- The whole site is **content-driven from JSON** — change the copy, prices,
  packages, phone numbers, etc. without touching any component.
- Design: "Sacred Luxury" — deep emerald, warm gold, ivory; Ethiopic serif for
  Amharic, Cormorant Garamond for English, Amiri for Arabic verses.

## Run

```bash
pnpm install
pnpm dev        # http://localhost:3000
pnpm build      # production build
pnpm start      # serve the production build
```

## ✏️ Editing the content (the important part)

All text lives in two files, one per language:

| File | Language |
|------|----------|
| `src/content/am.json` | Amharic 🇪🇹 (default) |
| `src/content/en.json` | English |

**Both files share the exact same structure** — edit the value, keep the key.
Whatever you put in these files appears on the site immediately. Current values
are sensible defaults pulled from your flyer; replace them with final copy/prices
whenever you like.

Key sections inside each JSON:

- `brand` — name, phone(s), email, address, social links, established year
- `hero` — headline, subtitle, buttons, the Qur'anic verse, and the hero media
- `stats` — the four numbers under the hero
- `about`, `journey`, `why`, `faq` — body sections
- `packages` — the Hajj / Umrah cards. Each item's `category` must be `"hajj"`
  or `"umrah"` to match the `tabs`. Set `"featured": true` to highlight a card.
- `gallery` — the photo/video grid (see media below)
- `testimonials`, `cta`, `contact`, `footer`

> Tip: keep the two files in sync — if you add an item to one language, add the
> matching item to the other so nothing falls back.

## 🖼️ Photos & videos (hosted on Cloudinary)

The images and videos are **not committed to the repo** — they're served from
**Cloudinary** and resolved by [`src/lib/media.ts`](src/lib/media.ts). The JSON
still uses simple paths like `"/assets/image/26.jpg"` or `"/assets/video/hero.mp4"`;
`mediaUrl()` turns each into its Cloudinary delivery URL:

```
/assets/image/1.jpg   →  https://res.cloudinary.com/<cloud>/image/upload/<folder>/assets/image/1.jpg
/assets/video/hero.mp4 →  https://res.cloudinary.com/<cloud>/video/upload/<folder>/assets/video/hero.mp4
```

Cloud name + folder default to `dlmkdgi9v` / `hajj` in `media.ts` (both are
public — they appear in every URL). Override with `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`
/ `NEXT_PUBLIC_CLOUDINARY_FOLDER`. Set `NEXT_PUBLIC_MEDIA_LOCAL=true` to serve
from `/public` during local dev instead.

**The local files live in `public/assets/` (git-ignored) and are the source of
truth for the upload.** To (re)upload everything to Cloudinary:

```bash
# .env.local holds the Cloudinary API key/secret (git-ignored, never committed)
pnpm run upload:media
```

The uploader ([`scripts/upload-to-cloudinary.mjs`](scripts/upload-to-cloudinary.mjs))
keeps each file's path as its `public_id`, so a newly added `42.jpg` or `30.mp4`
just needs a re-run — no URL changes. Add the media to `public/assets/…`, run the
upload, then reference the path in the JSON as before.

Swap any media by editing the `src` / `poster` value in `am.json` **and**
`en.json`, or the path in `About.tsx` / `Cta.tsx`. You can also paste a full
`https://…` URL into any entry — it's used as-is.

## Project structure

```
src/
  app/
    layout.tsx        # fonts (Ethiopic/Latin/Arabic) + <LocaleProvider>
    page.tsx          # composes the sections
    globals.css       # design tokens, theme, textures
  content/
    am.json           # Amharic content  (default)
    en.json           # English content
  lib/
    content.ts        # types + locale dictionaries
    locale.tsx        # language context + toggle, font swapping
  components/
    ui.tsx, motion.tsx, icons.tsx   # shared primitives
    sections/         # Header, Hero, Stats, About, Journey, Packages,
                      # Why, Gallery, Testimonials, Faq, Cta, Contact, Footer
```

## Adding a third language

1. Copy `en.json` → `xx.json` and translate the values.
2. In `src/lib/content.ts`, import it, add `"xx"` to `LOCALES`, add a label to
   `LOCALE_LABELS`, and add it to `dictionaries`.
3. If the script isn't Latin/Ethiopic, add its font in `layout.tsx` and a
   `html[data-locale="xx"]` font override in `globals.css`.
