
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface Node {
  id: string;
  label: string;
  type: 'root' | 'container' | 'page' | 'component' | 'library';
  x: number;
  y: number;
  width: number;
  height: number;
}

interface Edge {
  from: string;
  to: string;
}

const ArchitectureDiagram = () => {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  
  // Define nodes
  const nodes: Node[] = [
    { id: 'app', label: 'App.tsx', type: 'root', x: 400, y: 50, width: 120, height: 40 },
    { id: 'router', label: 'BrowserRouter', type: 'container', x: 280, y: 130, width: 140, height: 40 },
    { id: 'query', label: 'QueryClientProvider', type: 'container', x: 520, y: 130, width: 160, height: 40 },
    { id: 'index', label: 'Index.tsx', type: 'page', x: 160, y: 210, width: 100, height: 40 },
    { id: 'scholarships', label: 'Scholarships.tsx', type: 'page', x: 280, y: 210, width: 140, height: 40 },
    { id: 'resources', label: 'Resources.tsx', type: 'page', x: 440, y: 210, width: 120, height: 40 },
    { id: 'calculator', label: 'Calculator.tsx', type: 'page', x: 580, y: 210, width: 120, height: 40 },
    { id: 'notfound', label: 'NotFound.tsx', type: 'page', x: 720, y: 210, width: 120, height: 40 },
    { id: 'navbar', label: 'Navbar', type: 'component', x: 100, y: 290, width: 80, height: 40 },
    { id: 'hero', label: 'Hero', type: 'component', x: 200, y: 290, width: 80, height: 40 },
    { id: 'scholarship-finder', label: 'ScholarshipFinder', type: 'component', x: 300, y: 290, width: 160, height: 40 },
    { id: 'financial-tools', label: 'FinancialTools', type: 'component', x: 480, y: 290, width: 140, height: 40 },
    { id: 'resource-hub', label: 'ResourceHub', type: 'component', x: 640, y: 290, width: 120, height: 40 },
  ];
  
  // Define edges
  const edges: Edge[] = [
    { from: 'app', to: 'router' },
    { from: 'app', to: 'query' },
    { from: 'router', to: 'index' },
    { from: 'router', to: 'scholarships' },
    { from: 'router', to: 'resources' },
    { from: 'router', to: 'calculator' },
    { from: 'router', to: 'notfound' },
    { from: 'index', to: 'navbar' },
    { from: 'index', to: 'hero' },
    { from: 'index', to: 'scholarship-finder' },
    { from: 'index', to: 'financial-tools' },
    { from: 'index', to: 'resource-hub' },
  ];
  
  // Function to generate SVG path between nodes
  const generatePath = (from: Node, to: Node) => {
    const fromBottom = from.y + from.height;
    const toTop = to.y;
    
    return `M ${from.x + from.width/2} ${fromBottom} 
            C ${from.x + from.width/2} ${fromBottom + 20}, 
              ${to.x + to.width/2} ${toTop - 20}, 
              ${to.x + to.width/2} ${toTop}`;
  };
  
  // Function to get node color based on type
  const getNodeColor = (type: Node['type'], isHovered: boolean) => {
    const baseColors = {
      root: 'bg-primary/80 border-primary',
      container: 'bg-blue-500/70 border-blue-600',
      page: 'bg-emerald-500/70 border-emerald-600',
      component: 'bg-amber-500/70 border-amber-600',
      library: 'bg-purple-500/70 border-purple-600'
    };
    
    if (isHovered) {
      return baseColors[type].replace('/70', '/90').replace('/80', '/100');
    }
    
    return baseColors[type];
  };
  
  // Generate node descriptions
  const getNodeDescription = (type: Node['type']) => {
    switch (type) {
      case 'root': return 'Root application component';
      case 'container': return 'Provider component that wraps the application';
      case 'page': return 'Route-level page component';
      case 'component': return 'Reusable feature component';
      case 'library': return 'External library or utility';
      default: return '';
    }
  };
  
  return (
    <div className="relative overflow-x-auto bg-background/50 border rounded-lg p-4 mb-12 shadow-sm">
      <div className="mb-4 flex flex-wrap gap-4">
        {['root', 'container', 'page', 'component', 'library'].map((type) => (
          <div key={type} className="flex items-center">
            <div className={cn(
              'w-4 h-4 rounded mr-2 border',
              getNodeColor(type as Node['type'], false)
            )}></div>
            <span className="text-sm">{type.charAt(0).toUpperCase() + type.slice(1)}: {getNodeDescription(type as Node['type'])}</span>
          </div>
        ))}
      </div>
      
      <svg width="800" height="350" className="mx-auto">
        {/* Draw edges */}
        {edges.map((edge) => {
          const fromNode = nodes.find(n => n.id === edge.from);
          const toNode = nodes.find(n => n.id === edge.to);
          
          if (!fromNode || !toNode) return null;
          
          const isHighlighted = hoveredNode === edge.from || hoveredNode === edge.to;
          
          return (
            <path
              key={`${edge.from}-${edge.to}`}
              d={generatePath(fromNode, toNode)}
              stroke={isHighlighted ? "#000" : "#94a3b8"}
              strokeWidth={isHighlighted ? 2 : 1}
              fill="none"
              markerEnd="url(#arrowhead)"
              opacity={hoveredNode && !isHighlighted ? 0.3 : 1}
            />
          );
        })}
        
        {/* Draw nodes */}
        {nodes.map((node) => {
          const isHovered = hoveredNode === node.id;
          const isConnected = hoveredNode ? edges.some(e => 
            (e.from === hoveredNode && e.to === node.id) || 
            (e.to === hoveredNode && e.from === node.id)) : false;
          
          return (
            <g 
              key={node.id}
              onMouseEnter={() => setHoveredNode(node.id)}
              onMouseLeave={() => setHoveredNode(null)}
              style={{ cursor: 'pointer' }}
              opacity={hoveredNode && !isHovered && !isConnected ? 0.4 : 1}
            >
              <rect
                x={node.x - node.width/2}
                y={node.y}
                width={node.width}
                height={node.height}
                rx="4"
                className={cn(
                  'fill-current stroke-current transition-colors',
                  getNodeColor(node.type, isHovered)
                )}
              />
              <text
                x={node.x}
                y={node.y + node.height/2 + 5}
                textAnchor="middle"
                className="fill-white text-xs font-medium"
              >
                {node.label}
              </text>
            </g>
          );
        })}
        
        {/* Arrow marker definition */}
        <defs>
          <marker
            id="arrowhead"
            markerWidth="10"
            markerHeight="7"
            refX="9"
            refY="3.5"
            orient="auto"
          >
            <polygon points="0 0, 10 3.5, 0 7" fill="#94a3b8" />
          </marker>
        </defs>
      </svg>
      
      <div className="text-sm text-center text-muted-foreground mt-4">
        Hover over components to highlight relationships
      </div>
    </div>
  );
};

export default ArchitectureDiagram;
