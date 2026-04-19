(function () {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isMobile = () => window.innerWidth < 860;

  // ---------- Nav scroll state ----------
  const nav = document.getElementById('nav');
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 12);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ---------- Mobile menu ----------
  const burger = document.getElementById('nav-burger');
  const mobileMenu = document.getElementById('mobile-menu');
  const panel = mobileMenu.querySelector('.mobile-menu-panel');
  let lastFocus = null;

  const openMenu = () => {
    lastFocus = document.activeElement;
    mobileMenu.hidden = false;
    requestAnimationFrame(() => mobileMenu.classList.add('open'));
    burger.setAttribute('aria-expanded', 'true');
    burger.setAttribute('aria-label', 'Fechar menu');
    document.body.classList.add('menu-open');
    const firstLink = panel.querySelector('a');
    if (firstLink) setTimeout(() => firstLink.focus(), 360);
  };

  const closeMenu = () => {
    mobileMenu.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
    burger.setAttribute('aria-label', 'Abrir menu');
    document.body.classList.remove('menu-open');
    setTimeout(() => { mobileMenu.hidden = true; if (lastFocus) lastFocus.focus(); }, 520);
  };

  burger.addEventListener('click', () => mobileMenu.classList.contains('open') ? closeMenu() : openMenu());
  mobileMenu.querySelectorAll('[data-mm-close]').forEach(a => a.addEventListener('click', () => closeMenu()));
  mobileMenu.addEventListener('click', (e) => { if (e.target === mobileMenu) closeMenu(); });

  document.addEventListener('keydown', (e) => {
    if (!mobileMenu.classList.contains('open')) return;
    if (e.key === 'Escape') { closeMenu(); return; }
    if (e.key === 'Tab') {
      const focusables = panel.querySelectorAll('a, button');
      if (!focusables.length) return;
      const first = focusables[0], last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 860 && mobileMenu.classList.contains('open')) closeMenu();
  });

  // ---------- FAQ ----------
  document.querySelectorAll('.faq-item').forEach(item => {
    const btn = item.querySelector('.faq-q');
    btn.addEventListener('click', () => {
      const open = item.classList.toggle('open');
      btn.setAttribute('aria-expanded', open);
    });
  });

  // ---------- Scroll-spy ----------
  const sections = Array.from(document.querySelectorAll('section[id]'));
  const navLinks = Array.from(document.querySelectorAll('[data-nav-link]'));
  if ('IntersectionObserver' in window && sections.length) {
    const setActive = (id) => navLinks.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + id));
    const io = new IntersectionObserver((entries) => {
      const visible = entries.filter(e => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);
      if (visible[0]) setActive(visible[0].target.id);
    }, { rootMargin: '-35% 0px -55% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] });
    sections.forEach(s => io.observe(s));
  }

  // ---------- Reveal on enter ----------
  if ('IntersectionObserver' in window && !prefersReducedMotion) {
    const revealIO = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          revealIO.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    document.querySelectorAll('.reveal, .stagger').forEach(el => revealIO.observe(el));
  } else {
    document.querySelectorAll('.reveal, .stagger').forEach(el => el.classList.add('in'));
  }

  // ---------- Cinematic smooth scroll for anchor links ----------
  const easeInOutCubic = (t) => t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  const smoothScrollTo = (targetY, duration = 950) => {
    if (prefersReducedMotion) { window.scrollTo(0, targetY); return; }
    const startY = window.scrollY;
    const delta = targetY - startY;
    if (Math.abs(delta) < 4) return;
    const start = performance.now();
    const step = (now) => {
      const t = Math.min((now - start) / duration, 1);
      window.scrollTo(0, startY + delta * easeInOutCubic(t));
      if (t < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (!href || href === '#') return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      const navH = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 72;
      const top = target.getBoundingClientRect().top + window.scrollY - (navH + 12);
      smoothScrollTo(top, 950);
      history.replaceState(null, '', href);
    });
  });

  // ---------- Subtle background parallax ----------
  if (!prefersReducedMotion && !isMobile()) {
    const heroBg = document.querySelector('.hero-bg');
    let ticking = false;
    const update = () => {
      const y = window.scrollY;
      if (heroBg) heroBg.style.transform = `translate3d(0, ${y * 0.18}px, 0)`;
      ticking = false;
    };
    window.addEventListener('scroll', () => {
      if (!ticking) { requestAnimationFrame(update); ticking = true; }
    }, { passive: true });
    update();
  }

  // ---------- Copy-to-clipboard fallback for mailto ----------
  const showToast = (msg) => {
    let el = document.querySelector('.copy-feedback');
    if (!el) {
      el = document.createElement('div');
      el.className = 'copy-feedback';
      el.setAttribute('role', 'status');
      el.setAttribute('aria-live', 'polite');
      document.body.appendChild(el);
    }
    el.textContent = msg;
    requestAnimationFrame(() => el.classList.add('show'));
    clearTimeout(el._t);
    el._t = setTimeout(() => el.classList.remove('show'), 2400);
  };

  document.querySelectorAll('a[href^="mailto:"]').forEach(a => {
    a.addEventListener('click', async (e) => {
      const email = a.getAttribute('href').replace('mailto:', '').split('?')[0];
      // Let the native mailto handler try first.
      // Also copy to clipboard as a backup so the user never loses the address.
      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(email);
          showToast('Email copiado: ' + email);
        }
      } catch (_) { /* ignore */ }
    });
  });
})();
