(() => {
  const nav = document.querySelector('.site-nav');
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  const updateNav = () => nav.classList.toggle('scrolled', window.scrollY > 40);
  updateNav();
  window.addEventListener('scroll', updateNav, { passive: true });

  navToggle?.addEventListener('click', () => {
    const open = navToggle.getAttribute('aria-expanded') !== 'true';
    navToggle.setAttribute('aria-expanded', String(open));
    navToggle.setAttribute('title', open ? '关闭导航' : '打开导航');
    navLinks.classList.toggle('open', open);
    document.body.classList.toggle('nav-open', open);
    const icon = navToggle.querySelector('[data-lucide]');
    const label = navToggle.querySelector('.sr-only');
    icon?.setAttribute('data-lucide', open ? 'x' : 'menu');
    if (label) label.textContent = open ? '关闭导航' : '打开导航';
    window.lucide?.createIcons();
  });

  navLinks?.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navToggle?.setAttribute('aria-expanded', 'false');
      navLinks.classList.remove('open');
      document.body.classList.remove('nav-open');
      navToggle?.querySelector('[data-lucide]')?.setAttribute('data-lucide', 'menu');
      const label = navToggle?.querySelector('.sr-only');
      if (label) label.textContent = '打开导航';
      window.lucide?.createIcons();
    });
  });

  document.querySelectorAll('[data-comparison]').forEach((comparison) => {
    const range = comparison.querySelector('.comparison-range');
    const after = comparison.querySelector('[data-comparison-after]');
    const handle = comparison.querySelector('[data-comparison-handle]');
    const update = () => {
      const value = Number(range.value);
      after.style.clipPath = `inset(0 ${100 - value}% 0 0)`;
      handle.style.left = `${value}%`;
    };
    range.addEventListener('input', update);
    update();
  });

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const revealItems = document.querySelectorAll('.reveal');
  if (reducedMotion || !('IntersectionObserver' in window)) {
    revealItems.forEach((item) => item.classList.add('in-view'));
  } else {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    revealItems.forEach((item) => observer.observe(item));
  }

  window.lucide?.createIcons({ attrs: { 'stroke-width': 1.8 } });
})();
