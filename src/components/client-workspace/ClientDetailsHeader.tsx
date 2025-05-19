
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, FileText, Mail } from 'lucide-react';
import ClientLogoUploader from './ClientLogoUploader';

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
  const [currentLogoUrl, setCurrentLogoUrl] = useState(logoUrl);
  
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
      <div className="flex items-center">
        <Button variant="ghost" onClick={onBack} className="mr-2">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <div className="flex items-center gap-4">
          <ClientLogoUploader
            clientId={clientId}
            existingLogoUrl={currentLogoUrl || undefined}
            onLogoUpdated={setCurrentLogoUrl}
            size="md"
          />
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
