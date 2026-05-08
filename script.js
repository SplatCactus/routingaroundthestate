'use strict';

/* ============================================================
   THEME TOGGLE
   Reads localStorage on load (FOUC already prevented by inline
   <head> script). On click, toggles [data-theme] on <html> and
   persists the choice. aria-label and icon visibility are driven
   by CSS ([data-theme] + @media) — JS only updates aria-label.
   ============================================================ */
(function () {
  var html = document.documentElement;
  var btn  = document.getElementById('theme-toggle');
  if (!btn) return;

  function getEffectiveTheme() {
    var attr = html.getAttribute('data-theme');
    if (attr === 'dark' || attr === 'light') return attr;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function updateLabel() {
    var isDark = getEffectiveTheme() === 'dark';
    btn.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
  }

  updateLabel();

  btn.addEventListener('click', function () {
    var next = getEffectiveTheme() === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    updateLabel();
  });
}());


/* ============================================================
   HAMBURGER NAV TOGGLE
   The HTML ships with aria-expanded="false" and the links hidden
   (via .js selector in CSS). This script manages open/close state.
   ============================================================ */
(function () {
  const toggle = document.getElementById('nav-toggle');
  const menu   = document.getElementById('nav-menu');

  if (!toggle || !menu) return;

  function openMenu() {
    menu.classList.add('is-open');
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('aria-label', 'Close navigation menu');
  }

  function closeMenu() {
    menu.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open navigation menu');
  }

  toggle.addEventListener('click', function () {
    const isOpen = menu.classList.contains('is-open');
    isOpen ? closeMenu() : openMenu();
  });

  /* Close menu when a nav link is activated (anchor navigation) */
  menu.addEventListener('click', function (e) {
    if (e.target.classList.contains('nav__link')) {
      closeMenu();
    }
  });

  /* Close menu on Escape key */
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && menu.classList.contains('is-open')) {
      closeMenu();
      toggle.focus();
    }
  });

  /* Close menu when focus moves outside the header */
  document.addEventListener('focusin', function (e) {
    const header = document.querySelector('.site-header');
    if (header && !header.contains(e.target)) {
      closeMenu();
    }
  });
}());


/* ============================================================
   READING PROGRESS BAR
   rAF-throttled scroll listener. Width = scrolled / scrollable.
   ============================================================ */
(function () {
  var bar = document.getElementById('progress-bar');
  if (!bar) return;

  var ticking = false;

  function updateBar() {
    var scrollTop  = window.scrollY || document.documentElement.scrollTop;
    var docHeight  = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    var pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    bar.style.width = Math.min(pct, 100) + '%';
    ticking = false;
  }

  window.addEventListener('scroll', function () {
    if (!ticking) {
      requestAnimationFrame(updateBar);
      ticking = true;
    }
  }, { passive: true });
}());


/* ============================================================
   ACTIVE NAV LINK — highlights the link for the visible section
   Uses IntersectionObserver; degrades gracefully if unsupported.
   ============================================================ */
(function () {
  if (!('IntersectionObserver' in window)) return;

  const sections = document.querySelectorAll('main [id]');
  const navLinks = document.querySelectorAll('.nav__link[href^="#"]');

  if (!sections.length || !navLinks.length) return;

  function setActive(id) {
    navLinks.forEach(function (link) {
      const isCurrent = link.getAttribute('href') === '#' + id;
      link.classList.toggle('nav__link--active', isCurrent);
      if (isCurrent) {
        link.setAttribute('aria-current', 'location');
      } else {
        link.removeAttribute('aria-current');
      }
    });
  }

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          setActive(entry.target.id);
        }
      });
    },
    {
      rootMargin: '-20% 0px -70% 0px',   /* trigger when section crosses ~20% from top */
      threshold: 0
    }
  );

  sections.forEach(function (section) {
    observer.observe(section);
  });
}());


