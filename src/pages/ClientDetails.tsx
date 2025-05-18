
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useParams, useNavigate } from 'react-router-dom';
import { useClientDetails } from '@/hooks/useClientDetails';
import ClientDetailsHeader from '@/components/client-workspace/ClientDetailsHeader';
import ClientDetailsTabs from '@/components/client-workspace/ClientDetailsTabs';
import ClientDetailsLoading from '@/components/client-workspace/ClientDetailsLoading';
import ClientDetailsNotFound from '@/components/client-workspace/ClientDetailsNotFound';

const ClientDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { client, isLoading } = useClientDetails(id);
  const [activeTab, setActiveTab] = useState('overview');

  const handleBack = () => {
    navigate('/portal/admin-dashboard');
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="container mx-auto px-4 py-12">
          {isLoading ? (
            <ClientDetailsLoading onBack={handleBack} />
          ) : !client ? (
            <ClientDetailsNotFound onBack={handleBack} />
          ) : (
            <div className="max-w-6xl mx-auto">
              <ClientDetailsHeader 
                clientName={client.company_name} 
                onBack={handleBack} 
              />
              
              <ClientDetailsTabs 
                client={client} 
                activeTab={activeTab}
                onTabChange={setActiveTab}
              />
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ClientDetails;
