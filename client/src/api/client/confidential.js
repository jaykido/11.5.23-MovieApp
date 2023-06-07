import axios from "axios";
import queryString from "query-string";

const baseURL = "https://api.themoviedb.org/3/";

const options = {
  method: "GET",
  url: "https://api.themoviedb.org/3/account/19756363",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzN2NhYzM1YzJlZDRkMjhkY2U5NWJhOTYxYmM1ZjU1MSIsInN1YiI6IjY0Nzc5NWRhMGUyOWEyMDBmOTdmZWNhMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3cpP0zImlkw4O8-KHMgJFEeZ1z8hCJAAzKTMhsHPq1k",
  },
};

const publicClient = axios.create({
  baseURL,
  paramsSerializer: queryString.stringify,
});

publicClient.interceptors.request.use(async (config) => {
  console.log("returning success PublicClient");
  return {
    ...config,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
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

const privateClient = axios.create({
  baseURL,
  paramsSerializer: queryString.stringify,
});

privateClient.interceptors.request.use(async (config) => {
  console.log("returning success PrivateClient");
  return {
    ...config,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  };
});

privateClient.interceptors.response.use(
  (response) => {
    if (response && response.data) return response.data;
    return response;
  },
  (err) => {
    console.log("Returning an error PrivateClient");
    throw err.response.data;
  }
);

export default { publicClient, privateClient };
