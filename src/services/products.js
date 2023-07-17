import axios from "axios";

const url = "http://localhost:8000";

const getProducts = (page, limit = 12) => {
  return axios.get(`${url}/products/?limit=${limit}&page=${page}`);
};

export default getProducts;
