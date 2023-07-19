import "./LandingNavBar.css";
import logo from "../../../images/LogoFoodForecast.png";
import { Link, Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";

const LandingNavbar = () => {
  const location = useLocation();

  const handleClick = (id) => {
    const element = document.getElementById(id);
    element.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      <nav className="bg-white w-full border-b border-gray-200">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link to="/" className="flex items-center">
            <img src={logo} className="h-8 mr-3" alt="Flowbite Logo" />
          </Link>
          <div className="flex md:order-2">
            <Link to="/login">
              <button
                type="button"
                className="text-green-700 bg-white border border-green-700 hover:text-white hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0"
              >
                Iniciar sesión
              </button>
            </Link>
            <Link to="/register">
              <button
                type="button"
                className="text-green-700 bg-white border border-green-700 hover:text-white hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center ml-3 mr-3 md:mr-0"
              >
                Registrarse
              </button>
            </Link>
          </div>
          <div
            className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
            id="navbar-sticky"
          >
            {location.pathname === "/" && (
              <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white">
                <li>
                  <Link
                    to="/#home"
                    onClick={() => handleClick("home")}
                    className="block py-2 pl-3 pr-4 text-neutral-800 bg-blue-700 rounded bg-transparent hover:text-green-700 p-0"
                  >
                    Inicio
                  </Link>
                </li>
                <li>
                  <Link
                    to="/#about-us"
                    onClick={() => handleClick("about-us")}
                    className="block py-2 pl-3 pr-4 text-neutral-800 bg-blue-700 rounded bg-transparent hover:text-green-700 p-0"
                  >
                    Sobre Nosotros
                  </Link>
                </li>
                <li>
                  <Link
                    to="/#subscription"
                    onClick={() => handleClick("subscription")}
                    className="block py-2 pl-3 pr-4 text-neutral-800 bg-blue-700 rounded bg-transparent hover:text-green-700 p-0"
                  >
                    Subscripcion
                  </Link>
                </li>
                <li>
                  <Link
                    to="/#faq"
                    onClick={() => handleClick("faq")}
                    className="block py-2 pl-3 pr-4 text-neutral-800 bg-blue-700 rounded bg-transparent hover:text-green-700 p-0"
                  >
                    FAQ
                  </Link>
                </li>
              </ul>
            )}
          </div>
        </div>
      </nav>

      <Outlet />
    </div>
  );
};

export default LandingNavbar;