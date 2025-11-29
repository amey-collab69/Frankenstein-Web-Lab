import express from 'express';
import DashboardCard from '../models/DashboardCard.js';

const router = express.Router();

// Create card
router.post('/cards', async (req, res) => {
  try {
    const card = new DashboardCard(req.body);
    await card.save();
    res.json({ success: true, card });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get cards
router.get('/cards', async (req, res) => {
  try {
    const { userId = 'anonymous' } = req.query;
    const cards = await DashboardCard.find({ userId }).sort({ timestamp: -1 });
    res.json(cards);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete card
router.delete('/cards/:id', async (req, res) => {
  try {
    await DashboardCard.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
