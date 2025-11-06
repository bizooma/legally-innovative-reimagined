import { supabase } from '@/integrations/supabase/client';

export interface DiagramNodePosition {
  id: string;
  client_id: string;
  node_id: string;
  x_position: number;
  y_position: number;
  updated_at: string;
  updated_by: string;
}

export interface NodePosition {
  nodeId: string;
  x: number;
  y: number;
}

export interface ClientCitation {
  id?: string;
  client_id: string;
  node_id: string;
  label: string;
  type: string;
  url?: string;
  status?: string;
  created_at?: string;
  updated_at?: string;
}

export async function loadDiagramNodePositions(clientId: string): Promise<NodePosition[]> {
  const { data, error } = await supabase
    .from('client_diagram_nodes')
    .select('node_id, x_position, y_position')
    .eq('client_id', clientId);

  if (error) {
    console.error('Error loading diagram node positions:', error);
    return [];
  }

  return data.map(node => ({
    nodeId: node.node_id,
    x: node.x_position,
    y: node.y_position
  }));
}

export async function saveDiagramNodePosition(
  clientId: string,
  nodeId: string,
  x: number,
  y: number
): Promise<boolean> {
  const { error } = await supabase
    .from('client_diagram_nodes')
    .upsert({
      client_id: clientId,
      node_id: nodeId,
      x_position: x,
      y_position: y,
      updated_by: (await supabase.auth.getUser()).data.user?.id || ''
    });

  if (error) {
    console.error('Error saving diagram node position:', error);
    return false;
  }

  return true;
}

export async function saveDiagramNodePositions(
  clientId: string,
  positions: NodePosition[]
): Promise<boolean> {
  const userId = (await supabase.auth.getUser()).data.user?.id;
  if (!userId) return false;

  const records = positions.map(pos => ({
    client_id: clientId,
    node_id: pos.nodeId,
    x_position: pos.x,
    y_position: pos.y,
    updated_by: userId
  }));

  const { error } = await supabase
    .from('client_diagram_nodes')
    .upsert(records, {
      onConflict: 'client_id,node_id'
    });

  if (error) {
    console.error('Error saving diagram node positions:', error);
    return false;
  }

  return true;
}

// Citation Management Functions

export async function loadClientCitations(clientId: string): Promise<ClientCitation[]> {
  const { data, error } = await supabase
    .from('client_citations')
    .select('*')
    .eq('client_id', clientId)
    .eq('status', 'active');

  if (error) {
    console.error('Error loading client citations:', error);
    return [];
  }

  return data || [];
}

export async function saveClientCitation(citation: ClientCitation): Promise<boolean> {
  const { error } = await supabase
    .from('client_citations')
    .upsert({
      client_id: citation.client_id,
      node_id: citation.node_id,
      label: citation.label,
      type: citation.type,
      url: citation.url,
      status: citation.status || 'active'
    }, {
      onConflict: 'client_id,node_id'
    });

  if (error) {
    console.error('Error saving client citation:', error);
    return false;
  }

  return true;
}

export async function deleteClientCitation(clientId: string, nodeId: string): Promise<boolean> {
  const { error } = await supabase
    .from('client_citations')
    .delete()
    .eq('client_id', clientId)
    .eq('node_id', nodeId);

  if (error) {
    console.error('Error deleting client citation:', error);
    return false;
  }

  return true;
}