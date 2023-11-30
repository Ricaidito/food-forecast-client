import axios from "axios";

const url = "https://food-forecast-server.azurewebsites.net";

export const getProducts = (
  page,
  selectedCategory,
  selectedOrigin,
  limit = 54
) => {
  if (selectedCategory && selectedOrigin)
    return axios.get(
      `${url}/products/?limit=${limit}&page=${page}&category=${selectedCategory}&origin=${selectedOrigin}`
    );
  if (selectedCategory)
    return axios.get(
      `${url}/products/?limit=${limit}&page=${page}&category=${selectedCategory}`
    );
  if (selectedOrigin)
    return axios.get(
      `${url}/products/?limit=${limit}&page=${page}&origin=${selectedOrigin}`
    );

  return axios.get(`${url}/products/?limit=${limit}&page=${page}`);
};

export const getProductsByIdWithPrice = productId => {
  return axios.post(
    `${url}/products/with-price`,
    {
      productIds: productId,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};
