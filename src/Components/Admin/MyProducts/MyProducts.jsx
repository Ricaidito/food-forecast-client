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
  const productInitialState = {
    productName: "",
    price: "",
    category: "",
    productImage: "",
    origin: "",
  };

  const [newProduct, setNewProduct] = useState(productInitialState);

  const [userProducts, setUserProducts] = useState([]);

  const { userID } = useUserContext();

  const getProducts = () => {
    getUserProducts(userID)
      .then((response) => {
        console.log(response.data);
        setUserProducts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteAllUserProducts = () => {
    deleteAllProducts(userID)
      .then((response) => {
        console.log(response.status);
        getProducts();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteOneUserProduct = (productID) => {
    deleteProduct(userID, productID)
      .then((response) => {
        console.log(response.status);
        getProducts();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getProducts();
  }, []);

  const handleAddProduct = (event) => {
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
      .then((response) => {
        console.log(response.status);
        getProducts();
        setNewProduct(productInitialState);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleChange = (event) => {
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
          <p className="text-black text-2xl font-medium mb-6">
            Añdir Productos
          </p>
          <form>
            <div className="mb-6">
              <label
                type="text"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Nombre del Producto
              </label>
              <input
                type="text"
                name="productName"
                id="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                value={newProduct.productName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-6">
              <label
                type="number"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Precio
              </label>
              <input
                type="number"
                name="price"
                id="number"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                value={newProduct.price}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-6">
              <label
                type="number"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Origen
              </label>
              <input
                type="text"
                name="origin"
                id="number"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                value={newProduct.origin}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-6">
              <label
                type="products"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Escoge una Categoria
              </label>
              <select
                id="products"
                name="category"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                value={newProduct.category}
                onChange={handleChange}
                required
              >
                <option defaultValue>Escoge la categoria</option>
                <option value="carne">Carne</option>
                <option value="pescado">Pescado</option>
                <option value="mariscos">Mariscos</option>
                <option value="frutas">Frutas</option>
              </select>
            </div>
            <div>
              <label
                className="block mb-2 text-sm font-medium text-gray-900"
                htmlFor="default_size"
              >
                Foto del Producto
              </label>
              <input
                className="block w-full mb-5 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none"
                id="default_size"
                name="productImage"
                type="file"
                onChange={handleChange}
              />
            </div>
            <button
              type="submit"
              className="w-[229px] h-[53px] bg-lime-600 rounded-[32px] shadow text-white text-[17px] font-medium mt-[3.75rem] hover:bg-white hover:text-lime-600 hover:shadow-lg"
              onClick={(event) => handleAddProduct(event)}
            >
              Añadir Producto
            </button>
          </form>
        </div>
        <div className=" pt-5">
          <div className=" pl-[3.88rem] pt-[4.94rem] mb-6">
            <p className="text-black text-3xl font-medium">Mis Productos</p>
          </div>
          <button
            className="inline-flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-md ml-[3.88rem]"
            onClick={() => deleteAllUserProducts()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
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
            {userProducts.map((product) => (
              <div
                key={product._id}
                className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow"
              >
                <a href="#">
                  <BufferImage
                    bufferImage={product.productImage}
                    className="p-8 rounded-t-lg"
                  />
                </a>
                <div className="px-5 pb-5">
                  <a href="#">
                    <h5 className="text-gray-700 text-base font-bold leading-tight tracking-tight w-[141.11px]">
                      {product.productName}
                    </h5>
                  </a>
                  <div className="flex items-center mt-2.5 mb-3">
                    <p className=" text-lg text-gray-700 font-bold leading-tight tracking-tight w-[141.11px]">
                      Categoria: {product.category}
                    </p>
                  </div>
                  <span className="text-lg font-bold text-gray-700">
                    Precio: RD${product.price}
                  </span>
                  <div className=" flex gap-x-2 mt-4">
                    <a
                      href="#"
                      className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    >
                      Comparar
                    </a>
                    <button
                      className="inline-flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-md"
                      onClick={() => deleteOneUserProduct(product._id)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2"
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
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProducts;
