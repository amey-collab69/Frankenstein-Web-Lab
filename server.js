import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/frankenstein-lab';

mongoose.connect(MONGODB_URI)
  .then(() => console.log('⚡ MongoDB Connected - Frankenstein Lab is ALIVE!'))
  .catch(err => console.error('💀 MongoDB Connection Error:', err));

// Import routes
import terminalRoutes from './routes/terminal.js';
import canvasRoutes from './routes/canvas.js';
import dashboardRoutes from './routes/dashboard.js';
import fusionRoutes from './routes/fusion.js';

// Use routes
app.use('/api/terminal', terminalRoutes);
app.use('/api/canvas', canvasRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/fusion', fusionRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'alive', message: 'Frankenstein Lab is operational ⚡' });
});

app.listen(PORT, () => {
  console.log(`🧪 Frankenstein Lab Backend running on port ${PORT}`);
});
