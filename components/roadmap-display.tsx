"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronDown, Download, RefreshCw, ExternalLink, CheckCircle2, AlertCircle, Users, Zap } from "lucide-react"

interface Resource {
  title: string
  url: string
  type: "course" | "tutorial" | "documentation" | "book" | "article"
  duration: string
  description: string
}

interface ProjectSpec {
  title: string
  overview: string
  requirements: string[]
  acceptanceCriteria: string[]
  learningObjectives: string[]
  challengeLevel: "Beginner" | "Intermediate" | "Advanced"
}

interface Milestone {
  title: string
  goal: string
}

interface Assessment {
  question: string
  focusArea: string
}

interface Troubleshooting {
  issue: string
  solution: string
}

interface CommunityResource {
  name: string
  type: "Discord" | "Forum" | "GitHub" | "Slack"
  url: string
}

interface Phase {
  id: string
  name: string
  introduction: string
  duration: string
  prerequisites: string[]
  technologies: string[]
  concepts: string[]
  timeBreakdown: {
    concepts: string
    practice: string
    project: string
  }
  milestones: Milestone[]
  resources: Resource[]
  project: ProjectSpec
  assessment: Assessment[]
  troubleshooting: Troubleshooting[]
  communityResources: CommunityResource[]
}

interface RoadmapDisplayProps {
  roadmap: {
    topic: string
    difficulty: string
    timeframe: string
    phases: Phase[]
  }
  onRegenerate: () => void
  regenerating: boolean
}

type TabType = "overview" | "milestones" | "resources" | "project" | "assessment" | "support"

