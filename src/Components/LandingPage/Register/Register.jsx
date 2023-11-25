import { useState } from "react";
import { createUser } from "../../../services/user.service";
import { useNavigate, Link } from "react-router-dom";
import FoodPhoto from "../../../images/FoodImage1.png";
import { toast } from "react-toastify";
import { Spinner } from "flowbite-react";

const Register = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    profilePicture: null,
  });

  const handleInputChange = e => {
    const { id, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleFileChange = e => {
    setFormData(prevData => ({
      ...prevData,
      profilePicture: e.target.files[0],
    }));
  };

  const handleFormSubmit = async e => {
    e.preventDefault();

    const userData = new FormData();
    userData.append("name", formData.name);
    userData.append("lastName", formData.lastName);
    userData.append("email", formData.email);
    userData.append("password", formData.password);
    userData.append("confirmPassword", formData.confirmPassword);

    if (formData.profilePicture)
      userData.append("profilePicture", formData.profilePicture);

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      setIsLoading(true);
      const response = await createUser(userData);
      if (response.status === 201)
        toast.success(`Usuario creado con éxito`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      navigate("/login");
    } catch (err) {
      setIsLoading(false);
      toast.error("Error al crear Usuario", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      console.log(err);
    }
  };

  return (
    <div className="mt-6 flex min-h-screen flex-wrap md:flex-nowrap">
      <div className="flex w-full justify-center p-10 md:w-1/2">
        <div className="m-auto max-w-md rounded-lg bg-gray-100 p-12 shadow-md">
          <h2 className="mb-2 text-3xl font-bold">Registro</h2>
          <p className="mb-8 text-gray-600">
            Para disfrutar de todas nuestras funciones interesantes 👍
          </p>
          <form onSubmit={handleFormSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-900">
                Nombre
              </label>
              <input
                type="text"
                id="name"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                placeholder="Ej. Juan"
                required
                onChange={handleInputChange}
                value={formData.name}
              />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-900">
                Apellido
              </label>
              <input
                type="text"
                id="lastName"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                placeholder="Ej. Perez"
                required
                onChange={handleInputChange}
                value={formData.lastName}
              />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-900">
                Correo electrónico
              </label>
              <input
                type="email"
                id="email"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                placeholder="juanperez@gmail.com"
                required
                onChange={handleInputChange}
                value={formData.email}
              />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-900">
                Introduzca su contraseña
              </label>
              <input
                type="password"
                id="password"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                required
                onChange={handleInputChange}
                value={formData.password}
                placeholder="********"
              />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-900">
                Confirme su contraseña
              </label>
              <input
                type="password"
                id="confirmPassword"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                required
                onChange={handleInputChange}
                value={formData.confirmPassword}
                placeholder="********"
              />
            </div>
            <div className="mb-6">
              <p className="mb-2 block text-sm font-medium text-gray-900">
                Foto de Perfil
              </p>
              <div className="flex w-full items-center justify-center">
                <label
                  type="dropzone-file"
                  className="flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50"
                >
                  <div className="flex flex-col items-center justify-center pb-6 pt-5">
                    <svg
                      className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
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
                      <span className="font-semibold">Click para subir</span> o
                      arrastra y suelta una imagen
                    </p>
                    <p className="text-xs text-gray-500">JPEG (MAX. 1 MB)</p>
                  </div>
                  <input
                    id="dropzone-file"
                    type="file"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                  <div className="mt-2 text-sm text-gray-500">
                    {formData.profilePicture
                      ? formData.profilePicture.name
                      : "Aún no se ha seleccionado un archivo..."}
                  </div>
                </label>
              </div>
            </div>
            <button
              type="submit"
              className={`w-full rounded-lg p-3 font-medium text-white focus:outline-none focus:ring-2 focus:ring-opacity-50 ${
                isLoading
                  ? "text-white-500 cursor-not-allowed bg-gray-300"
                  : "bg-lime-600 text-white hover:bg-white hover:text-lime-600 hover:shadow-lg"
              } text-[17px] font-medium shadow transition duration-150 ease-in-out`}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Spinner
                    className="fill-green-500"
                    aria-label="Submitting..."
                  />
                  <span className="ml-2">Registrando...</span>
                </>
              ) : (
                "Registrarse"
              )}
            </button>
          </form>
          <p className="mt-6 text-center text-sm text-gray-600">
            Si ya tienes una cuenta...{" "}
            <Link
              to="/login"
              className="font-medium text-lime-600 hover:text-blue-500"
            >
              ¡Inicia Sesion Aqui!
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

export default Register;
