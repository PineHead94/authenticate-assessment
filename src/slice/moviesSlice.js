import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { moviesInstance } from "../axios/instances";

const initialState = {
  searchQuery: "",
  activeList: [],
  list: [],
  loading: true,
  error: false,
};

const getMovies = createAsyncThunk("getMovies", async (search) => {
  let params = new URLSearchParams();
  params.append("apikey", process.env.REACT_APP_API_KEY);
  params.append("s", search);
  let response = await moviesInstance.get(`/?${params.toString()}`);
  if (response.data.Response === "False") {
    return {
      data: [],
      listName: search,
      error: true,
    };
  }
  return { data: response.data.Search, listName: search };
});

const moviesSlice = createSlice({
  initialState,
  name: "movies",
  reducers: {
    closeError: (state, action) => {
      state.error = false;
    },
    cleanMovieStates: (state, action) => {
      state.searchQuery = "";
      state.activeList = [];
      state.list = [];
      state.loading = true;
      state.error = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getMovies.pending, (state, action) => {});
    builder.addCase(getMovies.fulfilled, (state, action) => {
      state.list = action.payload.data;
      state.searchQuery = action.payload.listName;
      state.error = action.payload.error;
    });
    builder.addCase(getMovies.rejected, (state, action) => {});
  },
});

export { moviesSlice, getMovies };