export function RoadmapDisplay({ roadmap, onRegenerate, regenerating }: RoadmapDisplayProps) {
  const [expandedPhase, setExpandedPhase] = useState<string | null>(roadmap.phases[0]?.id || null)
  const [activeTab, setActiveTab] = useState<TabType>("overview")

  const handleExport = () => {
    const text = generateExportText(roadmap)
    const blob = new Blob([text], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${roadmap.topic}-roadmap.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const tabs: { id: TabType; label: string; icon: React.ReactNode }[] = [
    { id: "overview", label: "Overview", icon: <Zap className="w-4 h-4" /> },
    { id: "milestones", label: "Milestones", icon: <CheckCircle2 className="w-4 h-4" /> },
    { id: "resources", label: "Resources", icon: <ExternalLink className="w-4 h-4" /> },
    { id: "project", label: "Project", icon: <Zap className="w-4 h-4" /> },
    { id: "assessment", label: "Assessment", icon: <AlertCircle className="w-4 h-4" /> },
    { id: "support", label: "Support", icon: <Users className="w-4 h-4" /> },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-text-primary mb-2">{roadmap.topic}</h2>
          <p className="text-text-secondary font-medium">
            <span className="inline-block bg-primary-light text-text-primary px-3 py-1 rounded-full text-sm mr-2">
              {roadmap.difficulty}
            </span>
            <span className="inline-block bg-accent-gold/20 text-text-primary px-3 py-1 rounded-full text-sm">
              {roadmap.timeframe}
            </span>
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={handleExport}
            variant="outline"
            className="bg-surface border-2 border-border text-text-primary hover:bg-surface-alt hover:border-primary transition-all"
          >
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button
            onClick={onRegenerate}
            disabled={regenerating}
            className="bg-primary hover:bg-primary-dark text-white shadow-md hover:shadow-lg transition-all active:scale-95"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Regenerate
          </Button>
        </div>
      </div>

      {/* Timeline */}
      <div className="space-y-4">
        {roadmap.phases.map((phase, index) => (
          <div key={phase.id}>
            {/* Timeline Connector */}
            {index < roadmap.phases.length - 1 && (
              <div className="flex gap-4 mb-0">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm shadow-md">
                    {index + 1}
                  </div>
                  <div className="w-1 h-12 bg-gradient-to-b from-primary to-border mt-2" />
                </div>
              </div>
            )}

            {/* Phase Card */}
            <div className="flex gap-4 mb-4">
              {index === roadmap.phases.length - 1 && (
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-accent-gold text-text-primary flex items-center justify-center font-bold text-sm shadow-md">
                    ✓
                  </div>
                </div>
              )}
              {index < roadmap.phases.length - 1 && <div className="w-10" />}

              <Card className="flex-1 border-2 border-border bg-surface hover:border-primary hover:shadow-lg transition-all">
                {/* Phase Header */}
                <CardHeader
                  className="pb-3 border-b-2 border-transparent cursor-pointer hover:border-primary/20 transition-colors"
                  onClick={() => setExpandedPhase(expandedPhase === phase.id ? null : phase.id)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg text-text-primary">{phase.name}</CardTitle>
                      <CardDescription className="text-text-secondary text-sm font-medium mt-1">
                        {phase.duration}
                      </CardDescription>
                      <p className="text-sm text-text-secondary mt-2 italic">{phase.introduction}</p>
                    </div>
                    <ChevronDown
                      className={`w-5 h-5 text-primary transition-transform flex-shrink-0 ${
                        expandedPhase === phase.id ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                </CardHeader>

                {/* Expanded Content with Tabs */}
                {expandedPhase === phase.id && (
                  <>
                    {/* Tab Navigation */}
                    <div className="border-b border-border overflow-x-auto">
                      <div className="flex gap-1 p-3">
                        {tabs.map((tab) => (
                          <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                              activeTab === tab.id
                                ? "bg-primary text-white shadow-md"
                                : "bg-surface-alt text-text-secondary hover:bg-border"
                            }`}
                          >
                            {tab.icon}
                            {tab.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Tab Content */}
                    <CardContent className="space-y-4 pt-4">
                      {/* Overview Tab */}
                      {activeTab === "overview" && (
                        <div className="space-y-4">
                          {/* Prerequisites */}
                          <div>
                            <h4 className="font-semibold text-text-primary mb-3 text-sm flex items-center gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                              Prerequisites
                            </h4>
                            <ul className="space-y-1">
                              {phase.prerequisites.map((prereq, i) => (
                                <li key={i} className="text-sm text-text-secondary flex items-start gap-2">
                                  <span className="text-primary font-bold">→</span>
                                  <span>{prereq}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Technologies */}
                          <div>
                            <h4 className="font-semibold text-text-primary mb-3 text-sm flex items-center gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                              Technologies & Tools
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {phase.technologies.map((tech, i) => (
                                <span
                                  key={i}
                                  className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium border border-primary/20"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Key Concepts */}
                          <div>
                            <h4 className="font-semibold text-text-primary mb-3 text-sm flex items-center gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                              Key Concepts
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {phase.concepts.map((concept, i) => (
                                <span
                                  key={i}
                                  className="px-3 py-1 bg-accent-gold/20 text-text-primary rounded-full text-sm font-medium border border-accent-gold/30"
                                >
                                  {concept}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Time Breakdown */}
                          <div>
                            <h4 className="font-semibold text-text-primary mb-3 text-sm flex items-center gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                              Time Breakdown
                            </h4>
                            <div className="grid grid-cols-3 gap-2">
                              <div className="bg-primary/10 p-3 rounded-lg border border-primary/20">
                                <p className="text-xs text-text-secondary mb-1">Concepts</p>
                                <p className="text-lg font-bold text-primary">{phase.timeBreakdown.concepts}</p>
                              </div>
                              <div className="bg-primary/10 p-3 rounded-lg border border-primary/20">
                                <p className="text-xs text-text-secondary mb-1">Practice</p>
                                <p className="text-lg font-bold text-primary">{phase.timeBreakdown.practice}</p>
                              </div>
                              <div className="bg-primary/10 p-3 rounded-lg border border-primary/20">
                                <p className="text-xs text-text-secondary mb-1">Project</p>
                                <p className="text-lg font-bold text-primary">{phase.timeBreakdown.project}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Milestones Tab */}
                      {activeTab === "milestones" && (
                        <div className="space-y-3">
                          {phase.milestones.map((milestone, i) => (
                            <div key={i} className="bg-primary/5 p-4 rounded-lg border-l-4 border-primary">
                              <p className="font-semibold text-text-primary text-sm mb-1">{milestone.title}</p>
                              <p className="text-sm text-text-secondary">{milestone.goal}</p>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Resources Tab */}
                      {activeTab === "resources" && (
                        <div className="space-y-3">
                          {phase.resources.map((resource, i) => (
                            <a
                              key={i}
                              href={resource.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block p-4 bg-surface-alt border-2 border-border rounded-lg hover:border-primary hover:shadow-md transition-all group"
                            >
                              <div className="flex items-start justify-between gap-3">
                                <div className="flex-1">
                                  <p className="font-semibold text-text-primary mb-1 group-hover:text-primary transition-colors">
                                    {resource.title}
                                  </p>
                                  <p className="text-sm text-text-secondary mb-2">{resource.description}</p>
                                  <div className="flex gap-3 text-xs text-text-secondary">
                                    <span className="capitalize px-2 py-1 bg-primary/10 rounded text-primary font-medium">
                                      {resource.type}
                                    </span>
                                    <span>{resource.duration}</span>
                                  </div>
                                </div>
                                <ExternalLink className="w-5 h-5 text-primary flex-shrink-0 group-hover:scale-110 transition-transform" />
                              </div>
                            </a>
                          ))}
                        </div>
                      )}

                      {/* Project Tab */}
                      {activeTab === "project" && (
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-semibold text-text-primary mb-2 text-sm">{phase.project.title}</h4>
                            <p className="text-sm text-text-secondary bg-primary-light/20 p-3 rounded-lg border border-primary-light">
                              {phase.project.overview}
                            </p>
                          </div>

                          <div>
                            <p className="font-semibold text-text-primary mb-2 text-sm flex items-center gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                              Difficulty Level
                            </p>
                            <span
                              className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                                phase.project.challengeLevel === "Beginner"
                                  ? "bg-green-100 text-green-800"
                                  : phase.project.challengeLevel === "Intermediate"
                                    ? "bg-amber-100 text-amber-800"
                                    : "bg-red-100 text-red-800"
                              }`}
                            >
                              {phase.project.challengeLevel}
                            </span>
                          </div>

                          <div>
                            <p className="font-semibold text-text-primary mb-2 text-sm flex items-center gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                              Requirements
                            </p>
                            <ul className="space-y-1">
                              {phase.project.requirements.map((req, i) => (
                                <li key={i} className="text-sm text-text-secondary flex items-start gap-2">
                                  <span className="text-primary font-bold">✓</span>
                                  <span>{req}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div>
                            <p className="font-semibold text-text-primary mb-2 text-sm flex items-center gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                              Acceptance Criteria
                            </p>
                            <ul className="space-y-1">
                              {phase.project.acceptanceCriteria.map((criteria, i) => (
                                <li key={i} className="text-sm text-text-secondary flex items-start gap-2">
                                  <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                                  <span>{criteria}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div>
                            <p className="font-semibold text-text-primary mb-2 text-sm flex items-center gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                              Learning Objectives
                            </p>
                            <ul className="space-y-1">
                              {phase.project.learningObjectives.map((obj, i) => (
                                <li key={i} className="text-sm text-text-secondary flex items-start gap-2">
                                  <span className="text-primary font-bold">→</span>
                                  <span>{obj}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      )}

                      {/* Assessment Tab */}
                      {activeTab === "assessment" && (
                        <div className="space-y-3">
                          {phase.assessment.map((item, i) => (
                            <div key={i} className="bg-accent-gold/10 p-4 rounded-lg border-l-4 border-accent-gold">
                              <p className="font-semibold text-text-primary text-sm mb-1">{item.question}</p>
                              <p className="text-xs text-text-secondary">Focus: {item.focusArea}</p>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Support Tab */}
                      {activeTab === "support" && (
                        <div className="space-y-4">
                          {/* Troubleshooting */}
                          <div>
                            <h4 className="font-semibold text-text-primary mb-3 text-sm flex items-center gap-2">
                              <AlertCircle className="w-4 h-4 text-primary" />
                              Troubleshooting
                            </h4>
                            <div className="space-y-2">
                              {phase.troubleshooting.map((item, i) => (
                                <div key={i} className="bg-red-50 p-3 rounded-lg border border-red-200">
                                  <p className="font-medium text-sm text-red-900 mb-1">{item.issue}</p>
                                  <p className="text-sm text-red-800">{item.solution}</p>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Community Resources */}
                          <div>
                            <h4 className="font-semibold text-text-primary mb-3 text-sm flex items-center gap-2">
                              <Users className="w-4 h-4 text-primary" />
                              Community Resources
                            </h4>
                            <div className="space-y-2">
                              {phase.communityResources.map((community, i) => (
                                <a
                                  key={i}
                                  href={community.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center justify-between p-3 bg-surface-alt border-2 border-border rounded-lg hover:border-primary transition-all group"
                                >
                                  <div>
                                    <p className="font-medium text-sm text-text-primary group-hover:text-primary transition-colors">
                                      {community.name}
                                    </p>
                                    <p className="text-xs text-text-secondary">{community.type}</p>
                                  </div>
                                  <ExternalLink className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" />
                                </a>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </>
                )}
              </Card>
            </div>
          </div>
        ))}
      </div>

      {/* Footer Note */}
      <div className="bg-surface-alt border-l-4 border-primary rounded-lg p-4 shadow-sm">
        <p className="text-sm text-text-primary font-medium">
          Note: This roadmap is a guide. Feel free to adjust the pace based on your learning speed and available time.
        </p>
      </div>
    </div>
  )
}

function generateExportText(roadmap: any): string {
  let text = `LEARNING ROADMAP: ${roadmap.topic}\n`
  text += `Difficulty: ${roadmap.difficulty}\n`
  text += `Timeframe: ${roadmap.timeframe}\n`
  text += `Generated: ${new Date().toLocaleDateString()}\n\n`
  text += "=".repeat(70) + "\n\n"

  roadmap.phases.forEach((phase: Phase, index: number) => {
    text += `PHASE ${index + 1}: ${phase.name}\n`
    text += `Duration: ${phase.duration}\n`
    text += `\n${phase.introduction}\n\n`

    text += `Prerequisites:\n`
    phase.prerequisites.forEach((prereq: string) => {
      text += `  • ${prereq}\n`
    })

    text += `\nTechnologies:\n`
    phase.technologies.forEach((tech: string) => {
      text += `  • ${tech}\n`
    })

    text += `\nKey Concepts:\n`
    phase.concepts.forEach((concept: string) => {
      text += `  • ${concept}\n`
    })

    text += `\nLearning Milestones:\n`
    phase.milestones.forEach((m: Milestone) => {
      text += `  • ${m.title}: ${m.goal}\n`
    })

    text += `\nResources:\n`
    phase.resources.forEach((resource: Resource) => {
      text += `  • ${resource.title} (${resource.type}) - ${resource.duration}\n`
      text += `    URL: ${resource.url}\n`
      text += `    ${resource.description}\n`
    })

    text += `\nPractical Project: ${phase.project.title}\n`
    text += `  Overview: ${phase.project.overview}\n`
    text += `  Challenge Level: ${phase.project.challengeLevel}\n`
    text += `  Requirements:\n`
    phase.project.requirements.forEach((req: string) => {
      text += `    • ${req}\n`
    })

    text += `\nAssessment Topics:\n`
    phase.assessment.forEach((item: Assessment) => {
      text += `  • ${item.question}\n`
    })

    text += `\nTroubleshooting:\n`
    phase.troubleshooting.forEach((item: Troubleshooting) => {
      text += `  • Issue: ${item.issue}\n`
      text += `    Solution: ${item.solution}\n`
    })

    text += `\n` + "-".repeat(70) + "\n\n"
  })

  return text
}
