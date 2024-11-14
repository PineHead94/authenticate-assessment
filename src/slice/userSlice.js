import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  error: false,
  auth: false,
  savedList: [],
};

const signIn = createAsyncThunk("signIn", async (payload) => {
  const users = localStorage.getItem("users");
  const data = JSON.parse(users);
  for (let i = 0; i < data.length; i + 1) {
    if (data[i].email === payload.email) {
      if (data[i].password === payload.password) {
        let response = {
          auth: true,
          error: false,
          user: data[i],
        };
        return response;
      } else {
        const response = {
          auth: false,
          error: true,
          user: undefined,
        };
        return response;
      }
    }
    i++;
  }
  return {
    auth: false,
    error: true,
    user: undefined,
  };
});

const signUp = createAsyncThunk("singUp", (payload) => {
  if (payload.email && payload.password) {
    const users = localStorage.getItem("users");
    let data = JSON.parse(users);
    let user = { id: data.length + 1, ...payload, data: [] };
    data.push(user);
    localStorage.setItem("users", JSON.stringify(data));
    return {
      auth: true,
      error: false,
    };
  } else {
    return {
      auth: false,
      error: true,
    };
  }
});

const saveMovie = createAsyncThunk("saveMovie", async (movie) => {
  console.log("save movie function");
  let currentUser = JSON.parse(
    localStorage.getItem("currentUser", currentUser)
  );
  let users = JSON.parse(localStorage.getItem("users", users));
  users.forEach((user) => {
    if (user.id === currentUser.id) {
      if (user.data.length === 0) {
        user.data.push({
          listName: movie.search,
          movies: [movie.data],
        });
      } else {
        let pointer = false;
        user.data.forEach((listElement, i) => {
          if (listElement.listName === movie.search) {
            listElement.movies.push(movie.data);
            return;
          }
          if (i + 1 === user.data.length) {
            pointer = true;
          }
        });
        if (pointer) {
          user.data.push({
            listName: movie.search,
            movies: [movie.data],
          });
          pointer = false;
        }
      }

      localStorage.setItem("currentUser", JSON.stringify(user));
    }
  });
  localStorage.setItem("users", JSON.stringify(users));
});

const removeSaved = createAsyncThunk("removeSaved", (data) => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const users = JSON.parse(localStorage.getItem("users"));

  const currentUserFilter = currentUser.data.filter((element) => {
    if (element.listName !== data.listName) {
      return element;
    }
  });
  currentUser.data = currentUserFilter;
  localStorage.setItem("currentUser", JSON.stringify(currentUser));

  let tmp = [];
  users.forEach((user) => {
    if (user.email === currentUser.email) {
      const userFilter = user.data.filter((element) => {
        if (element.listName !== data.listName) {
          return element;
        }
      });
      tmp.push({
        id: user.id,
        email: user.email,
        password: user.password,
        data: userFilter,
      });
    } else {
      tmp.push(user);
    }
  });
  localStorage.setItem("users", JSON.stringify(tmp));
  return currentUserFilter;
});

const userSlice = createSlice({
  initialState,
  name: "user",
  reducers: {
    logOut: (state, action) => {
      state.auth = false;
      state.error = false;
      localStorage.removeItem("currentUser");
    },
    closeErrorModal: (state, action) => {
      state.auth = false;
      state.error = false;
    },
    cleanSignIn: (state, action) => {
      state.error = false;
      state.auth = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signIn.fulfilled, (state, action) => {
      state.auth = action.payload.auth;
      state.error = action.payload.error;
      if (action.payload.user) {
        localStorage.setItem(
          "currentUser",
          JSON.stringify(action.payload.user)
        );
        state.savedList = action.payload.user.data;
        // console.log(action.payload.user.data);
      }
    });
    builder.addCase(signUp.fulfilled, (state, action) => {
      state.auth = action.payload.auth;
      state.error = action.payload.error;
    });
    builder.addCase(saveMovie.fulfilled, (state, action) => {
      let data = localStorage.getItem("currentUser");
      state.savedList = JSON.parse(data).data;
    });
    builder.addCase(removeSaved.fulfilled, (state, action) => {
      state.savedList = action.payload;
    });
  },
});

export { userSlice, signIn, signUp, saveMovie, removeSaved };
