import "./Register.css";
import FoodForecastLogo from "../../images/LogoFoodForecast.png";
import FoodPhoto from "../../images/FoodImage1.png";
import GoogleLogo from "../../images/GoogleLogo.png";

const Register = () => {
  return (
    <div>
      <div>
        <nav className="bg-white w-full">
          <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            <a href="#" className="flex items-center">
              <img
                src={FoodForecastLogo}
                className="h-8 mr-3"
                alt="FoodForecastLogo"
              />
            </a>
          </div>
        </nav>
      </div>

      <div className=" grid grid-cols-2 grid-rows-1">
        <div className=" justify-self-center pt-[3.53rem]">
          <div className=" text-start">
            <p className="text-black text-3xl font-medium">Registro</p>
            <div className=" pt-[1.37rem]">
              <p className="w-[308px] text-black text-base font-normal">
                Si ya tienes una cuenta
              </p>
              <a
                href="#"
                className="w-[308px] text-lime-600 text-base font-semibold"
              >
                ¡Inicia Sesion Aqui!
              </a>
            </div>
          </div>
          <div className=" w-[429px] pt-[2.75rem]">
            <form>
              <div className="mb-6">
                <label
                  type="text"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Nombre
                </label>
                <input
                  type="text"
                  id="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Ej. Juan"
                  required
                />
              </div>
              <div className="mb-6">
                <label
                  type="text"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Apellido
                </label>
                <input
                  type="text"
                  id="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Ej. Perez"
                  required
                />
              </div>
              <div className="mb-6">
                <label
                  type="email"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Your email
                </label>
                <input
                  type="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="name@flowbite.com"
                  required
                />
              </div>
              <div className="mb-6">
                <label
                  type="password"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Introduzca su contraseña
                </label>
                <input
                  type="password"
                  id="password"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  required
                />
              </div>
              <div className="mb-6">
                <label
                  type="password"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Confirme su contraseña
                </label>
                <input
                  type="password"
                  id="password"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  required
                />
              </div>

              <div>
                <p className="block mb-2 text-sm font-medium text-gray-900">
                  Foto de Perfil
                </p>
                <div className="flex items-center justify-center w-full">
                  <label
                    type="dropzone-file"
                    className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg
                        className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 16"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                        />
                      </svg>
                      <p className="mb-2 text-sm text-gray-500">
                        <span className="font-semibold">Click to upload</span>{" "}
                        or drag and drop
                      </p>
                      <p className="text-xs text-gray-500">
                        PNG o JPG (MAX. 1 MB)
                      </p>
                    </div>
                    <input id="dropzone-file" type="file" className="hidden" />
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className="w-[429px] h-[53px] bg-lime-600 rounded-[32px] shadow text-white text-[17px] font-medium mt-[3.75rem] hover:bg-white hover:text-lime-600 hover:shadow-lg"
              >
                Registrar
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

export default Register;
