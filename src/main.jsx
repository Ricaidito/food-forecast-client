import "flowbite";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { UserProvider } from "./Contexts/UserContext.jsx";
import { ProductProvider } from "./Contexts/ProductContext.jsx";
import { UserConfigContextProvider } from "./Contexts/UserConfigContext.jsx";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const apiKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
const stripePromise = loadStripe(apiKey);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Elements stripe={stripePromise}>
      <UserProvider>
        <ProductProvider>
          <UserConfigContextProvider>
            <App />
          </UserConfigContextProvider>
        </ProductProvider>
      </UserProvider>
    </Elements>
  </React.StrictMode>
);
