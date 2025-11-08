-- Add start_date and end_date columns to projects table
ALTER TABLE projects 
ADD COLUMN start_date TIMESTAMP WITH TIME ZONE,
ADD COLUMN end_date TIMESTAMP WITH TIME ZONE;

-- Add index for better query performance
CREATE INDEX idx_projects_dates ON projects(start_date, end_date);