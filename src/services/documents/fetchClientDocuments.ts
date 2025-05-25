
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Document } from '@/types/document';
import { BUCKET_NAME } from '@/config/documentConfig';

/**
 * Fetches all documents for a specific client from the database
 */
export async function fetchClientDocuments(clientId: string): Promise<Document[]> {
  try {
    console.log('=== FETCH CLIENT DOCUMENTS DEBUG ===');
    console.log('Environment URL:', window.location.hostname);
    console.log('Supabase URL being used:', 'https://hvyjvbdforunsjgqhhny.supabase.co');
    console.log('Client ID parameter:', clientId);
    console.log('Query timestamp:', new Date().toISOString());
    
    // Check authentication state
    const { data: { session }, error: authError } = await supabase.auth.getSession();
    console.log('Auth session:', session ? 'authenticated' : 'not authenticated');
    console.log('User ID:', session?.user?.id || 'none');
    console.log('User email:', session?.user?.email || 'none');
    if (authError) {
      console.error('Auth error:', authError);
    }
    
    if (!session?.user) {
      console.error('No authenticated user found');
      toast.error('You must be logged in to view documents');
      return [];
    }
    
    // Check user admin status for debugging
    const { data: userData } = await supabase
      .from('users')
      .select('is_admin')
      .eq('id', session.user.id)
      .maybeSingle();
    
    console.log('User admin status:', userData?.is_admin || false);
    
    // Fetch documents from database
    console.log('Executing database query...');
    const { data, error } = await supabase
      .from('documents')
      .select('*')
      .eq('client_id', clientId)
      .order('created_at', { ascending: false });
    
    console.log('Database query response:');
    console.log('- Data:', data);
    console.log('- Error:', error);
    console.log('- Raw data length:', data?.length || 0);
    
    if (error) {
      console.error('Database query error details:', {
        message: error.message,
        code: error.code,
        details: error.details,
        hint: error.hint
      });
      
      // Provide more helpful error messages based on the error
      if (error.message?.includes('permission') || error.message?.includes('policy')) {
        console.error('RLS policy error - user may not have permission to view documents');
        toast.error('You do not have permission to view these documents. Please contact an administrator.');
      } else {
        toast.error(`Failed to fetch documents: ${error.message}`);
      }
      return [];
    }
    
    if (!data || data.length === 0) {
      console.log('❌ NO DOCUMENTS FOUND in database for client:', clientId);
      console.log('This could indicate:');
      console.log('1. No documents have been uploaded for this client');
      console.log('2. Documents exist but user lacks permissions (RLS policy issue)');
      console.log('3. Wrong client ID being used');
      return [];
    }
    
    console.log(`✅ Found ${data.length} documents in database`);
    data.forEach((doc, index) => {
      console.log(`Document ${index + 1}:`, {
        id: doc.id,
        name: doc.name,
        client_id: doc.client_id,
        created_at: doc.created_at
      });
    });
    
    // Map database records to Document interface
    console.log('Mapping documents with URLs...');
    const documents: Document[] = data.map((record) => {
      // Get public URL for each document
      const { data: urlData } = supabase.storage
        .from(BUCKET_NAME)
        .getPublicUrl(record.file_path);
      
      const mappedDoc = {
        id: record.id,
        name: record.name,
        type: record.file_type,
        size: record.file_size,
        lastUpdated: new Date(record.updated_at).toISOString().split('T')[0],
        path: record.file_path,
        url: urlData.publicUrl,
        description: record.description || ''
      };
      
      console.log('Mapped document:', mappedDoc);
      return mappedDoc;
    });
    
    console.log('=== END FETCH CLIENT DOCUMENTS DEBUG ===');
    return documents;
  } catch (error: any) {
    console.error('=== FETCH CLIENT DOCUMENTS ERROR ===');
    console.error('Error details:', {
      name: error.name,
      message: error.message,
      stack: error.stack
    });
    console.error('Environment:', window.location.hostname);
    console.error('Client ID:', clientId);
    console.error('=== END ERROR DEBUG ===');
    toast.error(`Failed to fetch documents: ${error.message}`);
    return [];
  }
}
