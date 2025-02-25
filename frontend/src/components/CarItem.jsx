import React from 'react';
import { Link } from 'react-router-dom';
import './../stylesheat/CarItem.css';

const CarItem = ({ car }) => {
  return (
    <div className="car-item">
      <p>Make: {car.make_name}</p>
      <p>Model: {car.model_name}</p>
      <p>Seats: {car.number_of_seats}</p>
      <p>Gearbox: {car.gearbox}</p>
      <p>Luggage Capacity: {car.luggage_capacity}</p>
      <p>Milage Limit: {car.milage_limit}</p>
      <p>Class: {car.class}</p>
      <p>Status: {car.status}</p>
      <p>Price per day: ${car.price_per_day}</p>
      <Link to={`/reservation/${car.id}`}>
        <button>Book Now</button>
      </Link>
    </div>
  );
};

export default CarItem;
