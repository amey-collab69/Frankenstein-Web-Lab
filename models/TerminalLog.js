import mongoose from 'mongoose';

const terminalLogSchema = new mongoose.Schema({
  command: { type: String, required: true },
  output: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  userId: { type: String, default: 'anonymous' },
  sessionId: String
});

export default mongoose.model('TerminalLog', terminalLogSchema);
