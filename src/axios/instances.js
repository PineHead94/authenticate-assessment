import axios from "axios";

const moviesInstance = axios.create({
  baseURL: "https://www.omdbapi.com",
  headers: { "Content-Type": "application/x-www-form-urlencoded" },
});

export { moviesInstance };
