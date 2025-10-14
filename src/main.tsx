import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

console.log('Main script executing, initializing React app');

// Get the root element
const rootElement = document.getElementById("root");

if (!rootElement) {
  console.error("Root element not found!");
} else {
  console.log("Root element found, mounting React app");
  const root = createRoot(rootElement);
  root.render(<App />);
  
  // Load Fabio floating widget after app mounts
  const fabioScript = document.createElement('script');
  fabioScript.type = 'module';
  fabioScript.src = 'https://agent.d-id.com/v2/index.js';
  fabioScript.setAttribute('data-mode', 'fabio');
  fabioScript.setAttribute('data-client-key', 'Z29vZ2xlLW9hdXRoMnwxMDc0NjQ2Njc4OTg3MTA5ODM4ODA6b0ZNWUp4Xy1oV01PYzJtVFFQYkhP');
  fabioScript.setAttribute('data-agent-id', 'v2_agt_aHkCdBDR');
  fabioScript.setAttribute('data-name', 'did-agent');
  fabioScript.setAttribute('data-monitor', 'true');
  fabioScript.setAttribute('data-orientation', 'horizontal');
  fabioScript.setAttribute('data-position', 'right');
  
  fabioScript.onload = () => {
    console.log('✅ D-ID Fabio widget loaded successfully');
  };
  fabioScript.onerror = (error) => {
    console.error('❌ D-ID Fabio widget failed to load:', error);
  };
  
  document.body.appendChild(fabioScript);
}
