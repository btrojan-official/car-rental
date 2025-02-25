import React from 'react';
import { Link } from 'react-router-dom';

const CarItem = ({ car }) => {
  return (
    <div className="car-item">
      <h3>{car.model_name}</h3>
      <p>Price per day: ${car.price_per_day}</p>
      <Link to={`/reservation/${car.id}`}>
        <button>Book Now</button>
      </Link>
    </div>
  );
};

export default CarItem;
