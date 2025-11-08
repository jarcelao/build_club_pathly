import type { RoadmapStructure } from './validators';

export function generateMermaidDiagram(structure: RoadmapStructure): string {
  const levelIcons = {
    beginner: '🟦',
    intermediate: '🟩',
    advanced: '🟨',
    expert: '🟥',
  };

  let diagram = 'graph TD\n';

  // Add nodes with level icons and estimated hours
  structure.nodes.forEach((node) => {
    const icon = levelIcons[node.level];
    const label = `${icon} ${node.title}<br/>(${node.estimatedHours}h)`;
    // Escape quotes in labels
    const escapedLabel = label.replace(/"/g, '\\"');
    diagram += `  ${node.id}["${escapedLabel}"]\n`;
  });

  // Add edges
  structure.edges.forEach((edge) => {
    diagram += `  ${edge.from} --> ${edge.to}\n`;
  });

  return diagram;
}
