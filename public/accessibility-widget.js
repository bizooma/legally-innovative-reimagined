/* Bizooma Accessibility Layer - embeddable widget v0.4
 * Drop-in script: <script src="https://yourdomain.com/accessibility-widget.js" data-org="your-org-slug" defer></script>
 */
(function () {
  if (window.__bzAccLoaded) return;
  window.__bzAccLoaded = true;

  // Resolve script tag to read data-org
  var thisScript = document.currentScript ||
    (function () { var s = document.getElementsByTagName("script"); return s[s.length - 1]; })();
  var ORG_SLUG = (thisScript && thisScript.getAttribute("data-org")) || "";
  var SCRIPT_ORIGIN = (function () {
    try { return new URL(thisScript.src).origin; } catch (e) { return ""; }
  })();
  var CONFIG_URL = SCRIPT_ORIGIN
    ? SCRIPT_ORIGIN.replace(/^https?:\/\/[^/]*$/, "https://hvyjvbdforunsjgqhhny.supabase.co")
    : "https://hvyjvbdforunsjgqhhny.supabase.co";
  var ENDPOINT = "https://hvyjvbdforunsjgqhhny.supabase.co/functions/v1/acc-widget-config?org=" + encodeURIComponent(ORG_SLUG);
  var EVENT_ENDPOINT = "https://hvyjvbdforunsjgqhhny.supabase.co/functions/v1/acc-widget-event";

  var DEFAULTS = {
    enabled: true,
    primary_color: "#7A0A0A",
    position: "bottom-right",
    logo_url: null,
    hide_branding: false,
    enabled_features: { large: true, xl: true, contrast: true, invert: true, grayscale: true, dyslexia: true, links: true, pause: true, cursor: true },
    custom_css: null
  };
  var CONFIG = DEFAULTS;

  var STORAGE_KEY = "bz-acc-prefs";
  var prefs = {};
  try { prefs = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}"); } catch (e) {}
  function save() { localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs)); }

  // Anonymous, persistent-but-rotating session id (no PII)
  var SESSION_KEY = "bz-acc-sid";
  var sessionHash = "";
  try {
    sessionHash = localStorage.getItem(SESSION_KEY) || "";
    if (!sessionHash) {
      sessionHash = (Date.now().toString(36) + Math.random().toString(36).slice(2, 10));
      localStorage.setItem(SESSION_KEY, sessionHash);
    }
  } catch (e) {}

  function track(event_type, feature_key) {
    if (!ORG_SLUG) return;
    try {
      var body = JSON.stringify({
        org: ORG_SLUG,
        event_type: event_type,
        feature_key: feature_key || null,
        session_hash: sessionHash,
        page_url: location.href.slice(0, 500)
      });
      if (navigator.sendBeacon) {
        navigator.sendBeacon(EVENT_ENDPOINT, new Blob([body], { type: "application/json" }));
      } else {
        fetch(EVENT_ENDPOINT, { method: "POST", headers: { "Content-Type": "application/json" }, body: body, keepalive: true }).catch(function(){});
      }
    } catch (e) {}
  }

  var ALL_FEATURES = [
    { key: "large", label: "Larger Text", cls: "bz-large", group: "size" },
    { key: "xl", label: "Huge Text", cls: "bz-xl", group: "size" },
    { key: "contrast", label: "High Contrast", cls: "bz-contrast" },
    { key: "invert", label: "Invert Colors", cls: "bz-invert" },
    { key: "grayscale", label: "Grayscale", cls: "bz-grayscale" },
    { key: "dyslexia", label: "Dyslexia Font", cls: "bz-dyslexia" },
    { key: "links", label: "Highlight Links", cls: "bz-links" },
    { key: "pause", label: "Pause Animations", cls: "bz-pause" },
    { key: "cursor", label: "Big Cursor", cls: "bz-cursor" }
  ];

  // One-click profile presets — each sets a deterministic feature bundle
  var PRESETS = [
    { key: "vision",   label: "Vision Impaired",   features: { xl: true, contrast: true, links: true } },
    { key: "dyslexia", label: "Dyslexia Friendly", features: { dyslexia: true, large: true, pause: true } },
    { key: "motor",    label: "Motor Impaired",    features: { cursor: true, large: true, pause: true } },
    { key: "seizure",  label: "Seizure Safe",      features: { pause: true, grayscale: true } }
  ];

  function activeFeatures() {
    return ALL_FEATURES.filter(function (f) { return CONFIG.enabled_features[f.key] !== false; });
  }
  function activePresets() {
    // Hide a preset if every feature it would enable is disabled at the org level
    return PRESETS.filter(function (p) {
      return Object.keys(p.features).some(function (k) { return CONFIG.enabled_features[k] !== false; });
    });
  }

  function injectStyles() {
    var existing = document.getElementById("bz-acc-style");
    if (existing) existing.parentNode.removeChild(existing);
    var PRIMARY = CONFIG.primary_color || DEFAULTS.primary_color;
    var pos = CONFIG.position || "bottom-right";
    var btnPos = "bottom:20px;right:20px";
    var panelPos = "bottom:90px;right:20px";
    if (pos === "bottom-left") { btnPos = "bottom:20px;left:20px"; panelPos = "bottom:90px;left:20px"; }
    if (pos === "top-right") { btnPos = "top:20px;right:20px"; panelPos = "top:90px;right:20px"; }
    if (pos === "top-left") { btnPos = "top:20px;left:20px"; panelPos = "top:90px;left:20px"; }

    var style = document.createElement("style");
    style.id = "bz-acc-style";
    style.textContent = [
      ".bz-acc-btn{position:fixed;" + btnPos + ";z-index:2147483646;width:56px;height:56px;border-radius:9999px;background:" + PRIMARY + ";color:#fff;border:none;cursor:pointer;box-shadow:0 10px 30px rgba(0,0,0,.25);display:flex;align-items:center;justify-content:center;font-size:24px;overflow:hidden}",
      ".bz-acc-btn:focus-visible,.bz-acc-row:focus-visible,.bz-acc-preset:focus-visible,.bz-acc-reset:focus-visible,.bz-acc-close:focus-visible{outline:3px solid " + PRIMARY + ";outline-offset:2px;box-shadow:0 0 0 5px #fff,0 0 0 8px " + PRIMARY + "}",
      ".bz-acc-btn img{width:32px;height:32px;object-fit:contain}",
      ".bz-acc-panel{position:fixed;" + panelPos + ";z-index:2147483647;width:340px;max-height:80vh;overflow:auto;background:#fff;color:#111;border-radius:14px;box-shadow:0 25px 60px rgba(0,0,0,.25);font-family:Inter,system-ui,sans-serif;padding:16px;display:none}",
      ".bz-acc-panel.open{display:block}",
      ".bz-acc-h{font-weight:700;font-size:15px;margin:0 0 8px;display:flex;align-items:center;gap:8px;color:#111}",
      ".bz-acc-h img{width:18px;height:18px;object-fit:contain}",
      ".bz-acc-sub{font-size:11px;color:#555;margin:0 0 12px}",
      ".bz-acc-section{font-size:11px;font-weight:700;color:#444;text-transform:uppercase;letter-spacing:.05em;margin:8px 0 6px}",
      ".bz-acc-presets{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:8px}",
      ".bz-acc-preset{padding:10px;border:1px solid #ddd;border-radius:10px;background:#fff;color:#111;font-size:13px;font-weight:600;cursor:pointer;text-align:left;line-height:1.2}",
      ".bz-acc-preset:hover{border-color:" + PRIMARY + ";background:#fafafa}",
      ".bz-acc-preset.on{background:" + PRIMARY + ";color:#fff;border-color:" + PRIMARY + "}",
      ".bz-acc-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px}",
      ".bz-acc-row{display:flex;align-items:center;justify-content:space-between;gap:8px;padding:10px;border:1px solid #ddd;border-radius:10px;font-size:13px;cursor:pointer;background:#fafafa;color:#111;text-align:left;min-height:44px}",
      ".bz-acc-row:hover{background:#f0f0f0}",
      ".bz-acc-row.on{background:" + PRIMARY + ";color:#fff;border-color:" + PRIMARY + "}",
      ".bz-acc-foot{display:flex;justify-content:space-between;align-items:center;margin-top:12px;font-size:11px;color:#666}",
      ".bz-acc-reset{background:none;border:1px solid #bbb;border-radius:8px;padding:6px 10px;font-size:12px;cursor:pointer;color:#111;min-height:32px}",
      ".bz-acc-close{position:absolute;top:8px;right:8px;background:none;border:1px solid transparent;border-radius:8px;width:32px;height:32px;cursor:pointer;font-size:18px;line-height:1;color:#111}",
      ".bz-acc-close:hover{border-color:#ddd;background:#f5f5f5}",
      ".bz-acc-sr{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}",
      "html.bz-large body, html.bz-large body *{font-size:118% !important;line-height:1.6 !important}",
      "html.bz-xl body, html.bz-xl body *{font-size:135% !important;line-height:1.7 !important}",
      "html.bz-contrast body{background:#000 !important;color:#fff !important}",
      "html.bz-contrast body *{background-color:#000 !important;color:#fff !important;border-color:#fff !important}",
      "html.bz-contrast a, html.bz-contrast a *{color:#ffd400 !important}",
      "html.bz-invert{filter:invert(1) hue-rotate(180deg)}",
      "html.bz-invert img, html.bz-invert video{filter:invert(1) hue-rotate(180deg)}",
      "html.bz-grayscale{filter:grayscale(1)}",
      "html.bz-dyslexia body, html.bz-dyslexia body *{font-family:'Comic Sans MS','OpenDyslexic',Arial,sans-serif !important;letter-spacing:.05em !important;word-spacing:.1em !important}",
      "html.bz-links a{text-decoration:underline !important;color:#0645ad !important;background:#fff8a3 !important}",
      "html.bz-pause *,html.bz-pause *::before,html.bz-pause *::after{animation:none !important;transition:none !important;scroll-behavior:auto !important}",
      "html.bz-pause video,html.bz-pause audio{}",
      "html.bz-cursor *{cursor:url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2240%22 height=%2240%22><circle cx=%2220%22 cy=%2220%22 r=%2218%22 fill=%22black%22/></svg>'),auto !important}",
      "@media (prefers-reduced-motion: reduce){.bz-acc-panel,.bz-acc-btn{transition:none !important;animation:none !important}}",
      CONFIG.custom_css || ""
    ].join("\n");
    document.head.appendChild(style);
  }

  function applyAll() {
    var html = document.documentElement;
    ALL_FEATURES.forEach(function (f) { html.classList.remove(f.cls); });
    Object.keys(prefs).forEach(function (k) {
      if (!prefs[k]) return;
      var f = ALL_FEATURES.find(function (x) { return x.key === k; });
      if (f && CONFIG.enabled_features[f.key] !== false) html.classList.add(f.cls);
    });
  }

  function toggle(key) {
    var f = ALL_FEATURES.find(function (x) { return x.key === key; });
    if (!f) return;
    if (f.group) {
      ALL_FEATURES.forEach(function (other) {
        if (other.group === f.group && other.key !== key) prefs[other.key] = false;
      });
    }
    prefs[key] = !prefs[key];
    track(prefs[key] ? "feature_on" : "feature_off", key);
    save();
    applyAll();
    render();
    announce((f.label) + " " + (prefs[key] ? "enabled" : "disabled"));
  }

  function reset() { prefs = {}; save(); applyAll(); render(); track("reset"); announce("All accessibility settings reset"); }

  function presetIsOn(p) {
    return Object.keys(p.features).every(function (k) {
      return CONFIG.enabled_features[k] === false || prefs[k] === true;
    });
  }

  function applyPreset(p) {
    var on = presetIsOn(p);
    if (on) {
      // toggle off — clear that preset's features
      Object.keys(p.features).forEach(function (k) { prefs[k] = false; });
    } else {
      // enforce single-feature-per-group rule
      Object.keys(p.features).forEach(function (k) {
        var f = ALL_FEATURES.find(function (x) { return x.key === k; });
        if (!f || CONFIG.enabled_features[f.key] === false) return;
        if (f.group) {
          ALL_FEATURES.forEach(function (other) {
            if (other.group === f.group && other.key !== k) prefs[other.key] = false;
          });
        }
        prefs[k] = true;
      });
    }
    track(on ? "feature_off" : "feature_on", "preset:" + p.key);
    save(); applyAll(); render();
    announce(p.label + " preset " + (on ? "disabled" : "enabled"));
  }

  var btn = document.createElement("button");
  btn.className = "bz-acc-btn";
  btn.type = "button";
  btn.setAttribute("aria-label", "Open accessibility menu");
  btn.setAttribute("aria-expanded", "false");
  btn.setAttribute("aria-haspopup", "dialog");

  var panel = document.createElement("div");
  panel.className = "bz-acc-panel";
  panel.setAttribute("role", "dialog");
  panel.setAttribute("aria-modal", "false");
  panel.setAttribute("aria-label", "Accessibility options");
  panel.style.position = "fixed"; // ensure absolute close button anchors correctly
  panel.tabIndex = -1;

  // Live region for screen-reader announcements
  var live = document.createElement("div");
  live.className = "bz-acc-sr";
  live.setAttribute("aria-live", "polite");
  live.setAttribute("aria-atomic", "true");
  function announce(msg) { try { live.textContent = ""; setTimeout(function(){ live.textContent = msg; }, 50); } catch(e){} }

  function renderBtn() {
    btn.innerHTML = "";
    if (CONFIG.logo_url) {
      var img = document.createElement("img");
      img.src = CONFIG.logo_url; img.alt = "";
      btn.appendChild(img);
    } else {
      btn.innerHTML = "&#9855;";
    }
  }

  function render() {
    panel.innerHTML = "";
    // Close button
    var close = document.createElement("button");
    close.className = "bz-acc-close"; close.type = "button";
    close.setAttribute("aria-label", "Close accessibility menu");
    close.innerHTML = "&times;";
    close.onclick = function () { closePanel(); };
    panel.appendChild(close);

    var h = document.createElement("div");
    h.className = "bz-acc-h";
    if (CONFIG.logo_url) { var hi = document.createElement("img"); hi.src = CONFIG.logo_url; hi.alt = ""; h.appendChild(hi); }
    var ht = document.createElement("span"); ht.textContent = "Accessibility Tools"; h.appendChild(ht);
    var sub = document.createElement("div");
    sub.className = "bz-acc-sub"; sub.textContent = "Customize this site for your needs.";
    panel.appendChild(h); panel.appendChild(sub);

    // Presets
    var presets = activePresets();
    if (presets.length) {
      var ps = document.createElement("div"); ps.className = "bz-acc-section"; ps.textContent = "Quick Profiles";
      panel.appendChild(ps);
      var pgrid = document.createElement("div"); pgrid.className = "bz-acc-presets";
      presets.forEach(function (p) {
        var b = document.createElement("button");
        b.className = "bz-acc-preset" + (presetIsOn(p) ? " on" : "");
        b.type = "button";
        b.textContent = p.label;
        b.setAttribute("aria-pressed", presetIsOn(p) ? "true" : "false");
        b.onclick = function () { applyPreset(p); };
        pgrid.appendChild(b);
      });
      panel.appendChild(pgrid);
    }

    var fs = document.createElement("div"); fs.className = "bz-acc-section"; fs.textContent = "Individual Tools";
    panel.appendChild(fs);

    var grid = document.createElement("div");
    grid.className = "bz-acc-grid";
    activeFeatures().forEach(function (f) {
      var row = document.createElement("button");
      row.className = "bz-acc-row" + (prefs[f.key] ? " on" : "");
      row.type = "button";
      row.textContent = f.label;
      row.setAttribute("aria-pressed", prefs[f.key] ? "true" : "false");
      row.onclick = function () { toggle(f.key); };
      grid.appendChild(row);
    });
    panel.appendChild(grid);

    var foot = document.createElement("div");
    foot.className = "bz-acc-foot";
    var poweredBy = document.createElement("span");
    poweredBy.textContent = CONFIG.hide_branding ? "" : "Powered by Bizooma";
    var resetBtn = document.createElement("button");
    resetBtn.className = "bz-acc-reset"; resetBtn.type = "button"; resetBtn.textContent = "Reset all";
    resetBtn.onclick = reset;
    foot.appendChild(poweredBy); foot.appendChild(resetBtn);
    panel.appendChild(foot);
  }

  function getFocusable() {
    return Array.prototype.slice.call(
      panel.querySelectorAll('button, [href], [tabindex]:not([tabindex="-1"])')
    ).filter(function (el) { return !el.disabled && el.offsetParent !== null; });
  }
  function openPanel() {
    panel.classList.add("open");
    btn.setAttribute("aria-expanded", "true");
    render();
    track("open");
    setTimeout(function () {
      var f = getFocusable();
      (f[0] || panel).focus();
    }, 0);
  }
  function closePanel() {
    if (!panel.classList.contains("open")) return;
    panel.classList.remove("open");
    btn.setAttribute("aria-expanded", "false");
    track("close");
    try { btn.focus(); } catch (e) {}
  }
  btn.onclick = function () {
    if (panel.classList.contains("open")) closePanel(); else openPanel();
  };

  // Keyboard handling: Esc closes, Tab traps within panel when open
  document.addEventListener("keydown", function (e) {
    if (!panel.classList.contains("open")) return;
    if (e.key === "Escape") { e.preventDefault(); closePanel(); return; }
    if (e.key === "Tab") {
      var f = getFocusable();
      if (!f.length) return;
      var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });

  function mount() {
    injectStyles();
    renderBtn();
    if (!document.body.contains(btn)) document.body.appendChild(btn);
    if (!document.body.contains(panel)) document.body.appendChild(panel);
    if (!document.body.contains(live)) document.body.appendChild(live);
    applyAll();
    track("view");
  }

  function loadConfig() {
    if (!ORG_SLUG) { mount(); return; }
    fetch(ENDPOINT, { headers: { "Accept": "application/json" } })
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (cfg) {
        if (cfg && typeof cfg === "object") {
          CONFIG = {
            enabled: cfg.enabled !== false,
            primary_color: cfg.primary_color || DEFAULTS.primary_color,
            position: cfg.position || DEFAULTS.position,
            logo_url: cfg.logo_url || null,
            hide_branding: !!cfg.hide_branding,
            enabled_features: Object.assign({}, DEFAULTS.enabled_features, cfg.enabled_features || {}),
            custom_css: cfg.custom_css || null
          };
        }
      })
      .catch(function () {})
      .finally(function () { if (CONFIG.enabled === false) return; mount(); });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", loadConfig);
  } else {
    loadConfig();
  }
})();
