import { z } from 'zod';

export const GenerateRoadmapRequestSchema = z.object({
  topic: z.string()
    .min(3, 'Topic must be at least 3 characters')
    .max(100, 'Topic must not exceed 100 characters'),
});

export type GenerateRoadmapRequest = z.infer<typeof GenerateRoadmapRequestSchema>;

export const RoadmapNodeSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  level: z.enum(['beginner', 'intermediate', 'advanced', 'expert']),
  estimatedHours: z.number(),
});

export const RoadmapEdgeSchema = z.object({
  from: z.string(),
  to: z.string(),
});

export const RoadmapStructureSchema = z.object({
  topic: z.string(),
  nodes: z.array(RoadmapNodeSchema),
  edges: z.array(RoadmapEdgeSchema),
});

export type RoadmapNode = z.infer<typeof RoadmapNodeSchema>;
export type RoadmapEdge = z.infer<typeof RoadmapEdgeSchema>;
export type RoadmapStructure = z.infer<typeof RoadmapStructureSchema>;

export const RoadmapResponseSchema = z.object({
  topic: z.string(),
  mermaidDiagram: z.string(),
  structure: z.object({
    nodes: z.array(RoadmapNodeSchema),
    edges: z.array(RoadmapEdgeSchema),
  }),
  generatedAt: z.string(),
});

export type RoadmapResponse = z.infer<typeof RoadmapResponseSchema>;
