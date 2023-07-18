import axios from "axios";

const url = "http://localhost:8000";

const addProduct = (userID, product) => {
  return axios.post(`${url}/user-products/${userID}/products`, product, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const getUserProducts = (userID) => {
  return axios.get(`${url}/user-products/${userID}/products`);
};

const deleteAllProducts = (userID) => {
  return axios.delete(`${url}/user-products/${userID}/products`);
};

const deleteProduct = (userID, productID) => {
  return axios.delete(`${url}/user-products/${userID}/products/${productID}`);
};

export { addProduct, getUserProducts, deleteAllProducts, deleteProduct };
