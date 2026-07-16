# Mutant Vault — Production Website

This is the complete Next.js project for mutantvault.com.

## Deploy

1. Replace the contents of your local GitHub repository with this package.
2. In GitHub Desktop, commit the changes and push to `main`.
3. Vercel will deploy automatically.

## Add a comic

1. Put all images in `public/inventory/` using simple names, such as:
   - `x-men-50-front.jpg`
   - `x-men-50-back.jpg`
   - `x-men-50-label.jpg`
2. Add one object to `data/inventory.json`.
3. Add image paths to the `images` array.
4. Set `featured` to `true` for only one available book.
5. Change `status` to `sold` to move a comic to the Sold Archive.

## Photo quality

Use web copies approximately 2400–3000 pixels tall at JPEG quality 90–95. Keep your full-resolution originals separately.
