import React, { useState, useEffect } from 'react';
import CarList from '../components/CarList';
import Filters from '../components/Filters';
import { fetchCars } from '../services/api';
import './../stylesheat/Home.css';

const Home = () => {
  const [cars, setCars] = useState([]);
  const [filters, setFilters] = useState({
    make: '',
    seats: '',
    priceRange: [0, 100],
  });

  useEffect(() => {
    const getCars = async () => {
      try {
        const data = await fetchCars(filters);
        setCars(data);
      } catch (error) {
        console.error("Error fetching cars:", error);
      }
    };

    getCars();
  }, [filters]);

  return (
    <div className="home">
      <header><h1>All ours Cars</h1></header>
      <Filters setFilters={setFilters} />
      <CarList cars={cars} />
    </div>
  );
};

export default Home;