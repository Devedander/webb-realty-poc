# Webb Realty website

This is a dependency-free static site. The files served locally are the same files uploaded to any static host.

## Listing pages

Property details live in `assets/listings.js` and photo lists live in `assets/galleries.js`. After changing either file, run `node tools/generate-listing-pages.mjs` to rebuild the physical pages under `listings/`.

## Preview

Run any static file server in this directory and open its local URL. For example, `npx serve .` or Python's built-in HTTP server.

## Deploy

Rebuild the listing pages, then upload the complete `webb-realty-poc` folder to GitHub Pages, Cloudflare Pages, Netlify, or another static host. The deployed site has no server-side runtime requirement.

The contact page provides direct email and telephone contact details.