/* ============================================================
   HERO HEADLINE — word-by-word entrance
   Splits textContent on spaces, wraps each word in a <span>,
   and staggers animation-delay by 0.08s per word.
   On mobile the whole headline fades in at once instead.
   Does nothing if the headline has no text yet (placeholder state).
   ============================================================ */
(function () {
  var h1 = document.getElementById('hero-heading');
  if (!h1) return;

  var text = h1.textContent.trim();
  if (!text) return; /* comment-only placeholder — bail gracefully */

  var isDesktop = window.matchMedia('(min-width: 48.0625rem)').matches;

  if (isDesktop) {
    /* Word-by-word: build spans via DOM (no innerHTML XSS risk) */
    var words = text.split(/\s+/).filter(Boolean);
    var fragment = document.createDocumentFragment();
    words.forEach(function (word, i) {
      if (i > 0) fragment.appendChild(document.createTextNode(' '));
      var span = document.createElement('span');
      span.className = 'hero__word';
      span.textContent = word;
      span.style.animationDelay = (0.3 + i * 0.08) + 's';
      fragment.appendChild(span);
    });
    h1.textContent = '';
    h1.appendChild(fragment);
  } else {
    /* Mobile: single fade on the whole element */
    h1.classList.add('hero__headline--fade-in');
  }
}());


/* ============================================================
   SCROLL REVEAL
   Observes .reveal elements plus structural prose/flow targets.
   JS sets --reveal-delay for stagger groups, then adds .revealed
   when elements enter the viewport. No transforms touched here.
   ============================================================ */
(function () {

  /* Fallback: if IntersectionObserver is missing, show everything */
  if (!('IntersectionObserver' in window)) {
    document.querySelectorAll('.reveal').forEach(function (el) {
      el.classList.add('revealed');
    });
    document.querySelectorAll('.prose p').forEach(function (el) {
      el.classList.add('revealed');
    });
    return;
  }

  /* ── Assign stagger delays ─────────────────────────────────── */

  /* Prose paragraphs: 0.1s per paragraph within each .prose block */
  document.querySelectorAll('.prose').forEach(function (prose) {
    prose.querySelectorAll('p').forEach(function (p, i) {
      p.style.setProperty('--reveal-delay', (i * 0.1) + 's');
    });
  });

  /* Feature items: fixed 0s / 0.15s / 0.3s */
  document.querySelectorAll('.feature-item.reveal--up').forEach(function (item, i) {
    var delays = [0, 0.15, 0.3];
    item.style.setProperty('--reveal-delay', (delays[i] !== undefined ? delays[i] : 0) + 's');
  });

  /* Defaults cards: same 0s / 0.15s / 0.3s stagger */
  document.querySelectorAll('.defaults-card.reveal--up').forEach(function (item, i) {
    var delays = [0, 0.15, 0.3];
    item.style.setProperty('--reveal-delay', (delays[i] !== undefined ? delays[i] : 0) + 's');
  });

  /* ── Observer factory ──────────────────────────────────────── */

  function makeObserver(rootMargin, onEnter) {
    return new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          onEnter(entry.target);
        }
      });
    }, { threshold: 0, rootMargin: rootMargin });
  }

  /* ── Individual elements: H2s, pull quote, donate button ───── */

  var soloObserver = makeObserver('0px 0px -10% 0px', function (el) {
    el.classList.add('revealed');
    soloObserver.unobserve(el);
  });

  document.querySelectorAll(
    '.section__title.reveal--up, .pullquote.reveal--left, .reveal--pulse, .thesis-bridge.reveal--up'
  ).forEach(function (el) {
    soloObserver.observe(el);
  });

  /* ── Prose blocks: reveal all paragraphs when block enters ─── */

  var proseObserver = makeObserver('0px 0px -8% 0px', function (prose) {
    prose.querySelectorAll('p').forEach(function (p) {
      p.classList.add('revealed');
    });
    proseObserver.unobserve(prose);
  });

  document.querySelectorAll('.prose').forEach(function (prose) {
    proseObserver.observe(prose);
  });

  /* ── Feature grid: reveal all columns as one group ─────────── */

  var featureObserver = makeObserver('0px 0px -5% 0px', function (grid) {
    grid.querySelectorAll('.feature-item.reveal--up').forEach(function (item) {
      item.classList.add('revealed');
    });
    featureObserver.unobserve(grid);
  });

  var featureGrid = document.querySelector('.feature-grid');
  if (featureGrid) featureObserver.observe(featureGrid);

  /* ── Defaults cards: reveal all three as one group ─────────── */

  var defaultsCardsObserver = makeObserver('0px 0px -5% 0px', function (grid) {
    grid.querySelectorAll('.defaults-card.reveal--up').forEach(function (item) {
      item.classList.add('revealed');
    });
    defaultsCardsObserver.unobserve(grid);
  });

  var defaultsCards = document.querySelector('.defaults-cards');
  if (defaultsCards) defaultsCardsObserver.observe(defaultsCards);

}());


