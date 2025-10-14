const DidTestSection = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">D-ID Agent Test</h2>
        <div className="flex justify-center">
          <div id="did-agent-test" className="w-full max-w-4xl h-[600px] min-h-[560px] bg-white shadow-lg" />
          <script
            type="module"
            src="https://agent.d-id.com/v2/index.js"
            data-mode="full"
            data-client-key="Z29vZ2xlLW9hdXRoMnwxMDc0NjQ2Njc4OTg3MTA5ODM4ODA6b0ZNWUp4Xy1oV01PYzJtVFFQYkhP"
            data-agent-id="v2_agt_aHkCdBDR"
            data-name="did-agent"
            data-monitor="true"
            data-target-id="did-agent-test">
          </script>
        </div>
      </div>
    </section>
  );
};

export default DidTestSection;
