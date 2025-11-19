(function() {
  'use strict';
  
  const script = document.currentScript;
  const theme = script.getAttribute('data-theme') || 'dark';
  const autoScroll = script.getAttribute('data-auto-scroll') !== 'false';
  
  // Get the domain from the script src or use current origin
  const scriptSrc = script.src;
  const domain = scriptSrc ? new URL(scriptSrc).origin : window.location.origin;
  
  // Create iframe element
  const iframe = document.createElement('iframe');
  iframe.src = `${domain}/embed/status-ticker?theme=${theme}&autoScroll=${autoScroll}`;
  iframe.style.width = '100%';
  iframe.style.height = '80px';
  iframe.style.border = 'none';
  iframe.style.overflow = 'hidden';
  iframe.title = 'Cloud Provider Status Ticker';
  iframe.loading = 'lazy';
  
  // Insert iframe after the script tag
  if (script.parentNode) {
    script.parentNode.insertBefore(iframe, script.nextSibling);
  }
})();
