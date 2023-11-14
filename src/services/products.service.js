import axios from "axios";

const url = "https://food-forecast-server.azurewebsites.net";

export const getProducts = (page, selectedCategory, limit = 54) => {
  if (selectedCategory)
    return axios.get(
      `${url}/products/?limit=${limit}&page=${page}&category=${selectedCategory}`
    );
  return axios.get(`${url}/products/?limit=${limit}&page=${page}`);
};

export const getProductByIdWithPrice = productId => {
  return axios.post(`${url}/products/with-price`, {
    productIds: productId,
  });
};
