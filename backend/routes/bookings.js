import express from 'express';
import Booking from '../models/Booking.js';
import Movie from '../models/Movie.js';
const router = express.Router();

router.post('/', async (req, res) => {
  const { user, movieId, showtime, seatsBooked } = req.body;
  const movie = await Movie.findById(movieId);
  if(!movie) return res.status(404).json({ error: "Movie not found" });
  if(movie.seats < seatsBooked) return res.status(400).json({ error: "Not enough seats" });

  const booking = new Booking({ user, movie: movieId, showtime, seatsBooked });
  await booking.save();
  movie.seats -= seatsBooked;
  await movie.save();
  res.json(booking);
});

router.get('/:userId', async (req, res) => {
  const bookings = await Booking.find({ user: req.params.userId }).populate('movie');
  res.json(bookings);
});

export default router;
