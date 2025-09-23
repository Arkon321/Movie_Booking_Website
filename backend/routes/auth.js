import express from 'express';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = new User({ name, email, password });
    await user.save();
    res.json({ message: 'User registered' });
  } catch(err) {
    res.status(400).json({ error: err.message });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if(!user) return res.status(400).json({ error: 'User not found' });
  const isMatch = await user.comparePassword(password);
  if(!isMatch) return res.status(400).json({ error: 'Invalid password' });

  const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET, { expiresIn: '1d' });
  res.json({ token, user });
});

export default router;
