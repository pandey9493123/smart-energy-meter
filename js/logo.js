/* ============================================================
   SMART ENERGY METER - LOGO COMPONENT
   Version: 2.0
   Author: Om Pandey
   Description: Reusable logo SVG components for all pages
============================================================ */

window.Logo = {

  /* ============================================================
     FULL LOGO (Icon + Text) - Inline SVG
     Usage: document.getElementById('nav').innerHTML = Logo.full()
  ============================================================ */
  full: function(opts) {
    opts = opts || {};
    const height = opts.height || 40;
    const showText = opts.showText !== false;

    if (showText) {
      return `
      <svg class="sem-logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 260 60" style="height:${height}px; width:auto;" role="img" aria-label="Smart Energy Meter">
        <defs>
          <linearGradient id="lg-${Date.now()}" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#06B6D4"/>
            <stop offset="100%" stop-color="#10F5A0"/>
          </linearGradient>
          <linearGradient id="lgt-${Date.now()}" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#06B6D4"/>
            <stop offset="50%" stop-color="#22D3EE"/>
            <stop offset="100%" stop-color="#10F5A0"/>
          </linearGradient>
        </defs>
        <g transform="translate(5, 5)">
          <path d="M25 2 L44 12 L44 38 L25 48 L6 38 L6 12 Z" fill="none" stroke="url(#lg-${Date.now()})" stroke-width="2.5" stroke-linejoin="round"/>
          <path d="M25 8 L39 15 L39 33 L25 40 L11 33 L11 15 Z" fill="url(#lg-${Date.now()})" opacity="0.08"/>
          <path d="M27 12 L18 27 L24 27 L22 38 L32 22 L26 22 Z" fill="url(#lg-${Date.now()})" stroke="url(#lg-${Date.now()})" stroke-width="0.5" stroke-linejoin="round"/>
          <circle cx="25" cy="2"  r="1.5" fill="#10F5A0"/>
          <circle cx="44" cy="12" r="1.5" fill="#06B6D4"/>
          <circle cx="44" cy="38" r="1.5" fill="#10F5A0"/>
          <circle cx="25" cy="48" r="1.5" fill="#06B6D4"/>
          <circle cx="6"  cy="38" r="1.5" fill="#10F5A0"/>
          <circle cx="6"  cy="12" r="1.5" fill="#06B6D4"/>
        </g>
        <text x="65" y="27" font-family="'Orbitron', sans-serif" font-size="16" font-weight="800" fill="url(#lgt-${Date.now()})" letter-spacing="1.5">SMART ENERGY</text>
        <text x="65" y="45" font-family="'Poppins', sans-serif" font-size="10" font-weight="500" fill="currentColor" opacity="0.7" letter-spacing="4">METER SYSTEM</text>
        <rect x="65" y="49" width="30" height="1.5" fill="url(#lg-${Date.now()})" rx="1"/>
      </svg>`;
    }

    return this.icon(opts);
  },

  /* ============================================================
     ICON ONLY (Square)
     Usage: document.getElementById('badge').innerHTML = Logo.icon({size:50})
  ============================================================ */
  icon: function(opts) {
    opts = opts || {};
    const size = opts.size || 40;
    const uid = 'i' + Math.random().toString(36).substr(2, 9);

    return `
    <svg class="sem-logo-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" style="width:${size}px; height:${size}px;" role="img" aria-label="Smart Energy Meter">
      <defs>
        <linearGradient id="ic-${uid}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#06B6D4"/>
          <stop offset="100%" stop-color="#10F5A0"/>
        </linearGradient>
        <linearGradient id="icb-${uid}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#06B6D4" stop-opacity="0.15"/>
          <stop offset="100%" stop-color="#10F5A0" stop-opacity="0.05"/>
        </linearGradient>
      </defs>
      <rect x="2" y="2" width="46" height="46" rx="12" fill="url(#icb-${uid})"/>
      <path d="M25 5 L42 13 L42 37 L25 45 L8 37 L8 13 Z" fill="none" stroke="url(#ic-${uid})" stroke-width="2.5" stroke-linejoin="round"/>
      <path d="M27 13 L18 27 L24 27 L22 37 L32 23 L26 23 Z" fill="url(#ic-${uid})" stroke="url(#ic-${uid})" stroke-width="0.5" stroke-linejoin="round"/>
      <circle cx="25" cy="5"  r="1.5" fill="#10F5A0"/>
      <circle cx="42" cy="13" r="1.5" fill="#06B6D4"/>
      <circle cx="42" cy="37" r="1.5" fill="#10F5A0"/>
      <circle cx="25" cy="45" r="1.5" fill="#06B6D4"/>
      <circle cx="8"  cy="37" r="1.5" fill="#10F5A0"/>
      <circle cx="8"  cy="13" r="1.5" fill="#06B6D4"/>
    </svg>`;
  },

  /* ============================================================
     SIMPLE ICON (Small - for tight spaces like favicon)
  ============================================================ */
  small: function(opts) {
    opts = opts || {};
    const size = opts.size || 24;
    const uid = 's' + Math.random().toString(36).substr(2, 9);

    return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" style="width:${size}px; height:${size}px;">
      <defs>
        <linearGradient id="sm-${uid}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#06B6D4"/>
          <stop offset="100%" stop-color="#10F5A0"/>
        </linearGradient>
      </defs>
      <path d="M16 4 L27 10 L27 22 L16 28 L5 22 L5 10 Z" fill="none" stroke="url(#sm-${uid})" stroke-width="1.8" stroke-linejoin="round"/>
      <path d="M17.5 9 L11 18 L15 18 L14 24 L21 15 L17 15 Z" fill="url(#sm-${uid})"/>
    </svg>`;
  },

  /* ============================================================
     ANIMATED LOGO (with rotating rings + pulsing)
     Perfect for loading screens & hero sections
  ============================================================ */
  animated: function(opts) {
    opts = opts || {};
    const size = opts.size || 120;
    const uid = 'a' + Math.random().toString(36).substr(2, 9);

    return `
    <div class="sem-logo-animated" style="position:relative; width:${size}px; height:${size}px; display:inline-block;">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" style="width:100%; height:100%;">
        <defs>
          <linearGradient id="an-${uid}" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#06B6D4"/>
            <stop offset="100%" stop-color="#10F5A0"/>
          </linearGradient>
        </defs>

        <!-- Rotating outer ring -->
        <circle cx="60" cy="60" r="55" fill="none" stroke="url(#an-${uid})" stroke-width="1" opacity="0.3"
                stroke-dasharray="10 5">
          <animateTransform attributeName="transform" type="rotate" from="0 60 60" to="360 60 60" dur="10s" repeatCount="indefinite"/>
        </circle>

        <!-- Rotating middle ring -->
        <circle cx="60" cy="60" r="48" fill="none" stroke="url(#an-${uid})" stroke-width="1.5" opacity="0.5"
                stroke-dasharray="15 8">
          <animateTransform attributeName="transform" type="rotate" from="360 60 60" to="0 60 60" dur="8s" repeatCount="indefinite"/>
        </circle>

        <!-- Pulsing hexagon -->
        <path d="M60 20 L88 35 L88 65 L60 80 L32 65 L32 35 Z"
              fill="none" stroke="url(#an-${uid})" stroke-width="2.5" stroke-linejoin="round">
          <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite"/>
        </path>

        <!-- Lightning bolt -->
        <path d="M62 30 L48 55 L58 55 L56 75 L72 48 L62 48 Z"
              fill="url(#an-${uid})" stroke="url(#an-${uid})" stroke-width="0.5" stroke-linejoin="round">
          <animate attributeName="opacity" values="1;0.5;1" dur="1.5s" repeatCount="indefinite"/>
        </path>

        <!-- Corner dots -->
        <circle cx="60" cy="20" r="2" fill="#10F5A0">
          <animate attributeName="r" values="2;3;2" dur="1.5s" repeatCount="indefinite"/>
        </circle>
        <circle cx="88" cy="35" r="2" fill="#06B6D4">
          <animate attributeName="r" values="2;3;2" dur="1.5s" begin="0.25s" repeatCount="indefinite"/>
        </circle>
        <circle cx="88" cy="65" r="2" fill="#10F5A0">
          <animate attributeName="r" values="2;3;2" dur="1.5s" begin="0.5s" repeatCount="indefinite"/>
        </circle>
        <circle cx="60" cy="80" r="2" fill="#06B6D4">
          <animate attributeName="r" values="2;3;2" dur="1.5s" begin="0.75s" repeatCount="indefinite"/>
        </circle>
        <circle cx="32" cy="65" r="2" fill="#10F5A0">
          <animate attributeName="r" values="2;3;2" dur="1.5s" begin="1s" repeatCount="indefinite"/>
        </circle>
        <circle cx="32" cy="35" r="2" fill="#06B6D4">
          <animate attributeName="r" values="2;3;2" dur="1.5s" begin="1.25s" repeatCount="indefinite"/>
        </circle>
      </svg>
    </div>`;
  },

  /* ============================================================
     AUTO-INJECT INTO ELEMENTS WITH data-logo ATTRIBUTE
     Usage: <div data-logo="full"></div>
            <div data-logo="icon" data-size="60"></div>
            <div data-logo="animated" data-size="150"></div>
  ============================================================ */
  autoInject: function() {
    const elements = document.querySelectorAll('[data-logo]');
    const self = this;

    elements.forEach(function(el) {
      const type = el.getAttribute('data-logo') || 'full';
      const size = parseInt(el.getAttribute('data-size')) || undefined;
      const height = parseInt(el.getAttribute('data-height')) || undefined;

      const opts = {};
      if (size)   opts.size = size;
      if (height) opts.height = height;

      switch (type) {
        case 'icon':      el.innerHTML = self.icon(opts);     break;
        case 'small':     el.innerHTML = self.small(opts);    break;
        case 'animated':  el.innerHTML = self.animated(opts); break;
        case 'full':
        default:          el.innerHTML = self.full(opts);
      }
    });
  }
};

/* ============================================================
   AUTO-INJECT ON DOM READY
============================================================ */
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', function() {
    window.Logo.autoInject();
  });
} else {
  window.Logo.autoInject();
}