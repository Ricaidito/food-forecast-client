import * as React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "./Components/LandingPage/LandingPage";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import ProductsCatalog from "./Components/ProductsCatalog/ProductsCatalog";
import "./App.css";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LandingPage />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/products-catalog",
      element: <ProductsCatalog />,
    },
  ]);

  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
};

export default App;
