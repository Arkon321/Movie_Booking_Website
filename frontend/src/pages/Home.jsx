import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MovieCard from '../components/MovieCard';

const Home = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/movies')
      .then(res => setMovies(res.data));
  }, []);

  return (
  <div className="page-container">
    <h1 className="now-showing">Now Showing</h1>
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
      {movies.map(movie => <MovieCard key={movie._id} movie={movie} />)}
    </div>
  </div>
);

};


export default Home;
