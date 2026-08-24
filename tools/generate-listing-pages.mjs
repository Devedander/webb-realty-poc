import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

function loadBrowserData(filename, property) {
  const context = { window: {} };
  vm.runInNewContext(fs.readFileSync(path.join(root, 'assets', filename), 'utf8'), context);
  return context.window[property];
}

const listings = loadBrowserData('listings.js', 'WEBB_LISTINGS');
const galleries = loadBrowserData('galleries.js', 'WEBB_GALLERIES');

const escapeHtml = value => String(value)
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&#39;');

const imagePath = value => `/assets/images/listings/${encodeURIComponent(value)}`;
const galleryPath = (slug, value) => `/assets/images/galleries/${encodeURIComponent(slug)}/${encodeURIComponent(value)}`;

function renderPage(listing) {
  const gallery = galleries[listing.slug] || [];
  const title = `${listing.title} | Webb Realty`;
  const description = `${listing.title}, ${listing.city}. ${listing.facts}. Listed by Webb Realty.`;
  const canonical = `https://webbrealtyonline.com/listings/${listing.slug}/`;
  const socialImage = `https://webbrealtyonline.com${imagePath(listing.image)}`;
  const paragraphs = listing.description.split('\n\n').map(text => `<p>${escapeHtml(text)}</p>`).join('');
  const galleryMarkup = gallery.length ? `<section class="listing-gallery" aria-labelledby="gallery-heading"><div class="gallery-heading"><h2 id="gallery-heading">View Photos</h2></div><div class="gallery-grid">${gallery.map((image, index) => `<button class="gallery-item" type="button" onclick="window.webbGalleryOpen(${index})" aria-label="View photo ${index + 1} of ${gallery.length}"><img src="${galleryPath(listing.slug, image)}" alt="${escapeHtml(listing.title)}, photo ${index + 1}" loading="lazy"></button>`).join('')}</div></section><div class="gallery-dialog" hidden role="dialog" aria-modal="true" aria-label="Photo viewer"><button class="gallery-close" type="button" onclick="window.webbGalleryClose()" aria-label="Close photo viewer">×</button><button class="gallery-nav gallery-previous" type="button" onclick="window.webbGalleryMove(-1)" aria-label="Previous photo">←</button><img src="" alt=""><button class="gallery-nav gallery-next" type="button" onclick="window.webbGalleryMove(1)" aria-label="Next photo">→</button><p class="gallery-position" aria-live="polite"></p></div>` : '';

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${escapeHtml(title)}</title>
<meta name="description" content="${escapeHtml(description)}">
<base href="/">
<link rel="icon" type="image/png" href="assets/images/webb-realty-logo.png">
<link rel="stylesheet" href="assets/inner.css?v=physical-listings-1">
<link rel="canonical" href="${canonical}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Webb Realty">
<meta property="og:title" content="${escapeHtml(title)}">
<meta property="og:description" content="${escapeHtml(description)}">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="${socialImage}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${escapeHtml(title)}">
<meta name="twitter:description" content="${escapeHtml(description)}">
<meta name="twitter:image" content="${socialImage}">
<script type="application/ld+json">{"name":"Webb Realty","url":"https://webbrealtyonline.com/","image":"https://webbrealtyonline.com/assets/images/sonoma-coast.jpg","@type":"RealEstateAgent","@context":"https://schema.org","address":{"@type":"PostalAddress","addressRegion":"CA","addressLocality":"Sebastopol","addressCountry":"US"}}</script>
<script src="assets/galleries.js?v=gallery-carousel-4" defer></script>
<script src="assets/site.js?v=physical-listings-1" defer></script>
<script src="assets/gallery-controls.js?v=physical-listings-1" defer></script>
</head>
<body class="inner">
<header class="site-header" data-site-header></header>
<main data-static-listing data-slug="${escapeHtml(listing.slug)}"><section class="detail-hero"><img src="${imagePath(listing.image)}" alt="${escapeHtml(listing.title)}"><div class="detail-copy"><a class="back-link" href="listings.html">← All listings</a><p class="eyebrow">${escapeHtml(listing.status)}</p><h1>${escapeHtml(listing.title)}</h1><p>${escapeHtml(listing.city)}</p><p class="price">${escapeHtml(listing.price)}</p></div></section><section class="detail-body"><div><h2>${escapeHtml(listing.title)}</h2>${paragraphs}<p>${escapeHtml(listing.facts)}</p></div><aside class="fact-box"><strong>Interested in this property?</strong><a href="tel:+17073342633">Call or text 707-334-2633</a><a href="mailto:karen.webbrealty@gmail.com">Email Karen Webb</a><a class="button primary" href="mailto:karen.webbrealty@gmail.com">karen.webbrealty@gmail.com</a></aside></section>${galleryMarkup}</main>
<footer data-site-footer></footer>
</body>
</html>
`;
}

const listingRoot = path.join(root, 'listings');
fs.mkdirSync(listingRoot, { recursive: true });

const expected = new Set(listings.map(listing => listing.slug));
for (const entry of fs.readdirSync(listingRoot, { withFileTypes: true })) {
  if (entry.isDirectory() && !expected.has(entry.name)) {
    fs.rmSync(path.join(listingRoot, entry.name), { recursive: true });
  }
}

for (const listing of listings) {
  const directory = path.join(listingRoot, listing.slug);
  fs.mkdirSync(directory, { recursive: true });
  fs.writeFileSync(path.join(directory, 'index.html'), renderPage(listing));
}

console.log(`Generated ${listings.length} listing pages in ${listingRoot}`);
