
import { useState, useEffect } from 'react';
import { fetchClientDocuments } from '@/services/documentService';

export function useClientDocumentCount(clientId: string) {
  const [documentCount, setDocumentCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const getDocumentCount = async () => {
      setIsLoading(true);
      try {
        const documents = await fetchClientDocuments(clientId);
        setDocumentCount(documents.length);
      } catch (error) {
        console.error('Error fetching document count:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (clientId) {
      getDocumentCount();
    }
  }, [clientId]);

  return { documentCount, isLoading };
}
