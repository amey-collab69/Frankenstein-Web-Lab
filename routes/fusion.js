import express from 'express';
import PixelArt from '../models/PixelArt.js';
import DashboardCard from '../models/DashboardCard.js';
import TerminalLog from '../models/TerminalLog.js';

const router = express.Router();

// Fusion Engine: Transform pixel art to ASCII
router.post('/pixel-to-ascii', async (req, res) => {
  try {
    const { pixels } = req.body;
    const ascii = pixels.map(row => 
      row.map(color => color === '#000000' ? ' ' : '█').join('')
    ).join('\n');
    res.json({ ascii });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Fusion Engine: Transform terminal to dashboard
router.post('/terminal-to-dashboard', async (req, res) => {
  try {
    const { logId, userId } = req.body;
    const log = await TerminalLog.findById(logId);
    
    const card = new DashboardCard({
      title: `Terminal: ${log.command}`,
      type: 'text',
      content: log.output,
      userId
    });
    await card.save();
    
    res.json({ success: true, card });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Fusion Engine: Transform pixel to dashboard
router.post('/pixel-to-dashboard', async (req, res) => {
  try {
    const { artId, userId } = req.body;
    const art = await PixelArt.findById(artId);
    
    const card = new DashboardCard({
      title: art.name,
      type: 'pixel',
      content: { pixels: art.pixels, gridSize: art.gridSize },
      userId
    });
    await card.save();
    
    res.json({ success: true, card });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
