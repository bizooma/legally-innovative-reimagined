
import React from 'react';
import DocumentManagementContainer from './DocumentManagementContainer';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

/**
 * Document Management Component
 * 
 * Wrapper component that maintains the original import path but uses
 * the refactored container component implementation with additional admin check.
 */
const DocumentManagement: React.FC = () => {
  // Check if current user is an admin
  const { data: currentUser, isLoading } = useQuery({
    queryKey: ['currentUserAdmin'],
    queryFn: async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return { isAdmin: false };
      
      const { data } = await supabase
        .from('users')
        .select('is_admin')
        .eq('id', session.user.id)
        .single();
        
      return data || { isAdmin: false };
    }
  });
  
  const isAdmin = currentUser?.isAdmin;
  
  if (isLoading) {
    return <div className="p-4">Loading permissions...</div>;
  }
  
  if (isAdmin === false) {
    return (
      <Alert variant="warning" className="mb-4">
        <AlertTriangle className="h-4 w-4 mr-2" />
        <AlertTitle>Admin Permissions Required</AlertTitle>
        <AlertDescription>
          You need admin privileges to manage company documents. 
          Some features may be limited with your current permissions.
        </AlertDescription>
      </Alert>
    );
  }

  return <DocumentManagementContainer />;
};

export default DocumentManagement;
