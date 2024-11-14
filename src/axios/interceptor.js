import { moviesInstance } from "./instances";

moviesInstance.interceptors.request.use(
  (config) => config,
  (err) => Promise.reject(err)
);

moviesInstance.interceptors.response.use(
  (response) => response,
  (err) => Promise.reject(err)
);
