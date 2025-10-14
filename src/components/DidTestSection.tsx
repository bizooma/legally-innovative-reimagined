import { useEffect } from "react";

const DidTestSection = () => {
  useEffect(() => {
    // Create the script element dynamically so it runs after mount
    const script = document.createElement('script');
    script.type = 'module';
    script.src = 'https://agent.d-id.com/v2/index.js';

    // Required data attributes
    script.setAttribute('data-mode', 'full');
    script.setAttribute('data-client-key', 'Z29vZ2xlLW9hdXRoMnwxMDc0NjQ2Njc4OTg3MTA5ODM4ODA6b0ZNWUp4Xy1oV01PYzJtVFFQYkhP');
    script.setAttribute('data-agent-id', 'v2_agt_aHkCdBDR');
    script.setAttribute('data-name', 'did-agent');
    script.setAttribute('data-monitor', 'true');
    script.setAttribute('data-target-id', 'did-agent-test');

    // Debugging hooks
    script.onload = () => {
      console.log('✅ D-ID script loaded successfully');
    };
    script.onerror = (error) => {
      console.error('❌ D-ID script failed to load:', error);
    };

    document.body.appendChild(script);

    // Cleanup script on unmount
    return () => {
      console.log('🧹 Cleaning up D-ID script');
      document.body.removeChild(script);
    };
  }, []);

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">D-ID Agent Test</h2>
        <div className="flex justify-center">
          <div
            id="did-agent-test"
            className="w-full max-w-4xl h-[600px] min-h-[560px] bg-white shadow-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default DidTestSection;