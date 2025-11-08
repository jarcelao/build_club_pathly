'use client';

import { useState, FormEvent } from 'react';

interface RoadmapFormProps {
  onSubmit: (topic: string) => Promise<void>;
  isLoading: boolean;
  error?: string;
}

export default function RoadmapForm({ onSubmit, isLoading, error }: RoadmapFormProps) {
  const [topic, setTopic] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (topic.trim()) {
      await onSubmit(topic);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="space-y-6">
        {/* Main Input */}
        <div className="space-y-2">
          <label htmlFor="topic" className="block text-sm font-semibold text-gray-900">
            What would you like to learn?
          </label>
          <input
            type="text"
            id="topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g., Machine Learning Engineer, Web Development, Data Science"
            className="w-full px-5 py-4 bg-white border-2 border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 input-focus"
            disabled={isLoading}
          />
          <p className="text-xs text-gray-500 flex items-center gap-1">
            <span>✨</span> Enter a topic between 3-100 characters
          </p>
        </div>



        {/* Error Alert */}
        {error && (
          <div className="animate-fade-in-up p-4 bg-gradient-to-br from-red-50 to-pink-50 border-2 border-red-200 rounded-xl">
            <div className="flex items-start gap-3">
              <span className="text-lg">⚠️</span>
              <div>
                <p className="text-sm font-semibold text-red-900">Error generating roadmap</p>
                <p className="text-sm text-red-800 mt-1">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading || !topic.trim()}
          className="btn-primary w-full py-4 text-lg font-semibold flex items-center justify-center gap-2 min-h-[60px]"
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <svg className="animate-spin h-5 w-5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              <span>Generating your roadmap...</span>
            </div>
          ) : (
            <>
              <span>🚀</span>
              Generate Roadmap
            </>
          )}
        </button>
      </div>
    </form>
  );
}
