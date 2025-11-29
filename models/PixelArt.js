import mongoose from 'mongoose';

const pixelArtSchema = new mongoose.Schema({
  name: { type: String, required: true },
  gridSize: { type: Number, default: 16 },
  pixels: { type: [[String]], required: true },
  timestamp: { type: Date, default: Date.now },
  userId: { type: String, default: 'anonymous' }
});

export default mongoose.model('PixelArt', pixelArtSchema);
