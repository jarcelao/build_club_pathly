import { RoadmapResponse } from './types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export async function generateRoadmap(
  topic: string
): Promise<RoadmapResponse> {
  const body: Record<string, string> = { topic };

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
