import React, { useState, useEffect } from 'react';
import CarList from '../components/CarList';
import Filters from '../components/Filters';
import { fetchCars } from '../services/api';

const Home = () => {
  const [cars, setCars] = useState([]);
  const [filters, setFilters] = useState({
    make: '',
    seats: '',
    priceRange: [0, 100],
  });

  useEffect(() => {
    fetchCars(filters).then((data) => setCars(data));
  }, [filters]);

  return (
    <div>
      <h1>Available Cars</h1>
      <Filters setFilters={setFilters} />
      <CarList cars={cars} />
    </div>
  );
};

export default Home;