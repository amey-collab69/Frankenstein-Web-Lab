import mongoose from 'mongoose';

const dashboardCardSchema = new mongoose.Schema({
  title: { type: String, required: true },
  type: { type: String, enum: ['text', 'json', 'pixel', 'weather'], required: true },
  content: mongoose.Schema.Types.Mixed,
  timestamp: { type: Date, default: Date.now },
  userId: { type: String, default: 'anonymous' }
});

export default mongoose.model('DashboardCard', dashboardCardSchema);
