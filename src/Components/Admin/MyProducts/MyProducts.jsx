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

  const [searchTerm, setSearchTerm] = useState("");

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

    addProduct(userID, formData)
      .then(response => {
        console.log(response.status);
        getProducts();
        setNewProduct(productInitialState);
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

  const productsFiltered = userProducts.filter(p => {
    return p.productName.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const handleSearch = e => {
    setSearchTerm(e.target.value);
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
                <option defaultValue>Escoge la categoria</option>
                <option value="carne">Carne</option>
                <option value="pescado">Pescado</option>
                <option value="mariscos">Mariscos</option>
                <option value="frutas">Frutas</option>
              </select>
            </div>
            <div>
              <label
                className="mb-2 block text-sm font-medium text-gray-900"
                htmlFor="default_size"
              >
                Foto del Producto
              </label>
              <input
                className="mb-5 block w-full cursor-pointer rounded-lg border border-gray-300 bg-gray-50 text-sm text-gray-900 focus:outline-none dark:text-gray-400"
                id="default_size"
                name="productImage"
                type="file"
                onChange={handleChange}
              />
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
          <div className=" ml-[3.88rem] w-96">
            <label
              htmlFor="default-search"
              className="sr-only mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Search
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <svg
                  className="h-4 w-4 text-gray-500"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="search"
                id="default-search"
                value={searchTerm}
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-4 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                placeholder="Buscar"
                onChange={handleSearch}
                required
              />
            </div>
          </div>
          <button
            className="ml-[3.88rem] mt-6 inline-flex items-center rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
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
            {productsFiltered.map(product => (
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
                  <span className="text-lg font-bold text-gray-700">
                    Precio: RD${product.price}
                  </span>
                  <div className=" mt-4 flex gap-x-2">
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
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProducts;
