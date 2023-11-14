import axios from "axios";

const url = "https://food-forecast-server.azurewebsites.net";

const getProductWatchlist = userID => {
  return axios.get(`${url}/user-config/config/${userID}`);
};

const addProductWatchlist = (userID, product) => {
  return axios.post(
    `${url}/user-config/config/watch-list/${userID}/${product}`
  );
};

const getProductsInfo = products => {
  return axios.post(`${url}/user-config/config/watch-list/info`, {
    productsIds: products,
  });
};

const deleteProductWatchlist = (userID, product) => {
  return axios.delete(
    `${url}/user-config/config/watch-list/${userID}/${product}`
  );
};

export {
  getProductWatchlist,
  addProductWatchlist,
  deleteProductWatchlist,
  getProductsInfo,
};
