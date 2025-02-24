import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Zmieniamy useHistory na useNavigate
import { fetchCarById, makeReservation } from '../services/api';

const Reservation = () => {
  const { id } = useParams();  // Pobieramy id samochodu z URL
  const [car, setCar] = useState(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reservationPrice, setReservationPrice] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); // Zmieniamy useHistory na useNavigate

  useEffect(() => {
    // Pobieramy dane o samochodzie na podstawie id
    fetchCarById(id).then((data) => {
      setCar(data);
      setReservationPrice(data.price_per_day);  // Ustawiamy cenę rezerwacji na cenę za dzień
    });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!startDate || !endDate) {
      setErrorMessage('Please select both start and end dates.');
      return;
    }

    try {
      const user = JSON.parse(localStorage.getItem('user'));  // Pobieramy zalogowanego użytkownika
      if (!user) {
        setErrorMessage('You need to log in first.');
        return;
      }

      const reservationDetails = {
        start_date: startDate,
        end_date: endDate,
        car_id: car.id,
        user_id: user.id,
        reservation_price: reservationPrice,
      };

      await makeReservation(reservationDetails);  // Wywołujemy funkcję do złożenia rezerwacji
      navigate('/');  // Zmieniamy przekierowanie na navigate
    } catch (error) {
      setErrorMessage('An error occurred while making the reservation.');
    }
  };

  if (!car) {
    return <p>Loading...</p>;
  }

  return (
    <div className="reservation-form">
      <h2>Reserve {car.model_name}</h2>
      
      <form onSubmit={handleSubmit}>
        <label>Start Date:</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          required
        />

        <label>End Date:</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          required
        />
        
        <p>Price per day: ${car.price_per_day}</p>
        <p>Total price: ${(new Date(endDate) - new Date(startDate)) / (1000 * 3600 * 24) * car.price_per_day}</p>
        
        <button type="submit">Confirm Reservation</button>
      </form>

      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  );
};

export default Reservation;
