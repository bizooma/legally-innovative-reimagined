import React, { useCallback, useMemo, useEffect, useState } from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Node,
  Edge,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Globe, Facebook, Twitter, Instagram, Linkedin, Youtube, MapPin, Star, Save, Lock, Unlock, Music, Play, Pause, RotateCcw, Plus, Edit, Trash2 } from 'lucide-react';
import { handleView } from '@/utils/documentActions';
import { loadDiagramNodePositions, saveDiagramNodePositions, NodePosition, loadClientCitations, saveClientCitation, deleteClientCitation, ClientCitation } from '@/services/diagramService';
import { useToast } from '@/hooks/use-toast';
import CitationEditorDialog from './CitationEditorDialog';
import { supabase } from '@/integrations/supabase/client';

interface ClientCitationDiagramProps {
  clientId: string;
  clientName: string;
}

// Custom node component for citations
const CitationNode = ({ data }: { data: any }) => {
  const getIcon = () => {
    switch (data.type) {
      case 'website':
        return <Globe className="h-4 w-4" />;
      case 'facebook':
        return <Facebook className="h-4 w-4" />;
      case 'twitter':
        return <Twitter className="h-4 w-4" />;
      case 'instagram':
        return <Instagram className="h-4 w-4" />;
      case 'linkedin':
        return <Linkedin className="h-4 w-4" />;
      case 'youtube':
        return <Youtube className="h-4 w-4" />;
      case 'directory':
      case 'google':
        return <MapPin className="h-4 w-4" />;
      case 'review':
      case 'yelp':
      case 'avvo':
        return <Star className="h-4 w-4" />;
      case 'soundcloud':
      case 'tiktok':
        return <Music className="h-4 w-4" />;
      default:
        return <Globe className="h-4 w-4" />;
    }
  };

  const getNodeColor = () => {
    switch (data.type) {
      case 'website':
        return 'bg-blue-100 border-blue-300';
      case 'facebook':
        return 'bg-blue-100 border-blue-500';
      case 'twitter':
        return 'bg-sky-100 border-sky-400';
      case 'instagram':
        return 'bg-pink-100 border-pink-400';
      case 'linkedin':
        return 'bg-blue-100 border-blue-600';
      case 'youtube':
        return 'bg-red-100 border-red-500';
      case 'directory':
      case 'google':
        return 'bg-green-100 border-green-500';
      case 'review':
      case 'yelp':
      case 'avvo':
        return 'bg-yellow-100 border-yellow-500';
      case 'soundcloud':
      case 'tiktok':
        return 'bg-orange-100 border-orange-500';
      default:
        return 'bg-gray-100 border-gray-300';
    }
  };

  const getClickableUrl = (url: string, type: string) => {
    if (!url) return null;
    if (url.includes('http')) return url;
    if (['facebook', 'instagram', 'linkedin', 'youtube', 'soundcloud', 'twitter', 'tiktok'].includes(type)) {
      return `https://${url}`;
    }
    if (type === 'website' || url.includes('.com')) {
      return url.startsWith('http') ? url : `https://${url}`;
    }
    return null;
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const clickableUrl = getClickableUrl(data.url, data.type);
    if (clickableUrl && data.type !== 'business') {
      handleView(clickableUrl);
    }
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (data.onEdit) {
      data.onEdit(data);
    }
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (data.onDelete) {
      data.onDelete(data.nodeId);
    }
  };

  const isClickable = data.url && data.type !== 'business' && getClickableUrl(data.url, data.type);
  const isEditable = data.type !== 'business' && data.onEdit;

  return (
    <div 
      className={`px-4 py-2 shadow-md rounded-md border-2 ${getNodeColor()} min-w-[150px] transition-all duration-300 ${
        isClickable ? 'cursor-pointer hover:shadow-lg transition-shadow' : ''
      } ${data.isAnimating ? 'animation-pulse ring-2 ring-blue-400' : ''} group relative`}
      onClick={handleClick}
    >
      <div className="flex items-center gap-2">
        {getIcon()}
        <div className="font-medium text-sm">{data.label}</div>
      </div>
      {data.url && (
        <div className="text-xs text-gray-600 mt-1 truncate">{data.url}</div>
      )}
      {isEditable && (
        <div className="absolute top-1 right-1 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={handleEdit}
            className="bg-blue-500 text-white p-1 rounded hover:bg-blue-600"
            title="Edit citation"
          >
            <Edit className="h-3 w-3" />
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white p-1 rounded hover:bg-red-600"
            title="Delete citation"
          >
            <Trash2 className="h-3 w-3" />
          </button>
        </div>
      )}
    </div>
  );
};

