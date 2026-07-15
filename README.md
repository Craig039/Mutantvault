# Mutant Vault Website — Version 2

A modern Next.js website for Mutant Vault, designed for deployment on Vercel.

## Included

- Responsive homepage
- Available inventory page
- Sold archive
- About page
- Contact page
- Mutant Vault logo system
- SEO metadata and social sharing image
- Data-driven comic inventory

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Deployment

Import this repository into Vercel. Vercel will detect Next.js automatically.

## Updating inventory

Edit:

`data/inventory.json`

To add a comic image:

1. Place the image in `public/inventory/`
2. Set `frontImage` to `/inventory/your-file-name.jpg`
3. Commit the changes to GitHub

## Current image placeholders

The initial sample listings intentionally use placeholders until the actual front and back slab photographs are added.


## Version 2.1
- Cleaner MV wordmark in the header.
- Data-driven featured comic on the homepage.
- Set `featured: true` in `data/inventory.json` and add a `frontImage` path to change the featured book.
