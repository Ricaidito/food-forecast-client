import "./AdminNavBar.css";
import logo from "../../../images/LogoFoodForecast.png";
import { Link, Outlet } from "react-router-dom";
import useUserContext from "../../../Contexts/useUserContext";
import { getUserImage } from "../../../services/user.service";
import { useState, useEffect } from "react";

const AdminNavBar = () => {
  const { userID } = useUserContext();
  const [userImage, setUserImage] = useState();

  useEffect(() => {
    getUserImage(userID).then((response) => {
      setUserImage(response.data);
    });
  }, [userID]);

  return (
    <div>
      <nav className="bg-white w-full border-b border-gray-200">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link to="/admin" className="flex items-center">
            <img src={logo} className="h-8 mr-3" alt="Flowbite Logo" />
          </Link>
          <div className="flex md:order-2">
            <img
              src={`data:image/jpeg;base64,${userImage}`}
              className="w-10 h-10 rounded-full"
              alt="Flowbite Logo"
            />
          </div>
          <div
            className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
            id="navbar-sticky"
          >
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white">
              <li>
                <Link
                  to="/admin"
                  className="block py-2 pl-3 pr-4 text-neutral-800 bg-blue-700 rounded bg-transparent hover:text-green-700 p-0"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/products"
                  className="block py-2 pl-3 pr-4 text-neutral-800 bg-blue-700 rounded bg-transparent hover:text-green-700 p-0"
                >
                  Catalogo
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/myproducts"
                  className="block py-2 pl-3 pr-4 text-neutral-800 bg-blue-700 rounded bg-transparent hover:text-green-700 p-0"
                >
                  Mis Productos
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/micuenta"
                  className="block py-2 pl-3 pr-4 text-neutral-800 bg-blue-700 rounded bg-transparent hover:text-green-700 p-0"
                >
                  Mi Cuenta
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <Outlet />
    </div>
  );
};

export default AdminNavBar;