/* ============================================================
   DONATE AMOUNT SELECTOR
   Toggle buttons set aria-pressed and drive the impact sentence.
   "Other" reveals a free-text input. The donate button href gets
   an amount query param appended once the base URL is real.
   ============================================================ */
(function () {
  var selector = document.getElementById('amount-selector');
  if (!selector) return;

  var buttons    = selector.querySelectorAll('.amount-btn');
  var customWrap = document.getElementById('amount-custom');
  var customInput = document.getElementById('amount-custom-input');
  var donateLink = document.getElementById('donate-btn');

  /* [PLACEHOLDER: set BASE_URL to the United for Iran donation page URL,
     then verify whether their platform supports an "amount=" or
     "suggested_amount=" query param for pre-filling the gift amount.] */
  var BASE_URL = donateLink ? donateLink.getAttribute('href') : '#';


  function setDonateHref(amount) {
    if (!donateLink || BASE_URL === '#') return;
    /* Only append param when a preset dollar amount is chosen.
       [PLACEHOLDER: confirm param name with United for Iran before launch.] */
    donateLink.setAttribute(
      'href',
      (amount && amount !== 'other')
        ? BASE_URL + (BASE_URL.includes('?') ? '&' : '?') + 'amount=' + amount
        : BASE_URL
    );
  }

  function select(btn) {
    var amount = btn.dataset.amount;

    /* Toggle aria-pressed across all buttons */
    buttons.forEach(function (b) {
      b.setAttribute('aria-pressed', b === btn ? 'true' : 'false');
    });

    if (amount === 'other') {
      customWrap.hidden = false;
      if (customInput) customInput.focus();
      setDonateHref(null);
    } else {
      customWrap.hidden = true;
      setDonateHref(amount);
    }
  }

  /* Wire preset buttons */
  buttons.forEach(function (btn) {
    btn.addEventListener('click', function () { select(btn); });
  });

  /* Update href as user types a custom amount */
  if (customInput) {
    customInput.addEventListener('input', function () {
      var val = parseInt(customInput.value, 10);
      setDonateHref(val > 0 ? String(val) : null);
    });
  }

  /* $10 selected by default */
  var defaultBtn = selector.querySelector('[data-amount="10"]');
  if (defaultBtn) select(defaultBtn);
}());


/* ============================================================
   INTERACTIVE FLOW DIAGRAM
   Manages the step card accordion in #legal.
   Clicking a card expands its detail panel (max-height transition).
   Clicking the active card collapses it. Step 1 is open by default.
   ============================================================ */
