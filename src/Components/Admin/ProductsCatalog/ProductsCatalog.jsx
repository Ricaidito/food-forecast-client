import "./ProductsCatalog.css";
import FoodForecastLogo from "../../images/LogoFoodForecast.png";
import ProfilePhoto from "../../images/ProfilePhoto.png";
import getProducts from "../../services/products";
import { useState, useEffect } from "react";

const ProductsCatalog = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const getAllProducts = (page) => {
    return getProducts(page, 54);
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage === 1) {
      return;
    }

    setCurrentPage(currentPage - 1);
  };

  useEffect(() => {
    getAllProducts(currentPage).then((response) => {
      setProducts(response.data);
    });
  }, [currentPage]);

  return (
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

      <div className=" pl-[8.88rem] pt-[4.94rem]">
        <p className="text-black text-3xl font-medium">CATALOGO</p>
      </div>

      <div className=" pt-[2.71rem]">
        <div className=" grid grid-cols-6 justify-items-center gap-y-6">
          {products.map((p) => (
            <div
              key={p._id}
              className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow"
            >
              <a href="#">
                <img
                  className="p-8 rounded-t-lg"
                  src={p.imageUrl}
                  alt="product image"
                />
              </a>
              <div className="px-5 pb-5">
                <a href="#">
                  <h5 className="text-gray-700 text-base font-bold leading-tight tracking-tight w-[141.11px]">
                    {p.productName}
                  </h5>
                </a>
                <div className="flex items-center mt-2.5 mb-3">
                  <p className=" text-lg text-gray-700 font-bold leading-tight tracking-tight w-[141.11px]">
                    Categoria: {p.category}
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-gray-700">
                    Lugar: {p.origin}
                  </span>
                  <a
                    href="#"
                    className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  >
                    Comparar
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col items-center">
        <span className="text-sm text-gray-700">
          <span className="font-semibold text-gray-900">
            Page {currentPage}
          </span>
        </span>
        <div className="inline-flex mt-2 xs:mt-0">
          <button
            onClick={() => handlePreviousPage()}
            className="flex items-center justify-center px-4 h-10 text-base font-medium text-white bg-green-700 rounded-l hover:bg-green-900"
          >
            <svg
              className="w-3.5 h-3.5 mr-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 5H1m0 0 4 4M1 5l4-4"
              />
            </svg>
            Prev
          </button>
          <button
            onClick={() => handleNextPage()}
            className="flex items-center justify-center px-4 h-10 text-base font-medium text-white bg-green-700 border-0 border-l border-gray-700 rounded-r hover:bg-green-900"
          >
            Next
            <svg
              className="w-3.5 h-3.5 ml-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductsCatalog;
