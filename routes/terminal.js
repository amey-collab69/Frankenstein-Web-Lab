import express from 'express';
import TerminalLog from '../models/TerminalLog.js';

const router = express.Router();

// Save terminal log
router.post('/logs', async (req, res) => {
  try {
    const log = new TerminalLog(req.body);
    await log.save();
    res.json({ success: true, log });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get terminal logs
router.get('/logs', async (req, res) => {
  try {
    const { limit = 10, userId = 'anonymous' } = req.query;
    const logs = await TerminalLog.find({ userId })
      .sort({ timestamp: -1 })
      .limit(parseInt(limit));
    res.json(logs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete log
router.delete('/logs/:id', async (req, res) => {
  try {
    await TerminalLog.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
