import axios from "axios";

const url = "https://food-forecast-server.azurewebsites.net";

const addProduct = (userID, product) => {
  return axios.post(`${url}/user-products/${userID}/products`, product, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const getUserProducts = userID => {
  return axios.get(`${url}/user-products/${userID}/products`);
};

const getUserProductById = (userID, productId) => {
  return axios.get(`${url}/user-products/${userID}/products/${productId}`);
};

const deleteAllProducts = userID => {
  return axios.delete(`${url}/user-products/${userID}/products`);
};

const deleteProduct = (userID, productID) => {
  return axios.delete(`${url}/user-products/${userID}/products/${productID}`);
};

const getDownloadURLForTemplate = () => {
  return `${url}/user-products/download-template`;
};

const uploadUserProductsTemplate = (userID, file) => {
  return axios.post(
    `${url}/user-products/${userID}/products/file`,
    { productsFile: file },
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
};

const getUserProductsWithPriceHistory = (userID, productsIds) => {
  return axios.post(
    `${url}/user-products/${userID}/products/by-ids2`,
    {
      userProductsIds: productsIds,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

const updateUserProductsPrice = (userID, productID, price, date) => {
  return axios.put(
    `${url}/user-products/${userID}/products/${productID}/price`,
    { price: price, date: date },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

export {
  addProduct,
  getUserProducts,
  deleteAllProducts,
  deleteProduct,
  getDownloadURLForTemplate,
  uploadUserProductsTemplate,
  updateUserProductsPrice,
  getUserProductById,
  getUserProductsWithPriceHistory,
};
