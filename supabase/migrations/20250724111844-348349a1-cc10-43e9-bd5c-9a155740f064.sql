-- Create table for storing client diagram node positions
CREATE TABLE public.client_diagram_nodes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  client_id UUID NOT NULL,
  node_id TEXT NOT NULL,
  x_position FLOAT NOT NULL,
  y_position FLOAT NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_by UUID NOT NULL,
  UNIQUE(client_id, node_id)
);

-- Enable RLS
ALTER TABLE public.client_diagram_nodes ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view diagram nodes for accessible clients" 
ON public.client_diagram_nodes 
FOR SELECT 
USING (
  client_id IN (
    SELECT id FROM clients WHERE 
    (auth.uid() IN (SELECT id FROM users WHERE is_admin = true)) OR
    (auth.uid() IN (SELECT id FROM users WHERE client_id = clients.id))
  )
);

CREATE POLICY "Authenticated users can manage diagram nodes" 
ON public.client_diagram_nodes 
FOR ALL 
USING (
  client_id IN (
    SELECT id FROM clients WHERE 
    (auth.uid() IN (SELECT id FROM users WHERE is_admin = true)) OR
    (auth.uid() IN (SELECT id FROM users WHERE client_id = clients.id))
  )
)
WITH CHECK (
  client_id IN (
    SELECT id FROM clients WHERE 
    (auth.uid() IN (SELECT id FROM users WHERE is_admin = true)) OR
    (auth.uid() IN (SELECT id FROM users WHERE client_id = clients.id))
  )
);

-- Create function to update timestamp
CREATE OR REPLACE FUNCTION public.update_diagram_node_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  NEW.updated_by = auth.uid();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_diagram_nodes_timestamp
BEFORE UPDATE ON public.client_diagram_nodes
FOR EACH ROW
EXECUTE FUNCTION public.update_diagram_node_timestamp();