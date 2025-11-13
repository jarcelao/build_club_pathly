# Pathly

An AI-powered learning roadmap generator that creates personalized, structured learning paths for any topic. Define your learning goals, and let Pathly create a comprehensive roadmap with phases, resources, projects, and milestones tailored to your needs.

## Features

- **AI-Powered Roadmap Generation** - Generate customized learning paths using advanced LLM technology
- **Flexible Learning Parameters** - Choose your topic, difficulty level (Beginner/Intermediate/Advanced), and timeframe (1/3/6 months)
- **Comprehensive Roadmaps** - Get structured learning paths with:
  - Multi-phase progression
  - Curated learning resources (courses, tutorials, documentation, books)
  - Hands-on projects with acceptance criteria
  - Milestones and checkpoints
  - Assessment guidelines
  - Community resources and support channels
  - Troubleshooting guides
- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices
- **Dark Mode Support** - Built-in theme switching for comfortable learning any time
- **Real-time Validation** - Instant feedback on form inputs
- **Modern UI** - Beautiful, accessible components powered by shadcn/ui

## Tech Stack

### Frontend

- **[Next.js 16](https://nextjs.org/)** - React framework with App Router
- **[React 19](https://react.dev/)** - UI library
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe development
- **[Tailwind CSS 4](https://tailwindcss.com/)** - Utility-first CSS framework
- **[shadcn/ui](https://ui.shadcn.com/)** - High-quality React components
- **[React Hook Form](https://react-hook-form.com/)** - Efficient form management
- **[Zod](https://zod.dev/)** - Schema validation

### Backend & AI

- **[Vercel AI SDK](https://sdk.vercel.ai/)** - LLM integration and streaming
- **[llama-4-maverick](https://www.llama.com/models/llama-4/)** - AI model for roadmap generation

### Additional Libraries

- **[Next Themes](https://github.com/pacocur/next-themes)** - Dark mode support
- **[Sonner](https://sonner.emilkowal.ski/)** - Toast notifications
- **[Recharts](https://recharts.org/)** - Data visualization
- **[Lucide React](https://lucide.dev/)** - Icon library
- **[Date-fns](https://date-fns.org/)** - Date utilities

## Quick Start

### Prerequisites

- Node.js 20.9 or later
- pnpm (recommended) or npm

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd pathly
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   # or
   npm install
   ```

3. **Set up environment variables**

   ```bash
   # Create a .env.local file in the root directory
   # Add your LLM API keys if needed
   ```

4. **Run the development server**

   ```bash
   pnpm dev
   # or
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Usage

1. **Enter Your Learning Topic** - Type in any subject you want to learn (e.g., "Machine Learning", "React", "Data Science")

2. **Select Difficulty Level** - Choose from:
   - Beginner - For those new to the topic
   - Intermediate - For those with foundational knowledge
   - Advanced - For experienced learners

3. **Choose Your Timeframe** - Select how much time you have:
   - 1 Month - Intensive learning
   - 3 Months - Balanced learning
   - 6 Months - Comprehensive learning

4. **Generate Roadmap** - Click the generate button and wait for your personalized roadmap

5. **Explore Your Roadmap** - Review the detailed plan with:
   - Learning phases with estimated duration
   - Recommended resources for each phase
   - Projects to practice concepts
   - Milestones to track progress
   - Community resources for support

## Project Structure

```
pathly/
├── app/                          # Next.js app directory
│   ├── api/
│   │   └── generate-roadmap/    # API endpoint for roadmap generation
│   ├── layout.tsx               # Root layout with metadata
│   ├── page.tsx                 # Home page
│   └── globals.css              # Global styles
├── components/                   # React components
│   ├── roadmap-form.tsx         # Form component
│   ├── roadmap-display.tsx      # Roadmap display
│   ├── theme-provider.tsx       # Theme context
│   └── ui/                      # shadcn/ui components
├── hooks/                        # Custom React hooks
├── lib/                          # Utility functions
├── public/                       # Static assets
├── styles/                       # CSS files
├── next.config.mjs              # Next.js configuration
├── tailwind.config.ts           # Tailwind CSS configuration
├── tsconfig.json                # TypeScript configuration
└── package.json                 # Project dependencies
```

## Development

### Available Scripts

```bash
# Start development server with hot reload
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Run linting
pnpm lint
```

### Code Style

- TypeScript for type safety
- ESLint for code consistency
- Tailwind CSS for styling
- shadcn/ui component patterns

## API Reference

### POST `/api/generate-roadmap`

Generate a personalized learning roadmap.

**Request Body:**

```json
{
  "topic": "string",           // Learning topic
  "difficulty": "string",      // "beginner" | "intermediate" | "advanced"
  "timeframe": "string"        // "1-month" | "3-months" | "6-months"
}
```

**Response:**

```json
{
  "phases": [
    {
      "phase": "string",
      "duration": "string",
      "topics": ["string"],
      "resources": {
        "courses": ["string"],
        "tutorials": ["string"],
        "documentation": ["string"]
      },
      "projects": [
        {
          "name": "string",
          "description": "string",
          "criteria": ["string"]
        }
      ]
    }
  ],
  "milestones": ["string"],
  "assessments": ["string"],
  "communityResources": {
    "discord": "string",
    "forums": "string",
    "github": "string"
  }
}
```

## License

This project is licensed under the Unlicense License - see the LICENSE file for details.

## Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Icons from [Lucide](https://lucide.dev/)
- AI powered by [Llama 4 Maverick](https://www.llama.com/models/llama-4/)
