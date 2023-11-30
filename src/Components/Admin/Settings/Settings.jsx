import useUserContext from "../../../Contexts/useUserContext";
import { useUserConfigContext } from "../../../Contexts/UserConfigContext";
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
import { Table } from "flowbite-react";
import axios from "axios";
import { toast } from "react-toastify";
import "./Settings.css";

const Settings = () => {
  const [userImage, setUserImage] = useState();
  const [watchlist, setWatchlist] = useState([]);
  const [imageData, setImageData] = useState({
    profilePicture: null,
  });
  const { userID, name, lastName, email, logout, update } = useUserContext();
  const { hasSubscription, refetchUserConfig } = useUserConfigContext();
  const [updatedName, setUpdatedName] = useState(name);
  const [updatedLastName, setUpdatedLastName] = useState(lastName);

  const navigate = useNavigate();
  const fileInputRef = useRef();

  const [paymentDate, setPaymentDate] = useState("");

  const resetForm = () => {
    formRef.current.reset();
  };

  const resetFileInput = () => {
    fileInputRef.current.value = null;
  };

  const getWatchlist = () => {
    getProductWatchlist(userID).then(response => {
      getProductsInfo(response.data.watchList).then(product => {
        setWatchlist(product.data);
      });
    });
  };

  const handleDelete = productID => {
    deleteProductWatchlist(userID, productID).then(() => {
      getWatchlist();

      toast.success("Producto Eliminado Exitosamente!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    });
  };

  const handleFileChange = e => {
    setImageData(prevData => ({
      ...prevData,
      profilePicture: e.target.files[0],
    }));
  };

  const handleSuscribe = () => {
    navigate("/admin/subscriptions");
  };

  const handlePhotoChange = async e => {
    e.preventDefault();

    if (imageData.profilePicture) {
      try {
        const response = await updateUserImage(userID, {
          profilePicture: imageData.profilePicture,
        });
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
      toast.success("Campos Actualizados Correctamente!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    });
  };

  const getPaymentInfo = () => {
    if (!hasSubscription) return;
    axios
      .get(
        `https://food-forecast-server.azurewebsites.net/payments/get-subscription-details/${userID}`
      )
      .then(response => {
        const nextPaymentTimestamp =
          response.data.subscription.current_period_end;
        const nextPaymentDate = new Date(nextPaymentTimestamp * 1000);
        setPaymentDate(nextPaymentDate.toLocaleDateString());
      });
  };

  useEffect(() => {
    getUserImage(userID).then(response => {
      setUserImage(response.data);
    }, []);
    getWatchlist();
    getPaymentInfo();
  }, []);

  const cancelSubscription = async () => {
    try {
      await axios.get(
        `https://food-forecast-server.azurewebsites.net/payments/cancel-subscription/${userID}`
      );
      refetchUserConfig();
    } catch (error) {
      console.error("Error cancelling subscription:", error);
    }
  };

  return (
    <div>
      <div className="m-0 p-0 pt-5 text-center">
        <div className="container mx-auto px-6 py-20 text-center">
          <h1 className="mb-6 text-4xl font-bold text-gray-800 md:text-6xl">
            Configuración de <span className="text-green-600">Usuario</span>
          </h1>
          <p className="mb-8 text-base text-gray-600 md:text-lg">
            Espacio dedicado a la configuración de tu cuenta.
          </p>
        </div>
      </div>
      <div>
        <div className="flex flex-wrap">
          <div className=" w-1/10 m-3 flex-shrink flex-grow">
            <div className=" rounded-sm border bg-white shadow-lg">
              <div className="border-stroke dark:border-strokedark border-b bg-green-600 px-7 py-4">
                <h3 className="text-xl font-bold text-white">
                  Informacion Personal
                </h3>
              </div>
              <div className="bg-white p-7 ">
                <form onSubmit={handleSubmit}>
                  <div className="mb-5 gap-5">
                    <div className="mb-3 w-[23rem]">
                      <label
                        className="mb-3 block text-sm font-medium text-black"
                        htmlFor="emailAddress"
                      >
                        Correo Electronico
                      </label>
                      <div>
                        <input
                          className=" pl-11.5 pr-4.5 w-full rounded border bg-gray-100 py-3 text-black"
                          type="email"
                          name="emailAddress"
                          id="emailAddress"
                          placeholder={email}
                          value={email}
                          disabled
                        />
                      </div>
                    </div>
                    <div className="w-[23rem]">
                      <label
                        className="mb-1 block text-sm font-medium text-black dark:text-white"
                        htmlFor="fullName"
                      >
                        Nombre
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
          <div className="w-1/10 m-3 flex-shrink flex-grow">
            <div className="rounded-sm border bg-white shadow-lg">
              <div className="border-stroke border-b bg-green-600 px-7 py-4">
                <h3 className="text-xl font-bold text-white">Tu Foto</h3>
              </div>
              <div className="bg-white p-7">
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
      <div className=" flex flex-wrap">
        {hasSubscription ? (
          <div className=" w-1/10 m-3 flex-shrink flex-grow rounded-[10px] border border-lime-900 border-opacity-25 bg-white p-6 shadow-lg">
            <p className="mb-2 text-center text-xl font-bold">
              Lista de productos seguidos 👑
            </p>
            {watchlist.length === 0 ? (
              <div className=" container px-6 py-20">
                <p className="text-center text-lg font-semibold">
                  No tienes productos en tu lista de seguimiento
                </p>
              </div>
            ) : (
              <div className=" flex h-[20rem] justify-center overflow-y-auto">
                <Table striped>
                  <Table.Head className="bg-gray-50 text-xs uppercase text-gray-700">
                    <Table.HeadCell className="px-6 py-3"></Table.HeadCell>{" "}
                    <Table.HeadCell className="px-6 py-3 font-bold">
                      Nombre del Producto
                    </Table.HeadCell>
                    <Table.HeadCell className="px-6 py-3 font-bold">
                      Origen
                    </Table.HeadCell>
                    <Table.HeadCell className="px-6 py-3"></Table.HeadCell>{" "}
                  </Table.Head>
                  <Table.Body>
                    {watchlist.map(product => (
                      <Table.Row
                        className="border-b bg-white"
                        key={product._id}
                      >
                        <Table.Cell>
                          <img
                            className="h-20 w-20 rounded-full"
                            src={product.imageUrl}
                            alt="productImage"
                          />
                        </Table.Cell>
                        <Table.Cell className="w-90 px-6 py-4 font-bold text-green-600">
                          <Link to={`/admin/product/${product._id}`}>
                            {product.productName}
                          </Link>
                        </Table.Cell>
                        <Table.Cell className="px-6 py-4 font-bold uppercase text-gray-900">
                          {product.origin}
                        </Table.Cell>
                        <Table.Cell className="px-6 py-4 text-gray-900">
                          <button onClick={() => handleDelete(product._id)}>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              className="h-6 w-6"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </button>
                        </Table.Cell>
                      </Table.Row>
                    ))}
                  </Table.Body>
                </Table>
              </div>
            )}
          </div>
        ) : (
          <div className="container m-3 w-1/6 flex-shrink flex-grow rounded-[10px] border border-lime-900 border-opacity-25 bg-white p-6 px-6 py-20 shadow-lg">
            <p className="text-center text-2xl font-bold">
              Para ver tu lista de seguimiento debes ser{" "}
              <Link to="/admin/subscriptions">
                <span className=" cursor-pointer text-yellow-300">Premium</span>
              </Link>
            </p>
            <div className=" mt-6 flex justify-center">
              <svg
                fill="#000000"
                height="90px"
                width="90px"
                version="1.1"
                id="Layer_1"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                viewBox="0 0 330 330"
                xmlSpace="preserve"
              >
                <g id="XMLID_509_">
                  <path
                    id="XMLID_510_"
                    d="M65,330h200c8.284,0,15-6.716,15-15V145c0-8.284-6.716-15-15-15h-15V85c0-46.869-38.131-85-85-85
		S80,38.131,80,85v45H65c-8.284,0-15,6.716-15,15v170C50,323.284,56.716,330,65,330z M180,234.986V255c0,8.284-6.716,15-15,15
		s-15-6.716-15-15v-20.014c-6.068-4.565-10-11.824-10-19.986c0-13.785,11.215-25,25-25s25,11.215,25,25
		C190,223.162,186.068,230.421,180,234.986z M110,85c0-30.327,24.673-55,55-55s55,24.673,55,55v45H110V85z"
                  />
                </g>
              </svg>
            </div>
          </div>
        )}

        <div className=" container m-3 w-1/6 flex-shrink flex-grow rounded-[10px] border border-lime-900 border-opacity-25 bg-white p-6 px-6 py-20 shadow-lg">
          <p className=" text-center text-xl font-bold text-gray-800">
            Manejo de Suscripciones
          </p>
          <div className=" mt-4 text-center">
            {hasSubscription ? (
              <>
                <p>
                  <span className="text-lg font-semibold text-gray-800">
                    Suscripcion Actual:{" "}
                  </span>
                  <span className="mb-2 mr-2 inline-block rounded bg-yellow-200 px-2.5 py-0.5 text-sm font-semibold text-yellow-800 dark:bg-yellow-800 dark:text-yellow-200">
                    Plan Premium 👑
                  </span>
                </p>
                <p>
                  <span className="text-lg font-semibold text-gray-800">
                    Próxima fecha de Pago:{" "}
                  </span>
                  <span className="font-semibold text-green-600">
                    {paymentDate}
                  </span>
                </p>
              </>
            ) : (
              <>
                <p>
                  <span className="font-bold">Suscripcion Actual: </span>
                  <span className="mb-2 mr-2 inline-block rounded bg-green-200 px-2.5 py-0.5 text-sm font-semibold text-green-800 dark:bg-green-800 dark:text-green-200">
                    Plan Gratuito
                  </span>
                </p>
                <p className="pt-6">
                  ¿Quieres disfrutar de los beneficios de ser premium?
                </p>
              </>
            )}
          </div>

          <div className=" mt-10 flex justify-center">
            {hasSubscription ? (
              <button
                className="h-14 w-[7rem]  rounded-md bg-red-600 font-medium text-white shadow hover:bg-white hover:text-red-600 hover:shadow-lg"
                onClick={cancelSubscription}
              >
                Cancelar Suscripcion
              </button>
            ) : (
              <button
                className=" mt-4 h-9 w-[7rem]  rounded-md bg-lime-600 font-medium text-white shadow hover:bg-white hover:text-lime-600 hover:shadow-lg"
                onClick={handleSuscribe}
              >
                ¡Suscribete!
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Settings;
