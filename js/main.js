/* ================================================================
   Tech Dream Africa — Main JavaScript v2.0
   ================================================================ */
(function () {
  'use strict';

  /* Ensure light mode — clear any stored dark theme preference */
  localStorage.removeItem('tda-theme');
  document.documentElement.classList.remove('dark');

  /* ---------------------------------------------------------------
     0. Announcement Bar
  --------------------------------------------------------------- */
  document.getElementById('close-announce')?.addEventListener('click', function () {
    var bar = document.getElementById('ms-announce');
    if (bar) bar.remove();
  });

  /* ---------------------------------------------------------------
     2. Mobile Menu Drawer
  --------------------------------------------------------------- */
  var overlay  = document.getElementById('mobile-menu-overlay');
  var openBtn  = document.getElementById('mobile-menu-open');
  var closeBtn = document.getElementById('mobile-menu-close');
  var backdrop = document.getElementById('mobile-menu-backdrop');

  function openMenu()  { if (overlay) { overlay.classList.add('open'); document.body.style.overflow = 'hidden'; } }
  function closeMenu() { if (overlay) { overlay.classList.remove('open'); document.body.style.overflow = ''; } }

  if (openBtn)  openBtn.addEventListener('click', openMenu);
  if (closeBtn) closeBtn.addEventListener('click', closeMenu);
  if (backdrop) backdrop.addEventListener('click', closeMenu);

  document.querySelectorAll('.mobile-nav-link').forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  /* ---------------------------------------------------------------
     3. Navbar Scroll Behaviour
  --------------------------------------------------------------- */
  var nav = document.getElementById('main-nav');
  if (nav) {
    window.addEventListener('scroll', function () {
      nav.classList.toggle('scrolled', window.scrollY > 30);
    }, { passive: true });
  }

  /* ---------------------------------------------------------------
     4. Animated Counters
  --------------------------------------------------------------- */
  function animateCount(el) {
    var target   = parseInt(el.getAttribute('data-target'), 10) || 0;
    var suffix   = el.getAttribute('data-suffix') || '';
    var prefix   = el.getAttribute('data-prefix') || '';
    var duration = 2000;
    var start    = performance.now();

    (function tick(now) {
      var p = Math.min((now - start) / duration, 1);
      var ease = 1 - Math.pow(1 - p, 3);
      el.textContent = prefix + Math.floor(ease * target) + suffix;
      if (p < 1) requestAnimationFrame(tick);
    })(start);
  }

  var countObs = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { animateCount(e.target); countObs.unobserve(e.target); }
    });
  }, { threshold: 0.6 });

  document.querySelectorAll('[data-counter]').forEach(function (el) {
    countObs.observe(el);
  });

  /* ---------------------------------------------------------------
     5. Scroll Reveal
  --------------------------------------------------------------- */
  var revealObs = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('visible'); revealObs.unobserve(e.target); }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -32px 0px' });

  document.querySelectorAll('.reveal,.reveal-left,.reveal-right,.reveal-scale').forEach(function (el) {
    revealObs.observe(el);
  });

  /* ---------------------------------------------------------------
     6. Back to Top
  --------------------------------------------------------------- */
  var btt = document.getElementById('back-to-top');
  if (btt) {
    window.addEventListener('scroll', function () {
      btt.classList.toggle('visible', window.scrollY > 400);
    }, { passive: true });
    btt.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---------------------------------------------------------------
     7. FAQ Accordion
  --------------------------------------------------------------- */
  document.querySelectorAll('.faq-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var item   = btn.closest('.faq-item');
      var isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(function (o) { o.classList.remove('open'); });
      if (!isOpen) item.classList.add('open');
    });
  });

  /* ---------------------------------------------------------------
     8. Tech Stack Tabs
  --------------------------------------------------------------- */
  var techTabs   = document.querySelectorAll('.tech-tab');
  var techPanels = document.querySelectorAll('.tech-panel');

  function activateTab(id) {
    techTabs.forEach(function (t) { t.classList.toggle('active', t.dataset.tab === id); });
    techPanels.forEach(function (p) { p.classList.toggle('active', p.id === 'tp-' + id); });
  }

  techTabs.forEach(function (t) {
    t.addEventListener('click', function () { activateTab(t.dataset.tab); });
  });
  if (techTabs.length) activateTab(techTabs[0].dataset.tab);

  /* ---------------------------------------------------------------
     9. Testimonials Carousel
  --------------------------------------------------------------- */
  var tCarousel = document.getElementById('testimonial-carousel');
  if (tCarousel) {
    var track   = tCarousel.querySelector('.testimonial-track');
    var slides  = tCarousel.querySelectorAll('.testimonial-slide');
    var prevBtn = document.getElementById('t-prev');
    var nextBtn = document.getElementById('t-next');
    var dotsEl  = document.getElementById('t-dots');
    var cur     = 0;
    var total   = slides.length;
    var timer;

    function buildDots() {
      if (!dotsEl || total <= 1) return;
      for (var i = 0; i < total; i++) {
        var d = document.createElement('button');
        d.setAttribute('aria-label', 'Slide ' + (i + 1));
        d.dataset.idx = i;
        d.className = 'rounded-full transition-all duration-300 h-2 ' + (i === 0 ? 'w-6 bg-blue-600' : 'w-2 bg-slate-300 dark:bg-slate-600');
        d.addEventListener('click', function () { goTo(parseInt(this.dataset.idx)); });
        dotsEl.appendChild(d);
      }
    }

    function updateDots() {
      if (!dotsEl) return;
      dotsEl.querySelectorAll('button').forEach(function (d, i) {
        d.className = 'rounded-full transition-all duration-300 h-2 ' + (i === cur ? 'w-6 bg-blue-600' : 'w-2 bg-slate-300 dark:bg-slate-600');
      });
    }

    function goTo(idx) {
      cur = ((idx % total) + total) % total;
      if (track) track.style.transform = 'translateX(-' + (cur * 100) + '%)';
      updateDots();
    }

    function startTimer() { timer = setInterval(function () { goTo(cur + 1); }, 5500); }
    function stopTimer()  { clearInterval(timer); }

    buildDots();
    if (prevBtn) prevBtn.addEventListener('click', function () { stopTimer(); goTo(cur - 1); startTimer(); });
    if (nextBtn) nextBtn.addEventListener('click', function () { stopTimer(); goTo(cur + 1); startTimer(); });
    tCarousel.addEventListener('mouseenter', stopTimer);
    tCarousel.addEventListener('mouseleave', startTimer);
    startTimer();
  }

  /* ---------------------------------------------------------------
     10. Cookie Consent
  --------------------------------------------------------------- */
  var cookieBanner = document.getElementById('cookie-banner');
  if (cookieBanner && !localStorage.getItem('tda-cookies')) {
    setTimeout(function () { cookieBanner.classList.add('show'); }, 2000);
  }
  var cookieAccept = document.getElementById('cookie-accept');
  if (cookieAccept) {
    cookieAccept.addEventListener('click', function () {
      localStorage.setItem('tda-cookies', '1');
      if (cookieBanner) cookieBanner.classList.remove('show');
    });
  }
  var cookieDecline = document.getElementById('cookie-decline');
  if (cookieDecline) {
    cookieDecline.addEventListener('click', function () {
      if (cookieBanner) cookieBanner.classList.remove('show');
    });
  }

  /* ---------------------------------------------------------------
     11. Smooth Scroll for Anchor Links
  --------------------------------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var href = a.getAttribute('href');
      if (href && href.length > 1) {
        var target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          var navH = nav ? nav.offsetHeight : 80;
          var top  = target.getBoundingClientRect().top + window.scrollY - navH - 16;
          window.scrollTo({ top: top, behavior: 'smooth' });
        }
      }
    });
  });

  /* ---------------------------------------------------------------
     12. Portfolio Filter
  --------------------------------------------------------------- */
  var pfBtns  = document.querySelectorAll('.portfolio-filter');
  var pfItems = document.querySelectorAll('.portfolio-item');

  pfBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var filter = btn.dataset.filter;
      pfBtns.forEach(function (b) {
        b.classList.toggle('bg-blue-600', b === btn);
        b.classList.toggle('text-white',  b === btn);
        b.classList.toggle('border-blue-600', b === btn);
        b.classList.toggle('border-slate-200', b !== btn);
        html.classList.contains('dark')
          ? b.classList.toggle('border-slate-700', b !== btn)
          : true;
      });
      pfItems.forEach(function (item) {
        var show = filter === 'all' || item.dataset.category === filter;
        item.style.transition = 'opacity .3s ease, transform .3s ease';
        if (show) {
          item.style.display = '';
          requestAnimationFrame(function () {
            item.style.opacity = '1'; item.style.transform = 'scale(1)';
          });
        } else {
          item.style.opacity = '0'; item.style.transform = 'scale(.95)';
          setTimeout(function () { item.style.display = 'none'; }, 300);
        }
      });
    });
  });

})();
