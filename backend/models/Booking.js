import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  movie: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie' },
  showtime: String,
  seatsBooked: Number,
  bookedAt: { type: Date, default: Date.now }
});

export default mongoose.model('Booking', bookingSchema);
