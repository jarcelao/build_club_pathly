'use client';

import { useState } from 'react';
import RoadmapForm from '@/components/RoadmapForm';
import MermaidRenderer from '@/components/MermaidRenderer';
import { generateRoadmap } from '@/lib/api';
import { RoadmapResponse } from '@/lib/types';

export default function Home() {
  const [roadmap, setRoadmap] = useState<RoadmapResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();

  const handleGenerateRoadmap = async (topic: string) => {
    setIsLoading(true);
    setError(undefined);

    try {
      const result = await generateRoadmap(topic);
      setRoadmap(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setRoadmap(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen">
      {/* Header */}
      <header className="border-b border-white/20 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">🗺️</span>
            </div>
            <h1 className="text-xl font-bold gradient-text">Roadmap Generator</h1>
          </div>
          <div className="text-sm text-gray-600">AI-Powered Learning Paths</div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl animate-pulse-soft"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl animate-pulse-soft animation-delay-2000"></div>
        </div>

        <div className="relative container mx-auto px-4 py-16">
          {/* Hero Content */}
          <div className="text-center mb-16 animate-fade-in-down">
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="gradient-text">Personalized Career Roadmaps</span>
              <br />
              <span className="text-gray-800">Powered by AI</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
              Generate tailored learning paths for any skill or career. Get structured guidance from beginner to expert level.
            </p>
          </div>

          {/* Form Section */}
          <div className="flex justify-center mb-12 animate-fade-in-up">
            <div className="w-full max-w-2xl">
              <div className="bg-white/80 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl p-8">
                <RoadmapForm
                  onSubmit={handleGenerateRoadmap}
                  isLoading={isLoading}
                  error={error}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Roadmap Display Section */}
      {roadmap && (
        <div className="relative py-12">
          <div className="container mx-auto px-4 animate-fade-in-up">
            <div className="max-w-5xl mx-auto">
              {/* Roadmap Header */}
              <div className="mb-8">
                <div className="inline-block px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold mb-4">
                  Your Learning Path
                </div>
                <h3 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
                  {roadmap.topic}
                </h3>
                <p className="text-gray-600">
                  Generated on {new Date(roadmap.generatedAt).toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
              </div>

              {/* Mermaid Diagram */}
              <div className="bg-white/80 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl p-8 mb-12 card-hover">
                <h4 className="text-lg font-semibold text-gray-900 mb-6">Learning Flow</h4>
                <MermaidRenderer diagram={roadmap.mermaidDiagram} />
              </div>

              {/* Nodes Information */}
              <div className="bg-white/80 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl p-8">
                <h4 className="text-2xl font-bold text-gray-900 mb-8">
                  Learning Path Details
                </h4>
                <div className="grid gap-6 md:grid-cols-2">
                  {roadmap.structure.nodes.map((node, index) => (
                    <div
                      key={node.id}
                      className="group relative p-6 bg-gradient-to-br from-slate-50 to-blue-50 border border-gray-200 rounded-xl card-hover"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      {/* Step Number */}
                      <div className="absolute top-4 right-4 w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                        {index + 1}
                      </div>

                      <div className="mb-4">
                        <h5 className="font-bold text-gray-900 text-lg mb-2 pr-12">
                          {node.title}
                        </h5>
                        <span
                          className={`inline-block text-xs font-bold px-3 py-1 rounded-full ${
                            node.level === 'beginner'
                              ? 'bg-blue-200 text-blue-900'
                              : node.level === 'intermediate'
                              ? 'bg-green-200 text-green-900'
                              : node.level === 'advanced'
                              ? 'bg-purple-200 text-purple-900'
                              : 'bg-red-200 text-red-900'
                          }`}
                        >
                          {node.level.charAt(0).toUpperCase() + node.level.slice(1)}
                        </span>
                      </div>

                      <p className="text-sm text-gray-700 mb-4 leading-relaxed">
                        {node.description}
                      </p>

                      <div className="pt-4 border-t border-gray-200 flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <span>⏱️</span>
                          <span className="font-semibold">{node.estimatedHours} hours</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-white/20 backdrop-blur-sm py-8 mt-12">
        <div className="container mx-auto px-4 text-center text-gray-600 text-sm">
          <p>Crafted with care for your learning journey</p>
        </div>
      </footer>
    </main>
  );
}
