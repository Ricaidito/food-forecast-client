import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { debounce } from "lodash";
import "./SearchBar.css";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (searchTerm) {
      fetchProducts(searchTerm);
    }
  }, [searchTerm]);

  const fetchProducts = debounce(async searchTerm => {
    try {
      const response = await axios.get(
        `http://localhost:8000/products/search/${searchTerm}`
      );
      setProducts(response.data);
    } catch (err) {
      console.error(err);
    }
  }, 500);

  const handleChange = e => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="search-bar w-96">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        <svg
          className="h-4 w-4 text-gray-500 dark:text-gray-400"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 20 20"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
          />
        </svg>
      </div>
      <input
        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-4 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
        type="text"
        placeholder="Buscar..."
        onChange={handleChange}
      />
      {products.length > 0 && searchTerm && (
        <ul className="dropdown-menu rounded-lg border border-gray-300">
          {products.slice(0, 6).map(product => (
            <Link to={`/admin/product/${product._id}`}>
              <li key={product._id} className="dropdown-item hover:bg-gray-400">
                <img src={product.imageUrl} alt={product.productName} />
                {product.productName}
              </li>
            </Link>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
