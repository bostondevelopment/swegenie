# Deploying to GitHub Pages

**Status:** replaces ADR-002's original Vercel choice for hosting specifically — Vercel is still a
fine option (zero changes needed, would restore the dropped features below), but the user chose
free static GitHub Pages hosting and explicitly said the dynamic OG-image/share-card feature and
server-side analytics don't matter right now. Everything else (assessment, scoring, results,
`/personas`, archetype/methodology pages) is unaffected — this was always meant to be a client-side,
no-backend app per ADR-002/003; only two pieces had crept into using a server at all.

## What changed to make this possible

- **`/results`** used to be an async Server Component reading the `a=` query param per request.
  Static export has no server to do that at request time, so it's now a Client Component
  (`app/results/ResultsClient.tsx`) that reads the query string with `useSearchParams()` and does
  the exact same `decodeProfile` -> `rankArchetypes` -> render pipeline entirely in the browser.
  One real, accepted loss: the page's `<title>`/OG metadata used to be personalized per result
  ("Top match: X — Y% fit"); static export can't vary metadata per query string, so it's now a
  fixed "Your results" title.
- **`/api/og`** (dynamic share-card image generation) and **`/api/events`** (analytics POST
  endpoint) are gone — static hosts can't run server code or accept POST requests at all.
  `lib/analytics.ts`'s `track()` is now an explicit no-op (see its comment) rather than firing
  requests at an endpoint that no longer exists.
- **`lib/results-copy.ts`** used to call `fs.readFileSync` per request to parse
  `content/results-copy/*.md`. That's fine for a Server Component (the old `/results` page, and
  still fine for `/archetypes/[id]`, which prerenders at build time) but breaks when a *Client*
  Component (`ResultsClient.tsx`) needs the same data, since `fs` can't bundle for the browser.
  Fixed by precomputing `data/results-copy.json` at build time
  (`npm run results-copy:generate`, from `scripts/generate-results-copy.mjs`) and having
  `getResultsCopy()` do a plain JSON lookup instead — works in both server and client code, no `fs`
  anywhere at runtime. **Re-run `npm run results-copy:generate` whenever you edit
  `content/results-copy/*.md`** — the JSON isn't auto-synced from the markdown.

## Local testing

```
cd app
npm run build            # plain build, no basePath — matches `npm run dev`'s paths
npx serve out             # serve the static output and click through it
```

To test the actual GitHub Pages subpath behavior (`username.github.io/<repo>/...`), set
`NEXT_BASE_PATH` to simulate it:

```
cd app
NEXT_BASE_PATH=/careerguru npx next build
```

Every internal link/asset picks up the prefix automatically (Next's `<Link>` and router are
basePath-aware) — nothing in the app code needs to know about it.

## One-time GitHub Pages setup

1. Repo Settings → Pages → **Source: GitHub Actions** (not "Deploy from a branch" — the workflow
   below handles building and publishing directly).
2. Push to `main`. `.github/workflows/deploy.yml` builds (`app/`, with `NEXT_BASE_PATH` set from
   the actual repo name — no hardcoding needed) and publishes `app/out` via
   `actions/deploy-pages`. It also runs the full test suite and lint as a gate — a change that
   fails `npm test` (including the persona regression suite and taxonomy-integrity checks) or
   `npm run lint` won't get published.
3. First deploy can take a few minutes to go live at `https://<owner>.github.io/<repo>/`.

## `.nojekyll`

`app/public/.nojekyll` is an empty file that ships to `out/.nojekyll`. Without it, GitHub Pages'
default Jekyll processing step ignores any file/folder starting with `_` — which is exactly what
Next's `_next/` asset directory is named, so the whole app would 404 on every JS/CSS file without
this.

## Known gaps versus the original Vercel-hosted design (accepted, not oversights)

- No dynamic per-result share-card OG images or personalized link-preview titles.
- No server-side analytics endpoint (`track()` is a no-op). A client-only analytics snippet
  (Plausible, Umami — anything that doesn't need its own server) would still work fine on static
  hosting if this becomes a priority later; it's a one-line change inside `track()`.

If either of these becomes worth restoring, the two options are: move hosting to Vercel (zero
further changes needed — everything here was written to also still work as a normal Next.js app,
just run `next build` without `output: 'export'`), or keep GitHub Pages for the main site and add a
small separate serverless function elsewhere just for `/api/og`.
