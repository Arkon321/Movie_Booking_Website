import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import SeatSelector from '../components/SeatSelector';

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [selectedShowtime, setSelectedShowtime] = useState('');
  const userId = 'USER_ID_HERE'; // replace with a valid user ID for testing

  useEffect(() => {
    axios.get(`http://localhost:5000/api/movies`).then(res => {
      const m = res.data.find(m => m._id === id);
      setMovie(m);
    });
  }, [id]);

  if (!movie) return <div>Loading...</div>;

  return (
    <div className="page-container">
      <div className="movie-details-container">
        <img src={movie.posterUrl} alt={movie.title} className="movie-poster" />

        <div className="movie-info">
          <h2>{movie.title}</h2>
          <p>{movie.description}</p>

          <h4>Showtimes:</h4>
          <div className="showtimes">
            {movie.showtimes.map((s, i) => (
              <button
                key={i}
                className={selectedShowtime === s ? 'showtime-btn selected' : 'showtime-btn'}
                onClick={() => setSelectedShowtime(s)}
              >
                {s}
              </button>
            ))}
          </div>

          {selectedShowtime && (
            <SeatSelector
              movieId={movie._id}
              showtime={selectedShowtime}
              userId={userId}
              onBooking={b => console.log(b)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
