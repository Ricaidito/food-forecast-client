import useUserContext from "../../../Contexts/useUserContext";
import { userUserConfigContext } from "../../../Contexts/UserConfigContext";
import React, { useRef } from "react";
import {
  getUserImage,
  upddateUser,
  updateUserImage,
} from "../../../services/user.service";
import {
  getProductWatchlist,
  getProductsInfo,
  deleteProductWatchlist,
} from "../../../services/watchlist.service";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Settings.css";

const Settings = () => {
  const [userImage, setUserImage] = useState();
  const [watchlist, setWatchlist] = useState([]);
  const [imageData, setImageData] = useState({
    profilePicture: null,
  });
  const { userID, name, lastName, email, logout, update } = useUserContext();
  const { hasSubscription, removeUserConfig } = userUserConfigContext();
  const [updatedName, setUpdatedName] = useState(name);
  const [updatedLastName, setUpdatedLastName] = useState(lastName);

  const navigate = useNavigate();
  const fileInputRef = useRef();

  const handleLogout = () => {
    logout();
    sessionStorage.removeItem("session");
    navigate("/");
  };

  const resetForm = () => {
    formRef.current.reset();
  };

  const resetFileInput = () => {
    fileInputRef.current.value = null;
  };

  const getWatchlist = () => {
    getProductWatchlist(userID).then(response => {
      getProductsInfo(response.data.watchList).then(product => {
        console.log(product.data);
        setWatchlist(product.data);
      });
    });
  };

  const handleDelete = productID => {
    deleteProductWatchlist(userID, productID).then(() => {
      getWatchlist();
    });
  };

  const handleFileChange = e => {
    setImageData(prevData => ({
      ...prevData,
      profilePicture: e.target.files[0],
    }));
  };

  const handlePhotoChange = async e => {
    e.preventDefault();

    if (imageData.profilePicture) {
      try {
        const response = await updateUserImage(userID, {
          profilePicture: imageData.profilePicture,
        });
        if (response.status === 201) alert("Imagen Actualizada Exitosamente!");
        getUserImage(userID).then(response => {
          setUserImage(response.data);
          window.location.reload();
        }, []);
      } catch (err) {
        console.log(err);
      }
    }

    return;
  };

  const handleSubmit = e => {
    e.preventDefault();
    upddateUser(userID, updatedName, updatedLastName).then(() => {
      setUpdatedName(updatedName);
      setUpdatedLastName(updatedLastName);
      update(updatedName, updatedLastName);
    });
  };

  useEffect(() => {
    getUserImage(userID).then(response => {
      setUserImage(response.data);
    }, []);
    getWatchlist();
    // axios
    //   .get(
    //     `https://food-forecast-server.azurewebsites.net/payments/get-subscription-details/${userID}`
    //   )
    //   .then(response => {
    //     const nextPaymentTimestamp =
    //       response.data.subscription.current_period_end;
    //     const nextPaymentDate = new Date(nextPaymentTimestamp * 1000);
    //     console.log(
    //       `The next payment is due on: ${nextPaymentDate.toLocaleDateString()}`
    //     );
    //   });
  }, []);

  return (
    <div>
      <p className=" my-7 text-center text-3xl font-bold uppercase text-black">
        Configuracion
      </p>
      <div>
        <div className=" flex justify-center space-x-[20rem]">
          <div className="h-[35rem] w-[30rem]">
            <div className="border-stroke shadow-default rounded-sm border bg-white">
              <div className="border-stroke dark:border-strokedark border-b px-7 py-4">
                <h3 className="font-medium text-black dark:text-white">
                  Informacion Personal
                </h3>
              </div>
              <div className="p-7">
                <form onSubmit={handleSubmit}>
                  <div className="mb-5 gap-5">
                    <div className="w-[23rem]">
                      <label
                        className="mb-1 block text-sm font-medium text-black dark:text-white"
                        htmlFor="fullName"
                      >
                        Primer Nombre
                      </label>
                      <div>
                        <input
                          className="border-stroke bg-gray pl-11.5 pr-4.5 focus:border-primary dark:border-strokedark dark:bg-meta-4 dark:focus:border-primary w-full rounded border py-3 text-black focus-visible:outline-none dark:text-white"
                          type="text"
                          name="fullName"
                          id="fullName"
                          placeholder={updatedName}
                          value={updatedName}
                          onChange={e => setUpdatedName(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div className="mt-4 w-[23rem]">
                      <label
                        className="mb-1 block text-sm font-medium text-black"
                        htmlFor="fullName"
                      >
                        Apellido
                      </label>
                      <div>
                        <input
                          className="border-stroke bg-gray pl-11.5 pr-4.5 focus:border-primary dark:border-strokedark dark:bg-meta-4 dark:focus:border-primary w-full rounded border py-3 text-black focus-visible:outline-none dark:text-white"
                          type="text"
                          name="fullName"
                          id="fullName"
                          placeholder={updatedLastName}
                          value={updatedLastName}
                          onChange={e => setUpdatedLastName(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mb-3 w-[23rem]">
                    <label
                      className="mb-3 block text-sm font-medium text-black"
                      htmlFor="emailAddress"
                    >
                      Correo Electronico
                    </label>
                    <div>
                      <input
                        className="border-stroke bg-gray pl-11.5 pr-4.5 focus:border-primary dark:border-strokedark dark:bg-meta-4 dark:focus:border-primary w-full rounded border py-3 text-black focus-visible:outline-none"
                        type="email"
                        name="emailAddress"
                        id="emailAddress"
                        placeholder={email}
                        value={email}
                        disabled
                      />
                    </div>
                  </div>
                  <div className="gap-4.5 flex justify-end">
                    <button
                      className="w-[5rem] rounded-md bg-lime-600 font-medium text-white shadow hover:bg-white hover:text-lime-600 hover:shadow-lg"
                      type="submit"
                    >
                      Guardar
                    </button>
                    <button
                      className="bg-primary text-gray hover:shadow-1 flex justify-center rounded px-6 py-2 font-medium"
                      type="button"
                      onClick={resetForm}
                    >
                      Cancelar
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className=" col-span-2 w-[35rem]">
            <div className="border-stroke shadow-default dark:border-strokedark dark:bg-boxdark rounded-sm border bg-white">
              <div className="border-stroke dark:border-strokedark border-b px-7 py-4">
                <h3 className="font-medium text-black dark:text-white">
                  Tu Foto
                </h3>
              </div>
              <div className="p-7">
                <form onSubmit={handlePhotoChange}>
                  <div className="mb-4 flex items-center gap-3">
                    <div className="h-14 w-14 rounded-full">
                      <img
                        src={`data:image/jpeg;base64,${userImage}`}
                        alt="User"
                      />
                    </div>
                    <div>
                      <span className="mb-1.5 text-black dark:text-white">
                        Editar Foto
                      </span>
                    </div>
                  </div>

                  <div
                    id="FileUpload"
                    className="mb-5.5 border-primary bg-gray dark:bg-meta-4 sm:py-7.5 relative block w-full cursor-pointer appearance-none rounded border-2 border-dashed px-4 py-4"
                  >
                    <label
                      className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                      htmlFor="file_input"
                    >
                      Subir Archivo
                    </label>
                    <input
                      ref={fileInputRef}
                      className="block w-full cursor-pointer rounded-lg border border-gray-300 bg-gray-50 text-sm text-gray-900 focus:outline-none"
                      aria-describedby="file_input_help"
                      id="file_input"
                      accept="image/*"
                      type="file"
                      onChange={handleFileChange}
                    />
                    <p
                      className="mt-1 text-sm text-gray-500 dark:text-gray-300"
                      id="file_input_help"
                    >
                      PNG O JPG
                    </p>
                  </div>

                  <div className="mt-3 flex justify-end gap-4">
                    <button
                      className="w-[5rem] rounded-md bg-lime-600 font-medium text-white shadow hover:bg-white hover:text-lime-600 hover:shadow-lg"
                      type="submit"
                    >
                      Guardar
                    </button>
                    <button
                      className="bg-primary text-gray flex justify-center rounded px-6 py-2 font-medium"
                      type="button"
                      onClick={resetFileInput}
                    >
                      Cancelar
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className=" flex justify-center space-x-[20rem]">
        <div className="overflow-hidden rounded-[10px] border border-lime-900 border-opacity-25 p-6 shadow-lg">
          <p className="mb-2 text-center text-xl font-medium uppercase">
            Lista de Seguimiento
          </p>
          {watchlist.length === 0 ? (
            <div>
              <p className="text-md text-center font-medium uppercase">
                No tienes productos en tu lista de seguimiento
              </p>
            </div>
          ) : (
            <div className=" flex h-[12rem] justify-center overflow-y-auto">
              <table className=" text-left text-sm text-gray-500">
                <thead className="bg-gray-50 text-xs uppercase text-gray-700">
                  <tr>
                    <th scope="col" className="px-6 py-3"></th>
                    <th scope="col" className="px-6 py-3">
                      Nombre del Producto
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Origen
                    </th>
                    <th scope="col" className="px-6 py-3"></th>
                  </tr>
                </thead>
                <tbody>
                  {watchlist.map(product => (
                    <tr className="border-b bg-white" key={product._id}>
                      <td>
                        <img
                          className="h-20 w-20 rounded-full"
                          src={product.imageUrl}
                          alt="productImage"
                        />
                      </td>
                      <td className="w-90 px-6 py-4 text-gray-900">
                        <Link to={`/admin/product/${product._id}`}>
                          {product.productName}
                        </Link>
                        n
                      </td>
                      <td className="px-6 py-4 text-gray-900">
                        {product.origin}
                      </td>
                      <td className="px-6 py-4 text-gray-900">
                        <button onClick={() => handleDelete(product._id)}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="1em"
                            viewBox="0 0 448 512"
                          >
                            <path d="M432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16zM53.2 467a48 48 0 0 0 47.9 45h245.8a48 48 0 0 0 47.9-45L416 128H32z" />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
        <div>
          <div className=" overflow-hidden rounded-[10px] border border-lime-900 border-opacity-25 p-6 shadow-lg">
            <p className=" text-center text-xl font-medium uppercase">
              Manejo de Suscripciones
            </p>
            <p className=" mt-6 font-medium">
              Aqui podras manejar tus suscripciones, cancelarlas o cambiarlas
            </p>
            <div className=" mt-4">
              {hasSubscription ? (
                <p>
                  <span className=" font-bold">Suscripcion Actual:</span>
                  Premium
                </p>
              ) : (
                <p>Suscripcion Actual: Basico</p>
              )}
            </div>

            <div className=" mt-10 flex justify-center">
              <button className=" h-9 w-[7rem]  rounded-md bg-lime-600 font-medium text-white shadow hover:bg-white hover:text-lime-600 hover:shadow-lg">
                Configurar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Settings;
