/**
 * D-ID Agent Loader
 * 
 * Allowed domains to configure in D-ID Studio:
 * - https://e0d24ae1-4402-4fb8-a83d-117e708f17c5.lovableproject.com
 * - https://bizooma.com
 * - https://www.bizooma.com
 * 
 * If you have CSP headers, ensure:
 * - script-src: https://agent.d-id.com
 * - connect-src: https://api.d-id.com wss://*.d-id.com
 */

interface DidAgentDebug {
  status: 'loading' | 'initialized' | 'failed';
  error?: string;
  lastAttempt?: string;
  version?: 'v1' | 'v2';
}

declare global {
  interface Window {
    didAgentDebug?: DidAgentDebug;
    __DID_FORCE_VERSION?: 'v1' | 'v2';
  }
}

const FABIO_CONFIG = {
  clientKey: "Z29vZ2xlLW9hdXRoMnwxMDc0NjQ2Njc4OTg3MTA5ODM4ODA6b0ZNWUp4Xy1oV01PYzJtVFFQYkhP",
  agentId: "v2_agt_aHkCdBDR",
  mode: "fabio",
  name: "did-agent-fabio",
  monitor: "true",
  orientation: "horizontal",
  position: "right",
};

const EMBED_CONFIG = {
  clientKey: "Z29vZ2xlLW9hdXRoMnwxMDc0NjQ2Njc4OTg3MTA5ODM4ODA6b0ZNWUp4Xy1oV01PYzJtVFFQYkhP",
  agentId: "v2_agt_aHkCdBDR",
  mode: "full",
  name: "did-agent-hero",
  monitor: "true",
};

const INIT_TIMEOUT = 6000; // 6 seconds
const EMBED_INIT_TIMEOUT = 25000; // 25 seconds for embed (slower init on first paint)

