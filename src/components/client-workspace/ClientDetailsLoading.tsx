
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

interface ClientDetailsLoadingProps {
  onBack: () => void;
}

const ClientDetailsLoading: React.FC<ClientDetailsLoadingProps> = ({ onBack }) => {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center mb-6">
        <Button variant="ghost" onClick={onBack} className="mr-2">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
      </div>
      <p className="text-center py-10">Loading client details...</p>
    </div>
  );
};

export default ClientDetailsLoading;
