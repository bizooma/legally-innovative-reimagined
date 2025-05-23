
import { formatFileSize as formatFileSizeUtil } from '@/utils/fileUtils';

// Storage bucket for staff documents
export const STORAGE_BUCKET = 'staff_documents';

/**
 * Format file size to human-readable format
 * Re-exported from the main utility for backwards compatibility
 */
export const formatFileSize = formatFileSizeUtil;
