import { RoadmapResponse } from './types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export interface GenerateRoadmapOptions {
  openaiBaseUrl?: string;
  openaiModel?: string;
  openaiApiKey?: string;
}

export async function generateRoadmap(
  topic: string,
  options?: GenerateRoadmapOptions
): Promise<RoadmapResponse> {
  const body: Record<string, string> = { topic };

  if (options?.openaiBaseUrl) {
    body.openaiBaseUrl = options.openaiBaseUrl;
  }
  if (options?.openaiModel) {
    body.openaiModel = options.openaiModel;
  }
  if (options?.openaiApiKey) {
    body.openaiApiKey = options.openaiApiKey;
  }

  const response = await fetch(`${API_URL}/api/roadmap/generate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to generate roadmap');
  }

  return response.json();
}
