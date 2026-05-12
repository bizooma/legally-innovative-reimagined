/* Bizooma Accessibility Layer - embeddable widget v0.1
 * Drop-in script: <script src="https://yourdomain.com/accessibility-widget.js" data-site-id="..."></script>
 */
(function () {
  if (window.__bzAccLoaded) return;
  window.__bzAccLoaded = true;

  var PRIMARY = "#7A0A0A";
  var STORAGE_KEY = "bz-acc-prefs";
  var prefs = {};
  try { prefs = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}"); } catch (e) {}

  function save() { localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs)); }

  // Inject base styles
  var style = document.createElement("style");
  style.id = "bz-acc-style";
  style.textContent = [
    ".bz-acc-btn{position:fixed;bottom:20px;right:20px;z-index:2147483646;width:56px;height:56px;border-radius:9999px;background:" + PRIMARY + ";color:#fff;border:none;cursor:pointer;box-shadow:0 10px 30px rgba(0,0,0,.25);display:flex;align-items:center;justify-content:center;font-size:24px}",
    ".bz-acc-panel{position:fixed;bottom:90px;right:20px;z-index:2147483647;width:340px;max-height:80vh;overflow:auto;background:#fff;color:#111;border-radius:14px;box-shadow:0 25px 60px rgba(0,0,0,.25);font-family:Inter,system-ui,sans-serif;padding:16px;display:none}",
    ".bz-acc-panel.open{display:block}",
    ".bz-acc-h{font-weight:700;font-size:15px;margin:0 0 8px}",
    ".bz-acc-sub{font-size:11px;color:#666;margin:0 0 12px}",
    ".bz-acc-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px}",
    ".bz-acc-row{display:flex;align-items:center;justify-content:space-between;gap:8px;padding:8px 10px;border:1px solid #eee;border-radius:10px;font-size:13px;cursor:pointer;background:#fafafa}",
    ".bz-acc-row.on{background:" + PRIMARY + ";color:#fff;border-color:" + PRIMARY + "}",
    ".bz-acc-foot{display:flex;justify-content:space-between;align-items:center;margin-top:12px;font-size:11px;color:#888}",
    ".bz-acc-reset{background:none;border:1px solid #ddd;border-radius:8px;padding:4px 8px;font-size:11px;cursor:pointer}",
    /* applied modes */
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
    "html.bz-cursor *{cursor:url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2240%22 height=%2240%22><circle cx=%2220%22 cy=%2220%22 r=%2218%22 fill=%22black%22/></svg>'),auto !important}"
  ].join("\n");
  document.head.appendChild(style);

  var FEATURES = [
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

  function applyAll() {
    var html = document.documentElement;
    FEATURES.forEach(function (f) { html.classList.remove(f.cls); });
    Object.keys(prefs).forEach(function (k) {
      if (!prefs[k]) return;
      var f = FEATURES.find(function (x) { return x.key === k; });
      if (f) html.classList.add(f.cls);
    });
  }

  function toggle(key) {
    var f = FEATURES.find(function (x) { return x.key === key; });
    if (!f) return;
    if (f.group) {
      // mutually exclusive within group
      FEATURES.forEach(function (other) {
        if (other.group === f.group && other.key !== key) prefs[other.key] = false;
      });
    }
    prefs[key] = !prefs[key];
    save();
    applyAll();
    render();
  }

  function reset() {
    prefs = {};
    save();
    applyAll();
    render();
  }

  // Build UI
  var btn = document.createElement("button");
  btn.className = "bz-acc-btn";
  btn.setAttribute("aria-label", "Open accessibility menu");
  btn.innerHTML = "&#9855;";

  var panel = document.createElement("div");
  panel.className = "bz-acc-panel";
  panel.setAttribute("role", "dialog");
  panel.setAttribute("aria-label", "Accessibility options");

  function render() {
    panel.innerHTML = "";
    var h = document.createElement("div");
    h.className = "bz-acc-h"; h.textContent = "Accessibility Tools";
    var sub = document.createElement("div");
    sub.className = "bz-acc-sub"; sub.textContent = "Customize this site for your needs.";
    panel.appendChild(h); panel.appendChild(sub);

    var grid = document.createElement("div");
    grid.className = "bz-acc-grid";
    FEATURES.forEach(function (f) {
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
    poweredBy.textContent = "Powered by Bizooma";
    var resetBtn = document.createElement("button");
    resetBtn.className = "bz-acc-reset"; resetBtn.textContent = "Reset";
    resetBtn.onclick = reset;
    foot.appendChild(poweredBy); foot.appendChild(resetBtn);
    panel.appendChild(foot);
  }

  btn.onclick = function () {
    panel.classList.toggle("open");
    if (panel.classList.contains("open")) render();
  };

  document.addEventListener("DOMContentLoaded", function () {
    document.body.appendChild(btn);
    document.body.appendChild(panel);
    applyAll();
  });
  if (document.readyState === "complete" || document.readyState === "interactive") {
    setTimeout(function () {
      if (!document.body.contains(btn)) document.body.appendChild(btn);
      if (!document.body.contains(panel)) document.body.appendChild(panel);
      applyAll();
    }, 0);
  }
})();