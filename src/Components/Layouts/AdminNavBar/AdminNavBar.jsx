import "./AdminNavBar.css";
import logo from "../../../images/LogoFoodForecast.png";
import { Link, Outlet } from "react-router-dom";
import { Dropdown } from "flowbite-react";
import useUserContext from "../../../Contexts/useUserContext";
import { getUserImage } from "../../../services/user.service";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const AdminNavBar = () => {
  const { userID, name, lastName, email, logout } = useUserContext();
  const [userImage, setUserImage] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    getUserImage(userID).then((response) => {
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
      <nav className="bg-white w-full border-b border-gray-200">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link to="/admin" className="flex items-center">
            <img src={logo} className="h-8 mr-3" alt="Flowbite Logo" />
          </Link>
          <div className="flex md:order-2">
            <Dropdown
              inline
              placement="bottom"
              arrowIcon={false}
              label={
                <img
                  src={`data:image/jpeg;base64,${userImage}`}
                  className="w-10 h-10 rounded-full"
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
                <Dropdown.Item>Settings</Dropdown.Item>
              </Link>
              <Dropdown.Divider />
              <Dropdown.Item onClick={() => handleLogout()}>
                Sign out
              </Dropdown.Item>
            </Dropdown>
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
            </ul>
          </div>
        </div>
      </nav>

      <Outlet />
    </div>
  );
};

export default AdminNavBar;
