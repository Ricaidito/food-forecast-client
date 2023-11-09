import React, { useState } from "react";
import CATEGORIES from "../../categories/productCategories";

const CategoryFilter = ({ switchCategory }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleChange = event => {
    setSelectedCategory(event.target.value);
    switchCategory(event.target.value);
  };

  return (
    <div className="inline-flex w-2/4 rounded-md shadow-sm" role="group">
      <select
        id="categories"
        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
        value={selectedCategory}
        onChange={handleChange}
      >
        <option value="" selected>
          Todas las Categorías
        </option>
        {CATEGORIES.map(({ categoryValue, text }) => (
          <option key={categoryValue} value={categoryValue}>
            {text}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategoryFilter;
