/**
 * D-ID Fabio Agent Loader
 * 
 * Allowed domains to configure in D-ID Studio:
 * - https://e0d24ae1-4402-4fb8-a83d-117e708f17c5.lovableproject.com
 * - https://legallyinnovative.com
 * - https://www.legallyinnovative.com
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

const AGENT_CONFIG = {
  clientKey: "Z29vZ2xlLW9hdXRoMnwxMDc0NjQ2Njc4OTg3MTA5ODM4ODA6b0ZNWUp4Xy1oV01PYzJtVFFQYkhP",
  agentId: "v2_agt_aHkCdBDR",
  mode: "fabio",
  name: "did-agent",
  monitor: "true",
  orientation: "horizontal",
  position: "right",
};

const INIT_TIMEOUT = 6000; // 6 seconds

function loadScript(url: string, attrs: Record<string, string>): Promise<void> {
  return new Promise((resolve, reject) => {
    // Check if script already exists
    if (document.querySelector(`script[src="${url}"]`)) {
      console.log('[D-ID] Script already loaded:', url);
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

    document.body.appendChild(script);
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
      'data-mode': AGENT_CONFIG.mode,
      'data-client-key': AGENT_CONFIG.clientKey,
      'data-agent-id': AGENT_CONFIG.agentId,
      'data-name': AGENT_CONFIG.name,
      'data-monitor': AGENT_CONFIG.monitor,
      'data-orientation': AGENT_CONFIG.orientation,
      'data-position': AGENT_CONFIG.position,
    };

    await loadScript(url, attrs);

    // Wait for initialization with timeout
    const initialized = await Promise.race([
      new Promise<boolean>((resolve) => {
        const checkInterval = setInterval(() => {
          const agentElement = document.querySelector(`[data-name="${AGENT_CONFIG.name}"]`);
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

export async function loadDidAgent(): Promise<void> {
  // Check for force version override
  const forceVersion = window.__DID_FORCE_VERSION;
  const initialVersion = forceVersion || 'v2';

  console.log('[D-ID] Starting D-ID agent loader');
  
  const success = await injectFabio(initialVersion);

  if (!success && !forceVersion && initialVersion === 'v2') {
    console.log('[D-ID] Falling back to v1...');
    await injectFabio('v1');
  }
}
