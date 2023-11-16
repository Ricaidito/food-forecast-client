import "./LandingNavBar.css";
import logo from "../../../images/LogoFoodForecast.png";
import { Link, Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";

const LandingNavbar = () => {
  const location = useLocation();

  const handleClick = id => {
    const element = document.getElementById(id);
    element.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      <nav className="w-full border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4">
          <Link to="/" className="flex items-center">
            <img src={logo} className="mr-3 h-8" alt="Flowbite Logo" />
          </Link>
          <div className="flex md:order-2">
            <Link to="/login">
              <button
                type="button"
                className="mr-3 rounded-lg border border-green-700 bg-white px-4 py-2 text-center text-sm font-medium text-green-700 hover:bg-green-700 hover:text-white focus:outline-none focus:ring-4 focus:ring-blue-300 md:mr-0"
              >
                Iniciar sesión
              </button>
            </Link>
            <Link to="/register">
              <button
                type="button"
                className="ml-3 mr-3 rounded-lg border border-green-700 bg-white px-4 py-2 text-center text-sm font-medium text-green-700 hover:bg-green-700 hover:text-white focus:outline-none focus:ring-4 focus:ring-blue-300 md:mr-0"
              >
                Registrarse
              </button>
            </Link>
          </div>
          <div
            className="hidden w-full items-center justify-between md:order-1 md:flex md:w-auto"
            id="navbar-sticky"
          >
            {location.pathname === "/" && (
              <ul className="mt-4 flex flex-col rounded-lg border border-gray-100 bg-gray-50 p-4 font-medium md:mt-0 md:flex-row md:space-x-8 md:border-0 md:bg-white md:p-0">
                <li>
                  <Link
                    to="/#home"
                    onClick={() => handleClick("home")}
                    className="block rounded bg-blue-700 bg-transparent p-0 py-2 pl-3 pr-4 text-neutral-800 hover:text-green-700"
                  >
                    Inicio
                  </Link>
                </li>
                <li>
                  <Link
                    to="/#about-us"
                    onClick={() => handleClick("about-us")}
                    className="block rounded bg-blue-700 bg-transparent p-0 py-2 pl-3 pr-4 text-neutral-800 hover:text-green-700"
                  >
                    Sobre nosotros
                  </Link>
                </li>
                <li>
                  <Link
                    to="/#subscription"
                    onClick={() => handleClick("subscription")}
                    className="block rounded bg-blue-700 bg-transparent p-0 py-2 pl-3 pr-4 text-neutral-800 hover:text-green-700"
                  >
                    Planes y precios
                  </Link>
                </li>
                <li>
                  <Link
                    to="/#faq"
                    onClick={() => handleClick("faq")}
                    className="block rounded bg-blue-700 bg-transparent p-0 py-2 pl-3 pr-4 text-neutral-800 hover:text-green-700"
                  >
                    Preguntas frecuentes
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
