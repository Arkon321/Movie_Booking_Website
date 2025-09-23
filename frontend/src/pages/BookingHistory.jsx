import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BookingHistory = () => {
  const userId = 'USER_ID_HERE';
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/bookings/${userId}`)
      .then(res => setBookings(res.data))
      .catch(err => console.error(err));
  }, [userId]);

  return (
    <div className="page-container">
      <h2>Booking History</h2>
      {bookings.length === 0 && <p>No bookings yet.</p>}
      {bookings.map(b => (
        <div key={b._id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px', borderRadius: '8px' }}>
          <h3>{b.movie ? b.movie.title : 'Movie deleted'}</h3>
          <p>Showtime: {b.showtime}</p>
          <p>Seats: {b.seatsBooked}</p>
          <p>Booked At: {new Date(b.bookedAt).toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
};

export default BookingHistory;
