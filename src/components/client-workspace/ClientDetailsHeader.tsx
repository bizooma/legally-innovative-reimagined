
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, FileText, Mail } from 'lucide-react';

interface ClientDetailsHeaderProps {
  clientName: string;
  clientId: string;
  logoUrl?: string | null;
  onBack: () => void;
}

const ClientDetailsHeader: React.FC<ClientDetailsHeaderProps> = ({
  clientName,
  clientId,
  logoUrl,
  onBack,
}) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
      <div className="flex items-center">
        <Button variant="ghost" onClick={onBack} className="mr-2">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <div className="flex items-center gap-4">
          {logoUrl && (
            <div className="h-24 w-24 border border-gray-200 overflow-hidden">
              <img 
                src={logoUrl} 
                alt={`${clientName} logo`} 
                className="h-full w-full object-cover"
              />
            </div>
          )}
          <h1 className="text-3xl font-bold font-playfair">{clientName}</h1>
        </div>
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
  );
};

export default ClientDetailsHeader;
