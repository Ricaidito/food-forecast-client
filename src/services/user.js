import axios from "axios";

const url = "http://localhost:8000";

const userLogin = (email, password) => {
  return axios.post(`${url}/users/validate`, { email, password });
};

export default userLogin;
