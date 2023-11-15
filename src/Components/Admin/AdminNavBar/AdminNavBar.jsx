import logo from "../../../images/LogoFoodForecast.png";
import { Link, Outlet } from "react-router-dom";
import { Dropdown } from "flowbite-react";
import useUserContext from "../../../Contexts/useUserContext";
import { getUserImage } from "../../../services/user.service";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./AdminNavBar.css";

const AdminNavBar = () => {
  const { userID, name, lastName, email, logout } = useUserContext();
  const [userImage, setUserImage] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    getUserImage(userID).then(response => {
      setUserImage(response.data);
    });
  }, [userID]);

  const handleLogout = () => {
    logout();
    sessionStorage.removeItem("session");
    navigate("/");
  };

  return (
    <div>
      <nav className="w-full border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4">
          <Link to="/admin" className="flex items-center">
            <img src={logo} className="mr-3 h-8" alt="Flowbite Logo" />
          </Link>
          <div className="flex md:order-2">
            <Dropdown
              inline
              placement="bottom"
              arrowIcon={false}
              label={
                <img
                  src={`data:image/jpeg;base64,${userImage}`}
                  className="h-10 w-10 rounded-full"
                  alt="User Image"
                />
              }
            >
              <Dropdown.Header>
                <span className="block text-sm">
                  {name} {lastName}
                </span>
                <span className="block truncate text-sm font-medium">
                  {email}
                </span>
              </Dropdown.Header>
              <Link to="/admin/micuenta">
                <Dropdown.Item>Configuración</Dropdown.Item>
              </Link>
              <Dropdown.Divider />
              <Dropdown.Item onClick={() => handleLogout()}>
                Cerrar sesión
              </Dropdown.Item>
            </Dropdown>
          </div>

          <div
            className="hidden w-full items-center justify-between md:order-1 md:flex md:w-auto"
            id="navbar-sticky"
          >
            <ul className="mt-4 flex flex-col rounded-lg border border-gray-100 bg-gray-50 p-4 font-medium md:mt-0 md:flex-row md:space-x-8 md:border-0 md:bg-white md:p-0">
              <li>
                <Link
                  to="/admin"
                  className="block rounded bg-transparent p-0 py-2 pl-3 pr-4 text-neutral-800 hover:text-green-700"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/products"
                  className="block rounded bg-transparent p-0 py-2 pl-3 pr-4 text-neutral-800 hover:text-green-700"
                >
                  Catalogo
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/basket"
                  className="block rounded bg-transparent p-0 py-2 pl-3 pr-4 text-neutral-800 hover:text-green-700"
                >
                  Canasta Basica
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/myproducts"
                  className="block rounded bg-transparent p-0 py-2 pl-3 pr-4 text-neutral-800 hover:text-green-700"
                >
                  Mis Productos
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
