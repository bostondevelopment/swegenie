# `/archetypes/staff-cross` no longer describes what the page does

## Problem

The route `app/app/archetypes/staff-cross/page.tsx` used to show a single-level ("Staff")
cross-archetype comp comparison. As of the `archetype-comparison-redesign` branch, it renders
`ArchetypeCompareStage` (`app/components/comp/ArchetypeCompareStage.tsx`), which lets a user pick
level *and* tier — it's a general archetype-comparison page, not a staff-only one. The URL slug
`staff-cross` is now a misnomer.

## What "done" looks like

1. Pick a new slug (e.g. `/archetypes/compare`).
2. Move `app/app/archetypes/staff-cross/page.tsx` to the new route directory.
3. Update every internal reference to the old path — at minimum check `app/components/SiteHeader.tsx`
   (nav link) and `app/app/archetypes/[id]/page.tsx` (has a "Compare across all archetypes →"
   link to this route as of this branch). Grep the full `app/` tree for `staff-cross` to catch
   anything else (share links, sitemap, tests).
4. Decide whether the old `/archetypes/staff-cross` URL needs a redirect (Next.js `redirects()`
   in `next.config.*`) for anyone with the old link bookmarked/shared, or whether it's safe to
   just 404 — check `app/components/ShareBar.tsx` and any analytics/share-tracking code to see
   if the old URL is likely to be in the wild already before deciding.
5. Run `npm test` and `npm run lint` after the move.

## Do not

Don't rename the underlying React component or file names as part of this — scope this to the
URL/route only, unless the component naming is also confusing (it currently isn't:
`ArchetypeCompareStage` and `ArchetypeCompareTable` already describe the redesigned behavior
correctly; only the route slug is stale).
