
/**
 * Document service main entry point - re-exports all document operations
 */

export * from './documents/uploadDocument';
export * from './documents/fetchClientDocuments';
export * from './documents/updateDocumentDescription';
// Import deleteDocument from documents but rename it to avoid conflict with staffDocumentService
export { deleteDocument as deleteClientDocument } from './documents/deleteDocument';
export * from './documents/types';
export * from './documents/storageUtils';
export * from './staffDocumentService';

