# 🔧 Frankenstein Web Lab - Troubleshooting Guide

## Common Issues & Solutions

### 🔴 MongoDB Connection Issues

#### Problem: "MongoDB Connection Error"
```
💀 MongoDB Connection Error: connect ECONNREFUSED
```

**Solutions:**

1. **Check if MongoDB is running**
```cmd
net start MongoDB
```

2. **Verify MongoDB is installed**
```cmd
mongod --version
```
If not installed, download from: https://www.mongodb.com/try/download/community

3. **Check connection string in backend/.env**
```
MONGODB_URI=mongodb://localhost:27017/frankenstein-lab
```

4. **Try MongoDB Atlas (cloud alternative)**
- Sign up at https://www.mongodb.com/cloud/atlas
- Create free cluster
- Get connection string
- Update backend/.env

---

### 🔴 Port Already in Use

#### Problem: "Port 5000 is already in use"

**Solution 1: Change Backend Port**

Edit `backend/.env`:
```
PORT=5001
```

Then update `src/services/api.js`:
```javascript
const API_BASE = 'http://localhost:5001/api';
```

**Solution 2: Kill Process Using Port**
```cmd
netstat -ano | findstr :5000
taskkill /PID <PID_NUMBER> /F
```

#### Problem: "Port 5173 is already in use"

Vite will automatically try 5174, 5175, etc. Just use the port shown in terminal.

---

### 🔴 Module Not Found Errors

#### Problem: "Cannot find module 'axios'" or similar

**Solution:**
```cmd
cd my-react-app
npm install

cd backend
npm install
```

#### Problem: "Cannot find module './components/...'"

Check file paths are correct:
- Windows uses backslashes `\` but code uses forward slashes `/`
- JavaScript imports should use `/`
- File extensions should match (.jsx not .js)

---

### 🔴 CORS Errors

#### Problem: "Access-Control-Allow-Origin" error in browser console

**Solution:**

Backend already has CORS enabled. Check:

1. Backend is running on port 5000
2. Frontend is making requests to correct URL
3. Both servers are running

Verify in `backend/server.js`:
```javascript
app.use(cors());
```

---

### 🔴 Blank Screen / White Screen

#### Problem: App loads but shows nothing

**Solutions:**

1. **Check browser console for errors**
   - Press F12
   - Look at Console tab
   - Fix any red errors

2. **Verify backend is running**
```cmd
curl http://localhost:5000/api/health
```
Should return: `{"status":"alive",...}`

3. **Check React errors**
   - Look for syntax errors in components
   - Verify all imports are correct
   - Check for missing dependencies

4. **Clear browser cache**
   - Ctrl + Shift + Delete
   - Clear cached images and files
   - Reload page

---

### 🔴 Data Not Persisting

#### Problem: Dashboard cards disappear on refresh

**Possible Causes:**

1. **Backend not saving to DB**
   - Check backend console for errors
   - Verify MongoDB is connected
   - Check API calls in Network tab (F12)

2. **Frontend not loading from DB**
   - Check Dashboard.jsx useEffect
   - Verify dashboardAPI.getCards() is called
   - Check Network tab for GET requests

3. **MongoDB not running**
```cmd
net start MongoDB
```

---

### 🔴 Styling Issues

#### Problem: No neon glow effects / Theme not working

**Solutions:**

1. **Verify CSS is imported**

Check `src/main.jsx`:
```javascript
import './styles/frankenstein.css'
```

2. **Check browser DevTools**
   - F12 → Elements tab
   - Inspect element
   - Check if CSS classes are applied
   - Look for CSS errors in Console

3. **Clear CSS cache**
   - Hard refresh: Ctrl + Shift + R
   - Or clear browser cache

---

### 🔴 Terminal Not Responding

#### Problem: Typing in terminal does nothing

**Solutions:**

1. **Check if input is focused**
   - Click in the terminal input area
   - Should see blinking cursor

2. **Verify RetroTerminal component**
   - Check browser console for errors
   - Verify handleSubmit function exists

3. **Check Zustand store**
   - Open React DevTools
   - Check if addTerminalLog is defined

---

### 🔴 Pixel Canvas Not Drawing

#### Problem: Clicking pixels doesn't change colors

**Solutions:**

1. **Verify color is selected**
   - Click a color in the palette
   - Should see border around selected color

2. **Check handlePixelClick**
   - Open browser console
   - Look for JavaScript errors

3. **Verify Zustand setPixel**
   - Check if pixelGrid state updates
   - Use React DevTools

---

### 🔴 AI Commands Not Working

#### Problem: Fusion Engine commands do nothing

**Solutions:**

1. **Check command spelling**
   - "draw a ghost" (not "draw ghost")
   - "convert to ascii" (not "convert ascii")

2. **Verify aiCommands.js**
   - Check if processAiCommand is imported
   - Look for errors in console

3. **Check AI processing state**
   - Should show "PROCESSING..." briefly
   - If stuck, refresh page

---

### 🔴 npm Install Fails

#### Problem: npm install shows errors

**Solutions:**

1. **Clear npm cache**
```cmd
npm cache clean --force
npm install
```

2. **Delete node_modules and reinstall**
```cmd
rmdir /s /q node_modules
del package-lock.json
npm install
```

3. **Check Node.js version**
```cmd
node --version
```
Should be v18 or higher. Update if needed.

4. **Run as Administrator**
   - Right-click CMD
   - "Run as administrator"
   - Try npm install again

---

### 🔴 Backend Won't Start

#### Problem: "npm run dev" fails in backend

**Solutions:**

1. **Check for syntax errors**
   - Look at error message
   - Fix any JavaScript errors

2. **Verify all files exist**
```
backend/
├── server.js
├── package.json
├── .env
├── models/
└── routes/
```

3. **Check .env file**
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/frankenstein-lab
```

