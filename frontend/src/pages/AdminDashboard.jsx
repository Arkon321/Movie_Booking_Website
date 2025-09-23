import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [movies, setMovies] = useState([]);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [poster, setPoster] = useState('');
  const [showtimes, setShowtimes] = useState('');
  const [editingMovieId, setEditingMovieId] = useState(null);

  const fetchMovies = () => {
    axios.get('http://localhost:5000/api/movies').then(res => setMovies(res.data));
  };

  useEffect(() => fetchMovies(), []);

  const handleAddMovie = () => {
    axios.post('http://localhost:5000/api/movies', {
      title, description: desc, posterUrl: poster, showtimes: showtimes.split(',')
    }).then(() => {
      fetchMovies();
      clearForm();
    });
  };

  const handleEditMovie = (movie) => {
    setEditingMovieId(movie._id);
    setTitle(movie.title);
    setDesc(movie.description);
    setPoster(movie.posterUrl);
    setShowtimes(movie.showtimes.join(','));
  };

  const handleUpdateMovie = () => {
    axios.put(`http://localhost:5000/api/movies/${editingMovieId}`, {
      title, description: desc, posterUrl: poster, showtimes: showtimes.split(',')
    }).then(() => {
      fetchMovies();
      clearForm();
      setEditingMovieId(null);
    });
  };

  const handleDeleteMovie = (id) => {
    if (window.confirm('Are you sure you want to delete this movie?')) {
      axios.delete(`http://localhost:5000/api/movies/${id}`).then(() => fetchMovies());
    }
  };

  const clearForm = () => {
    setTitle('');
    setDesc('');
    setPoster('');
    setShowtimes('');
  };

  return (
    <div className="page-container">
      <h2>Admin Dashboard</h2>

      <div className="add-movie-form">
        <input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
        <input placeholder="Description" value={desc} onChange={e => setDesc(e.target.value)} />
        <input placeholder="Poster URL" value={poster} onChange={e => setPoster(e.target.value)} />
        <input placeholder="Showtimes (comma separated)" value={showtimes} onChange={e => setShowtimes(e.target.value)} />

        {editingMovieId ? (
          <button onClick={handleUpdateMovie}>Update Movie</button>
        ) : (
          <button onClick={handleAddMovie}>Add Movie</button>
        )}
      </div>

      <h3>All Movies</h3>
      <div className="movies-grid">
        {movies.map(m => (
          <div key={m._id} className="movie-card">
            <h4 className="movie-title">{m.title}</h4>
            <p>{m.description}</p>
            <button onClick={() => handleEditMovie(m)}>Edit</button>
            <button onClick={() => handleDeleteMovie(m._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
