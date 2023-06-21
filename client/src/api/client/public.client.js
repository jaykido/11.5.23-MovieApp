import axios from "axios";
import queryString from "query-string";

const baseURL = "https://11-5-23-movie-app-api.vercel.app/api/v1/";

const publicClient = axios.create({
  baseURL,
  paramsSerializer: {
    encode: (param) => queryString.stringify(param),
  },
});

publicClient.interceptors.request.use(async (config) => {
  console.log("returning success PublicClient");
  return {
    ...config,
    headers: {
      "Content-Type": "application/json",
    },
  };
});

publicClient.interceptors.response.use(
  (response) => {
    if (response && response.data) return response.data;
    return response;
  },
  (err) => {
    console.log("Returning an error PublicClient");
    throw err.response.data;
  }
);

export default publicClient;
