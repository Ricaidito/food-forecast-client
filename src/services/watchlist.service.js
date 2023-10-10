import axios from "axios";

const url = "http://localhost:8000";

const getProductWatchlist = userID => {
  return axios.get(`${url}/user-config/config/${userID}`);
};

const addProductWatchlist = (userID, product) => {
  return axios.post(
    `${url}/user-config/config/watch-list/${userID}/${product}`
  );
};

const deleteProductWatchlist = (userID, product) => {
  return axios.delete(
    `${url}/user-config/config/watch-list/${userID}/${product}`
  );
};

export { getProductWatchlist, addProductWatchlist, deleteProductWatchlist };
