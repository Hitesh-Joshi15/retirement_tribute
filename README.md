# Retirement Journey: Zoukhra Bash

A scrolling tribute site built for a colleague's retirement — nearly thirty years, in frames and words.
Built with Vite, React, and TypeScript. Hosted for free on GitHub Pages.

---

## Editing the site after it's live

All story content lives in one place: [`src/content.ts`](src/content.ts).

The everyday workflow is:

1. Open the repo on github.com.
2. Open `src/content.ts` (or the photo you want to swap in `public/images/`).
3. Click the pencil icon, make your change, click **Commit changes**.
4. Wait about a minute. The live site rebuilds itself and updates.

No terminal, no local install, no build commands to remember.

### Editing text (chapters, messages, alt text)

Open [`src/content.ts`](src/content.ts). Three lists cover the whole story:

- **`chapters`** — the five timeline chapters.
- **`messages`** — the tribute cards from the team.
- **`photoColumns`** and **`photoMarquee`** — the alt (description) text for each photo.

Only change text **between the quote marks**. Leave `import`, `export`, `const`, `{`, and `}` alone.

### Swapping a photo

All images live in one flat folder: [`public/images/`](public/images/). Every photo has a specific filename the code expects — swap by **replacing** the file with the same name.

1. On your computer, rename the new photo to match the one it's replacing (for example `column-1-photo-1.jpg`). All lowercase, no spaces.
2. On github.com, open `public/images/`.
3. Click the old photo → **"..."** menu (top right) → **Delete file** → commit.
4. Back at `public/images/` → **Add file → Upload files** → drag the renamed photo in → commit.
5. Wait ~1 minute, refresh the live site.

**The one rule:** always use the same filename as the photo you're replacing. A different name won't show up — the code is looking for exact matches.

### Guardrails

- Never publish real names, personal information, or any photo/message without the person's consent.
- Every image needs an accurate `alt` (a plain-English description of what's in it). Screen readers rely on it.

---

## How hosting works

A GitHub Actions workflow at [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) runs on every push to `main`. It installs dependencies, runs `npm run build`, and publishes the built `dist/` folder to GitHub Pages.

### One-time setup after creating the repo

1. Push this code to a repo named `retirement-tribute` (matches `base` in [`vite.config.ts`](vite.config.ts)).
2. On the repo page: **Settings → Pages → Source: GitHub Actions**.
3. Push once. Watch the **Actions** tab — after ~1 minute the site is live at `https://<owner>.github.io/retirement-tribute/`.

If you rename the repo, change `base` in [`vite.config.ts`](vite.config.ts) to match. If you move to a custom domain, set `base: '/'`.

---

## Local development (only if you want to preview changes on your own machine)

```bash
npm install       # first time only
npm run dev       # http://localhost:5173/
npm run build     # produces dist/ (same as the deploy workflow)
npm run preview   # serves the built dist/ locally
npm run lint      # runs the linter
```

---

## The guestbook

The **Sign the guestbook** section lets visitors leave their own note. Right now messages are saved in each visitor's own browser (via `localStorage`), so each person only sees the notes they wrote themselves.

To make notes shared for everyone on the live site, follow the "connect Supabase later" walkthrough at the bottom of [`src/services/guestbook.ts`](src/services/guestbook.ts). Optional — the site works fine without it.
