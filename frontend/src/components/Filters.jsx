import React from 'react';

const Filters = ({ setFilters }) => {
  const handleFilterChange = (e) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [e.target.name]: e.target.value,
    }));
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

      <label>Price Range:</label>
      <input
        type="range"
        min="0"
        max="100"
        name="priceRange"
        onChange={handleFilterChange}
      />
    </div>
  );
};

export default Filters;
