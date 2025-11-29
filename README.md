# ⚡ FRANKENSTEIN WEB LAB ⚡

A Chimera Web Application - Technology Fusion Machine powered by Kiro AI

## 🧪 What is This?

Frankenstein Web Lab is a hackathon-ready web application that stitches together different technologies into one cohesive "monster" of an app. It features:

- **Retro Terminal Module** - CRT-style terminal with command interpretation
- **Pixel Art Canvas Module** - Draw and create pixel art
- **Modern Dashboard Module** - Display transformed data in cards
- **Fusion Engine** - AI-powered module connector and data transformer

## 🚀 Quick Start

### Prerequisites
- Node.js (v18+)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. **Install Frontend Dependencies**
```bash
cd my-react-app
npm install
```

2. **Install Backend Dependencies**
```bash
cd backend
npm install
```

3. **Start MongoDB**
```bash
# If using local MongoDB
mongod
```

4. **Start Backend Server**
```bash
cd backend
npm run dev
# Server runs on http://localhost:5000
```

5. **Start Frontend**
```bash
cd my-react-app
npm run dev
# App runs on http://localhost:5173
```

## 🎨 Features

### Retro Terminal
- CRT-style green-on-black terminal
- Command interpreter with built-in commands
- Saves logs to MongoDB
- AI can type automatically

**Commands:**
- `help` - Show available commands
- `clear` - Clear terminal
- `status` - System status
- `fusion` - Show fusion options

### Pixel Canvas
- 16x16 grid (expandable)
- Click to draw with selected color
- Export to ASCII for terminal
- Export to dashboard as card
- Save drawings to database

### Dashboard
- Modern card-based UI
- Displays text, JSON, and pixel art
- Real-time updates
- Delete cards functionality

### Fusion Engine
- Natural language command processing
- AI-driven module orchestration
- Data transformation between modules
- Example: "Draw a pixel ghost" → generates pixel art

## 🔌 API Endpoints

### Terminal
- `POST /api/terminal/logs` - Save terminal log
- `GET /api/terminal/logs` - Get logs
- `DELETE /api/terminal/logs/:id` - Delete log

### Canvas
- `POST /api/canvas/save` - Save pixel art
- `GET /api/canvas/list` - List all art
- `GET /api/canvas/:id` - Get specific art

### Dashboard
- `POST /api/dashboard/cards` - Create card
- `GET /api/dashboard/cards` - Get all cards
- `DELETE /api/dashboard/cards/:id` - Delete card

### Fusion
- `POST /api/fusion/pixel-to-ascii` - Convert pixels to ASCII
- `POST /api/fusion/terminal-to-dashboard` - Move terminal to dashboard
- `POST /api/fusion/pixel-to-dashboard` - Move pixel art to dashboard

## 🎭 Theme

Spooky Frankenstein laboratory aesthetic:
- Neon green (#00ff00) and purple (#9d00ff)
- Dark backgrounds (#0a0a0a, #1a1a1a)
- CRT scanline effects
- Glowing hover effects
- Electric arc animations
- Retro + modern fusion

## 🧠 Kiro AI Integration

This project uses Kiro AI for:
- Agent hooks for automated workflows
- Steering docs for project context
- AI-driven module control
- Natural language command interpretation

## 📦 Tech Stack

**Frontend:**
- React 19
- Vite
- Zustand (state management)
- Axios (API calls)

**Backend:**
- Node.js
- Express.js
- MongoDB + Mongoose
- CORS

## 🛠️ Development

### Project Structure
```
my-react-app/
├── backend/              # Express backend
│   ├── models/          # MongoDB models
│   ├── routes/          # API routes
│   └── server.js        # Main server
├── src/
│   ├── components/      # React components
│   │   ├── RetroTerminal/
│   │   ├── PixelCanvas/
│   │   ├── Dashboard/
│   │   └── FusionEngine/
│   ├── context/         # Zustand store
│   ├── services/        # API service
│   └── styles/          # CSS files
└── .kiro/              # Kiro AI config
```

### Environment Variables

Create `backend/.env`:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/frankenstein-lab
```

## 🎯 Hackathon Ready

This project is designed for hackathons with:
- ✅ Complete working system
- ✅ Modern + retro aesthetic
- ✅ AI integration
- ✅ Database persistence
- ✅ Modular architecture
- ✅ Responsive design
- ✅ Clean code structure

## 📝 License

MIT License - Build something awesome!

---

**Built with ⚡ by Kiro AI**

FOR WHOLE SETUP YOU CAN VISIT THE SETUP.md and read how to setup this project