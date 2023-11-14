import axios from "axios";

const url = "https://food-forecast-server.azurewebsites.net";

const getBasket = () => {
  return axios.get(`${url}/baskets`);
};

const getBasketInfo = () => {
  return axios.get(`${url}/baskets/info`);
};

export { getBasket, getBasketInfo };
