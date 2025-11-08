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
```bash
NODE_ENV=development
PORT=4000
OPENAI_API_KEY=sk-...
OPENAI_MODEL=gpt-3.5-turbo
OPENAI_BASE_URL=https://api.openai.com/v1
```

**Note:** The application supports custom OpenAI-compatible endpoints. You can use:
- OpenAI API (default)
- Local models via Ollama
- Other OpenAI-compatible providers

Simply update `OPENAI_BASE_URL` and `OPENAI_MODEL` in your `.env` file or use the advanced options in the web interface.

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

### Quick Start

Use the provided development script to start both servers:

```bash
./dev.sh
```

This will:
- Validate your configuration
- Start the backend on port 4000
- Start the frontend on port 3000
- Handle cleanup automatically

### Manual Setup

If you prefer to start servers manually:

**Backend (Terminal 1)**
```bash
cd backend
bun install
bun run dev
```

**Frontend (Terminal 2)**
```bash
cd frontend
bun install
bun run dev
```

### Code Quality

This project uses:
- **TypeScript** for type safety
- **Zod** for runtime validation
- **ESLint** rules via TypeScript strict mode
- **Tailwind CSS** for consistent styling

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
