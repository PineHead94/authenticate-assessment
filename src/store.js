import { configureStore } from "@reduxjs/toolkit";
import { moviesSlice } from "./slice/moviesSlice";
import { userSlice } from "./slice/userSlice";

const store = configureStore({
  reducer: {
    movies: moviesSlice.reducer,
    user: userSlice.reducer,
  },
});

export { store };
