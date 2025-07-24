import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useParams, useNavigate } from 'react-router-dom';
import { useClientDetails } from '@/hooks/useClientDetails';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import ClientCitationDiagram from '@/components/client-workspace/ClientCitationDiagram';
import ClientDetailsLoading from '@/components/client-workspace/ClientDetailsLoading';
import ClientDetailsNotFound from '@/components/client-workspace/ClientDetailsNotFound';

const ClientDiagram = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { client, isLoading } = useClientDetails(id);

  const handleBack = () => {
    navigate(`/portal/client/${id}`);
  };

  const handleBackToPortal = () => {
    navigate('/portal/admin-dashboard');
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="container mx-auto px-4 py-12">
          {isLoading ? (
            <ClientDetailsLoading onBack={handleBackToPortal} />
          ) : !client ? (
            <ClientDetailsNotFound onBack={handleBackToPortal} />
          ) : (
            <div className="max-w-7xl mx-auto">
              <div className="mb-6 flex items-center gap-4">
                <Button onClick={handleBack} variant="outline" size="sm">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Client Details
                </Button>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    Citation Diagram - {client.company_name}
                  </h1>
                  <p className="text-gray-600">
                    Visual representation of all websites, social media pages, and external citations
                  </p>
                </div>
              </div>
              
              <ClientCitationDiagram clientId={client.id} clientName={client.company_name} />
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ClientDiagram;