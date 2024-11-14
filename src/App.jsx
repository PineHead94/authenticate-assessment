import React, { useEffect } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { NavLayout } from "./components/layouts/NavLayout/NavLayout";
import { SignIn } from "./components/screens/Signin/SignIn";
import { WatchLists } from "./components/screens/WatchList/WatchList";
import { Provider } from "react-redux";
import { store } from "./store";
import { SignUp } from "./components/screens/Signin/SignUp";
import { SavedList } from "./components/layouts/SavedList/SavedList";
import "./App.css";
import { Welcome } from "./components/layouts/Welcome/Welcome";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<SignIn />} />
      <Route path="signup" element={<SignUp />} />
      <Route path="welcome" element={<Welcome />} />
      <Route element={<NavLayout />}>
        <Route path="home" element={<WatchLists />} />
        <Route path="lists/:listName" element={<SavedList />} />
      </Route>
    </Route>
  ),
  {
    future: {
      v7_normalizeFormMethod: true,
      v7_fetcherPersist: true,
      v7_partialHydration: true,
      v7_relativeSplatPath: true,
      v7_skipActionErrorRevalidation: true,
    },
  }
);

const App = () => {
  useEffect(() => {
    localStorage.setItem(
      "users",
      JSON.stringify([
        {
          id: 1,
          email: "udhav@test.com",
          password: "pass123",
          data: [],
        },
        {
          id: 2,
          email: "udhav2@test.com",
          password: "pass123",
          data: [],
        },
        {
          id: 3,
          email: "123",
          password: "1",
          data: [],
        },
      ])
    );
  }, []);

  return (
    <div className="app-main-container">
      <Provider store={store}>
        <RouterProvider router={router} future={{ v7_startTransition: true }} />
      </Provider>
    </div>
  );
};

export { App };
