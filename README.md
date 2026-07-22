# Mutant Vault Version 5.5

Production Next.js site for Mutant Vault.

## Version 5 homepage changes

- Refined two-column hero composition
- Keeps “For collectors, curated by a collector.” as the primary brand message
- Enlarged featured comic photography
- Wider featured-comic panel with a balanced image/text split
- Responsive `X-Men #4` title that stays inside the panel
- Improved spacing, typography, and mobile breakpoints
- Preserves all Version 4 inventory, search, card, gallery, magnifier, SEO, and sorting features

## Publish

1. Replace the contents of your local GitHub repository with this package.
2. Commit and push to `main`.
3. Vercel will deploy automatically.


## Site feature toggles

Presentation switches are stored in `config/site.js`. The New Arrival badge is currently disabled site-wide. To restore it, change `showNewArrivalBadge` from `false` to `true`, then commit and push. Inventory records do not need to be edited.


## Version 5.5 inventory-card changes

- Removed the descriptive paragraph beneath Key Details
- Removed the redundant View Book link
- Preserved the key-detail chips
- Entire inventory cards remain clickable and keyboard accessible
- Creates a shorter, cleaner premium-gallery presentation

## Version 5.6 Eye Appeal documentation

- Added a full Mutant Vault Eye Appeal Standard section to the About page
- Explains the relationship between CGC grading and the site's presentation assessment
- Documents evaluation factors and the Exceptional, Strong, Average, and Below Average ratings
- Adds a direct Learn about Eye Appeal link from every comic detail page
- Includes an anchored About-page section at `/about#eye-appeal-standard`
