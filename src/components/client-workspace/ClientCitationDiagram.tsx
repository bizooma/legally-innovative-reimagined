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
import { Globe, Facebook, Twitter, Instagram, Linkedin, Youtube, MapPin, Star, Save, Lock, Unlock, Music, Play, Pause, RotateCcw } from 'lucide-react';
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
      case 'soundcloud':
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
        return 'bg-green-100 border-green-500';
      case 'review':
        return 'bg-yellow-100 border-yellow-500';
      case 'soundcloud':
        return 'bg-orange-100 border-orange-500';
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
    if (type === 'soundcloud') return `https://${url}`;
    if (type === 'website') return `https://${url}`;
    if (type === 'directory' && (url.includes('.com') || url.includes('share.google'))) return `https://${url}`;
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
      className={`px-4 py-2 shadow-md rounded-md border-2 ${getNodeColor()} min-w-[150px] transition-all duration-300 ${
        isClickable ? 'cursor-pointer hover:shadow-lg transition-shadow' : ''
      } ${data.isAnimating ? 'animation-pulse ring-2 ring-blue-400' : ''}`}
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
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationSpeed, setAnimationSpeed] = useState(1000); // ms per node

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
        url: 'instagram.com/caseyarbenzwins',
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
        url: 'linkedin.com/company/win-with-casey',
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
        url: 'share.google/el9yIDz61LdN2vgXC',
        status: 'active'
      },
    },
    {
      id: 'apple-maps',
      type: 'citation',
      position: { x: 400, y: 500 },
      data: { 
        label: 'Apple Maps', 
        type: 'directory',
        url: 'Apple Maps Listing',
        status: 'active'
      },
    },
    {
      id: 'bing-places',
      type: 'citation',
      position: { x: 600, y: 500 },
      data: { 
        label: 'Bing Places', 
        type: 'directory',
        url: 'Bing Places Listing',
        status: 'active'
      },
    },
    {
      id: 'soundcloud',
      type: 'citation',
      position: { x: 500, y: 400 },
      data: { 
        label: 'SoundCloud', 
        type: 'soundcloud',
        url: 'soundcloud.com/win-with-casey',
        status: 'active'
      },
    },

    // Review sites
    {
      id: 'yelp',
      type: 'citation',
      position: { x: 300, y: 600 },
      data: { 
        label: 'Yelp Reviews', 
        type: 'review',
        url: 'yelp.com/biz/puget-law-group-kent-2',
        status: 'active'
      },
    },
  ], [clientName]);

  const initialEdges: Edge[] = useMemo(() => [
    // Citations TO business (reversed for particle flow)
    { id: 'e-main-business', source: 'main-website', target: 'business', type: 'smoothstep' },
    { id: 'e-casey-at-bat-business', source: 'casey-at-bat', target: 'business', type: 'smoothstep' },
    { id: 'e-casey-fights-business', source: 'casey-fights', target: 'business', type: 'smoothstep' },
    { id: 'e-casey-arbenz-business', source: 'casey-arbenz', target: 'business', type: 'smoothstep' },
    { id: 'e-casey-arbenz-wins-business', source: 'casey-arbenz-wins', target: 'business', type: 'smoothstep' },
    
    // Social media TO business
    { id: 'e-facebook-business', source: 'facebook', target: 'business', type: 'smoothstep' },
    { id: 'e-instagram-business', source: 'instagram', target: 'business', type: 'smoothstep' },
    { id: 'e-linkedin-business', source: 'linkedin', target: 'business', type: 'smoothstep' },
    { id: 'e-youtube-business', source: 'youtube', target: 'business', type: 'smoothstep' },
    
    // Directories TO business
    { id: 'e-google-business', source: 'google-business', target: 'business', type: 'smoothstep' },
    { id: 'e-apple-maps-business', source: 'apple-maps', target: 'business', type: 'smoothstep' },
    { id: 'e-bing-places-business', source: 'bing-places', target: 'business', type: 'smoothstep' },
    
    // SoundCloud TO business
    { id: 'e-soundcloud-business', source: 'soundcloud', target: 'business', type: 'smoothstep' },
    
    // Reviews TO business
    { id: 'e-yelp-business', source: 'yelp', target: 'business', type: 'smoothstep' },
  ], []);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

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
    </Card>
  );
};

export default ClientCitationDiagram;