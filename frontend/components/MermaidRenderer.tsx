'use client';

import { useEffect, useRef } from 'react';
import mermaid from 'mermaid';

interface MermaidRendererProps {
  diagram: string;
}

export default function MermaidRenderer({ diagram }: MermaidRendererProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    mermaid.contentLoaded();
    mermaid.run();
  }, [diagram]);

  return (
    <div
      ref={containerRef}
      className="flex justify-center items-center p-4 bg-gray-50 rounded-lg border border-gray-200 overflow-x-auto"
    >
      <div className="mermaid">{diagram}</div>
    </div>
  );
}
