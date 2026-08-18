const listings=window.WEBB_LISTINGS||[];
const nav=`<a class="brand" href="index.html"><img src="assets/images/webb-realty-logo.png" alt="Webb Realty"></a><button class="menu-button" type="button" aria-expanded="false" aria-controls="site-nav"><span></span><span></span><span></span><span class="sr-only">Open navigation</span></button><nav id="site-nav" aria-label="Primary navigation"><a href="index.html">Home</a><a href="services-and-agents.html">Services & Agents</a><a href="listings.html">Listings</a><a href="search-mls.html">Search MLS</a><a href="buyer-seller.html">For Buyers & Sellers</a><a class="nav-contact" href="contact.html">Contact</a></nav>`;
const foot=`<a class="brand" href="index.html"><img src="assets/images/webb-realty-logo.png" alt="Webb Realty"></a><p>Independent real estate guidance across Sonoma, Marin and Mendocino Counties.<span class="licenses">Karen Webb, Esq. CAL BAR# 277956, Broker# 01452599<br>Office Lic.: 01452599 | Broker Lic.: 01452599</span></p><div><a href="mailto:karen.webbrealty@gmail.com">karen.webbrealty@gmail.com</a><a href="tel:+17073342633">707.334.2633</a><a href="terms-privacy.html">Terms & privacy</a><a class="site-credit" href="https://johnwangcs.com" target="_blank" rel="noopener noreferrer">Website by johnwangcs.com</a></div>`;
document.querySelector('[data-site-header]')?.replaceChildren(Object.assign(document.createElement('template'),{innerHTML:nav}).content);document.querySelector('[data-site-footer]')?.replaceChildren(Object.assign(document.createElement('template'),{innerHTML:foot}).content);
const menu=document.querySelector('.menu-button'),menuNav=document.querySelector('#site-nav');menu?.addEventListener('click',()=>{const o=menu.getAttribute('aria-expanded')==='true';menu.setAttribute('aria-expanded',String(!o));menuNav.classList.toggle('open',!o)});
const grid=document.querySelector('[data-listings]');if(grid){grid.innerHTML=listings.map(x=>`<article class="listing-tile property-card"><a href="listing.html?slug=${x.slug}"><div class="property-image"><img src="assets/images/listings/${x.image}" alt="${x.title}" loading="lazy"><span class="status${/closed|pocket/i.test(x.status)?' muted':''}">${x.status}</span></div><div class="property-info"><div><p>${x.city}</p><h3>${x.title}</h3></div><strong>${x.price}</strong><p class="facts">${x.facts}</p></div></a></article>`).join('')}
const detail=document.querySelector('[data-listing-detail]');if(detail){const slug=new URLSearchParams(location.search).get('slug'),x=listings.find(y=>y.slug===slug),gallery=window.WEBB_GALLERIES?.[slug]||[];const galleryPath=image=>`assets/images/galleries/${slug}/${encodeURIComponent(image)}`;detail.innerHTML=x?`<section class="detail-hero"><img src="assets/images/listings/${x.image}" alt="${x.title}"><div class="detail-copy"><a class="back-link" href="listings.html">← All listings</a><p class="eyebrow">${x.status}</p><h1>${x.title}</h1><p>${x.city}</p><p class="price">${x.price}</p></div></section><section class="detail-body"><div><h2>${x.title}</h2>${x.description.split('\n\n').map(t=>'<p>'+t+'</p>').join('')}<p>${x.facts}</p></div><aside class="fact-box"><strong>Interested in this property?</strong><a href="tel:+17073342633">Call or text 707-334-2633</a><a href="mailto:karen.webbrealty@gmail.com">Email Karen Webb</a><a class="button primary" href="contact.html">Send a message</a></aside></section>${gallery.length?`<section class="listing-gallery" aria-labelledby="gallery-heading"><div class="gallery-heading"><h2 id="gallery-heading">View Photos</h2></div><div class="gallery-grid">${gallery.map((image,index)=>`<button class="gallery-item" type="button" onclick="window.webbGalleryOpen(${index})" aria-label="View photo ${index+1} of ${gallery.length}"><img src="${galleryPath(image)}" alt="${x.title}, photo ${index+1}" loading="lazy"></button>`).join('')}</div></section><div class="gallery-dialog" hidden role="dialog" aria-modal="true" aria-label="Photo viewer"><button class="gallery-close" type="button" onclick="window.webbGalleryClose()" aria-label="Close photo viewer">×</button><button class="gallery-nav gallery-previous" type="button" onclick="window.webbGalleryMove(-1)" aria-label="Previous photo">←</button><img src="" alt=""><button class="gallery-nav gallery-next" type="button" onclick="window.webbGalleryMove(1)" aria-label="Next photo">→</button><p class="gallery-position" aria-live="polite"></p></div>`:''}`:`<div class="page-content"><div class="empty"><h1>Listing not found</h1><a href="listings.html">Return to all listings</a></div></div>`}

