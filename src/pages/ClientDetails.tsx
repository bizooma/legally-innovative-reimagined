
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useClientDetails } from '@/hooks/useClientDetails';
import { ArrowLeft } from 'lucide-react';

const ClientDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { client, isLoading } = useClientDetails(id);

  const handleBack = () => {
    navigate('/portal/admin-dashboard');
  };

  if (isLoading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gray-50 pt-20">
          <div className="container mx-auto px-4 py-12">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center mb-6">
                <Button variant="ghost" onClick={handleBack} className="mr-2">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
              </div>
              <p className="text-center py-10">Loading client details...</p>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (!client) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gray-50 pt-20">
          <div className="container mx-auto px-4 py-12">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center mb-6">
                <Button variant="ghost" onClick={handleBack} className="mr-2">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
              </div>
              <Card>
                <CardContent className="pt-6">
                  <p className="text-center py-6">Client not found</p>
                  <div className="flex justify-center">
                    <Button onClick={handleBack}>Return to Dashboard</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center mb-6">
              <Button variant="ghost" onClick={handleBack} className="mr-2">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <h1 className="text-3xl font-bold font-playfair">{client.company_name}</h1>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <p className="font-medium text-gray-700">Contact Name</p>
                      <p>{client.contact_name}</p>
                    </div>
                    <div>
                      <p className="font-medium text-gray-700">Email</p>
                      <p>{client.contact_email}</p>
                    </div>
                    {client.contact_phone && (
                      <div>
                        <p className="font-medium text-gray-700">Phone</p>
                        <p>{client.contact_phone}</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Client Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <p className="font-medium text-gray-700">Client ID</p>
                      <p className="text-sm font-mono">{client.id}</p>
                    </div>
                    <div>
                      <p className="font-medium text-gray-700">Date Added</p>
                      <p>{new Date(client.date_added).toLocaleDateString()}</p>
                    </div>
                    {client.notes && (
                      <div>
                        <p className="font-medium text-gray-700">Notes</p>
                        <p className="whitespace-pre-wrap">{client.notes}</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ClientDetails;
