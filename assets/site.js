const listings=window.WEBB_LISTINGS||[];
const nav=`<a class="brand" href="index.html"><img src="assets/images/webb-realty-logo.png" alt="Webb Realty"></a><button class="menu-button" type="button" aria-expanded="false" aria-controls="site-nav"><span></span><span></span><span></span><span class="sr-only">Open navigation</span></button><nav id="site-nav" aria-label="Primary navigation"><a href="index.html">Home</a><a href="services-and-agents.html">Services & Agents</a><a href="listings.html">Listings</a><a href="search-mls.html">Search MLS</a><a href="buyer-seller.html">For Buyers & Sellers</a><a class="nav-contact" href="contact.html">Contact</a></nav>`;
const foot=`<a class="brand" href="index.html"><img src="assets/images/webb-realty-logo.png" alt="Webb Realty"></a><p>Independent real estate guidance across Sonoma, Marin and Mendocino Counties.<span class="licenses">Karen Webb, Esq. CAL BAR# 277956, Broker# 01452599<br>Office Lic.: 01452599 | Broker Lic.: 01452599</span></p><div><a href="mailto:karen.webbrealty@gmail.com">karen.webbrealty@gmail.com</a><a href="tel:+17073342633">707.334.2633</a><a href="terms-privacy.html">Terms & privacy</a><a class="site-credit" href="https://johnwangcs.com" target="_blank" rel="noopener noreferrer">Website by johnwangcs.com</a></div>`;
document.querySelector('[data-site-header]')?.replaceChildren(Object.assign(document.createElement('template'),{innerHTML:nav}).content);document.querySelector('[data-site-footer]')?.replaceChildren(Object.assign(document.createElement('template'),{innerHTML:foot}).content);
const menu=document.querySelector('.menu-button'),menuNav=document.querySelector('#site-nav');menu?.addEventListener('click',()=>{const o=menu.getAttribute('aria-expanded')==='true';menu.setAttribute('aria-expanded',String(!o));menuNav.classList.toggle('open',!o)});
const grid=document.querySelector('[data-listings]');if(grid){grid.innerHTML=listings.map(x=>`<a class="listing-tile" href="listing.html?slug=${x.slug}"><img src="assets/images/listings/${x.image}" alt="${x.title}"><div><p class="eyebrow">${x.status}</p><h2>${x.title}</h2><p>${x.city}</p><strong>${x.price}</strong></div></a>`).join('')}
const detail=document.querySelector('[data-listing-detail]');if(detail){const slug=new URLSearchParams(location.search).get('slug'),x=listings.find(y=>y.slug===slug);detail.innerHTML=x?`<section class="detail-hero"><img src="assets/images/listings/${x.image}" alt="${x.title}"><div class="detail-copy"><a class="back-link" href="listings.html">← All listings</a><p class="eyebrow">${x.status}</p><h1>${x.title}</h1><p>${x.city}</p><p class="price">${x.price}</p></div></section><section class="detail-body"><div><h2>${x.title}</h2>${x.description.split('\n\n').map(t=>'<p>'+t+'</p>').join('')}<p>${x.facts}</p></div><aside class="fact-box"><strong>Interested in this property?</strong><a href="tel:+17073342633">Call or text 707-334-2633</a><a href="mailto:karen.webbrealty@gmail.com">Email Karen Webb</a><a class="button primary" href="contact.html">Send a message</a></aside></section>`:`<div class="page-content"><div class="empty"><h1>Listing not found</h1><a href="listings.html">Return to all listings</a></div></div>`}

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
