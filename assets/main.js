(()=>{const id='G-S470VH6KC5';const s=document.createElement('script');s.async=true;s.src=`https://www.googletagmanager.com/gtag/js?id=${id}`;document.head.append(s);window.dataLayer=window.dataLayer||[];window.gtag=window.gtag||function(){dataLayer.push(arguments)};gtag('js',new Date);gtag('config',id);document.addEventListener('click',e=>{const a=e.target.closest('a');const h=a?.getAttribute('href')||'';const n=h.startsWith('tel:')?'phone_click':h.startsWith('mailto:')?'email_click':/contact/i.test(h)?'contact_click':null;if(n)gtag('event',n,{link_url:h,page_location:location.href})})})();
const header=document.querySelector('[data-header]');const menu=document.querySelector('.menu-button');const nav=document.querySelector('#site-nav');
addEventListener('scroll',()=>header.classList.toggle('scrolled',scrollY>30),{passive:true});
menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')==='true';menu.setAttribute('aria-expanded',String(!open));nav.classList.toggle('open',!open)});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menu.setAttribute('aria-expanded','false')}));
const featured=document.querySelector('[data-featured]');
if(featured&&window.WEBB_LISTINGS){
  featured.innerHTML=window.WEBB_LISTINGS.map(x=>`<article class="property-card reveal"><a href="${location.protocol==='file:'?`listing.html?slug=${x.slug}`:`/listings/${x.slug}/`}"><div class="property-image"><img src="assets/images/listings/${x.image}" alt="${x.title}" loading="lazy"><span class="status${/closed|pocket/i.test(x.status)?' muted':''}">${x.status}</span></div><div class="property-info"><div><p>${x.city}</p><h3>${x.title}</h3></div><strong>${x.price}</strong><p class="facts">${x.facts}</p></div></a></article>`).join('');
}
const reveals=document.querySelectorAll('.reveal');const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target)}}),{threshold:.12});reveals.forEach((el,i)=>{el.style.transitionDelay=`${Math.min(i%4,3)*70}ms`;io.observe(el)});
const footerLinks=document.querySelector('footer > div');
if(footerLinks&&!footerLinks.querySelector('.site-credit')){
  footerLinks.insertAdjacentHTML('beforeend','<a class="site-credit" href="https://johnwangcs.com" target="_blank" rel="noopener noreferrer">Website by johnwangcs.com</a>');
}
