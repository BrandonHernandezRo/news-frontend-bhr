import React, { useEffect, useState } from "react";

const CategoryFilter = ({ categories, setSelectedCategory }) => {
    const [categorySelected, setCategorySelected] = useState(null)
const handleClick = (value) => {
    setSelectedCategory(value)
    setCategorySelected(value.charAt(0).toUpperCase() + value.slice(1))
}

  return (
    <div className="d-flex justify-content-end align-items-center mb-3">
      <h6 className="mr-3 me-3 mt-2">{!categorySelected? 'Filtrar por categoría' : `Filtrado por : ${categorySelected}`}</h6>
      <div className="dropdown" >
        <button
          className="btn btn-small btn-primary dropdown-toggle btn-sm"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <i className="bi bi-funnel"></i>
        </button>
        <ul className="dropdown-menu">
        {categories.map((category) => (
          <button className="dropdown-item" type="button" key={category} onClick={()=>handleClick(category)}>
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
        </ul>
      </div>
    </div>
  );
};

export default CategoryFilter;
