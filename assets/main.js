const header=document.querySelector('[data-header]');const menu=document.querySelector('.menu-button');const nav=document.querySelector('#site-nav');
addEventListener('scroll',()=>header.classList.toggle('scrolled',scrollY>30),{passive:true});
menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')==='true';menu.setAttribute('aria-expanded',String(!open));nav.classList.toggle('open',!open)});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menu.setAttribute('aria-expanded','false')}));
const featured=document.querySelector('[data-featured]');
if(featured&&window.WEBB_LISTINGS){
  featured.innerHTML=window.WEBB_LISTINGS.map(x=>`<article class="property-card reveal"><a href="listing.html?slug=${x.slug}"><div class="property-image"><img src="assets/images/listings/${x.image}" alt="${x.title}" loading="lazy"><span class="status${/closed|pocket/i.test(x.status)?' muted':''}">${x.status}</span></div><div class="property-info"><div><p>${x.city}</p><h3>${x.title}</h3></div><strong>${x.price}</strong><p class="facts">${x.facts}</p></div></a></article>`).join('')
    +`<aside class="property-cta reveal"><p class="eyebrow">Locally driven</p><h3>Let us help you find your dream home.</h3><p>Buying a house is one of the most important decisions in your life. A personal touch can make or break a deal.</p><a class="button light" href="#contact">Contact Webb Realty</a></aside>`;
}
const reveals=document.querySelectorAll('.reveal');const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target)}}),{threshold:.12});reveals.forEach((el,i)=>{el.style.transitionDelay=`${Math.min(i%4,3)*70}ms`;io.observe(el)});
const footerLinks=document.querySelector('footer > div');
if(footerLinks&&!footerLinks.querySelector('.site-credit')){
  footerLinks.insertAdjacentHTML('beforeend','<a class="site-credit" href="https://johnwangcs.com" target="_blank" rel="noopener noreferrer">Website by johnwangcs.com</a>');
}
