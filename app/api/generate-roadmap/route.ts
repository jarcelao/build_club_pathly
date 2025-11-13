import { generateText } from "ai"

const roadmapPrompt = (topic: string, difficulty: string, timeframe: string) => `
You are an expert learning architect and curriculum designer. Create a detailed, comprehensive learning roadmap for the following:

Topic: ${topic}
Difficulty Level: ${difficulty}
Timeframe: ${timeframe}

Generate a structured learning roadmap with 4-5 learning phases. For each phase, provide:

1. Phase name and a brief introduction explaining the phase's purpose
2. Estimated duration
3. Prerequisites - skills/knowledge needed before starting
4. Key technologies/tools to master
5. 3-4 key learning concepts
6. Time breakdown - how to allocate time (e.g., 40% concepts, 30% practice, 30% project)
7. Learning milestones - 3-4 specific checkpoints with measurable goals
8. Specific learning resources with ACTUAL LINKS (courses, tutorials, documentation):
   - Include full URLs (e.g., https://example.com/course)
   - Include resource title and brief description
9. Detailed project specification with:
   - Project title
   - Overview/purpose
   - Requirements and acceptance criteria
   - Learning objectives
   - Difficulty/challenge level (Beginner/Intermediate/Advanced)
10. Assessment/quiz ideas - 2-3 self-test questions or topics to review
11. Common troubleshooting tips and solutions for this phase
12. Relevant community resources - Discord servers, forums, GitHub discussions, etc.

Format your response as a valid JSON object with this exact structure:
{
  "phases": [
    {
      "id": "phase-1",
      "name": "Phase name",
      "introduction": "Brief explanation of phase purpose and goals",
      "duration": "duration string",
      "prerequisites": ["prerequisite1", "prerequisite2"],
      "technologies": ["tech1", "tech2", "tech3"],
      "concepts": ["concept1", "concept2", "concept3", "concept4"],
      "timeBreakdown": {
        "concepts": "40%",
        "practice": "30%",
        "project": "30%"
      },
      "milestones": [
        {
          "title": "Milestone title",
          "goal": "Specific, measurable learning goal"
        }
      ],
      "resources": [
        {
          "title": "Resource title",
          "url": "https://example.com/resource",
          "type": "course|tutorial|documentation|book|article",
          "duration": "estimated time",
          "description": "Brief description of what you'll learn"
        }
      ],
      "project": {
        "title": "Project title",
        "overview": "What you'll build and why",
        "requirements": ["requirement1", "requirement2", "requirement3"],
        "acceptanceCriteria": ["criteria1", "criteria2"],
        "learningObjectives": ["objective1", "objective2"],
        "challengeLevel": "Beginner|Intermediate|Advanced"
      },
      "assessment": [
        {
          "question": "Self-test question or review topic",
          "focusArea": "What concept this tests"
        }
      ],
      "troubleshooting": [
        {
          "issue": "Common issue or challenge",
          "solution": "How to overcome it"
        }
      ],
      "communityResources": [
        {
          "name": "Community name",
          "type": "Discord|Forum|GitHub|Slack",
          "url": "https://example.com/community"
        }
      ]
    }
  ]
}

Ensure the roadmap is:
- Progressive and logical, building on previous phases
- Appropriate for the ${difficulty} level
- Achievable within ${timeframe}
- Includes REAL, WORKING URLs (not placeholder examples)
- Practical with detailed, implementable projects
- Rich with community and support resources
- Specific and actionable at every step

Only return valid JSON, no additional text.
`

export async function POST(request: Request) {
  try {
    const { topic, difficulty, timeframe } = await request.json()

    if (!topic || !difficulty || !timeframe) {
      return Response.json({ error: "Missing required fields" }, { status: 400 })
    }

    const { text } = await generateText({
      model: "meta/llama-4-maverick",
      prompt: roadmapPrompt(topic, difficulty, timeframe),
      temperature: 0.7,
    })

    let jsonText = text
    const jsonMatch = text.match(/```(?:json)?\s*([\s\S]*?)\s*```/)
    if (jsonMatch) {
      jsonText = jsonMatch[1]
    }

    // Parse the JSON response
    const parsed = JSON.parse(jsonText.trim())

    return Response.json({
      topic,
      difficulty,
      timeframe,
      phases: parsed.phases,
    })
  } catch (error) {
    console.error("Error generating roadmap:", error)
    return Response.json({ error: "Failed to generate roadmap. Please try again." }, { status: 500 })
  }
}
