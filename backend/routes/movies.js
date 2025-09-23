import express from 'express';
import Movie from '../models/Movie.js';
const router = express.Router();

// Get all movies
router.get('/', async (req, res) => {
  const movies = await Movie.find();
  res.json(movies);
});

// Add new movie
router.post('/', async (req, res) => {
  const movie = new Movie(req.body);
  await movie.save();
  res.json(movie);
});

// Update a movie
router.put('/:id', async (req, res) => {
  try {
    const updatedMovie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedMovie);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a movie
router.delete('/:id', async (req, res) => {
  try {
    await Movie.findByIdAndDelete(req.params.id);
    res.json({ message: 'Movie deleted successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
