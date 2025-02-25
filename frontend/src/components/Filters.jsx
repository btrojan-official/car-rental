import React, { useState } from 'react';
import './../stylesheat/Filters.css';

const Filters = ({ setFilters }) => {
  const [priceRange, setPriceRange] = useState(0);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
    if (name === 'priceRange') {
      setPriceRange(value);
    }
  };
  return (
    <div className="filters">
      <label>Make:</label>
      <select name="make" onChange={handleFilterChange}>
        <option value="">All</option>
        <option value="Audi">Audi</option>
        <option value="BMW">BMW</option>
        <option value="Volkswagen">Volkswagen</option>
        <option value="Skoda">Skoda</option>
      </select>

      <label>Seats:</label>
      <select name="seats" onChange={handleFilterChange}>
        <option value="">All</option>
        <option value="2">2</option>
        <option value="4">4</option>
        <option value="7">7</option>
      </select>

      <label>Max Price: {priceRange}</label>
      <input
        type="range"
        min="0"
        max="100"
        name="priceRange"
        value={priceRange}
        onChange={handleFilterChange}
      />
    </div>
  );
};

export default Filters;
