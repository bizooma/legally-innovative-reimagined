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
import { Globe, Facebook, Twitter, Instagram, Linkedin, Youtube, MapPin, Star, Save, Lock, Unlock } from 'lucide-react';
import { handleView } from '@/utils/documentActions';
import { loadDiagramNodePositions, saveDiagramNodePositions, NodePosition } from '@/services/diagramService';
import { useToast } from '@/hooks/use-toast';

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
        return <MapPin className="h-4 w-4" />;
      case 'review':
        return <Star className="h-4 w-4" />;
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
        return 'bg-green-100 border-green-500';
      case 'review':
        return 'bg-yellow-100 border-yellow-500';
      default:
        return 'bg-gray-100 border-gray-300';
    }
  };

  const getClickableUrl = (url: string, type: string) => {
    if (url.includes('http')) return url;
    if (type === 'facebook') return `https://${url}`;
    if (type === 'instagram') return `https://${url}`;
    if (type === 'linkedin') return `https://${url}`;
    if (type === 'youtube') return `https://${url}`;
    if (type === 'website') return `https://${url}`;
    if (type === 'directory' && url.includes('.com')) return `https://${url}`;
    if (type === 'review' && url.includes('.com')) return `https://${url}`;
    return null;
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const clickableUrl = getClickableUrl(data.url, data.type);
    if (clickableUrl && data.type !== 'business') {
      handleView(clickableUrl);
    }
  };

  const isClickable = data.url && data.type !== 'business' && getClickableUrl(data.url, data.type);

  return (
    <div 
      className={`px-4 py-2 shadow-md rounded-md border-2 ${getNodeColor()} min-w-[150px] ${
        isClickable ? 'cursor-pointer hover:shadow-lg transition-shadow' : ''
      }`}
      onClick={handleClick}
    >
      <div className="flex items-center gap-2">
        {getIcon()}
        <div className="font-medium text-sm">{data.label}</div>
      </div>
      {data.url && (
        <div className="text-xs text-gray-600 mt-1 truncate">{data.url}</div>
      )}
      {data.status && (
        <div className={`text-xs mt-1 ${data.status === 'active' ? 'text-green-600' : 'text-red-600'}`}>
          {data.status}
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

  // Sample data for Win with Casey - replace with actual data from your database
  const initialNodes: Node[] = useMemo(() => [
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
    
    // Website nodes
    {
      id: 'main-website',
      type: 'citation',
      position: { x: 200, y: 100 },
      data: { 
        label: 'Main Website', 
        type: 'website',
        url: 'winwithcasey.com',
        status: 'active'
      },
    },
    {
      id: 'casey-at-bat',
      type: 'citation',
      position: { x: 800, y: 100 },
      data: { 
        label: 'Casey at Bat', 
        type: 'website',
        url: 'caseyatbat.com',
        status: 'active'
      },
    },
    {
      id: 'casey-fights',
      type: 'citation',
      position: { x: 200, y: 200 },
      data: { 
        label: 'Casey Fights', 
        type: 'website',
        url: 'caseyfights.com',
        status: 'active'
      },
    },
    {
      id: 'casey-arbenz',
      type: 'citation',
      position: { x: 600, y: 200 },
      data: { 
        label: 'Casey Arbenz', 
        type: 'website',
        url: 'caseyarbenz.com',
        status: 'active'
      },
    },
    {
      id: 'casey-arbenz-wins',
      type: 'citation',
      position: { x: 800, y: 200 },
      data: { 
        label: 'Casey Arbenz Wins', 
        type: 'website',
        url: 'caseyarbenzwins.com',
        status: 'active'
      },
    },

    // Social media nodes
    {
      id: 'facebook',
      type: 'citation',
      position: { x: 100, y: 300 },
      data: { 
        label: 'Facebook Page', 
        type: 'facebook',
        url: 'facebook.com/winwithcasey',
        status: 'active'
      },
    },
    {
      id: 'instagram',
      type: 'citation',
      position: { x: 100, y: 400 },
      data: { 
        label: 'Instagram', 
        type: 'instagram',
        url: 'instagram.com/winwithcasey',
        status: 'active'
      },
    },
    {
      id: 'linkedin',
      type: 'citation',
      position: { x: 700, y: 300 },
      data: { 
        label: 'LinkedIn', 
        type: 'linkedin',
        url: 'linkedin.com/company/winwithcasey',
        status: 'active'
      },
    },
    {
      id: 'youtube',
      type: 'citation',
      position: { x: 700, y: 400 },
      data: { 
        label: 'YouTube Channel', 
        type: 'youtube',
        url: 'youtube.com/@winwithcasey',
        status: 'active'
      },
    },

    // Directory listings
    {
      id: 'google-business',
      type: 'citation',
      position: { x: 200, y: 500 },
      data: { 
        label: 'Google Business Profile', 
        type: 'directory',
        url: 'Google My Business',
        status: 'active'
      },
    },

    // Review sites
    {
      id: 'google-reviews',
      type: 'citation',
      position: { x: 100, y: 600 },
      data: { 
        label: 'Google Reviews', 
        type: 'review',
        url: 'Google Reviews (4.8/5)',
        status: 'active'
      },
    },
    {
      id: 'yelp',
      type: 'citation',
      position: { x: 300, y: 600 },
      data: { 
        label: 'Yelp Reviews', 
        type: 'review',
        url: 'yelp.com/biz/winwithcasey',
        status: 'active'
      },
    },
  ], [clientName]);

  const initialEdges: Edge[] = useMemo(() => [
    // Business to websites
    { id: 'e-business-main', source: 'business', target: 'main-website', type: 'smoothstep' },
    { id: 'e-business-casey-at-bat', source: 'business', target: 'casey-at-bat', type: 'smoothstep' },
    { id: 'e-business-casey-fights', source: 'business', target: 'casey-fights', type: 'smoothstep' },
    { id: 'e-business-casey-arbenz', source: 'business', target: 'casey-arbenz', type: 'smoothstep' },
    { id: 'e-business-casey-arbenz-wins', source: 'business', target: 'casey-arbenz-wins', type: 'smoothstep' },
    
    // Business to social media
    { id: 'e-business-facebook', source: 'business', target: 'facebook', type: 'smoothstep' },
    { id: 'e-business-instagram', source: 'business', target: 'instagram', type: 'smoothstep' },
    { id: 'e-business-linkedin', source: 'business', target: 'linkedin', type: 'smoothstep' },
    { id: 'e-business-youtube', source: 'business', target: 'youtube', type: 'smoothstep' },
    
    // Business to directories
    { id: 'e-business-google', source: 'business', target: 'google-business', type: 'smoothstep' },
    
    // Business to reviews
    { id: 'e-business-greview', source: 'business', target: 'google-reviews', type: 'smoothstep' },
    { id: 'e-business-yelp', source: 'business', target: 'yelp', type: 'smoothstep' },
  ], []);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

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
      <CardContent className="h-[700px] p-0">
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
    </Card>
  );
};

export default ClientCitationDiagram;