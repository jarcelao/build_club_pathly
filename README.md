# AI-Powered Career Roadmap Generator

Generate personalized learning roadmaps using AI-powered insights. Input a topic, get back a structured career/learning path with estimated hours and skill levels.

## Quick Start

### Prerequisites
- [Bun](https://bun.sh) or Node.js 18+
- OpenAI API key ([get one here](https://platform.openai.com/api-keys))

### Installation

1. **Clone and setup**
```bash
cd backend
cp .env.example .env
# Add your OPENAI_API_KEY to .env
bun install
```

2. **Start backend** (Terminal 1)
```bash
cd backend
bun run dev
```

3. **Start frontend** (Terminal 2)
```bash
cd frontend
bun install
bun run dev
```

4. **Access the app**
Open [http://localhost:3000](http://localhost:3000) in your browser

## Architecture

### Backend (Express.js + TypeScript)
- **API**: POST `/api/roadmap/generate` - Generates career roadmaps
- **LLM**: OpenAI API integration for structured roadmap generation
- **Validation**: Zod for input/output validation
- **Error Handling**: Comprehensive error handling middleware

### Frontend (Next.js + React)
- **Form**: Input topic for roadmap generation
- **Display**: Mermaid diagrams for visual roadmap representation
- **Styling**: Tailwind CSS for modern responsive UI
- **Components**: RoadmapForm, MermaidRenderer

## API Endpoints

### POST `/api/roadmap/generate`

**Request:**
```json
{
  "topic": "Machine Learning Engineer"
}
```

**Response:**
```json
{
  "topic": "Machine Learning Engineer",
  "mermaidDiagram": "graph TD\n  ...",
  "structure": {
    "nodes": [
      {
        "id": "node_1",
        "title": "Python Fundamentals",
        "description": "Learn Python basics and syntax",
        "level": "beginner",
        "estimatedHours": 40
      }
    ],
    "edges": [
      {"from": "node_1", "to": "node_2"}
    ]
  },
  "generatedAt": "2025-11-08T12:34:56Z"
}
```

## Features

- ✅ AI-powered roadmap generation
- ✅ Structured learning paths with time estimates
- ✅ Mermaid diagram visualization
- ✅ Responsive design
- ✅ Error handling and validation
- ✅ No database required (stateless)

## Configuration

### Backend (.env)
```
NODE_ENV=development
PORT=4000
OPENAI_API_KEY=sk-...
OPENAI_MODEL=gpt-3.5-turbo
```

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:4000
```

## Project Structure

```
.
├── backend/
│   ├── src/
│   │   ├── routes/
│   │   │   └── roadmap.ts
│   │   ├── services/
│   │   │   └── llmService.ts
│   │   ├── utils/
│   │   │   ├── validators.ts
│   │   │   └── mermaidGenerator.ts
│   │   ├── middleware/
│   │   │   └── errorHandler.ts
│   │   ├── app.ts
│   │   └── index.ts
│   ├── .env.example
│   └── package.json
│
└── frontend/
    ├── app/
    │   ├── page.tsx
    │   ├── layout.tsx
    │   └── globals.css
    ├── components/
    │   ├── RoadmapForm.tsx
    │   └── MermaidRenderer.tsx
    ├── lib/
    │   ├── types.ts
    │   └── api.ts
    ├── .env.example
    └── package.json
```

## Development

### Build Backend
```bash
cd backend
bun run build
```

### Build Frontend
```bash
cd frontend
bun run build
```

## Technology Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 16, React 19, Tailwind CSS |
| Backend | Express.js, TypeScript |
| Diagrams | Mermaid.js |
| LLM | OpenAI API |
| Validation | Zod |

## Notes

- The MVP focuses on core functionality without caching, databases, or user accounts
- Each roadmap generation costs approximately $0.01-0.05 (varies by model)
- Typical generation time is 5-15 seconds
- Diagrams are generated on the backend using Mermaid syntax

## Future Enhancements

- [ ] Caching for popular roadmaps
- [ ] Download diagrams as images
- [ ] Share roadmaps via links
- [ ] Pre-built example roadmaps
- [ ] Advanced prompt engineering
- [ ] Multiple language support

## License

Unlicense
