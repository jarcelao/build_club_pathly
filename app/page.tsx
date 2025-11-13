"use client"

import { useState } from "react"
import { RoadmapForm } from "@/components/roadmap-form"
import { RoadmapDisplay } from "@/components/roadmap-display"
import { AlertCircle } from "lucide-react"

interface Roadmap {
  topic: string
  difficulty: string
  timeframe: string
  phases: Array<{
    id: string
    name: string
    duration: string
    introduction: string
    concepts: string[]
    resources: Array<{
      title: string
      url: string
      type: string
      duration: string
      description: string
    }>
    project: {
      title: string
      overview: string
    }
  }>
}

export default function Home() {
  const [roadmap, setRoadmap] = useState<Roadmap | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleGenerateRoadmap = async (topic: string, difficulty: string, timeframe: string) => {
    setLoading(true)
    setError("")

    try {
      const response = await fetch("/api/generate-roadmap", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic, difficulty, timeframe }),
      })

      if (!response.ok) throw new Error("Failed to generate roadmap")

      const data = await response.json()
      setRoadmap(data)
      setTimeout(() => {
        const displaySection = document.getElementById("roadmap-display")
        if (displaySection) {
          displaySection.scrollIntoView({ behavior: "smooth", block: "start" })
        }
      }, 100)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  const handleRegenerate = async () => {
    if (roadmap) {
      await handleGenerateRoadmap(roadmap.topic, roadmap.difficulty, roadmap.timeframe)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-background to-muted">
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-bold text-text-primary mb-4 text-balance">Pathly</h1>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto text-balance">
            From First Step to Mastery — Create your personalized learning roadmap
          </p>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <RoadmapForm onSubmit={handleGenerateRoadmap} loading={loading} disabled={loading} />
            </div>
          </div>

          {/* Roadmap Display Section */}
          <div className="lg:col-span-2" id="roadmap-display">
            {error && (
              <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4 mb-6 flex gap-3 animate-fade-in">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-red-900">Error</p>
                  <p className="text-sm text-red-800 mt-1">{error}</p>
                </div>
              </div>
            )}

            {loading ? (
              <div className="flex flex-col items-center justify-center h-96 text-center animate-fade-in">
                <div className="relative w-16 h-16 mb-4">
                  <div className="absolute inset-0 rounded-full border-4 border-border border-t-primary animate-spin" />
                  <div
                    className="absolute inset-2 rounded-full border-2 border-transparent border-t-primary/50 animate-spin"
                    style={{ animationDirection: "reverse" }}
                  />
                </div>
                <p className="text-lg text-text-secondary font-medium">Generating your personalized roadmap...</p>
                <p className="text-sm text-text-secondary/60 mt-2">This usually takes a minute</p>
              </div>
            ) : roadmap ? (
              <div className="animate-fade-in">
                <RoadmapDisplay roadmap={roadmap} onRegenerate={handleRegenerate} regenerating={loading} />
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-96 text-center animate-fade-in">
                <div className="text-6xl mb-4">🎯</div>
                <p className="text-lg text-text-secondary font-medium">
                  Enter a topic to generate your learning roadmap
                </p>
                <p className="text-sm text-text-secondary/60 mt-2">
                  Try topics like "Web Development", "Data Analysis", or "Mobile App Design"
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
