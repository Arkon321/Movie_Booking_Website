import mongoose from 'mongoose';

const movieSchema = new mongoose.Schema({
  title: String,
  description: String,
  posterUrl: String,
  showtimes: [String],
  seats: { type: Number, default: 50 }
});

export default mongoose.model('Movie', movieSchema);
