import "./Login.css";
import FoodPhoto from "../../../images/FoodImage1.png";
import GoogleLogo from "../../../images/GoogleLogo.png";
import { useState } from "react";
import useUserContext from "../../../Contexts/useUserContext";
import { userLogin } from "../../../services/user.service";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const { login } = useUserContext();

  const handleLogin = event => {
    event.preventDefault();
    userLogin(user.email, user.password)
      .then(response => {
        login(response.data);
        sessionStorage.setItem("session", JSON.stringify(response.data));
        navigate("/admin");
      })
      .catch(error => {
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
            <p className="text-3xl font-medium text-black">Iniciar Sesion</p>
            <div className=" pt-[1.37rem]">
              <p className="w-[308px] text-base font-normal text-black">
                Si no tienes una cuenta aun
              </p>
              <a
                href="#"
                className="w-[308px] text-base font-semibold text-lime-600"
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
                  className="mb-2 block text-sm font-medium text-gray-900"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="name@flowbite.com"
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
                  Your password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                  value={user.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className=" grid justify-items-end">
                <a href="#" className="text-xs font-light text-neutral-600">
                  ¿Olvido su contraseña?
                </a>
              </div>
              <button
                type="submit"
                className="mt-[3.75rem] h-[53px] w-[429px] rounded-[32px] bg-lime-600 text-[17px] font-medium text-white shadow hover:bg-white hover:text-lime-600 hover:shadow-lg"
                onClick={event => handleLogin(event)}
              >
                Login
              </button>

              <p className="pt-[3.25rem] text-center text-base font-medium text-zinc-400">
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
