# 🧪 Frankenstein Web Lab - Architecture

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         BROWSER (Client)                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌────────────────────────────────────────────────────────┐   │
│  │              React Application (Port 5173)              │   │
│  │                                                          │   │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐ │   │
│  │  │   Retro      │  │    Pixel     │  │   Modern     │ │   │
│  │  │  Terminal    │  │   Canvas     │  │  Dashboard   │ │   │
│  │  │              │  │              │  │              │ │   │
│  │  │ - Commands   │  │ - 16x16 Grid │  │ - Cards      │ │   │
│  │  │ - Logs       │  │ - Drawing    │  │ - Display    │ │   │
│  │  │ - CRT UI     │  │ - Colors     │  │ - CRUD       │ │   │
│  │  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘ │   │
│  │         │                  │                  │          │   │
│  │         └──────────┬───────┴──────────────────┘          │   │
│  │                    │                                      │   │
│  │         ┌──────────▼──────────┐                         │   │
│  │         │   FUSION ENGINE     │                         │   │
│  │         │                     │                         │   │
│  │         │ - AI Commands       │                         │   │
│  │         │ - Orchestration     │                         │   │
│  │         │ - Transformations   │                         │   │
│  │         └──────────┬──────────┘                         │   │
│  │                    │                                      │   │
│  │         ┌──────────▼──────────┐                         │   │
│  │         │  Zustand Store      │                         │   │
│  │         │  (Global State)     │                         │   │
│  │         │                     │                         │   │
│  │         │ - terminalLogs[]    │                         │   │
│  │         │ - pixelGrid[][]     │                         │   │
│  │         │ - dashboardCards[]  │                         │   │
│  │         │ - selectedColor     │                         │   │
│  │         │ - aiProcessing      │                         │   │
│  │         └──────────┬──────────┘                         │   │
│  │                    │                                      │   │
│  │         ┌──────────▼──────────┐                         │   │
│  │         │   API Service       │                         │   │
│  │         │   (Axios)           │                         │   │
│  │         └──────────┬──────────┘                         │   │
│  └────────────────────┼──────────────────────────────────┘   │
│                       │                                        │
└───────────────────────┼────────────────────────────────────────┘
                        │ HTTP/REST
                        │ (localhost:5000/api)
┌───────────────────────▼────────────────────────────────────────┐
│                    EXPRESS SERVER (Port 5000)                   │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌────────────────────────────────────────────────────────┐   │
│  │                    API Routes                           │   │
│  │                                                          │   │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐ │   │
│  │  │  /terminal   │  │   /canvas    │  │  /dashboard  │ │   │
│  │  │              │  │              │  │              │ │   │
│  │  │ POST /logs   │  │ POST /save   │  │ POST /cards  │ │   │
│  │  │ GET  /logs   │  │ GET  /list   │  │ GET  /cards  │ │   │
│  │  │ DEL  /logs   │  │ GET  /:id    │  │ DEL  /cards  │ │   │
│  │  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘ │   │
│  │         │                  │                  │          │   │
│  │         └──────────┬───────┴──────────────────┘          │   │
│  │                    │                                      │   │
│  │         ┌──────────▼──────────┐                         │   │
│  │         │    /fusion          │                         │   │
│  │         │                     │                         │   │
│  │         │ POST /pixel-to-ascii        │                 │   │
│  │         │ POST /terminal-to-dashboard │                 │   │
│  │         │ POST /pixel-to-dashboard    │                 │   │
│  │         └──────────┬──────────┘                         │   │
│  └────────────────────┼──────────────────────────────────┘   │
│                       │                                        │
│  ┌────────────────────▼──────────────────────────────────┐   │
│  │                 Mongoose Models                        │   │
│  │                                                          │   │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐ │   │
│  │  │ TerminalLog  │  │  PixelArt    │  │DashboardCard │ │   │
│  │  │              │  │              │  │              │ │   │
│  │  │ - command    │  │ - name       │  │ - title      │ │   │
│  │  │ - output     │  │ - gridSize   │  │ - type       │ │   │
│  │  │ - timestamp  │  │ - pixels[][] │  │ - content    │ │   │
│  │  │ - userId     │  │ - timestamp  │  │ - timestamp  │ │   │
│  │  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘ │   │
│  └─────────┼──────────────────┼──────────────────┼────────┘   │
│            │                  │                  │              │
└────────────┼──────────────────┼──────────────────┼──────────────┘
             │                  │                  │
┌────────────▼──────────────────▼──────────────────▼──────────────┐
│                    MongoDB (Port 27017)                          │
│                  Database: frankenstein-lab                      │
│                                                                  │
│  Collections:                                                    │
│  - terminallogs                                                  │
│  - pixelarts                                                     │
│  - dashboardcards                                                │
└─────────────────────────────────────────────────────────────────┘
```

## Data Flow Examples

### Example 1: User Draws Pixel Art → Exports to Terminal

```
1. User clicks pixel in Canvas
   ↓
2. PixelCanvas.jsx calls setPixel(x, y, color)
   ↓
3. Zustand store updates pixelGrid state
   ↓
4. React re-renders Canvas with new pixel
   ↓
5. User clicks "→ Terminal" button
   ↓
6. PixelCanvas calls fusionAPI.pixelToAscii(pixelGrid)
   ↓
7. Axios sends POST to /api/fusion/pixel-to-ascii
   ↓
8. Backend transforms pixels to ASCII
   ↓
9. Response returns ASCII string
   ↓
