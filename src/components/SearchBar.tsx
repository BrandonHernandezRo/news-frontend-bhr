import React from 'react';

const SearchBar = ({ setSearchTerm }) => {
  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <input
      type="text"
      placeholder="Buscar noticias..."
      className="form-control d-inline-block me-1"
      onChange={handleChange}
      style={{ width: '150px' }} // Ajusta el ancho según sea necesario
    />
  );
};

export default SearchBar;
