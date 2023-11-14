import axios from "axios";

const url = "https://food-forecast-server.azurewebsites.net";

const userLogin = (email, password) => {
  return axios.post(`${url}/users/login`, { email, password });
};

const getUserImage = id => {
  return axios.get(`${url}/users/profile-pic/${id}`);
};

const createUser = userData => {
  return axios.post(`${url}/users`, userData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const upddateUser = (id, updatedName, updatedLastName) => {
  return axios.put(`${url}/users/update/${id}`, {
    name: updatedName,
    lastName: updatedLastName,
  });
};

const updateUserImage = (id, image) => {
  return axios.put(`${url}/users/update-profile-pic/${id}`, image, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export { userLogin, getUserImage, createUser, upddateUser, updateUserImage };
