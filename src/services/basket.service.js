import axios from "axios";

const url = "http://localhost:8000";

const getBasket = () => {
  return axios.get(`${url}/baskets/`);
};

export { getBasket };