10. Frontend calls addTerminalLog() with ASCII
    ↓
11. Zustand updates terminalLogs state
    ↓
12. RetroTerminal re-renders with ASCII art
```

### Example 2: AI Command Generates Pattern

```
1. User types "draw a ghost" in Fusion Engine
   ↓
2. FusionEngine calls processAiCommand()
   ↓
3. aiCommands.js recognizes "ghost" keyword
   ↓
4. Calls generatePattern('ghost', 16)
   ↓
5. transformers.js creates ghost pixel pattern
   ↓
6. Loops through pattern, calling setPixel() for each
   ↓
7. Zustand updates pixelGrid state
   ↓
8. PixelCanvas re-renders with ghost
   ↓
9. addTerminalLog() logs success message
   ↓
10. RetroTerminal shows "Ghost generated!"
```

### Example 3: Save to Dashboard → Persist to DB

```
1. User clicks "→ Dashboard" in Canvas
   ↓
2. PixelCanvas creates card object
   ↓
3. Calls addCard(card) - updates Zustand
   ↓
4. Dashboard re-renders with new card
   ↓
5. Calls canvasAPI.save() - sends to backend
   ↓
6. POST /api/canvas/save
   ↓
7. Backend creates new PixelArt document
   ↓
8. Mongoose saves to MongoDB
   ↓
9. Response confirms save
   ↓
10. Data persists (survives page refresh)
```

## Component Hierarchy

```
App.jsx
├── RetroTerminal/
│   ├── RetroTerminal.jsx
│   └── RetroTerminal.css
├── PixelCanvas/
│   ├── PixelCanvas.jsx
│   └── PixelCanvas.css
├── FusionEngine/
│   ├── FusionEngine.jsx
│   └── FusionEngine.css
└── Dashboard/
    ├── Dashboard.jsx
    └── Dashboard.css
```

## State Management (Zustand)

```javascript
FrankensteinStore {
  // Terminal State
  terminalLogs: Array<{command, output, timestamp}>
  addTerminalLog: (log) => void
  clearTerminal: () => void
  
  // Canvas State
  pixelGrid: Array<Array<string>>  // 2D array of hex colors
  gridSize: number
  selectedColor: string
  setPixel: (x, y, color) => void
  setGridSize: (size) => void
  setSelectedColor: (color) => void
  clearCanvas: () => void
  
  // Dashboard State
  dashboardCards: Array<Card>
  addCard: (card) => void
  removeCard: (id) => void
  setCards: (cards) => void
  
  // AI State
  aiProcessing: boolean
  setAiProcessing: (processing) => void
}
```

## API Endpoints Summary

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/api/health` | Health check |
| POST | `/api/terminal/logs` | Save terminal log |
| GET | `/api/terminal/logs` | Get logs (with limit) |
| DELETE | `/api/terminal/logs/:id` | Delete log |
| POST | `/api/canvas/save` | Save pixel art |
| GET | `/api/canvas/list` | List all art |
| GET | `/api/canvas/:id` | Get specific art |
| POST | `/api/dashboard/cards` | Create card |
| GET | `/api/dashboard/cards` | Get all cards |
| DELETE | `/api/dashboard/cards/:id` | Delete card |
| POST | `/api/fusion/pixel-to-ascii` | Transform pixels |
| POST | `/api/fusion/terminal-to-dashboard` | Export log |
| POST | `/api/fusion/pixel-to-dashboard` | Export art |

## Technology Stack Layers

```
┌─────────────────────────────────────┐
│         Presentation Layer          │
│  React Components + CSS Modules     │
│  (Frankenstein Theme)                │
└─────────────┬───────────────────────┘
              │
┌─────────────▼───────────────────────┐
│         State Management            │
│  Zustand (Global State)             │
└─────────────┬───────────────────────┘
              │
┌─────────────▼───────────────────────┐
│         Business Logic              │
│  Utils (transformers, aiCommands)   │
└─────────────┬───────────────────────┘
              │
┌─────────────▼───────────────────────┐
│         API Layer                   │
│  Axios HTTP Client                  │
└─────────────┬───────────────────────┘
              │
┌─────────────▼───────────────────────┐
│         Backend API                 │
│  Express.js Routes + Controllers    │
└─────────────┬───────────────────────┘
              │
┌─────────────▼───────────────────────┐
│         Data Layer                  │
│  Mongoose ODM                       │
└─────────────┬───────────────────────┘
              │
┌─────────────▼───────────────────────┐
│         Database                    │
│  MongoDB                            │
└─────────────────────────────────────┘
```

## Security Considerations

- CORS enabled for localhost development
- No authentication (add for production)
- Input validation on backend
- MongoDB injection prevention via Mongoose
- Environment variables for sensitive config

## Performance Optimizations

- React component memoization (can add)
- Zustand selective subscriptions
- MongoDB indexing on timestamps
- Axios request cancellation (can add)
- Lazy loading for large datasets (can add)

## Scalability Path

1. Add user authentication (JWT)
2. Implement WebSockets for real-time updates
3. Add Redis caching layer
4. Containerize with Docker
5. Deploy backend to cloud (Heroku, AWS, etc.)
6. Deploy frontend to Vercel/Netlify
7. Use MongoDB Atlas for managed database
8. Add CDN for static assets
9. Implement rate limiting
10. Add monitoring (Sentry, LogRocket)

---

**Architecture designed for hackathon speed and future growth! ⚡🧪**
