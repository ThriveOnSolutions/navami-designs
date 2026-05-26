/* Navami Designs — interactions
   Scroll reveals, sticky nav, mobile menu, hero load-in,
   form validation, animated counters, smooth scroll.
*/
(() => {
  'use strict';

  // ── Nav scroll state ────────────────────────────────
  const nav = document.querySelector('.nav');
  if (nav) {
    const onScroll = () => {
      if (window.scrollY > 24) nav.classList.add('is-scrolled');
      else nav.classList.remove('is-scrolled');
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // mobile toggle
    const toggle = nav.querySelector('.nav__toggle');
    if (toggle) {
      toggle.addEventListener('click', () => {
        nav.classList.toggle('is-open');
        document.body.style.overflow = nav.classList.contains('is-open') ? 'hidden' : '';
      });
      // close on link click
      nav.querySelectorAll('.nav__links a').forEach(a => {
        a.addEventListener('click', () => {
          nav.classList.remove('is-open');
          document.body.style.overflow = '';
        });
      });
    }
  }

  // ── Hero load-in ────────────────────────────────────
  const hero = document.querySelector('.hero');
  if (hero) {
    requestAnimationFrame(() => hero.classList.add('is-loaded'));
  }

  // ── Scroll reveal ───────────────────────────────────
  const revealEls = document.querySelectorAll('[data-reveal]');
  if (revealEls.length && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('is-in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('is-in'));
  }

  // ── Animated counters ──────────────────────────────
  const counters = document.querySelectorAll('[data-count]');
  if (counters.length && 'IntersectionObserver' in window) {
    const fmt = (n, suffix, prefix, decimals) => {
      const fixed = decimals > 0 ? n.toFixed(decimals) : Math.round(n).toLocaleString('en-US');
      return `${prefix || ''}${fixed}${suffix || ''}`;
    };
    const animate = (el) => {
      const target = parseFloat(el.dataset.count);
      const suffix = el.dataset.suffix || '';
      const prefix = el.dataset.prefix || '';
      const decimals = parseInt(el.dataset.decimals || '0', 10);
      const duration = 1400;
      const start = performance.now();
      const tick = (now) => {
        const t = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - t, 3);
        el.textContent = fmt(target * eased, suffix, prefix, decimals);
        if (t < 1) requestAnimationFrame(tick);
        else el.textContent = fmt(target, suffix, prefix, decimals);
      };
      requestAnimationFrame(tick);
    };
    const cIO = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) { animate(e.target); cIO.unobserve(e.target); }
      });
    }, { threshold: 0.5 });
    counters.forEach(el => cIO.observe(el));
  }

  // ── Form validation (sign-up / sign-in / interest) ──
  document.querySelectorAll('form[data-validate]').forEach(form => {
    form.addEventListener('submit', (ev) => {
      ev.preventDefault();
      let ok = true;
      form.querySelectorAll('[required]').forEach(input => {
        const valid = input.checkValidity() && input.value.trim() !== '';
        input.style.borderColor = valid ? '' : 'var(--clay)';
        if (!valid) ok = false;
      });
      if (!ok) return;
      const btn = form.querySelector('button[type=submit]');
      if (btn) { btn.textContent = 'Saving…'; btn.disabled = true; }
      // Simulated success — real backend wiring lives elsewhere
      setTimeout(() => {
        form.innerHTML = `
          <div class="form-success">
            <div class="eyebrow">Got it</div>
            <h2 class="headline">You're on the list.</h2>
            <p class="lede" style="margin-top:18px;">We'll reach out within 48 hours with a discovery call link and a private intake doc.</p>
          </div>`;
        form.style.textAlign = 'left';
      }, 700);
    });
  });

  // ── Smooth-scroll for in-page anchors ───────────────
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (ev) => {
      const id = a.getAttribute('href');
      if (id === '#' || id.length < 2) return;
      const target = document.querySelector(id);
      if (!target) return;
      ev.preventDefault();
      window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' });
    });
  });

  // ── Year tokens ─────────────────────────────────────
  document.querySelectorAll('[data-year]').forEach(el => { el.textContent = new Date().getFullYear(); });

  // ── Parallax hero ───────────────────────────────────
  const heroBg = document.querySelector('.hero__bg');
  if (heroBg && window.matchMedia('(prefers-reduced-motion: no-preference)').matches) {
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = Math.min(window.scrollY, 800);
        heroBg.style.transform = `translate3d(0, ${y * 0.35}px, 0) scale(${1 + y * 0.0003})`;
        ticking = false;
      });
    }, { passive: true });
  }

  // ── Tilt on project cards ───────────────────────────
  document.querySelectorAll('.project-card, .tier, .gc-card').forEach(card => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    card.addEventListener('mousemove', (e) => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      card.style.transform = `perspective(900px) rotateY(${x * 4}deg) rotateX(${-y * 4}deg) translateY(-2px)`;
    });
    card.addEventListener('mouseleave', () => { card.style.transform = ''; });
  });

  // ── Magnetic buttons ────────────────────────────────
  document.querySelectorAll('.btn, .nav__cta').forEach(btn => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    btn.addEventListener('mousemove', (e) => {
      const r = btn.getBoundingClientRect();
      const x = (e.clientX - r.left - r.width / 2) * 0.18;
      const y = (e.clientY - r.top - r.height / 2) * 0.18;
      btn.style.transform = `translate(${x}px, ${y}px)`;
    });
    btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
  });

  // ── Image lightbox (gallery) ────────────────────────
  const galleryImgs = document.querySelectorAll('.gallery__item img');
  if (galleryImgs.length) {
    const lb = document.createElement('div');
    lb.className = 'lightbox';
    lb.innerHTML = `<button class="lightbox__close" aria-label="Close">×</button><img alt=""/>`;
    document.body.appendChild(lb);
    const lbImg = lb.querySelector('img');
    const close = () => { lb.classList.remove('is-open'); document.body.style.overflow = ''; };
    lb.addEventListener('click', (e) => { if (e.target === lb || e.target.closest('.lightbox__close')) close(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });
    galleryImgs.forEach(img => {
      img.style.cursor = 'zoom-in';
      img.addEventListener('click', () => {
        lbImg.src = img.src;
        lbImg.alt = img.alt;
        lb.classList.add('is-open');
        document.body.style.overflow = 'hidden';
      });
    });
  }

  // ── Marquee duplication for seamless scroll ─────────
  document.querySelectorAll('.marquee__track').forEach(track => {
    track.innerHTML += track.innerHTML;
  });

  // ── Cursor follower (subtle) ────────────────────────
  if (window.matchMedia('(prefers-reduced-motion: no-preference)').matches && window.matchMedia('(pointer: fine)').matches) {
    const cursor = document.createElement('div');
    cursor.className = 'cursor-dot';
    document.body.appendChild(cursor);
    let cx = 0, cy = 0, tx = 0, ty = 0;
    document.addEventListener('mousemove', (e) => { tx = e.clientX; ty = e.clientY; });
    const tick = () => {
      cx += (tx - cx) * 0.18;
      cy += (ty - cy) * 0.18;
      cursor.style.transform = `translate(${cx}px, ${cy}px)`;
      requestAnimationFrame(tick);
    };
    tick();
    document.querySelectorAll('a, button, .project-card, .tier, .gc-card, .gallery__item').forEach(el => {
      el.addEventListener('mouseenter', () => cursor.classList.add('is-hover'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('is-hover'));
    });
  }

})();
