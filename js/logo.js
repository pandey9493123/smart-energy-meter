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
      const uid = 'l' + Math.random().toString(36).slice(2, 9);
      return `
      <svg class="sem-logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 260 60" style="height:${height}px;width:auto" role="img" aria-label="Smart Energy Meter">
        <g transform="translate(5,5)">
          <rect x="6" y="2" width="38" height="46" rx="9" fill="none" stroke="#2563EB" stroke-width="2.5"/>
          <path d="M27 12 L18 27 L24 27 L22 38 L32 22 L26 22 Z" fill="#16A34A"/>
        </g>
        <text x="65" y="27" font-family="Manrope,Inter,sans-serif" font-size="16" font-weight="800" fill="currentColor" letter-spacing=".4">SMART ENERGY</text>
        <text x="65" y="45" font-family="Inter,Arial,sans-serif" font-size="10" font-weight="600" fill="currentColor" opacity=".62" letter-spacing="2.8">METER SYSTEM</text>
        <rect x="65" y="49" width="28" height="2" fill="#2563EB" rx="1"/>
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
    return `
    <svg class="sem-logo-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" style="width:${size}px;height:${size}px" role="img" aria-label="Smart Energy Meter">
      <rect x="3" y="3" width="44" height="44" rx="10" fill="currentColor" opacity=".05"/>
      <path d="M25 5 L42 13 L42 37 L25 45 L8 37 L8 13 Z" fill="none" stroke="#2563EB" stroke-width="2.5" stroke-linejoin="round"/>
      <path d="M27 13 L18 27 L24 27 L22 37 L32 23 L26 23 Z" fill="#16A34A"/>
    </svg>`;
  },

  /* ============================================================
     SIMPLE ICON (Small - for tight spaces like favicon)
  ============================================================ */
  small: function(opts) {
    opts = opts || {};
    const size = opts.size || 24;
    return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" style="width:${size}px;height:${size}px" aria-hidden="true">
      <rect x="1" y="1" width="30" height="30" rx="7" fill="#0F172A"/>
      <path d="M16 4 L27 10 L27 22 L16 28 L5 22 L5 10 Z" fill="none" stroke="#60A5FA" stroke-width="1.8" stroke-linejoin="round"/>
      <path d="M17.5 9 L11 18 L15 18 L14 24 L21 15 L17 15 Z" fill="#22C55E"/>
    </svg>`;
  },

  /* ============================================================
     ANIMATED LOGO (with rotating rings + pulsing)
     Perfect for loading screens & hero sections
  ============================================================ */
  animated: function(opts) {
    opts = opts || {};
    const size = opts.size || 120;
    return `<div class="sem-logo-animated" style="width:${size}px;height:${size}px;display:inline-flex;align-items:center;justify-content:center">
      ${this.icon({size: Math.round(size * .62)})}
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