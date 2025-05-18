
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface ClientDetailsNotFoundProps {
  onBack: () => void;
}

const ClientDetailsNotFound: React.FC<ClientDetailsNotFoundProps> = ({ onBack }) => {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center mb-6">
        <Button variant="ghost" onClick={onBack} className="mr-2">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
      </div>
      <Card>
        <CardContent className="pt-6">
          <p className="text-center py-6">Client not found</p>
          <div className="flex justify-center">
            <Button onClick={onBack}>Return to Dashboard</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ClientDetailsNotFound;
