import { startMatrix } from './fx-matrix.js';

document.addEventListener('DOMContentLoaded', () => {
  // Matrix background (respect reduced motion)
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const bg = document.querySelector('canvas.bg');
    startMatrix(bg);
  }

  // Smooth scroll for internal links
  document.querySelectorAll('a[href^="/"], a[href^="#"]').forEach(a=>{
    a.addEventListener('click', e=>{
      const url = new URL(a.href, location.origin);
      if(url.origin === location.origin && url.hash){
        e.preventDefault();
        document.querySelector(url.hash)?.scrollIntoView({behavior:'smooth'});
      }
    });
  });

  // Lazy reveal
  const io = new IntersectionObserver(entries=>{
    entries.forEach(e=>{
      if(e.isIntersecting){ e.target.classList.add('revealed'); io.unobserve(e.target); }
    });
  },{threshold:.15});
  document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
});
