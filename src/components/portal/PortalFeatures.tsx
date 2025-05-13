
import React from 'react';

const PortalFeatures = () => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-playfair font-bold mb-4 text-legal-dark">
        Enhance Your Marketing Experience
      </h2>
      <div className="space-y-4">
        <FeatureItem
          title="Centralized Project Management"
          description="Access all your marketing materials, campaigns, and analytics in one secure location."
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
              <path d="m9 12 2 2 4-4"></path>
            </svg>
          }
        />
        
        <FeatureItem
          title="Real-time Project Updates"
          description="Stay informed with the latest updates and progress on your marketing initiatives."
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
          }
        />
        
        <FeatureItem
          title="Seamless Communication"
          description="Direct messaging with your dedicated marketing team for quick response and collaboration."
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
          }
        />
        
        <FeatureItem
          title="Document Sharing"
          description="Securely exchange important documents and approve content without email hassle."
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
              <polyline points="10 9 9 9 8 9"></polyline>
            </svg>
          }
        />
      </div>
    </div>
  );
};

interface FeatureItemProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const FeatureItem: React.FC<FeatureItemProps> = ({ title, description, icon }) => {
  return (
    <div className="flex items-start">
      <div className="bg-legal-primary rounded-full p-2 mr-4 text-white">
        {icon}
      </div>
      <div>
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
};

export default PortalFeatures;
