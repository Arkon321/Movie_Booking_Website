import React from 'react';
import { Link } from 'react-router-dom';
import './MovieCard.css';

const MovieCard = ({ movie }) => (
  <div className="movie-card">
    <img src={movie.posterUrl} alt={movie.title} width="200" />
    <h3>{movie.title}</h3>
    <Link to={`/movie/${movie._id}`}>Book Now</Link>
  </div>
);

export default MovieCard;
