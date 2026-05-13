/* Bizooma Accessibility Layer - embeddable widget v0.2
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

  function activeFeatures() {
    return ALL_FEATURES.filter(function (f) { return CONFIG.enabled_features[f.key] !== false; });
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
      ".bz-acc-btn img{width:32px;height:32px;object-fit:contain}",
      ".bz-acc-panel{position:fixed;" + panelPos + ";z-index:2147483647;width:340px;max-height:80vh;overflow:auto;background:#fff;color:#111;border-radius:14px;box-shadow:0 25px 60px rgba(0,0,0,.25);font-family:Inter,system-ui,sans-serif;padding:16px;display:none}",
      ".bz-acc-panel.open{display:block}",
      ".bz-acc-h{font-weight:700;font-size:15px;margin:0 0 8px;display:flex;align-items:center;gap:8px}",
      ".bz-acc-h img{width:18px;height:18px;object-fit:contain}",
      ".bz-acc-sub{font-size:11px;color:#666;margin:0 0 12px}",
      ".bz-acc-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px}",
      ".bz-acc-row{display:flex;align-items:center;justify-content:space-between;gap:8px;padding:8px 10px;border:1px solid #eee;border-radius:10px;font-size:13px;cursor:pointer;background:#fafafa;text-align:left}",
      ".bz-acc-row.on{background:" + PRIMARY + ";color:#fff;border-color:" + PRIMARY + "}",
      ".bz-acc-foot{display:flex;justify-content:space-between;align-items:center;margin-top:12px;font-size:11px;color:#888}",
      ".bz-acc-reset{background:none;border:1px solid #ddd;border-radius:8px;padding:4px 8px;font-size:11px;cursor:pointer}",
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
      "html.bz-pause *,html.bz-pause *::before,html.bz-pause *::after{animation:none !important;transition:none !important}",
      "html.bz-cursor *{cursor:url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2240%22 height=%2240%22><circle cx=%2220%22 cy=%2220%22 r=%2218%22 fill=%22black%22/></svg>'),auto !important}",
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
  }

  function reset() { prefs = {}; save(); applyAll(); render(); track("reset"); }

  var btn = document.createElement("button");
  btn.className = "bz-acc-btn";
  btn.setAttribute("aria-label", "Open accessibility menu");

  var panel = document.createElement("div");
  panel.className = "bz-acc-panel";
  panel.setAttribute("role", "dialog");
  panel.setAttribute("aria-label", "Accessibility options");

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
    var h = document.createElement("div");
    h.className = "bz-acc-h";
    if (CONFIG.logo_url) { var hi = document.createElement("img"); hi.src = CONFIG.logo_url; hi.alt = ""; h.appendChild(hi); }
    var ht = document.createElement("span"); ht.textContent = "Accessibility Tools"; h.appendChild(ht);
    var sub = document.createElement("div");
    sub.className = "bz-acc-sub"; sub.textContent = "Customize this site for your needs.";
    panel.appendChild(h); panel.appendChild(sub);

    var grid = document.createElement("div");
    grid.className = "bz-acc-grid";
    activeFeatures().forEach(function (f) {
      var row = document.createElement("button");
      row.className = "bz-acc-row" + (prefs[f.key] ? " on" : "");
      row.type = "button";
      row.textContent = f.label;
      row.onclick = function () { toggle(f.key); };
      grid.appendChild(row);
    });
    panel.appendChild(grid);

    var foot = document.createElement("div");
    foot.className = "bz-acc-foot";
    var poweredBy = document.createElement("span");
    poweredBy.textContent = CONFIG.hide_branding ? "" : "Powered by Bizooma";
    var resetBtn = document.createElement("button");
    resetBtn.className = "bz-acc-reset"; resetBtn.textContent = "Reset";
    resetBtn.onclick = reset;
    foot.appendChild(poweredBy); foot.appendChild(resetBtn);
    panel.appendChild(foot);
  }

  btn.onclick = function () {
    panel.classList.toggle("open");
    if (panel.classList.contains("open")) { render(); track("open"); }
    else track("close");
  };

  function mount() {
    injectStyles();
    renderBtn();
    if (!document.body.contains(btn)) document.body.appendChild(btn);
    if (!document.body.contains(panel)) document.body.appendChild(panel);
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
