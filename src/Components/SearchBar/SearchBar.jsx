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
    <div className="search-bar">
      <input type="text" placeholder="Search" onChange={handleChange} />
      {products.length > 0 && (
        <ul className="dropdown-menu">
          {products.map(product => (
            <li key={product._id} className="dropdown-item">
              <img src={product.imageUrl} alt={product.productName} />
              <Link to={`/admin/product/${product._id}`}>
                {product.productName}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
