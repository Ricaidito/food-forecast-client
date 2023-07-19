import "./MyProducts.css";
import { useState, useEffect } from "react";
import useUserContext from "../../../Contexts/useUserContext";
import BufferImage from "../../BufferImage/BufferImage";
import {
  addProduct,
  getUserProducts,
  deleteAllProducts,
  deleteProduct,
} from "../../../services/userProducts.service";

const MyProducts = () => {
  const [newProduct, setNewProduct] = useState({
    productName: "",
    price: "",
    category: "",
    productImage: "",
    origin: "",
  });

  const [userProducts, setUserProducts] = useState([]);

  const { userID } = useUserContext();

  const getProducts = () => {
    getUserProducts(userID)
      .then(response => {
        console.log(response.data);
        setUserProducts(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const deleteAllUserProducts = () => {
    deleteAllProducts(userID)
      .then(response => {
        console.log(response.status);
        getProducts();
      })
      .catch(error => {
        console.log(error);
      });
  };

  const deleteOneUserProduct = productID => {
    deleteProduct(userID, productID)
      .then(response => {
        console.log(response.status);
        getProducts();
      })
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(() => {
    getProducts();
  }, []);

  const handleAddProduct = event => {
    event.preventDefault();

    let formData = new FormData();
    formData.append("productName", newProduct.productName);
    formData.append("price", newProduct.price);
    formData.append("category", newProduct.category);
    formData.append("productImage", newProduct.productImage);
    formData.append("origin", newProduct.origin);

    for (let pair of formData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }
    addProduct(userID, formData)
      .then(response => {
        console.log(response.status);
        getProducts();
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleChange = event => {
    if (event.target.name === "productImage") {
      // handle file
      setNewProduct({
        ...newProduct,
        [event.target.name]: event.target.files[0],
      });
    } else {
      setNewProduct({
        ...newProduct,
        [event.target.name]: event.target.value,
      });
    }
  };

  return (
    <div className=" mt-6">
      <div className=" grid grid-cols-1 grid-rows-2 pt-10">
        <div className="w-[429px] pl-[5.88rem]">
          <p className="mb-6 text-2xl font-medium text-black">
            Añdir Productos
          </p>
          <form>
            <div className="mb-6">
              <label
                type="text"
                className="mb-2 block text-sm font-medium text-gray-900"
              >
                Nombre del Producto
              </label>
              <input
                type="text"
                name="productName"
                id="text"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                value={newProduct.productName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-6">
              <label
                type="number"
                className="mb-2 block text-sm font-medium text-gray-900"
              >
                Precio
              </label>
              <input
                type="number"
                name="price"
                id="number"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                value={newProduct.price}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-6">
              <label
                type="number"
                className="mb-2 block text-sm font-medium text-gray-900"
              >
                Origen
              </label>
              <input
                type="text"
                name="origin"
                id="number"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                value={newProduct.origin}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-6">
              <label
                type="products"
                className="mb-2 block text-sm font-medium text-gray-900"
              >
                Escoge una Categoria
              </label>
              <select
                id="products"
                name="category"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                value={newProduct.category}
                onChange={handleChange}
                required
              >
                <option selected>Escoge la categoria</option>
                <option value="carne">Carne</option>
                <option value="pescado">Pescado</option>
                <option value="mariscos">Mariscos</option>
                <option value="frutas">Frutas</option>
              </select>
            </div>
            <div>
              <p className="mb-2 block text-sm font-medium text-gray-900">
                Foto del Producto
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
                      <span className="font-semibold">Click to upload</span> or
                      drag and drop
                    </p>
                    <p className="text-xs text-gray-500">JPG (MAX. 1 MB)</p>
                  </div>
                  <input
                    id="dropzone-file"
                    name="productImage"
                    type="file"
                    className="hidden"
                    onChange={handleChange}
                  />
                </label>
              </div>
            </div>
            <button
              type="submit"
              className="mt-[3.75rem] h-[53px] w-[229px] rounded-[32px] bg-lime-600 text-[17px] font-medium text-white shadow hover:bg-white hover:text-lime-600 hover:shadow-lg"
              onClick={event => handleAddProduct(event)}
            >
              Añadir Producto
            </button>
          </form>
        </div>
        <div className=" pt-5">
          <div className=" mb-6 pl-[3.88rem] pt-[4.94rem]">
            <p className="text-3xl font-medium text-black">Mis Productos</p>
          </div>
          <button
            className="ml-[3.88rem] inline-flex items-center rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
            onClick={() => deleteAllUserProducts()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mr-2 h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
            Delete All
          </button>
          <div className=" grid grid-cols-6 justify-items-center gap-y-6 pt-10">
            {userProducts.map(product => (
              <div
                key={product._id}
                className="w-full max-w-sm rounded-lg border border-gray-200 bg-white shadow"
              >
                <a href="#">
                  <BufferImage
                    bufferImage={product.productImage}
                    className="rounded-t-lg p-8"
                  />
                </a>
                <div className="px-5 pb-5">
                  <a href="#">
                    <h5 className="w-[141.11px] text-base font-bold leading-tight tracking-tight text-gray-700">
                      {product.productName}
                    </h5>
                  </a>
                  <div className="mb-3 mt-2.5 flex items-center">
                    <p className=" w-[141.11px] text-lg font-bold leading-tight tracking-tight text-gray-700">
                      Categoria: {product.category}
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-gray-700">
                      Precio: {product.price}
                    </span>
                    <div className=" flex gap-x-2">
                      <a
                        href="#"
                        className="rounded-lg bg-green-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-blue-300"
                      >
                        Comparar
                      </a>
                      <button
                        className="inline-flex items-center rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
                        onClick={() => deleteOneUserProduct(product._id)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="mr-2 h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProducts;
