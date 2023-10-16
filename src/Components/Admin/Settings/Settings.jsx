import "./Settings.css";
import useUserContext from "../../../Contexts/useUserContext";
import { getUserImage, upddateUser } from "../../../services/user.service";
import {
  getProductWatchlist,
  getProductsInfo,
  deleteProductWatchlist,
} from "../../../services/watchlist.service";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const Settings = () => {
  const [userImage, setUserImage] = useState();
  const [watchlist, setWatchlist] = useState([]);
  const { userID, name, lastName, email, logout, update } = useUserContext();
  const [updatedName, setUpdatedName] = useState(name);
  const [updatedLastName, setUpdatedLastName] = useState(lastName);

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    sessionStorage.removeItem("session");
    navigate("/");
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
    });
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
  }, []);

  return (
    <div className=" mt-20">
      <div className=" grid justify-items-center">
        <div className=" flex gap-x-16">
          <div className=" mt-24">
            <div className="w-full max-w-sm rounded-lg border border-gray-200 bg-white shadow">
              <div className="px-5 pb-5">
                <div>
                  <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                      <label
                        htmlFor="email"
                        className="mb-2 block text-sm font-medium text-gray-900"
                      >
                        Nombre:
                      </label>
                      <input
                        type="text"
                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        placeholder={updatedName}
                        value={updatedName}
                        onChange={e => setUpdatedName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="mb-6">
                      <label
                        htmlFor="lastName"
                        className="mb-2 block text-sm font-medium text-gray-900"
                      >
                        Apellido:
                      </label>
                      <input
                        type="text"
                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        placeholder={updatedLastName}
                        value={updatedLastName}
                        onChange={e => setUpdatedLastName(e.target.value)}
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300"
                    >
                      Actualizar
                    </button>
                  </form>
                </div>
                <div className="mb-6 mt-2.5 flex items-center">
                  <p className=" w-[141.11px] text-lg font-bold leading-tight tracking-tight text-gray-700">
                    Correo: {email}
                  </p>
                </div>
                <div className=" flex gap-x-2">
                  <button
                    className="ml-[3.88rem] inline-flex items-center rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
                    onClick={() => handleLogout()}
                  >
                    Salir
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div>
            <img src={`data:image/jpeg;base64,${userImage}`} alt="User Image" />
          </div>
        </div>
      </div>
      <div>
        <div className="relative overflow-x-auto">
          <table className="w-[30%] text-left text-sm text-gray-500">
            <thead className="bg-gray-50 text-xs uppercase text-gray-700">
              <tr>
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
                  <td className="px-6 py-4 text-gray-900">
                    <Link to={`/admin/product/${product._id}`}>
                      {product.productName}
                    </Link>
                    n
                  </td>
                  <td className="px-6 py-4 text-gray-900">{product.origin}</td>
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
      </div>
    </div>
  );
};
export default Settings;
