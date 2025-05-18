
/**
 * Document-related type definitions
 */

export interface Document {
  id: string;
  name: string;
  type: string;
  size: string;
  lastUpdated: string;
  path: string;
  url: string;
  description?: string; // Make description optional to handle cases where it's not set
}