function loadScript(url: string, attrs: Record<string, string>, parent?: HTMLElement): Promise<void> {
  return new Promise((resolve, reject) => {
    // Allow multiple instances: only skip if same src AND same instance (name or target) exists
    const existingScripts = Array.from(document.querySelectorAll(`script[src="${url}"]`));
    const desiredName = attrs['data-name'];
    const desiredTarget = attrs['data-target-id'];
    const hasSameInstance = existingScripts.some((s) => {
      const n = s.getAttribute('data-name');
      const t = s.getAttribute('data-target-id');
      return (desiredName && n === desiredName) || (desiredTarget && t === desiredTarget);
    });
    if (hasSameInstance) {
      console.log('[D-ID] Script for this instance already present:', url, desiredName || desiredTarget || '');
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.type = 'module';
    script.src = url;
    
    Object.entries(attrs).forEach(([key, value]) => {
      script.setAttribute(key, value);
    });

    script.onload = () => {
      console.log('[D-ID] Script loaded:', url);
      resolve();
    };

    script.onerror = (error) => {
      console.error('[D-ID] Script failed to load:', url, error);
      reject(new Error(`Failed to load ${url}`));
    };

    // Append to target parent if provided to help SDK anchor correctly
    if (parent) {
      parent.appendChild(script);
    } else {
      (document.head || document.body).appendChild(script);
    }
  });
}

async function injectFabio(version: 'v1' | 'v2' = 'v2'): Promise<boolean> {
  const url = `https://agent.d-id.com/${version}/index.js`;
  
  window.didAgentDebug = {
    status: 'loading',
    version,
    lastAttempt: new Date().toISOString(),
  };

  console.log('[D-ID] Current origin:', window.location.origin);
  console.log('[D-ID] Attempting to load Fabio widget:', version);

  try {
    const attrs = {
      'data-mode': FABIO_CONFIG.mode,
      'data-client-key': FABIO_CONFIG.clientKey,
      'data-agent-id': FABIO_CONFIG.agentId,
      'data-name': FABIO_CONFIG.name,
      'data-monitor': FABIO_CONFIG.monitor,
      'data-orientation': FABIO_CONFIG.orientation,
      'data-position': FABIO_CONFIG.position,
    };

    await loadScript(url, attrs);

    // Wait for initialization with timeout
    const initialized = await Promise.race([
      new Promise<boolean>((resolve) => {
        const checkInterval = setInterval(() => {
          const agentElement = document.querySelector(`[data-name="${FABIO_CONFIG.name}"]`);
          if (agentElement || document.querySelector('.d-id-agent-container')) {
            clearInterval(checkInterval);
            resolve(true);
          }
        }, 100);
      }),
      new Promise<boolean>((resolve) => setTimeout(() => resolve(false), INIT_TIMEOUT)),
    ]);

    if (initialized) {
      window.didAgentDebug = { status: 'initialized', version };
      console.log('[D-ID] Fabio initialized successfully');
      return true;
    } else {
      throw new Error('Initialization timeout');
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    window.didAgentDebug = {
      status: 'failed',
      error: errorMessage,
      version,
    };
    console.error('[D-ID] Fabio initialization failed:', errorMessage);
    return false;
  }
}

async function injectEmbed(targetId: string, version: 'v1' | 'v2' = 'v2', isRetry = false): Promise<boolean> {
  // Check if target div exists
  const targetDiv = document.getElementById(targetId);
  if (!targetDiv) {
    console.error(`[D-ID] Target div #${targetId} not found`);
    return false;
  }

  const url = `https://agent.d-id.com/${version}/index.js`;
  
  console.log(`[D-ID] Loading Embed ${version} for target #${targetId}${isRetry ? ' (retry)' : ''}`);
  console.log('[D-ID] Current origin:', window.location.origin);

  // Set debug status to loading for embed
  window.didAgentDebug = {
    status: 'loading',
    version,
    lastAttempt: new Date().toISOString(),
  };
  
  // Domain compatibility check
  if (!isRetry) {
    const allowedOrigins = [
      'https://legally-innovative-reimagined.lovable.app',
      'https://e0d24ae1-4402-4fb8-a83d-117e708f17c5.lovableproject.com',
      'https://bizooma.com',
      'https://www.bizooma.com'
    ];
    const currentOrigin = window.location.origin;
    if (!allowedOrigins.includes(currentOrigin)) {
      console.warn('[D-ID] ⚠️ Your current origin is not in D-ID Studio "Allowed Origins" — please add it:', currentOrigin);
      console.warn('[D-ID] Expected origins:', allowedOrigins);
    }
  }
  
  // Log target dimensions
  const rect = targetDiv.getBoundingClientRect();
  console.log('[D-ID] Embed target rect:', rect);

  try {
    const attrs = {
      'data-mode': EMBED_CONFIG.mode,
      'data-client-key': EMBED_CONFIG.clientKey,
      'data-agent-id': EMBED_CONFIG.agentId,
      'data-name': EMBED_CONFIG.name,
      'data-monitor': EMBED_CONFIG.monitor,
      'data-target-id': targetId,
    };

    await loadScript(url, attrs);
    console.log('[D-ID] Embed script appended with attrs:', attrs);

    // Small delay to allow SDK to discover target in DOM
    await new Promise((r) => setTimeout(r, 500));
    console.log('[D-ID] Post-inject target state:', {
      childElementCount: targetDiv.childElementCount,
      hasIframe: !!targetDiv.querySelector('iframe'),
      attrs: {
        id: targetDiv.id,
        class: targetDiv.className,
      }
    });

    // Observe target briefly for added nodes (debug)
    const observer = new MutationObserver((mutations) => {
      for (const m of mutations) {
        if (m.addedNodes.length > 0) {
          console.log('[D-ID] Target mutated, nodes added:', m.addedNodes);
          break;
        }
      }
    });
    observer.observe(targetDiv, { childList: true, subtree: true });
    setTimeout(() => observer.disconnect(), 5000);

    // Wait for agent initialization with extended timeout
    const initialized = await Promise.race([
      new Promise<boolean>((resolve) => {
        const checkInterval = setInterval(() => {
          const embedAgentInTarget =
            targetDiv.querySelector('iframe, [data-did-agent], .d-id-agent-container, iframe[src*="agent.d-id.com"], iframe[src*="d-id.com"]');
          const namedAgent = document.querySelector(`[data-name="${EMBED_CONFIG.name}"]`);
          const globalContainer = document.querySelector('.d-id-agent-container');
          const globalIframe = document.querySelector('iframe[src*="agent.d-id.com"], iframe[src*="d-id.com"]');

          if (embedAgentInTarget || namedAgent || globalContainer || globalIframe || targetDiv.childElementCount > 0) {
            clearInterval(checkInterval);
            resolve(true);
          }
        }, 120);
      }),
      new Promise<boolean>((resolve) => setTimeout(() => resolve(false), EMBED_INIT_TIMEOUT)),
    ]);

    if (initialized) {
      window.didAgentDebug = { status: 'initialized', version };
      console.log(`[D-ID] Embed initialized successfully in #${targetId}`);
      return true;
    } else {
      // Retry once on timeout if this isn't already a retry
      if (!isRetry) {
        console.log('[D-ID] Embed timeout, cleaning up and retrying in 1.5s...');
        // Remove previous embed scripts for this target/name
        const scripts = Array.from(document.querySelectorAll(`script[src="${url}"]`));
        scripts.forEach((s) => {
          const n = s.getAttribute('data-name');
          const t = s.getAttribute('data-target-id');
          if (n === EMBED_CONFIG.name || t === targetId) {
            s.parentNode?.removeChild(s);
          }
        });
        await new Promise(resolve => setTimeout(resolve, 1500));
        return injectEmbed(targetId, version, true);
      }
      throw new Error('Embed initialization timeout after retry');
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    window.didAgentDebug = {
      status: 'failed',
      error: errorMessage,
      version,
    };
    console.error(`[D-ID] Embed initialization failed:`, errorMessage);
    return false;
  }
}

/**
 * Load the D-ID floatable widget (Fabio mode)
 */
export async function loadDidAgent(): Promise<void> {
  const forceVersion = window.__DID_FORCE_VERSION;
  const initialVersion = forceVersion || 'v2';

  console.log('[D-ID] Starting D-ID agent loader');
  
  const success = await injectFabio(initialVersion);

  if (!success && !forceVersion && initialVersion === 'v2') {
    console.log('[D-ID] Falling back to v1...');
    await injectFabio('v1');
  }
}

/**
 * Load the D-ID embedded agent in a specific container (Full mode)
 */
export async function loadDidAgentEmbed(targetId: string): Promise<void> {
  const forceVersion = window.__DID_FORCE_VERSION;
  const initialVersion = forceVersion || 'v2';
  
  console.log(`[D-ID] Starting Embed initialization for #${targetId}`);
  
  const success = await injectEmbed(targetId, initialVersion);
  
  if (!success && !forceVersion && initialVersion === 'v2') {
    console.log('[D-ID] Falling back to v1 for embed...');
    await injectEmbed(targetId, 'v1');
  }
}

/**
 * Force reload the D-ID embed for a target, removing any previous scripts
 * Optionally prefer a specific version ('v1' or 'v2')
 */
export async function reloadDidAgentEmbed(targetId: string, preferVersion: 'v1' | 'v2' = 'v2'): Promise<void> {
  try {
    console.log(`[D-ID] Reloading embed for #${targetId} (prefer ${preferVersion})`);

    // Remove any previous scripts attached to this instance regardless of version
    const scripts = Array.from(document.querySelectorAll('script[src*="agent.d-id.com/"]')) as HTMLScriptElement[];
    scripts.forEach((s) => {
      const n = s.getAttribute('data-name');
      const t = s.getAttribute('data-target-id');
      if (n === EMBED_CONFIG.name || t === targetId) {
        s.parentNode?.removeChild(s);
      }
    });

    // Clear target container content
    const target = document.getElementById(targetId);
    if (target) target.innerHTML = '';

    // Try preferred version first; if it fails, try the other one
    const ok = await injectEmbed(targetId, preferVersion, true);
    if (!ok) {
      const fallback = preferVersion === 'v2' ? 'v1' : 'v2';
      console.log(`[D-ID] Preferred version failed, trying ${fallback}...`);
      await injectEmbed(targetId, fallback as 'v1' | 'v2', true);
    }
  } catch (e) {
    console.error('[D-ID] Reload failed:', e);
  }
}
