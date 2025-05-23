
import React, { useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { useDocumentQueries } from '@/hooks/staff-documents';

// Import our refactored components
import { 
  StaffDocumentsList, 
  StorageAlert, 
  ErrorAlert, 
  EmptyDocumentState,
  RefreshButton
} from './staff-documents';

interface StaffDocumentsProps {
  staffMemberId: string;
}

const StaffDocuments: React.FC<StaffDocumentsProps> = ({ staffMemberId }) => {
  // Use our hook to get documents, status, and refreshing capability
  const { 
    documents = [], 
    isLoading, 
    error, 
    refreshAllData,
    bucketExists,
    bucketChecked,
    isRefetching,
    checkBucket
  } = useDocumentQueries(staffMemberId);

  // Automatically try refreshing if bucket check failed initially
  useEffect(() => {
    if (bucketChecked && !bucketExists) {
      // Wait a moment before retrying to avoid too many requests
      const timer = setTimeout(() => {
        console.log("StaffDocuments: Auto-retrying bucket check");
        checkBucket();
      }, 5000); // Increased to 5 seconds to avoid rate limiting
      
      return () => clearTimeout(timer);
    }
  }, [bucketChecked, bucketExists, checkBucket]);

  // Handle manual refresh button click
  const handleRefresh = () => {
    console.log("StaffDocuments: Manual refresh triggered");
    refreshAllData();
    toast({
      title: "Refreshing Documents",
      description: "Checking document storage...",
    });
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Company Documents</CardTitle>
          <CardDescription>All documents available to staff members</CardDescription>
        </div>
        <RefreshButton onRefresh={handleRefresh} isRefetching={isRefetching} />
      </CardHeader>
      <CardContent>
        <StorageAlert bucketExists={bucketExists} bucketChecked={bucketChecked} />
        <ErrorAlert error={error} />
        
        {isLoading ? (
          <div className="text-center py-10">Loading documents...</div>
        ) : documents.length === 0 ? (
          <EmptyDocumentState onRefresh={handleRefresh} />
        ) : (
          <StaffDocumentsList documents={documents} />
        )}
      </CardContent>
    </Card>
  );
};

export default StaffDocuments;