(function () {
  var diagram = document.getElementById('flow-diagram');
  if (!diagram) return;

  var triggers = diagram.querySelectorAll('.flow-card__trigger');
  if (!triggers.length) return;

  function openTrigger(trigger) {
    var panelId = trigger.getAttribute('aria-controls');
    var panel = document.getElementById(panelId);
    if (!panel) return;

    /* Close every other trigger and panel */
    triggers.forEach(function (t) {
      if (t === trigger) return;
      t.setAttribute('aria-expanded', 'false');
      var p = document.getElementById(t.getAttribute('aria-controls'));
      if (p) p.classList.remove('is-open');
    });

    trigger.setAttribute('aria-expanded', 'true');
    panel.classList.add('is-open');
  }

  function closeTrigger(trigger) {
    var panelId = trigger.getAttribute('aria-controls');
    var panel = document.getElementById(panelId);
    if (!panel) return;
    trigger.setAttribute('aria-expanded', 'false');
    panel.classList.remove('is-open');
  }

  /* Step 1 open on load */
  openTrigger(triggers[0]);

  triggers.forEach(function (trigger) {
    trigger.addEventListener('click', function () {
      if (trigger.getAttribute('aria-expanded') === 'true') {
        closeTrigger(trigger);
      } else {
        openTrigger(trigger);
      }
    });
  });

  /* ── "Why this matters" explainer toggle ─────────────────── */

  var explainerBtn   = document.getElementById('flow-explainer-btn');
  var explainerPanel = document.getElementById('flow-explainer-panel');

  if (!explainerBtn || !explainerPanel) return;

  explainerBtn.addEventListener('click', function () {
    var isOpen = explainerPanel.classList.toggle('is-open');
    explainerBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });
}());


/* ============================================================
   FAQ ACCORDION
   One item open at a time. max-height transition for smooth
   expand/collapse. JS adds .faq__item--open for the tint.
   ============================================================ */
(function () {
  var list = document.querySelector('.faq__list');
  if (!list) return;

  var items = list.querySelectorAll('.faq__item');

  function openItem(item) {
    var trigger = item.querySelector('.faq__trigger');
    var panel   = document.getElementById(trigger.getAttribute('aria-controls'));
    if (!panel) return;
    trigger.setAttribute('aria-expanded', 'true');
    panel.classList.add('is-open');
    item.classList.add('faq__item--open');
  }

  function closeItem(item) {
    var trigger = item.querySelector('.faq__trigger');
    var panel   = document.getElementById(trigger.getAttribute('aria-controls'));
    if (!panel) return;
    trigger.setAttribute('aria-expanded', 'false');
    panel.classList.remove('is-open');
    item.classList.remove('faq__item--open');
  }

  items.forEach(function (item) {
    item.querySelector('.faq__trigger').addEventListener('click', function () {
      var isOpen = this.getAttribute('aria-expanded') === 'true';
      items.forEach(closeItem);
      if (!isOpen) openItem(item);
    });
  });
}());


/* ============================================================
   SHARE BLOCK
   "Copy link" uses Clipboard API and shows a 2-second confirmation.
   "Email a friend" is a plain <a> — no JS needed.
   "Print this page" calls window.print().
   ============================================================ */
(function () {
  var copyBtn = document.getElementById('share-copy');
  if (!copyBtn) return;

  var label = copyBtn.querySelector('span');

  copyBtn.addEventListener('click', function () {
    navigator.clipboard.writeText(window.location.href).then(function () {
      label.textContent = 'Copied ✓';
      copyBtn.classList.add('share-btn--copied');
      setTimeout(function () {
        label.textContent = 'Copy link';
        copyBtn.classList.remove('share-btn--copied');
      }, 2000);
    }).catch(function () {
      /* Clipboard API unavailable (HTTP, old browser) — silent fail */
    });
  });

  var printBtn = document.getElementById('share-print');
  if (printBtn) {
    printBtn.addEventListener('click', function () {
      window.print();
    });
  }
}());


/* ============================================================
   SERVICE WORKER REGISTRATION
   Cache-first shell for offline viewing. Only registers on
   HTTPS (or localhost) — degrades gracefully if unavailable.
   ============================================================ */
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function () {
    navigator.serviceWorker.register('/sw.js').catch(function () {});
  });
}
