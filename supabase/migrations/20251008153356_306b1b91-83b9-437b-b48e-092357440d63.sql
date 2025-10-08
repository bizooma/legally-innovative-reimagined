-- Add status column to clients table
ALTER TABLE clients 
ADD COLUMN status text NOT NULL DEFAULT 'active'
CHECK (status IN ('active', 'paused', 'terminated'));

-- Add index for filtering by status
CREATE INDEX idx_clients_status ON clients(status);

-- Add comment for documentation
COMMENT ON COLUMN clients.status IS 'Client status: active (green), paused (yellow), or terminated (red)';