import FoodPhoto from "../../../images/FoodImage1.png";
import { useState } from "react";
import useUserContext from "../../../Contexts/useUserContext";
import { userLogin } from "../../../services/user.service";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Spinner } from "flowbite-react";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const { login } = useUserContext();

  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = event => {
    event.preventDefault();

    if (user.email === "") {
      toast.error("Ingresa un Email", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }

    if (user.password === "") {
      toast.error("Ingresa una Contraseña", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }

    setIsLoading(true);
    userLogin(user.email, user.password)
      .then(response => {
        toast.success(`Bienvenido ${response.data.name}!!`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
          theme: "light",
        });
        login(response.data);
        sessionStorage.setItem("session", JSON.stringify(response.data));
        navigate("/admin");
      })
      .catch(error => {
        setIsLoading(false);
        toast.error("Error al iniciar sesión", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        console.log(error);
      });
  };

  const handleChange = event => {
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div className="mt-6 flex min-h-screen flex-wrap md:flex-nowrap">
      <div className="flex w-full justify-center p-10 md:w-1/2">
        <div className="m-auto max-w-md rounded-lg bg-gray-100 p-12 shadow-md">
          <h2 className="mb-2 text-3xl font-bold">Iniciar sesión</h2>
          <p className="mb-8 text-gray-600">
            Para disfrutar de todas nuestras funciones interesantes 👍
          </p>
          <form>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-900">
                Correo electrónico
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                placeholder="juanperez@gmail.com"
                required
                value={user.email}
                onChange={handleChange}
              />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-900">
                Contraseña
              </label>
              <input
                type="password"
                name="password"
                id="password"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                value={user.password}
                onChange={handleChange}
                required
                placeholder="*********"
              />
            </div>
            <div className="mb-6 grid justify-items-end">
              <a
                href="#"
                className="text-xs font-light text-neutral-600 hover:text-blue-500"
              >
                ¿Olvidó su contraseña?
              </a>
            </div>
            <button
              type="submit"
              className={`w-full rounded-lg p-3 font-medium text-white focus:outline-none focus:ring-2 focus:ring-opacity-50 ${
                isLoading
                  ? "text-white-500 cursor-not-allowed bg-gray-300"
                  : "bg-lime-600 text-white hover:bg-white hover:text-lime-600 hover:shadow-lg"
              } text-[17px] font-medium shadow transition duration-150 ease-in-out`}
              onClick={handleLogin}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Spinner
                    className="fill-green-500"
                    aria-label="Submitting..."
                  />
                  <span className="ml-2">Cargando...</span>
                </>
              ) : (
                "Iniciar sesión"
              )}
            </button>
          </form>
          <p className="mt-6 text-center text-sm text-gray-600">
            ¿No tienes una cuenta?{" "}
            <Link
              to="/register"
              className="font-medium text-lime-600 hover:text-blue-500"
            >
              ¡Registrate aqui!
            </Link>
          </p>
        </div>
      </div>
      <div className="grid h-[1003px] w-[1145px] justify-items-center rounded-[15px] bg-lime-600">
        <img
          src={FoodPhoto}
          className="mt-[12.62rem] h-[599px] w-[1028px]"
          alt="Food Photo"
        />
      </div>
    </div>
  );
};

export default Login;