4. **Reinstall dependencies**
```cmd
cd backend
rmdir /s /q node_modules
npm install
```

---

### 🔴 Frontend Won't Start

#### Problem: "npm run dev" fails

**Solutions:**

1. **Check Vite config**
   - Verify vite.config.js exists
   - Check for syntax errors

2. **Verify package.json scripts**
```json
"scripts": {
  "dev": "vite"
}
```

3. **Clear Vite cache**
```cmd
rmdir /s /q node_modules\.vite
npm run dev
```

---

## Debugging Tips

### Use Browser DevTools (F12)

1. **Console Tab**
   - See JavaScript errors
   - View console.log output
   - Check API responses

2. **Network Tab**
   - Monitor API calls
   - Check request/response data
   - Verify endpoints are correct

3. **Elements Tab**
   - Inspect HTML structure
   - Check CSS styles
   - Verify classes applied

4. **React DevTools**
   - Install React DevTools extension
   - Inspect component state
   - Check props and hooks

### Check Backend Logs

Backend console shows:
- API requests received
- MongoDB queries
- Errors and stack traces

### Check MongoDB Data

```cmd
mongosh
use frankenstein-lab
db.terminallogs.find()
db.pixelarts.find()
db.dashboardcards.find()
```

---

## Still Having Issues?

### Checklist:

- [ ] MongoDB is running
- [ ] Backend is running (port 5000)
- [ ] Frontend is running (port 5173)
- [ ] No errors in browser console
- [ ] No errors in backend console
- [ ] All dependencies installed
- [ ] .env file configured
- [ ] Correct Node.js version (v18+)

### Nuclear Option (Fresh Start):

```cmd
# Stop all servers
# Delete everything and reinstall

cd my-react-app
rmdir /s /q node_modules
rmdir /s /q backend\node_modules
del package-lock.json
del backend\package-lock.json

npm install
cd backend
npm install
cd ..

# Start fresh
npm run dev
# (in another terminal)
cd backend
npm run dev
```

---

## Getting Help

If you're still stuck:

1. Check error messages carefully
2. Search error on Google/Stack Overflow
3. Check MongoDB logs
4. Verify all files match the documentation
5. Try the examples in TESTING.md

---

**Remember: The monster is temperamental, but it WILL come alive! ⚡🧪**