const revealSelectors=[
  '.page-hero > *',
  '.doc-layout > .doc-toc',
  '.doc-layout > .doc-aside',
  '.doc-layout > .prose > *',
  '.doc-body.prose > :not(.agent-grid)',
  '.doc-body > .prose > *',
  '.agent-grid > .agent-card',
  '.listing-directory > .listing-tile',
  '.search-box > *',
  '.contact-page > *',
  '.detail-hero > *',
  '.detail-body > *',
  '.empty > *',
  '[data-site-footer] > *'
];
const revealElements=[...new Set(revealSelectors.flatMap(selector=>[...document.querySelectorAll(selector)]))];
revealElements.forEach(el=>el.classList.add('reveal'));
// The hero is already in view when an inner page opens.  Let it paint in its
// starting position first, then reveal it on the following frame so it gets
// the same soft fade-and-rise entrance as the home page rather than appearing
// at whatever point the intersection observer happens to run.
const entryElements=new Set(document.querySelectorAll('.page-hero > .reveal, .detail-hero > .reveal'));
if(!('IntersectionObserver' in window)||matchMedia('(prefers-reduced-motion: reduce)').matches){
  revealElements.forEach(el=>el.classList.add('visible'));
}else{
  const revealObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{
    if(entry.isIntersecting){entry.target.classList.add('visible');revealObserver.unobserve(entry.target)}
  }),{threshold:.12});
  revealElements.forEach(el=>{
    const siblings=revealElements.filter(item=>item.parentElement===el.parentElement);
    el.style.transitionDelay=`${Math.min(siblings.indexOf(el),3)*70}ms`;
    if(!entryElements.has(el))revealObserver.observe(el);
  });
  requestAnimationFrame(()=>requestAnimationFrame(()=>entryElements.forEach(el=>el.classList.add('visible'))));
}

const toc=document.querySelector('.doc-toc');
if(toc){
  const links=[...toc.querySelectorAll('a')];
  const heads=links.map(a=>document.getElementById(a.getAttribute('href').slice(1))).filter(Boolean);
  const spy=new IntersectionObserver(es=>{es.forEach(e=>{if(e.isIntersecting){links.forEach(l=>l.classList.toggle('current',l.getAttribute('href').slice(1)===e.target.id))}})},{rootMargin:'-100px 0px -70% 0px'});
  heads.forEach(h=>spy.observe(h));
}

const dcard=document.querySelector('.doc-card'),dtoc=document.querySelector('.doc-toc');
if(dcard&&dtoc){
  const match=()=>{
    if(getComputedStyle(dtoc).display==='none'){dcard.style.minHeight='';return}
    dcard.style.minHeight=dtoc.offsetHeight+'px';
  };
  match();
  addEventListener('resize',match,{passive:true});
  if(document.fonts&&document.fonts.ready)document.fonts.ready.then(match);
}
