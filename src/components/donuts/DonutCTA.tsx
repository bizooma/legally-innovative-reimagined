
import React from 'react';

const DonutCTA = () => {
  return (
    <section id="schedule-meeting" className="py-20 bg-gradient-to-b from-amber-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-legal-dark">
            Ready for Something <span className="text-pink-500">Sweeter</span> than Donuts?
          </h2>
          <p className="text-lg text-gray-700">
            Schedule a meeting with us to discover how our services can help your law firm 
            grow and innovate. We promise our consultation will be even more satisfying than the donuts!
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          {/* Calendly inline widget */}
          <div className="calendly-inline-widget rounded-lg shadow-lg border border-pink-200" 
               data-url="https://calendly.com/joe-bizooma/30min" 
               style={{ minWidth: "320px", height: "700px" }}>
          </div>
          <script type="text/javascript" src="https://assets.calendly.com/assets/external/widget.js" async></script>
        </div>
      </div>
    </section>
  );
};

export default DonutCTA;
