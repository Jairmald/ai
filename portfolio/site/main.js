/* ============================================================
   Jair Maldonado — portfolio
   Three small things: the triage strip, the theme toggle,
   and nav highlighting. No dependencies.
   ============================================================ */

(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- the triage strip -------------------------------
     A band of ticks. Most are muted and short; a few are amber
     and full height. Which ones are "signal" is fixed, not
     random — the same shape every visit.
     ---------------------------------------------------------- */
  function buildTriage() {
    var strip = document.getElementById('triageStrip');
    if (!strip) return;

    var width = strip.clientWidth || 800;
    var total = Math.max(48, Math.min(170, Math.floor(width / 7)));

    // Positions expressed as fractions so the pattern holds at any width.
    var signalAt = [0.17, 0.41, 0.58, 0.79, 0.93].map(function (f) {
      return Math.round(f * (total - 1));
    });

    var frag = document.createDocumentFragment();

    for (var i = 0; i < total; i++) {
      var tick = document.createElement('span');
      tick.className = 'tick';

      if (signalAt.indexOf(i) !== -1) {
        tick.className += ' is-signal';
      } else {
        // Vary the muted ticks so the band reads as noise rather than as a
        // ruler. A plain modulo produces a visible sawtooth, so hash the
        // index first — deterministic, but without an obvious period.
        var h = i * 2654435761 % 4294967296;
        h = (h ^ (h >>> 15)) >>> 0;
        tick.style.height = (24 + (h % 26)) + '%';
      }

      if (!reduceMotion) {
        tick.style.animationDelay = (i * 5) + 'ms';
      }
      frag.appendChild(tick);
    }

    strip.textContent = '';
    strip.appendChild(frag);
  }

  buildTriage();

  var resizeTimer;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(buildTriage, 200);
  });

  /* ---------- theme toggle -----------------------------------
     Cycles auto → light → dark. "Auto" follows the OS, which is
     the right default; the override is for people whose OS
     setting doesn't match where they're reading.
     ---------------------------------------------------------- */
  var ORDER = ['auto', 'light', 'dark'];
  var LABEL = { auto: 'Auto', light: 'Light', dark: 'Dark' };
  var root = document.documentElement;
  var toggle = document.getElementById('themeToggle');
  var label = document.getElementById('themeLabel');

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    if (label) label.textContent = LABEL[theme];
    if (toggle) {
      toggle.setAttribute('aria-label', 'Colour theme: ' + LABEL[theme] + '. Click to change.');
    }
    try { localStorage.setItem('theme', theme); } catch (e) { /* private mode */ }
  }

  var stored;
  try { stored = localStorage.getItem('theme'); } catch (e) { stored = null; }
  applyTheme(ORDER.indexOf(stored) !== -1 ? stored : 'auto');

  if (toggle) {
    toggle.addEventListener('click', function () {
      var current = root.getAttribute('data-theme') || 'auto';
      var next = ORDER[(ORDER.indexOf(current) + 1) % ORDER.length];
      applyTheme(next);
    });
  }

  /* ---------- nav highlighting ------------------------------- */
  var links = Array.prototype.slice.call(
    document.querySelectorAll('.topbar-nav a')
  );

  if (links.length && 'IntersectionObserver' in window) {
    var byId = {};
    var sections = [];

    links.forEach(function (link) {
      var id = link.getAttribute('href').slice(1);
      var section = document.getElementById(id);
      if (section) {
        byId[id] = link;
        sections.push(section);
      }
    });

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        var link = byId[entry.target.id];
        if (!link) return;
        if (entry.isIntersecting) {
          links.forEach(function (l) { l.removeAttribute('aria-current'); });
          link.setAttribute('aria-current', 'true');
        }
      });
    }, { rootMargin: '-25% 0px -65% 0px' });

    sections.forEach(function (s) { observer.observe(s); });
  }

  /* ---------- footer year ---------- */
  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();
