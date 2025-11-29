import express from 'express';
import PixelArt from '../models/PixelArt.js';

const router = express.Router();

// Save pixel art
router.post('/save', async (req, res) => {
  try {
    const art = new PixelArt(req.body);
    await art.save();
    res.json({ success: true, art });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get pixel arts
router.get('/list', async (req, res) => {
  try {
    const { userId = 'anonymous' } = req.query;
    const arts = await PixelArt.find({ userId }).sort({ timestamp: -1 });
    res.json(arts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single pixel art
router.get('/:id', async (req, res) => {
  try {
    const art = await PixelArt.findById(req.params.id);
    res.json(art);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
