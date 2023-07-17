import { BrowserRouter, Route, Routes } from "react-router-dom";
import ReactDOM from "react-dom";

import "./App.css";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={""} />
        <Route index element={""} />
        <Route path="/login" element={""} />
        <Route path="/register" element={""} />
        <Route path="/products" element={""} />
        <Route path="/myproducts" element={""} />
      </Routes>
    </BrowserRouter>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
