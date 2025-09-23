import React, { useState } from 'react';
import axios from 'axios';
import './SeatSelector.css';

const SeatSelector = ({ movieId, showtime, userId, onBooking }) => {
  const totalSeats = 50; // or get from movie.seats
  const [selectedSeats, setSelectedSeats] = useState([]);

  const toggleSeat = (seatNumber) => {
    if (selectedSeats.includes(seatNumber)) {
      setSelectedSeats(selectedSeats.filter(s => s !== seatNumber));
    } else {
      setSelectedSeats([...selectedSeats, seatNumber]);
    }
  };

  const handleBook = () => {
    if (selectedSeats.length === 0) {
      alert('Select at least 1 seat!');
      return;
    }

    axios.post('http://localhost:5000/api/bookings', {
      user: userId,
      movieId,
      showtime,
      seatsBooked: selectedSeats.length
    })
    .then(res => {
      alert(`Booked ${selectedSeats.length} seats!`);
      setSelectedSeats([]);
      onBooking(res.data);
    })
    .catch(err => alert(err.response.data.error));
  };

  return (
    <div className="seat-selector">
      <h4>Select Your Seats</h4>
      <div className="seats-container">
        {Array.from({ length: totalSeats }, (_, i) => i + 1).map(seat => (
          <div
            key={seat}
            className={`seat ${selectedSeats.includes(seat) ? 'selected' : ''}`}
            onClick={() => toggleSeat(seat)}
          >
            {seat}
          </div>
        ))}
      </div>
      <button className="book-btn" onClick={handleBook}>Book Selected Seats</button>
    </div>
  );
};

export default SeatSelector;
