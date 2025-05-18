
import React from 'react';

const PortalHero = () => {
  return (
    <div className="text-center mb-12">
      <h1 className="text-4xl md:text-5xl font-playfair font-bold mb-4">
        Client Portal
      </h1>
      <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-4">
        Streamlined communication and collaboration for your legal marketing projects
      </p>
      <p className="text-sm text-gray-500">
        Administered by <a href="mailto:joe@bizooma.com" className="text-legal-primary hover:underline">Joe (joe@bizooma.com)</a>
      </p>
    </div>
  );
};

export default PortalHero;

