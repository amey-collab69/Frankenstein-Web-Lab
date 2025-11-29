# Frankenstein Web Lab - Kiro Steering Guide

## Project Overview
This is the Frankenstein Web Lab - a technology fusion machine that connects retro terminal, pixel art canvas, modern dashboard, and AI-driven fusion capabilities.

## Architecture
- **Frontend**: React + Vite with Zustand state management
- **Backend**: Node.js + Express + MongoDB
- **Theme**: Spooky Frankenstein laboratory with neon green/purple aesthetics

## Module Connections
1. **Retro Terminal** → Saves logs to MongoDB, displays AI outputs
2. **Pixel Canvas** → Exports to ASCII (Terminal) or Cards (Dashboard)
3. **Dashboard** → Displays transformed data from all modules
4. **Fusion Engine** → AI orchestrator that connects all modules

## Development Commands
```bash
# Frontend (from my-react-app/)
npm run dev

# Backend (from my-react-app/backend/)
npm install
npm run dev
```

## API Endpoints
- `/api/terminal/logs` - Terminal log management
- `/api/canvas/save` - Pixel art storage
- `/api/dashboard/cards` - Dashboard card CRUD
- `/api/fusion/*` - Data transformation endpoints

## Kiro AI Capabilities
- Natural language command interpretation
- Module orchestration
- Data transformation between modules
- Automated workflow execution

## Code Style
- Use functional React components with hooks
- Zustand for state management
- Async/await for API calls
- Frankenstein theme: neon green (#00ff00), purple (#9d00ff), dark backgrounds
