
import React from 'react';
import { Button } from '@/components/ui/button';
import { CardFooter } from '@/components/ui/card';

const LoginFormFooter = () => {
  return (
    <CardFooter className="flex flex-col items-start">
      <p className="text-sm text-muted-foreground">
        Don't have credentials? Contact your account manager for access.
      </p>
      <p className="text-sm text-muted-foreground mt-1">
        <strong>Administrator:</strong> Use email joe@bizooma.com with password "admin123"
      </p>
      <Button 
        variant="link" 
        className="p-0 h-auto text-legal-primary" 
        onClick={() => window.location.href = "mailto:joe@bizooma.com?subject=Portal%20Access%20Request&body=Hello,%0A%0AI'd%20like%20to%20request%20access%20to%20the%20client%20portal.%20Please%20provide%20me%20with%20login%20credentials.%0A%0AThank%20you."}
      >
        Request Access
      </Button>
    </CardFooter>
  );
};

export default LoginFormFooter;
