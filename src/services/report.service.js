import axios from "axios";

const url = "https://food-forecast-server.azurewebsites.net";

const generateReport = userId => {
  return axios.get(`${url}/reports/${userId}`, {
    responseType: "blob",
  });
};

export { generateReport };
