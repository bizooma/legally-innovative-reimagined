
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const StaffDashboardLoading: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl">Loading dashboard...</p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default StaffDashboardLoading;
