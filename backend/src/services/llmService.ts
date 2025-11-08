import OpenAI from 'openai';
import type { RoadmapResponse, RoadmapStructure } from '../utils/validators';
import { RoadmapStructureSchema } from '../utils/validators';
import { generateMermaidDiagram } from '../utils/mermaidGenerator';

export interface OpenAIConfig {
  apiKey: string;
  baseURL?: string;
  model: string;
}

function createOpenAIClient(config: OpenAIConfig): OpenAI {
  const clientConfig: ConstructorParameters<typeof OpenAI>[0] = {
    apiKey: config.apiKey,
  };

  if (config.baseURL) {
    clientConfig.baseURL = config.baseURL;
  }

  return new OpenAI(clientConfig);
}

function getDefaultConfig(): OpenAIConfig {
  return {
    apiKey: process.env.OPENAI_API_KEY || '',
    baseURL: process.env.OPENAI_BASE_URL,
    model: process.env.OPENAI_MODEL || 'gpt-3.5-turbo',
  };
}

const defaultConfig = getDefaultConfig();
const openai = createOpenAIClient(defaultConfig);

export class LLMService {
  private client: OpenAI;
  private config: OpenAIConfig;

  constructor(config?: OpenAIConfig) {
    this.config = config || defaultConfig;
    this.client = createOpenAIClient(this.config);
  }

  async generateRoadmap(topic: string): Promise<RoadmapResponse> {
    const prompt = this.buildPrompt(topic);

    try {
      const message = await this.client.chat.completions.create({
        model: this.config.model,
        max_tokens: 2000,
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
      });

      const responseText =
        message.choices[0].message.content || '';

      // Parse and validate the JSON response
      let structure: RoadmapStructure;
      try {
        // Try to extract JSON from the response (in case there's markdown formatting)
        const jsonMatch = responseText.match(/\{[\s\S]*\}/);
        if (!jsonMatch) {
          throw new Error('No JSON found in response');
        }
        structure = RoadmapStructureSchema.parse(JSON.parse(jsonMatch[0]));
      } catch (error) {
        console.error('Failed to parse LLM response:', responseText);
        throw new Error('Failed to parse roadmap structure from LLM response');
      }

      // Generate Mermaid diagram
      const mermaidDiagram = generateMermaidDiagram(structure);

      const response: RoadmapResponse = {
        topic: structure.topic,
        mermaidDiagram,
        structure: {
          nodes: structure.nodes,
          edges: structure.edges,
        },
        generatedAt: new Date().toISOString(),
      };

      return response;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to generate roadmap: ${error.message}`);
      }
      throw new Error('Failed to generate roadmap: Unknown error');
    }
  }

  private buildPrompt(topic: string): string {
    return `You are an expert career counselor and learning path designer.
Generate a comprehensive learning roadmap for: ${topic}

Output ONLY valid JSON (no markdown, no code blocks):
{
  "topic": "${topic}",
  "nodes": [
    {
      "id": "node_1",
      "title": "Skill Name",
      "description": "What you'll learn",
      "level": "beginner|intermediate|advanced|expert",
      "estimatedHours": 40
    }
  ],
  "edges": [
    {"from": "node_1", "to": "node_2"}
  ]
}

Guidelines:
- Create 5-8 nodes for a realistic learning path
- Order nodes logically from beginner to advanced
- Provide realistic time estimates (40-200 hours per node)
- Use meaningful node IDs (e.g., node_1, node_2)
- Ensure all edges reference valid nodes
- Cover both theoretical knowledge and practical skills`;
  }
}

export const llmService = new LLMService();

export { createOpenAIClient, getDefaultConfig };
