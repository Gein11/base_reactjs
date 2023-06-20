import axios from "axios";
import { store } from "../redux/store";

const instance = axios.create({
  baseURL: "http://localhost:8081/",
});

instance.interceptors.request.use(
  function (config) {
    // Do something before request is sent

    const token = store?.getState()?.user?.account?.access_token;
    // config.headers["Authorization"] = `Bearer ${token}`;
    config.headers = {
      // "Content-Type": 'multipart/form-data',
      "Authorization": `Bearer ${token}`
    };
    return config;
  },
  function (error) {

    return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response && response.data ? response.data : response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return error && error.response && error.response.data
      ? error.response.data
      : Promise.reject(error);
  }
);

export default instance;
