
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useClientDetails } from '@/hooks/useClientDetails';
import { ArrowLeft, FileText, Mail, Plus } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ClientDocuments from '@/components/client-workspace/ClientDocuments';
import ClientCommunication from '@/components/client-workspace/ClientCommunication';
import ClientProjects from '@/components/client-workspace/ClientProjects';

const ClientDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { client, isLoading } = useClientDetails(id);
  const [activeTab, setActiveTab] = useState('overview');

  const handleBack = () => {
    navigate('/portal/admin-dashboard');
  };

  if (isLoading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gray-50 pt-20">
          <div className="container mx-auto px-4 py-12">
            <div className="max-w-6xl mx-auto">
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
            <div className="max-w-6xl mx-auto">
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
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
              <div className="flex items-center">
                <Button variant="ghost" onClick={handleBack} className="mr-2">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
                <h1 className="text-3xl font-bold font-playfair">{client.company_name}</h1>
              </div>
              <div className="flex gap-3">
                <Button>
                  <Mail className="mr-2 h-4 w-4" />
                  Contact Client
                </Button>
                <Button variant="outline">
                  <FileText className="mr-2 h-4 w-4" />
                  Generate Report
                </Button>
              </div>
            </div>

            <Tabs
              defaultValue="overview" 
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="mb-6">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="projects">Projects</TabsTrigger>
                <TabsTrigger value="documents">Documents</TabsTrigger>
                <TabsTrigger value="communication">Communication</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="space-y-6">
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

                <Card>
                  <CardHeader>
                    <CardTitle>Account Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white p-4 rounded-lg border shadow-sm">
                          <h3 className="font-medium text-gray-700 mb-1">Projects</h3>
                          <p className="text-2xl font-bold">3</p>
                          <p className="text-sm text-gray-500">2 Active, 1 Completed</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg border shadow-sm">
                          <h3 className="font-medium text-gray-700 mb-1">Documents</h3>
                          <p className="text-2xl font-bold">12</p>
                          <p className="text-sm text-gray-500">Last updated 3 days ago</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg border shadow-sm">
                          <h3 className="font-medium text-gray-700 mb-1">Messages</h3>
                          <p className="text-2xl font-bold">8</p>
                          <p className="text-sm text-gray-500">2 unread</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="projects">
                <ClientProjects clientId={client.id} />
              </TabsContent>
              
              <TabsContent value="documents">
                <ClientDocuments clientId={client.id} />
              </TabsContent>
              
              <TabsContent value="communication">
                <ClientCommunication clientId={client.id} clientName={client.company_name} />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ClientDetails;
