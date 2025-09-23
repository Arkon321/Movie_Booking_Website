import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/Navbar';
import Home from './pages/Home';
import MovieDetails from './pages/MovieDetails';
import BookingHistory from './pages/BookingHistory';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/history" element={<BookingHistory />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </div>
  );
}

export default App;
