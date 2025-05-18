
/**
 * Utility functions for file operations
 */

/**
 * Format file size from bytes to human-readable format
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}

/**
 * Get file type from filename
 */
export function getFileType(filename: string): string {
  const ext = filename.split('.').pop()?.toLowerCase() || '';
  
  const fileTypes: Record<string, string> = {
    'pdf': 'PDF',
    'doc': 'DOC',
    'docx': 'DOCX',
    'xls': 'XLS',
    'xlsx': 'XLSX',
    'ppt': 'PPT',
    'pptx': 'PPTX',
    'txt': 'TXT',
    'csv': 'CSV',
    'jpg': 'JPG',
    'jpeg': 'JPEG',
    'png': 'PNG',
    'gif': 'GIF'
  };
  
  return fileTypes[ext] || ext.toUpperCase();
}