const nodeTypes = {
  citation: CitationNode,
};

const ClientCitationDiagram: React.FC<ClientCitationDiagramProps> = ({ clientId, clientName }) => {
  const { toast } = useToast();
  const [isLocked, setIsLocked] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [hasLoadedPositions, setHasLoadedPositions] = useState(false);
  const [hasLoadedCitations, setHasLoadedCitations] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationSpeed, setAnimationSpeed] = useState(1000);
  const [citations, setCitations] = useState<ClientCitation[]>([]);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingCitation, setEditingCitation] = useState<ClientCitation | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  // Check if user is admin
  useEffect(() => {
    const checkAdmin = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;
      
      const { data } = await supabase
        .from('users')
        .select('is_admin')
        .eq('id', session.user.id)
        .single();
      
      if (data?.is_admin) {
        setIsAdmin(true);
      }
    };
    checkAdmin();
  }, []);

  // Load citations from database
  useEffect(() => {
    const loadCitations = async () => {
      try {
        const loadedCitations = await loadClientCitations(clientId);
        setCitations(loadedCitations);
        setHasLoadedCitations(true);
      } catch (error) {
        console.error('Failed to load citations:', error);
        toast({
          title: "Load failed",
          description: "Failed to load citations from database.",
          variant: "destructive",
        });
        setHasLoadedCitations(true);
      }
    };

    if (clientId && !hasLoadedCitations) {
      loadCitations();
    }
  }, [clientId, hasLoadedCitations, toast]);

  // Build nodes from citations
  const initialNodes: Node[] = useMemo(() => {
    const nodes: Node[] = [
      // Central business node
      {
        id: 'business',
        type: 'citation',
        position: { x: 400, y: 300 },
        data: { 
          label: clientName, 
          type: 'business',
          url: 'Main Business'
        },
        style: { 
          background: '#fef3c7', 
          border: '3px solid #f59e0b',
          borderRadius: '10px',
          fontWeight: 'bold'
        },
      },
    ];

    // Add citation nodes from database
    citations.forEach((citation, index) => {
      // Calculate position in a circular layout if no saved position exists
      const angle = (index / citations.length) * 2 * Math.PI;
      const radius = 250;
      const x = 400 + radius * Math.cos(angle);
      const y = 300 + radius * Math.sin(angle);

      nodes.push({
        id: citation.node_id,
        type: 'citation',
        position: { x, y },
        data: {
          nodeId: citation.node_id,
          label: citation.label,
          type: citation.type,
          url: citation.url,
          status: citation.status,
          onEdit: isAdmin ? (data: any) => {
            setEditingCitation(citation);
            setIsEditorOpen(true);
          } : undefined,
          onDelete: isAdmin ? async (nodeId: string) => {
            if (confirm(`Delete citation "${citation.label}"?`)) {
              const success = await deleteClientCitation(clientId, nodeId);
              if (success) {
                setCitations(prev => prev.filter(c => c.node_id !== nodeId));
                toast({
                  title: "Citation deleted",
                  description: "The citation has been removed.",
                });
              } else {
                toast({
                  title: "Delete failed",
                  description: "Failed to delete citation.",
                  variant: "destructive",
                });
              }
            }
          } : undefined,
        },
      });
    });

    return nodes;
  }, [clientName, citations, isAdmin, clientId, toast]);

  // Build edges from citations to business
  const initialEdges: Edge[] = useMemo(() => {
    return citations.map(citation => ({
      id: `e-${citation.node_id}-business`,
      source: citation.node_id,
      target: 'business',
      type: 'smoothstep',
    }));
  }, [citations]);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  // Update nodes when citations change
  useEffect(() => {
    setNodes(initialNodes);
  }, [initialNodes, setNodes]);

  // Update edges when citations change
  useEffect(() => {
    setEdges(initialEdges);
  }, [initialEdges, setEdges]);

  // Handle saving a citation
  const handleSaveCitation = async (citation: ClientCitation) => {
    const success = await saveClientCitation(citation);
    if (success) {
      // Reload citations
      const loadedCitations = await loadClientCitations(clientId);
      setCitations(loadedCitations);
      toast({
        title: "Citation saved",
        description: "The citation has been saved successfully.",
      });
    } else {
      toast({
        title: "Save failed",
        description: "Failed to save citation.",
        variant: "destructive",
      });
    }
  };

  const handleAddCitation = () => {
    setEditingCitation(null);
    setIsEditorOpen(true);
  };

  // Animation functions
  const startAnimation = useCallback(() => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    
    // Get all nodes except the business node
    const citationNodes = nodes.filter(node => node.id !== 'business');
    
    // Animate edges first - add flowing dots
    setEdges(currentEdges => 
      currentEdges.map(edge => ({
        ...edge,
        animated: true,
        style: { 
          ...edge.style, 
          stroke: '#3b82f6',
          strokeWidth: 2
        }
      }))
    );
    
    // Then animate nodes in sequence
    citationNodes.forEach((node, index) => {
      setTimeout(() => {
        setNodes(currentNodes =>
          currentNodes.map(n =>
            n.id === node.id
              ? { ...n, data: { ...n.data, isAnimating: true } }
              : n
          )
        );
        
        // Remove node animation after a brief period
        setTimeout(() => {
          setNodes(currentNodes =>
            currentNodes.map(n =>
              n.id === node.id
                ? { ...n, data: { ...n.data, isAnimating: false } }
                : n
            )
          );
        }, animationSpeed / 2);
        
      }, index * (animationSpeed / 4));
    });
    
    // Highlight business node at the end
    setTimeout(() => {
      setNodes(currentNodes =>
        currentNodes.map(n =>
          n.id === 'business'
            ? { ...n, data: { ...n.data, isAnimating: true } }
            : n
        )
      );
      
      setTimeout(() => {
        setNodes(currentNodes =>
          currentNodes.map(n =>
            n.id === 'business'
              ? { ...n, data: { ...n.data, isAnimating: false } }
              : n
          )
        );
        
        // Stop edge animation
        setEdges(currentEdges => 
          currentEdges.map(edge => ({
            ...edge,
            animated: false,
            style: { 
              ...edge.style, 
              stroke: '#64748b',
              strokeWidth: 1
            }
          }))
        );
        
        setIsAnimating(false);
      }, animationSpeed);
      
    }, citationNodes.length * (animationSpeed / 4) + animationSpeed / 2);
  }, [nodes, isAnimating, animationSpeed, setNodes, setEdges]);

  const stopAnimation = useCallback(() => {
    setIsAnimating(false);
    
    // Reset all animations
    setNodes(currentNodes =>
      currentNodes.map(node => ({
        ...node,
        data: { ...node.data, isAnimating: false }
      }))
    );
    
    setEdges(currentEdges => 
      currentEdges.map(edge => ({
        ...edge,
        animated: false,
        style: { 
          ...edge.style, 
          stroke: '#64748b',
          strokeWidth: 1
        }
      }))
    );
  }, [setNodes, setEdges]);

  const resetAnimation = useCallback(() => {
    stopAnimation();
  }, [stopAnimation]);

  // Load saved node positions from database
  useEffect(() => {
    const loadPositions = async () => {
      try {
        const savedPositions = await loadDiagramNodePositions(clientId);
        if (savedPositions.length > 0) {
          setNodes(currentNodes => 
            currentNodes.map(node => {
              const savedPos = savedPositions.find(pos => pos.nodeId === node.id);
              return savedPos 
                ? { ...node, position: { x: savedPos.x, y: savedPos.y } }
                : node;
            })
          );
        }
        setHasLoadedPositions(true);
      } catch (error) {
        console.error('Failed to load node positions:', error);
        setHasLoadedPositions(true);
      }
    };

    if (clientId && !hasLoadedPositions) {
      loadPositions();
    }
  }, [clientId, hasLoadedPositions, setNodes]);

  // Save current node positions to database
  const handleSaveLayout = async () => {
    setIsSaving(true);
    try {
      const positions: NodePosition[] = nodes.map(node => ({
        nodeId: node.id,
        x: node.position.x,
        y: node.position.y
      }));

      const success = await saveDiagramNodePositions(clientId, positions);
      if (success) {
        toast({
          title: "Layout saved",
          description: "Node positions have been saved and will be preserved for all users.",
        });
      } else {
        toast({
          title: "Save failed",
          description: "Failed to save node positions. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Failed to save positions:', error);
      toast({
        title: "Save error",
        description: "An error occurred while saving positions.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  // Handle node changes with lock check
  const handleNodesChange = useCallback((changes: any) => {
    if (!isLocked) {
      onNodesChange(changes);
    }
  }, [isLocked, onNodesChange]);

  const onConnect = useCallback(
    (params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  return (
    <Card className="w-full h-[800px]">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>Citation Network Diagram</CardTitle>
            <p className="text-sm text-gray-600">
              Interactive diagram showing all digital citations and online presence for {clientName}
            </p>
          </div>
          <div className="flex gap-2">
            {isAdmin && (
              <Button
                variant="default"
                size="sm"
                onClick={handleAddCitation}
                className="flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Add Citation
              </Button>
            )}
            <div className="flex gap-1 border rounded-md p-1">
              <Button
                variant={isAnimating ? "secondary" : "outline"}
                size="sm"
                onClick={isAnimating ? stopAnimation : startAnimation}
                disabled={isLocked}
                className="flex items-center gap-1 h-8 px-2"
              >
                {isAnimating ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
                {isAnimating ? 'Stop' : 'Flow'}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={resetAnimation}
                disabled={isLocked}
                className="flex items-center gap-1 h-8 px-2"
              >
                <RotateCcw className="h-3 w-3" />
                Reset
              </Button>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsLocked(!isLocked)}
              className="flex items-center gap-2"
            >
              {isLocked ? <Lock className="h-4 w-4" /> : <Unlock className="h-4 w-4" />}
              {isLocked ? 'Locked' : 'Unlocked'}
            </Button>
            <Button
              variant="default"
              size="sm"
              onClick={handleSaveLayout}
              disabled={isSaving || isLocked}
              className="flex items-center gap-2"
            >
              <Save className="h-4 w-4" />
              {isSaving ? 'Saving...' : 'Save Layout'}
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="h-[700px] p-0 relative">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={handleNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          fitView
          style={{ backgroundColor: "#f8fafc" }}
        >
          <Controls />
          <MiniMap />
          <Background gap={12} size={1} />
        </ReactFlow>
      </CardContent>
      <CitationEditorDialog
        isOpen={isEditorOpen}
        onOpenChange={setIsEditorOpen}
        citation={editingCitation}
        clientId={clientId}
        onSave={handleSaveCitation}
      />
    </Card>
  );
};

export default ClientCitationDiagram;