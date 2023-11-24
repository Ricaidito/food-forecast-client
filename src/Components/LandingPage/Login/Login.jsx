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
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
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
    <div className=" mt-6">
      <div className=" grid grid-cols-2 grid-rows-1">
        <div className=" justify-self-center pt-[5.53rem]">
          <div className=" text-start">
            <p className="text-3xl font-medium text-black">Iniciar sesión</p>
            <div className=" pt-[1.37rem]">
              <p className="w-[308px] text-base font-normal text-black">
                Si no tienes una cuenta aún...
              </p>
              <Link to="/register">
                <p className="w-[308px] text-base font-semibold text-lime-600">
                  ¡Registrate aqui!
                </p>
              </Link>
            </div>
          </div>
          <div className=" w-[429px] pt-[3.25rem]">
            <form>
              <div className="mb-6">
                <label
                  type="email"
                  className="mb-2 block text-sm font-medium text-gray-900"
                >
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
                <label
                  type="password"
                  className="mb-2 block text-sm font-medium text-gray-900"
                >
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
              <div className=" grid justify-items-end">
                <a
                  href="#"
                  className="text-xs font-light text-neutral-600 hover:text-blue-500"
                >
                  ¿Olvidó su contraseña?
                </a>
              </div>
              <button
                type="submit"
                className={`mt-[3.75rem] h-[53px] w-[429px] rounded-[32px] ${
                  isLoading
                    ? "cursor-not-allowed bg-gray-300 text-gray-500"
                    : "bg-lime-600 text-white hover:bg-white hover:text-lime-600 hover:shadow-lg"
                } text-[17px] font-medium shadow transition duration-150 ease-in-out`}
                onClick={handleLogin}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Spinner aria-label="Submitting..." />
                    <span className="ml-2">Cargando...</span>
                  </>
                ) : (
                  "Iniciar sesión"
                )}
              </button>
            </form>
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
    </div>
  );
};

export default Login;
