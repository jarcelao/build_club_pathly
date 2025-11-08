#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}Starting AI Career Roadmap Generator...${NC}"
echo ""

# Check if .env exists in backend
if [ ! -f backend/.env ]; then
    echo -e "${YELLOW}⚠️  backend/.env not found${NC}"
    echo "Please create backend/.env with OPENAI_API_KEY"
    echo "You can copy from backend/.env.example"
    exit 1
fi

# Check if OPENAI_API_KEY is set
if ! grep -q "OPENAI_API_KEY" backend/.env; then
    echo -e "${RED}❌ OPENAI_API_KEY not found in backend/.env${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Configuration found${NC}"
echo ""

# Start backend
echo -e "${YELLOW}Starting backend on port 4000...${NC}"
(cd backend && bun run dev) &
BACKEND_PID=$!

# Wait for backend to start
sleep 2

# Start frontend
echo -e "${YELLOW}Starting frontend on port 3000...${NC}"
(cd frontend && bun run dev) &
FRONTEND_PID=$!

# Wait for both to start
sleep 3

echo ""
echo -e "${GREEN}✓ Both servers started!${NC}"
echo ""
echo "Frontend: http://localhost:3000"
echo "Backend:  http://localhost:4000"
echo "Health:   http://localhost:4000/health"
echo ""
echo -e "${YELLOW}Press Ctrl+C to stop both servers${NC}"
echo ""

# Cleanup on exit
trap "kill $BACKEND_PID $FRONTEND_PID" EXIT

# Wait for both processes
wait
