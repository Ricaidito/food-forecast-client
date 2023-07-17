import FoodForecastLogo from "../../images/LogoFoodForecast.png";
import ProfilePhoto from "../../images/ProfilePhoto.png";
import "./MyProducts.css";

const MyProducts = () => {
  return (
    <div>
      <div>
        <div>
          <nav className="bg-white">
            <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
              <a href="#">
                <img
                  src={FoodForecastLogo}
                  className="mr-3"
                  alt="Flowbite Logo"
                />
              </a>
              <div>
                <a href="#">
                  <img
                    src={ProfilePhoto}
                    className="w-10 h-10 rounded-full"
                    alt="ProfilePhoto"
                  />
                </a>
              </div>
            </div>
          </nav>
        </div>

        <div className=" pt-[3.19rem]">
          <div className=" flex justify-center gap-x-[3.19rem]">
            <button className="w-[213px] h-[43px] bg-lime-600 rounded-[5px] text-center text-green-50 text-base font-normal">
              Dashboard
            </button>

            <button className="w-[213px] h-[43px] bg-lime-600 rounded-[5px] text-center text-green-50 text-base font-normal">
              Catalogo
            </button>

            <button className="w-[213px] h-[43px] bg-lime-600 rounded-[5px] text-center text-green-50 text-base font-normal">
              Mis Productos
            </button>

            <button className="w-[213px] h-[43px] bg-lime-600 rounded-[5px] text-center text-green-50 text-base font-normal">
              Cuenta
            </button>
          </div>
        </div>

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
                  id="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
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
                  id="number"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
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
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
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
                <p className="block mb-2 text-sm font-medium text-gray-900">
                  Foto del Producto
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
                className="w-[229px] h-[53px] bg-lime-600 rounded-[32px] shadow text-white text-[17px] font-medium mt-[3.75rem] hover:bg-white hover:text-lime-600 hover:shadow-lg"
              >
                Añadir Producto
              </button>
            </form>
          </div>
          <div className=" pt-5">
            <div className=" pl-[3.88rem] pt-[4.94rem] mb-6">
              <p className="text-black text-3xl font-medium">Mis Productos</p>
            </div>
            <button className="inline-flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-md ml-[3.88rem]">
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
              <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow">
                <a href="#">
                  <img
                    className="p-8 rounded-t-lg"
                    src=""
                    alt="product image"
                  />
                </a>
                <div className="px-5 pb-5">
                  <a href="#">
                    <h5 className="text-gray-700 text-base font-bold leading-tight tracking-tight w-[141.11px]">
                      Hello
                    </h5>
                  </a>
                  <div className="flex items-center mt-2.5 mb-3">
                    <p className=" text-lg text-gray-700 font-bold leading-tight tracking-tight w-[141.11px]">
                      Categoria: {}
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-gray-700">
                      Lugar: {}
                    </span>
                    <div className=" flex gap-x-2">
                      <a
                        href="#"
                        className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                      >
                        Comparar
                      </a>
                      <button className="inline-flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-md">
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProducts;
