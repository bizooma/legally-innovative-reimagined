
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { loadDidAgent } from './utils/loadDidAgent';

console.log('Main script executing, initializing React app');

// Get the root element
const rootElement = document.getElementById("root");

if (!rootElement) {
  console.error("Root element not found!");
} else {
  console.log("Root element found, mounting React app");
  const root = createRoot(rootElement);
  root.render(<App />);
  
  // Load D-ID agent after React mounts
  setTimeout(() => {
    loadDidAgent().catch((error) => {
      console.error('[D-ID] Failed to load agent:', error);
    });
  }, 100);
}
