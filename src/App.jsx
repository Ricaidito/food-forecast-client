import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingNavbar from "./Components/Layouts/LandingPageNavBar/LandingNavBar";
import LandingPage from "./Components/LandingPage/LandingPage";
import Login from "./Components/LandingPage/Login/Login";
import Register from "./Components/LandingPage/Register/Register";
import AdminNavBar from "./Components/Layouts/AdminNavBar/AdminNavBar";
import ProductsCatalog from "./Components/Admin/ProductsCatalog/ProductsCatalog";
import MyProducts from "./Components/Admin/MyProducts/MyProducts";

import "./App.css";

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
          <Route index element={<ProductsCatalog />} />
          <Route path="/admin/products" element={""} />
          <Route path="/admin/myproducts" element={<MyProducts />} />
          <Route path="/admin/micuenta" element={""} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
