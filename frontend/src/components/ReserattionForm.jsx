import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const ReservationForm = () => {
  const { id } = useParams();
  const [reservationDetails, setReservationDetails] = useState({
    startDate: '',
    endDate: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic to submit reservation
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Start Date:</label>
      <input
        type="date"
        value={reservationDetails.startDate}
        onChange={(e) => setReservationDetails({ ...reservationDetails, startDate: e.target.value })}
      />

      <label>End Date:</label>
      <input
        type="date"
        value={reservationDetails.endDate}
        onChange={(e) => setReservationDetails({ ...reservationDetails, endDate: e.target.value })}
      />

      <button type="submit">Reserve</button>
    </form>
  );
};

export default ReservationForm;
