import axios from "axios";

const url = "http://localhost:8000";

const userLogin = (email, password) => {
  return axios.post(`${url}/users/login`, { email, password });
};

const getUserImage = id => {
  return axios.get(`${url}/users/profile-pic/${id}`);
};

export { userLogin, getUserImage };
