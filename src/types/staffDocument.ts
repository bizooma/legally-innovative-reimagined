
export interface StaffDocument {
  id: string;
  name: string;
  description: string | null;
  file_path: string;
  file_size: string;
  file_type: string;
  uploaded_by: string;
  created_at: string;
}

export interface StaffDocumentAssignment {
  id: string;
  document_id: string;
  staff_id: string;
  assigned_at: string;
  document?: StaffDocument;
}

export interface StaffDocumentWithUrl extends StaffDocument {
  url: string;
}

export interface StaffDocumentFormData {
  description: string;
}
