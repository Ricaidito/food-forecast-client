import axios from "axios";

const url = "http://localhost:8000";

export const getProducts = (page, limit = 12) => {
  return axios.get(`${url}/products/?limit=${limit}&page=${page}`);
};

export const getProductByIdWithPrice = productId => {
  return axios.get(`${url}/products/with-price/${productId}`);
};
