export interface RoadmapNode {
  id: string;
  title: string;
  description: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  estimatedHours: number;
}

export interface RoadmapEdge {
  from: string;
  to: string;
}

export interface RoadmapResponse {
  topic: string;
  mermaidDiagram: string;
  structure: {
    nodes: RoadmapNode[];
    edges: RoadmapEdge[];
  };
  generatedAt: string;
}
