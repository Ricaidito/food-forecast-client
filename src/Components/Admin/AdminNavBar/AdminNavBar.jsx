import logo from "../../../images/LogoFoodForecast.png";
import logoP from "../../../images/LogoFoodForecastP.png";
import { Link, Outlet } from "react-router-dom";
import { Dropdown } from "flowbite-react";
import useUserContext from "../../../Contexts/useUserContext";
import { getUserImage } from "../../../services/user.service";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { userUserConfigContext } from "../../../Contexts/UserConfigContext";
import Modal from "../../Layouts/Modal/Modal";
import "./AdminNavBar.css";

const AdminNavBar = () => {
  const { userID, name, lastName, email, logout } = useUserContext();
  const { hasSubscription, removeUserConfig } = userUserConfigContext();
  const [userImage, setUserImage] = useState();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const premiumFeatures = [
    "Todas las características de la versión gratuita",
    "+ Acceso a reportes avanzados y análisis detallados",
    "+ Notificaciones personalizadas de cambios de precios",
    "+ Soporte prioritario al cliente",
  ];

  useEffect(() => {
    getUserImage(userID).then(response => {
      setUserImage(response.data);
    });
  }, [userID]);

  const handleLogout = () => {
    removeUserConfig();
    logout();
    sessionStorage.removeItem("session");
    navigate("/");
  };

  const handleSubscriptionClick = () => {
    setShowModal(false);
    navigate("/admin/subscriptions");
  };

  return (
    <div>
      <nav className="w-full border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4">
          <Link to="/admin" className="flex items-center">
            {hasSubscription ? (
              <img src={logoP} className="mr-3 h-8" alt="Logo Premium" />
            ) : (
              <img src={logo} className="mr-3 h-8" alt="Logo" />
            )}
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
              {!hasSubscription && (
                <>
                  <li
                    className="block rounded bg-lime-600 p-0 py-2 pl-3 pr-4 font-bold text-white hover:bg-green-700"
                    onClick={() => setShowModal(true)}
                  >
                    Premium 👑
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        classProps="z-10 m-auto max-w-md rounded-lg bg-white p-4"
      >
        <h2 className="m-3 text-2xl font-bold">
          ¡Hazte Premium y disfruta de todos los beneficios!
        </h2>
        <ul className="mb-6">
          {premiumFeatures.map((feature, i) => (
            <li key={i} className="mb-4 text-base text-gray-700">
              {feature}
            </li>
          ))}
        </ul>
        <button
          className="mt-[3.75rem] h-[53px] w-[412px] rounded-[32px] bg-lime-600 text-[17px] font-medium text-white shadow hover:bg-green-700 hover:shadow-lg"
          onClick={handleSubscriptionClick}
        >
          Suscribirse
        </button>
      </Modal>
      <Outlet />
    </div>
  );
};

export default AdminNavBar;
