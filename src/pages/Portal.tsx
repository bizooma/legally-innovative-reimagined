
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PortalHero from '@/components/portal/PortalHero';
import PortalFeatures from '@/components/portal/PortalFeatures';
import LoginForm from '@/components/portal/LoginForm';

const Portal = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-5xl mx-auto">
            {/* Hero Section */}
            <PortalHero />
            
            <div className="grid md:grid-cols-2 gap-8 items-center">
              {/* Marketing Copy */}
              <PortalFeatures />
              
              {/* Login Form */}
              <div>
                <LoginForm />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Portal;
