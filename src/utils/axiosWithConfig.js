import axios from "axios";

export const axiosWithConfig = () => {
  return axios.create({
    baseURL: "https://posts-comments-backend.herokuapp.com/"
  });
};
