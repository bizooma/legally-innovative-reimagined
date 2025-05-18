
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface ClientDocumentsProps {
  clientId: string;
}

const ClientDocuments: React.FC<ClientDocumentsProps> = ({ clientId }) => {
  // This would be a real API call in a production app
  const documents = [
    { id: '1', name: 'Marketing Strategy.pdf', type: 'PDF', size: '2.4 MB', lastUpdated: '2025-05-12' },
    { id: '2', name: 'Brand Guidelines.pdf', type: 'PDF', size: '5.1 MB', lastUpdated: '2025-05-10' },
    { id: '3', name: 'Campaign Results Q1.xlsx', type: 'XLSX', size: '1.8 MB', lastUpdated: '2025-05-05' },
    { id: '4', name: 'Website Content.docx', type: 'DOCX', size: '0.9 MB', lastUpdated: '2025-05-01' },
  ];

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Client Documents</CardTitle>
          <CardDescription>Manage and share documents</CardDescription>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Upload Document
        </Button>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {documents.map(doc => (
            <div 
              key={doc.id}
              className="border rounded-lg p-4 bg-white flex flex-col md:flex-row md:items-center justify-between hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center">
                <div className={`w-10 h-10 rounded-md flex items-center justify-center mr-4 ${
                  doc.type === 'PDF' ? 'bg-red-100 text-red-800' : 
                  doc.type === 'XLSX' ? 'bg-green-100 text-green-800' : 
                  'bg-blue-100 text-blue-800'
                }`}>
                  <span className="text-xs font-bold">{doc.type}</span>
                </div>
                <div>
                  <h3 className="font-medium">{doc.name}</h3>
                  <p className="text-sm text-gray-500">{doc.size} • Updated {doc.lastUpdated}</p>
                </div>
              </div>
              <div className="flex gap-2 mt-3 md:mt-0">
                <Button variant="outline" size="sm">View</Button>
                <Button variant="outline" size="sm">Download</Button>
              </div>
            </div>
          ))}
          
          {documents.length === 0 && (
            <div className="text-center py-10">
              <p className="text-gray-500">No documents yet</p>
              <Button className="mt-4">
                <Plus className="mr-2 h-4 w-4" />
                Upload First Document
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ClientDocuments;
