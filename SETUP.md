# 🧪 Frankenstein Web Lab - Setup Guide

## Step-by-Step Installation

### 1. Install Backend Dependencies
```cmd
cd my-react-app\backend
npm install
```

### 2. Install Frontend Dependencies (if not done)
```cmd
cd my-react-app
npm install
```

### 3. Setup MongoDB

**Option A: Local MongoDB**
- Download and install MongoDB from https://www.mongodb.com/try/download/community
- Start MongoDB service:
```cmd
net start MongoDB
```

**Option B: MongoDB Atlas (Cloud)**
- Create free account at https://www.mongodb.com/cloud/atlas
- Create a cluster
- Get connection string
- Update `backend/.env` with your connection string:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/frankenstein-lab
```

### 4. Start the Backend Server

Open a terminal:
```cmd
cd my-react-app\backend
npm run dev
```

You should see:
```
🧪 Frankenstein Lab Backend running on port 5000
⚡ MongoDB Connected - Frankenstein Lab is ALIVE!
```

### 5. Start the Frontend

Open another terminal:
```cmd
cd my-react-app
npm run dev
```

You should see:
```
VITE ready in XXX ms
➜  Local:   http://localhost:5173/
```

### 6. Open Your Browser

Navigate to: http://localhost:5173/

You should see the Frankenstein Web Lab with:
- ⚡ Glowing neon green header
- 🖥️ Retro Terminal (top left)
- 🎨 Pixel Canvas (top right)
- ⚡ Fusion Engine (middle)
- 📊 Dashboard (bottom)

## Troubleshooting

### MongoDB Connection Error
- Make sure MongoDB is running
- Check your connection string in `backend/.env`
- For local MongoDB, default is: `mongodb://localhost:27017/frankenstein-lab`

### Port Already in Use
- Backend (5000): Change PORT in `backend/.env`
- Frontend (5173): Vite will auto-increment to 5174, 5175, etc.

### Module Not Found Errors
- Run `npm install` in both `my-react-app/` and `my-react-app/backend/`

### CORS Errors
- Make sure backend is running on port 5000
- Check that frontend is making requests to `http://localhost:5000/api`

## Quick Test

Once everything is running:

1. **Terminal Test**: Type `help` in the terminal and press Enter
2. **Canvas Test**: Click on the pixel grid to draw
3. **Fusion Test**: Type "Draw a pixel ghost" in the Fusion Engine
4. **Dashboard Test**: Click "→ Dashboard" button in Canvas to export

## Development Tips

- Frontend hot-reloads automatically on file changes
- Backend restarts automatically with `--watch` flag
- MongoDB data persists between restarts
- Use browser DevTools to debug API calls

## Need Help?

Check the main README.md for:
- API documentation
- Architecture overview
- Feature descriptions
- Tech stack details

---

**Ready to create your monster? ⚡🧪**
