const header=document.querySelector('[data-header]');const menu=document.querySelector('.menu-button');const nav=document.querySelector('#site-nav');
addEventListener('scroll',()=>header.classList.toggle('scrolled',scrollY>30),{passive:true});
menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')==='true';menu.setAttribute('aria-expanded',String(!open));nav.classList.toggle('open',!open)});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menu.setAttribute('aria-expanded','false')}));
const reveals=document.querySelectorAll('.reveal');const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target)}}),{threshold:.12});reveals.forEach((el,i)=>{el.style.transitionDelay=`${Math.min(i%4,3)*70}ms`;io.observe(el)});
const motionOK=!matchMedia('(prefers-reduced-motion: reduce)').matches;const movers=[...document.querySelectorAll('.momentum')];let current=0,target=0,ticking=false;
function frame(){current+=(target-current)*.08;movers.forEach(el=>{const speed=Number(el.dataset.speed||.05);const rect=el.getBoundingClientRect();if(rect.bottom>0&&rect.top<innerHeight)el.style.transform=`translate3d(0,${(current-el.offsetTop)*speed}px,0)`});if(Math.abs(target-current)>.2)requestAnimationFrame(frame);else ticking=false}
if(motionOK)addEventListener('scroll',()=>{target=scrollY;if(!ticking){ticking=true;requestAnimationFrame(frame)}},{passive:true});
const footerLinks=document.querySelector('footer > div');
if(footerLinks&&!footerLinks.querySelector('.site-credit')){
  footerLinks.insertAdjacentHTML('beforeend','<a class="site-credit" href="https://johnwangcs.com" target="_blank" rel="noopener noreferrer">Website by johnwangcs.com</a>');
}
