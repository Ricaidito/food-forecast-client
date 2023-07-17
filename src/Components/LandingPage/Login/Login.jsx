import "./Login.css";
import FoodPhoto from "../../../images/FoodImage1.png";
import GoogleLogo from "../../../images/GoogleLogo.png";
import { useState } from "react";
import useUserContext from "../../../Contexts/useUserContext";
import userLogin from "../../../services/user";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const { userID, name, lastName, email, isLogged, login, logout } =
    useUserContext();

  console.log(isLogged);
  console.log(user);

  const handleLogin = (event) => {
    event.preventDefault();
    userLogin(user.email, user.password)
      .then((response) => {
        console.log(response.data);
        login(response.data);
        navigate("/admin");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleChange = (event) => {
    console.log(event.target.name);
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
            <p className="text-black text-3xl font-medium">Iniciar Sesion</p>
            <div className=" pt-[1.37rem]">
              <p className="w-[308px] text-black text-base font-normal">
                Si no tienes una cuenta aun
              </p>
              <a
                href="#"
                className="w-[308px] text-lime-600 text-base font-semibold"
              >
                ¡Registrate aqui!
              </a>
            </div>
          </div>
          <div className=" w-[429px] pt-[3.25rem]">
            <form>
              <div className="mb-6">
                <label
                  type="email"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="name@flowbite.com"
                  required
                  value={user.email}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-6">
                <label
                  type="password"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Your password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  value={user.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className=" grid justify-items-end">
                <a href="#" className="text-neutral-600 text-xs font-light">
                  ¿Olvido su contraseña?
                </a>
              </div>
              <button
                type="submit"
                className="w-[429px] h-[53px] bg-lime-600 rounded-[32px] shadow text-white text-[17px] font-medium mt-[3.75rem] hover:bg-white hover:text-lime-600 hover:shadow-lg"
                onClick={(event) => handleLogin(event)}
              >
                Login
              </button>

              <p className="text-zinc-400 text-base font-medium text-center pt-[3.25rem]">
                o continua con
              </p>
              <div className=" grid justify-items-center pt-[1.13rem]">
                <a href="#">
                  <img src={GoogleLogo} alt="GoogleImage" />
                </a>
              </div>
            </form>
          </div>
        </div>
        <div className="w-[1145px] h-[1003px] bg-lime-600 rounded-[15px] grid justify-items-center">
          <img
            src={FoodPhoto}
            className="w-[1028px] h-[599px] mt-[12.62rem]"
            alt="Food Photo"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
