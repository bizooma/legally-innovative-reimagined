-- Drop the existing check constraint on status column
ALTER TABLE audit_results DROP CONSTRAINT IF EXISTS audit_results_status_check;

-- Add a new check constraint that allows the status values used by the edge function
ALTER TABLE audit_results ADD CONSTRAINT audit_results_status_check 
CHECK (status IN ('excellent', 'good', 'needs_improvement', 'critical'));