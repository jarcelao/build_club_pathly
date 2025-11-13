"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Sparkles } from "lucide-react"

interface RoadmapFormProps {
  onSubmit: (topic: string, difficulty: string, timeframe: string) => void
  loading: boolean
  disabled: boolean
}

export function RoadmapForm({ onSubmit, loading, disabled }: RoadmapFormProps) {
  const [topic, setTopic] = useState("")
  const [difficulty, setDifficulty] = useState("intermediate")
  const [timeframe, setTimeframe] = useState("3-months")
  const [focused, setFocused] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (topic.trim()) {
      onSubmit(topic, difficulty, timeframe)
    }
  }

  return (
    <Card className="border-2 border-border bg-surface shadow-md hover:shadow-lg transition-all duration-300">
      <CardHeader className="border-b-2 border-border pb-4">
        <CardTitle className="flex items-center gap-3 text-xl text-text-primary">
          <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold shadow-md">
            ✓
          </div>
          Create Your Roadmap
        </CardTitle>
        <CardDescription className="text-text-secondary">Customize your learning preferences</CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Topic Input */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-text-primary">What do you want to learn?</label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              placeholder="e.g., Machine Learning, React, Data Science..."
              disabled={disabled}
              className={`w-full px-4 py-3 rounded-lg border-2 bg-surface text-text-primary placeholder-text-secondary focus:outline-none transition-all duration-200 disabled:opacity-50 disabled:bg-muted ${
                focused ? "border-primary ring-2 ring-primary/20" : "border-border hover:border-primary/50"
              }`}
            />
          </div>

          {/* Difficulty Level */}
          <div className="space-y-3">
            <label className="text-sm font-semibold text-text-primary">Difficulty Level</label>
            <div className="space-y-2">
              {[
                { value: "beginner", label: "Beginner - Start from the basics" },
                { value: "intermediate", label: "Intermediate - Build on existing knowledge" },
                { value: "advanced", label: "Advanced - Deep dive and specialization" },
              ].map((option) => (
                <label
                  key={option.value}
                  className={`flex items-center gap-3 cursor-pointer p-3 rounded-lg transition-all duration-200 ${
                    difficulty === option.value
                      ? "bg-primary/10 border-2 border-primary"
                      : "bg-surface-alt/50 border-2 border-transparent hover:bg-surface-alt hover:border-primary/30"
                  }`}
                >
                  <input
                    type="radio"
                    name="difficulty"
                    value={option.value}
                    checked={difficulty === option.value}
                    onChange={(e) => setDifficulty(e.target.value)}
                    disabled={disabled}
                    className="w-4 h-4 text-primary accent-primary cursor-pointer"
                  />
                  <span className="text-sm text-text-primary font-medium">{option.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Timeframe */}
          <div className="space-y-3">
            <label className="text-sm font-semibold text-text-primary">Learning Timeframe</label>
            <div className="space-y-2">
              {[
                { value: "1-month", label: "1 Month (Intensive)" },
                { value: "3-months", label: "3 Months (Balanced)" },
                { value: "6-months", label: "6 Months (Relaxed)" },
              ].map((option) => (
                <label
                  key={option.value}
                  className={`flex items-center gap-3 cursor-pointer p-3 rounded-lg transition-all duration-200 ${
                    timeframe === option.value
                      ? "bg-accent-gold/10 border-2 border-accent-gold"
                      : "bg-surface-alt/50 border-2 border-transparent hover:bg-surface-alt hover:border-accent-gold/30"
                  }`}
                >
                  <input
                    type="radio"
                    name="timeframe"
                    value={option.value}
                    checked={timeframe === option.value}
                    onChange={(e) => setTimeframe(e.target.value)}
                    disabled={disabled}
                    className="w-4 h-4 text-primary accent-primary cursor-pointer"
                  />
                  <span className="text-sm text-text-primary font-medium">{option.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={disabled || !topic.trim()}
            className="w-full bg-primary hover:bg-primary-dark text-white font-semibold py-3 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg active:scale-95 flex items-center justify-center gap-2"
          >
            {loading && <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
            {!loading && <Sparkles className="w-4 h-4" />}
            <span>{loading ? "Generating..." : "Generate Roadmap"}</span>
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
