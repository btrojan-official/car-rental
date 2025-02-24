import React from 'react';
import CarItem from './CarItem';

const CarList = ({ cars }) => {
  return (
    <div className="car-list">
      {cars.map((car) => (
        <CarItem key={car.id} car={car} />
      ))}
    </div>
  );
};

export default CarList;
