#!/bin/bash

# Development Startup Script for AI Career Roadmap Generator
# This script starts both backend and frontend servers concurrently

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 AI Career Roadmap Generator - Development Setup${NC}"
echo ""

# Check if .env exists in backend
if [ ! -f backend/.env ]; then
    echo -e "${YELLOW}⚠️  backend/.env not found${NC}"
    echo "Please create backend/.env with your OPENAI_API_KEY"
    echo "You can copy from backend/.env.example"
    echo ""
    echo -e "${BLUE}Quick setup:${NC}"
    echo "  cp backend/.env.example backend/.env"
    echo "  # Then edit backend/.env to add your API key"
    exit 1
fi

# Check if OPENAI_API_KEY is properly set
if grep -q "sk-your-api-key-here" backend/.env; then
    echo -e "${RED}❌ Please update OPENAI_API_KEY in backend/.env${NC}"
    echo "Replace 'sk-your-api-key-here' with your actual OpenAI API key"
    exit 1
fi

echo -e "${GREEN}✓ Configuration validated${NC}"
echo ""

# Function to cleanup processes on exit
cleanup() {
    echo -e "\n${YELLOW}🛑 Shutting down servers...${NC}"
    if [ ! -z "$BACKEND_PID" ]; then
        kill $BACKEND_PID 2>/dev/null
    fi
    if [ ! -z "$FRONTEND_PID" ]; then
        kill $FRONTEND_PID 2>/dev/null
    fi
    echo -e "${GREEN}✓ All servers stopped${NC}"
    exit 0
}

# Set up signal handlers
trap cleanup SIGINT SIGTERM

# Start backend
echo -e "${YELLOW}🔧 Starting backend server on port 4000...${NC}"
(cd backend && bun run dev) &
BACKEND_PID=$!

# Start frontend
echo -e "${YELLOW}🎨 Starting frontend server on port 3000...${NC}"
(cd frontend && bun run dev) &
FRONTEND_PID=$!

echo ""
echo -e "${GREEN}🎉 Both servers started successfully!${NC}"
echo ""
echo -e "${BLUE}Available endpoints:${NC}"
echo "  🌐 Frontend: http://localhost:3000"
echo "  🔧 Backend:  http://localhost:4000"
echo "  ❤️  Health:   http://localhost:4000/health"
echo ""
echo -e "${YELLOW}Press Ctrl+C to stop both servers${NC}"
echo ""

# Wait for both processes
wait
