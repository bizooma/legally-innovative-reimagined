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
    .upsert(records);

  if (error) {
    console.error('Error saving diagram node positions:', error);
    return false;
  }

  return true;
}