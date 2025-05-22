
import React from 'react';
import DocumentManagementContainer from './DocumentManagementContainer';

/**
 * Document Management Component
 * 
 * Wrapper component that maintains the original import path but uses
 * the refactored container component implementation.
 */
const DocumentManagement: React.FC = () => {
  return <DocumentManagementContainer />;
};

export default DocumentManagement;
