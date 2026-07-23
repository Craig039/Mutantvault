# Mutant Vault Version 6.0

Production Next.js site for Mutant Vault. Version 6.0 establishes the current master release and consolidates the completed Version 5 improvements.

## Version 6.0 changes

- Replaced the front and back photographs for X-Men #4 CGC 5.5.
- Replaced the front and back photographs for X-Men #9 CGC 7.5.
- Replaced the front and back photographs for X-Men #22 CGC 8.5.
- Regenerated thumbnail, display, and full-resolution gallery assets from the supplied photographs.
- Preserved the photographs exactly apart from EXIF orientation correction and proportional resizing.
- Retains the iPad touch magnifier and tablet-only featured-comic layout fix.
- Retains the Eye Appeal Standard, clean inventory cards, X-Men #21 listing, numeric sorting, search, SEO, sitemap, and New Arrival toggle.

## Publish

1. Replace the contents of the GitHub repository with this package.
2. Commit and push to `main`.
3. Vercel will deploy automatically.

Suggested commit message:

```text
Version 6.0 - Refresh X-Men 4, 9, and 22 photography
```

## Site feature toggles

Presentation switches are stored in `config/site.js`. The New Arrival badge remains disabled site-wide and can be restored by setting `showNewArrivalBadge` to `true`.
