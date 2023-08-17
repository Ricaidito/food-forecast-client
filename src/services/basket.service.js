import axios from "axios";

const url = "http://localhost:8000";

const getBasket = () => {
  return axios.get(`${url}/baskets`);
};

const getBasketInfo = () => {
  return axios.get(`${url}/baskets/info`);
};

export { getBasket, getBasketInfo };
