import axios from "axios";

export const axiosWithConfig = () => {
  return axios.create({
    baseURL: "http://localhost:8000"
  });
};
