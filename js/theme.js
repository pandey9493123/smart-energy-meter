/* ============================================================
   SMART ENERGY METER - THEME MANAGEMENT SYSTEM
   Version: 2.0
   Author: Om Pandey
   Description: Dark/Light mode toggle with smooth transitions
                and localStorage persistence
============================================================ */

(function() {
  'use strict';

  /* ============================================================
     CONSTANTS
  ============================================================ */
  const STORAGE_KEY  = 'sem-theme';
  const THEME_DARK   = 'dark';
  const THEME_LIGHT  = 'light';
  const THEME_AUTO   = 'auto';

  const HTML = document.documentElement;

  /* ============================================================
     APPLY THEME IMMEDIATELY (BEFORE PAGE PAINTS)
     This prevents the "flash of wrong theme" on page load
  ============================================================ */
  const savedTheme = localStorage.getItem(STORAGE_KEY) || THEME_DARK;

  if (savedTheme === THEME_AUTO) {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    HTML.setAttribute('data-theme', prefersDark ? THEME_DARK : THEME_LIGHT);
  } else {
    HTML.setAttribute('data-theme', savedTheme);
  }

  /* Prevent transition flash on initial load */
  HTML.classList.add('no-transition');
  window.addEventListener('load', function() {
    setTimeout(function() {
      HTML.classList.remove('no-transition');
    }, 100);
  });


  /* ============================================================
     THEME MANAGER OBJECT
  ============================================================ */
  window.ThemeManager = {

    /* ── Get current theme ── */
    getCurrentTheme: function() {
      return HTML.getAttribute('data-theme') || THEME_DARK;
    },

    /* ── Set specific theme ── */
    setTheme: function(theme) {
      if (theme !== THEME_DARK && theme !== THEME_LIGHT) {
        console.warn('Invalid theme:', theme);
        return;
      }

      HTML.setAttribute('data-theme', theme);
      localStorage.setItem(STORAGE_KEY, theme);

      /* Update all theme toggle buttons on page */
      this.updateToggleIcons();

      /* Update meta theme-color (mobile browser color) */
      this.updateMetaThemeColor(theme);

      /* Dispatch custom event so other scripts can react */
      window.dispatchEvent(new CustomEvent('themechange', { detail: { theme: theme } }));
    },

    /* ── Toggle between dark and light ── */
    toggle: function() {
      const current = this.getCurrentTheme();
      const newTheme = current === THEME_DARK ? THEME_LIGHT : THEME_DARK;

      /* Add ripple effect from click point */
      this.addRippleEffect();

      this.setTheme(newTheme);
      this.showToast(newTheme);
    },

    /* ── Update meta theme-color for mobile browsers ── */
    updateMetaThemeColor: function(theme) {
      let meta = document.querySelector('meta[name="theme-color"]');
      if (!meta) {
        meta = document.createElement('meta');
        meta.name = 'theme-color';
        document.head.appendChild(meta);
      }
      meta.content = theme === THEME_DARK ? '#0B1120' : '#F8FAFC';
    },

    /* ── Update all toggle button icons on page ── */
    updateToggleIcons: function() {
      const toggles = document.querySelectorAll('.theme-toggle');
      const isLight = this.getCurrentTheme() === THEME_LIGHT;

      toggles.forEach(function(toggle) {
        toggle.setAttribute('aria-label', isLight ? 'Switch to dark mode' : 'Switch to light mode');
        toggle.setAttribute('title',      isLight ? 'Switch to dark mode' : 'Switch to light mode');
      });
    },

    /* ── Toast notification when theme changes ── */
    showToast: function(theme) {
      /* Remove existing theme toast */
      const existing = document.getElementById('theme-toast');
      if (existing) existing.remove();

      const toast = document.createElement('div');
      toast.id = 'theme-toast';
      toast.style.cssText = `
        position: fixed;
        bottom: 30px;
        left: 50%;
        transform: translateX(-50%) translateY(100px);
        background: var(--bg-card-solid);
        border: 1px solid var(--border);
        border-radius: 50px;
        padding: 10px 20px;
        display: flex;
        align-items: center;
        gap: 10px;
        font-family: 'Poppins', sans-serif;
        font-size: 0.85rem;
        color: var(--text-primary);
        box-shadow: var(--shadow-lg);
        z-index: 99999;
        opacity: 0;
        transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        pointer-events: none;
      `;

      const icon = theme === THEME_DARK ? '🌙' : '☀️';
      const text = theme === THEME_DARK ? 'Dark Mode' : 'Light Mode';
      toast.innerHTML = `<span style="font-size:1.1rem;">${icon}</span> <span>${text}</span>`;

      document.body.appendChild(toast);

      /* Slide up + fade in */
      requestAnimationFrame(function() {
        toast.style.opacity = '1';
        toast.style.transform = 'translateX(-50%) translateY(0)';
      });

      /* Auto-hide after 1.8s */
      setTimeout(function() {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(-50%) translateY(100px)';
        setTimeout(function() { toast.remove(); }, 400);
      }, 1800);
    },

    /* ── Create ripple effect from center of screen ── */
    addRippleEffect: function() {
      const ripple = document.createElement('div');
      const isDarkToLight = this.getCurrentTheme() === THEME_DARK;

      ripple.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: ${isDarkToLight ? '#F8FAFC' : '#0B1120'};
        transform: translate(-50%, -50%) scale(0);
        pointer-events: none;
        z-index: 99998;
        transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.4s ease 0.5s;
        opacity: 0.6;
      `;

      document.body.appendChild(ripple);

      requestAnimationFrame(function() {
        ripple.style.transform = 'translate(-50%, -50%) scale(300)';
      });

      setTimeout(function() {
        ripple.style.opacity = '0';
      }, 400);

      setTimeout(function() {
        ripple.remove();
      }, 1000);
    },

    /* ── Init theme system ── */
    init: function() {
      /* Set initial toggle icons */
      this.updateToggleIcons();

      /* Set initial meta theme color */
      this.updateMetaThemeColor(this.getCurrentTheme());

      /* Listen for system theme changes (if user has AUTO mode) */
      if (window.matchMedia) {
        const mq = window.matchMedia('(prefers-color-scheme: dark)');
        mq.addEventListener('change', function(e) {
          if (localStorage.getItem(STORAGE_KEY) === THEME_AUTO) {
            HTML.setAttribute('data-theme', e.matches ? THEME_DARK : THEME_LIGHT);
          }
        });
      }

      /* Attach click handlers to all theme toggle buttons */
      const attachToggles = function() {
        const toggles = document.querySelectorAll('.theme-toggle');
        toggles.forEach(function(toggle) {
          if (!toggle.hasAttribute('data-theme-attached')) {
            toggle.setAttribute('data-theme-attached', 'true');
            toggle.addEventListener('click', function(e) {
              e.preventDefault();
              window.ThemeManager.toggle();
            });
          }
        });
      };

      attachToggles();

      /* Re-attach on DOM changes (for dynamically added toggles) */
      if (window.MutationObserver) {
        const observer = new MutationObserver(attachToggles);
        observer.observe(document.body, { childList: true, subtree: true });
      }

      /* Keyboard shortcut: Ctrl/Cmd + Shift + L */
      document.addEventListener('keydown', function(e) {
        if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'L') {
          e.preventDefault();
          window.ThemeManager.toggle();
        }
      });
    }
  };


  /* ============================================================
     REUSABLE TOAST NOTIFICATION SYSTEM
     Usage: Toast.success('Message'), Toast.error('Message'), etc.
  ============================================================ */
  window.Toast = {

    /* ── Get or create container ── */
    _getContainer: function() {
      let container = document.getElementById('toast-container');
      if (!container) {
        container = document.createElement('div');
        container.id = 'toast-container';
        container.className = 'toast-container';
        document.body.appendChild(container);
      }
      return container;
    },

    /* ── Generic show method ── */
    show: function(message, type, duration) {
      type     = type     || 'info';
      duration = duration || 3500;

      const container = this._getContainer();

      const icons = {
        success: '✅',
        error:   '❌',
        warning: '⚠️',
        info:    'ℹ️'
      };

      const toast = document.createElement('div');
      toast.className = 'toast ' + type;
      toast.innerHTML = `
        <span class="toast-icon">${icons[type] || icons.info}</span>
        <span class="toast-msg">${message}</span>
      `;

      container.appendChild(toast);

      /* Trigger animation */
      requestAnimationFrame(function() {
        toast.classList.add('show');
      });

      /* Auto remove */
      setTimeout(function() {
        toast.classList.remove('show');
        setTimeout(function() {
          if (toast.parentNode) toast.remove();
        }, 400);
      }, duration);

      return toast;
    },

    success: function(msg, dur) { return this.show(msg, 'success', dur); },
    error:   function(msg, dur) { return this.show(msg, 'error',   dur); },
    warning: function(msg, dur) { return this.show(msg, 'warning', dur); },
    info:    function(msg, dur) { return this.show(msg, 'info',    dur); }
  };


  /* ============================================================
     SCROLL PROGRESS BAR
     Automatically adds a progress bar at top of page
  ============================================================ */
  window.ScrollProgress = {
    init: function() {
      /* Only add if not already present */
      if (document.querySelector('.scroll-progress')) return;

      const bar = document.createElement('div');
      bar.className = 'scroll-progress';
      document.body.appendChild(bar);

      const updateProgress = function() {
        const scrollTop    = window.scrollY;
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const percent      = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
        bar.style.width = percent + '%';
      };

      window.addEventListener('scroll', updateProgress, { passive: true });
      updateProgress();
    }
  };


  /* ============================================================
     COUNTER ANIMATION (for statistics section)
     Usage: <span data-counter="1000">0</span>
  ============================================================ */
  window.CounterAnimation = {

    animate: function(el, target, duration) {
      duration = duration || 2000;
      const start    = 0;
      const startTime = performance.now();
      const isFloat  = target % 1 !== 0;

      const update = function(currentTime) {
        const elapsed  = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        /* easeOutQuart easing */
        const eased    = 1 - Math.pow(1 - progress, 4);
        const value    = start + (target - start) * eased;

        el.textContent = isFloat ? value.toFixed(1) : Math.floor(value).toLocaleString();

        if (progress < 1) {
          requestAnimationFrame(update);
        } else {
          el.textContent = isFloat ? target.toFixed(1) : target.toLocaleString();
        }
      };

      requestAnimationFrame(update);
    },

    init: function() {
      const counters = document.querySelectorAll('[data-counter]');
      if (counters.length === 0) return;

      const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            const el     = entry.target;
            const target = parseFloat(el.getAttribute('data-counter'));
            const duration = parseInt(el.getAttribute('data-duration')) || 2000;

            if (!el.hasAttribute('data-counted')) {
              el.setAttribute('data-counted', 'true');
              window.CounterAnimation.animate(el, target, duration);
            }
          }
        });
      }, { threshold: 0.3 });

      counters.forEach(function(counter) {
        observer.observe(counter);
      });
    }
  };


  /* ============================================================
     TYPEWRITER EFFECT
     Usage: <span class="typewriter" data-words="Hello,World,Welcome"></span>
  ============================================================ */
  window.Typewriter = {

    init: function() {
      const elements = document.querySelectorAll('.typewriter');
      elements.forEach(function(el) {
        const words = el.getAttribute('data-words');
        if (!words) return;

        const wordArray  = words.split(',').map(w => w.trim());
        const typeSpeed  = parseInt(el.getAttribute('data-type-speed'))  || 100;
        const eraseSpeed = parseInt(el.getAttribute('data-erase-speed')) || 50;
        const delay      = parseInt(el.getAttribute('data-delay'))       || 1500;

        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        const tick = function() {
          const current = wordArray[wordIndex];

          if (isDeleting) {
            el.textContent = current.substring(0, charIndex - 1);
            charIndex--;
          } else {
            el.textContent = current.substring(0, charIndex + 1);
            charIndex++;
          }

          let speed = isDeleting ? eraseSpeed : typeSpeed;

          if (!isDeleting && charIndex === current.length) {
            speed = delay;
            isDeleting = true;
          } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % wordArray.length;
            speed = 500;
          }

          setTimeout(tick, speed);
        };

        tick();
      });
    }
  };


  /* ============================================================
     INTERSECTION OBSERVER FADE-IN
     Adds .visible class when element enters viewport
     Usage: <div class="fade-in-scroll">Content</div>
  ============================================================ */
  window.ScrollFadeIn = {
    init: function() {
      const elements = document.querySelectorAll('.fade-in-scroll');
      if (elements.length === 0) return;

      const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 });

      elements.forEach(function(el) { observer.observe(el); });
    }
  };


  /* ============================================================
     SMOOTH SCROLL FOR ANCHOR LINKS
  ============================================================ */
  window.SmoothScroll = {
    init: function() {
      document.addEventListener('click', function(e) {
        const link = e.target.closest('a[href^="#"]');
        if (!link) return;

        const href = link.getAttribute('href');
        if (href === '#' || href.length < 2) return;

        const target = document.querySelector(href);
        if (!target) return;

        e.preventDefault();
        const offset = 80; /* Account for fixed navbar */
        const targetPosition = target.getBoundingClientRect().top + window.scrollY - offset;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      });
    }
  };


  /* ============================================================
     INITIALIZE EVERYTHING WHEN DOM IS READY
  ============================================================ */
  function initAll() {
    window.ThemeManager.init();
    window.ScrollProgress.init();
    window.CounterAnimation.init();
    window.Typewriter.init();
    window.ScrollFadeIn.init();
    window.SmoothScroll.init();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
  } else {
    initAll();
  }

})();


/* ============================================================
   SVG ICONS – Sun & Moon for theme toggle button
   These are added as global constants for easy reuse
============================================================ */
window.ThemeIcons = {
  moon: `<svg class="moon-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
  </svg>`,

  sun: `<svg class="sun-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="12" cy="12" r="5"/>
    <line x1="12" y1="1" x2="12" y2="3"/>
    <line x1="12" y1="21" x2="12" y2="23"/>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
    <line x1="1" y1="12" x2="3" y2="12"/>
    <line x1="21" y1="12" x2="23" y2="12"/>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
  </svg>`,

  /* Get complete toggle button HTML */
  getToggleHTML: function() {
    return `
      <button class="theme-toggle" aria-label="Toggle theme" title="Toggle theme">
        ${this.moon}
        ${this.sun}
      </button>
    `;
  }
};