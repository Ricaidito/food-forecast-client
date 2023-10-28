import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingNavbar from "./Components/Layouts/LandingPageNavBar/LandingNavBar";
import LandingPage from "./Components/LandingPage/LandingPage";
import Login from "./Components/LandingPage/Login/Login";
import Register from "./Components/LandingPage/Register/Register";
import AdminNavBar from "./Components/Layouts/AdminNavBar/AdminNavBar";
import ProductsCatalog from "./Components/Admin/ProductsCatalog/ProductsCatalog";
import MyProducts from "./Components/Admin/MyProducts/MyProducts";
import Settings from "./Components/Admin/Settings/Settings";
import Dashboard from "./Components/Admin/Dashboard/Dashboard";
import Basket from "./Components/Admin/Basket/Basket";
import Product from "./Components/Admin/Product/Product";
import CheckoutForm from "./Components/Admin/Payments/CheckoutForm";
import "./App.css";
import MyProductInfo from "./Components/Admin/MyProducts/MyProductInfo/MyProductInfo";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingNavbar />}>
          <Route index element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
        <Route path="/admin" element={<AdminNavBar />}>
          <Route index element={<Dashboard />} />
          <Route path="/admin/products" element={<ProductsCatalog />} />
          <Route path="/admin/product/:productId" element={<Product />} />
          <Route path="/admin/myproducts" element={<MyProducts />} />
          <Route
            path="/admin/myproducts/:productId"
            element={<MyProductInfo />}
          />
          <Route path="/admin/micuenta" element={<Settings />} />
          <Route path="/admin/basket" element={<Basket />} />
          <Route path="/admin/subscriptions" element={<CheckoutForm />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
