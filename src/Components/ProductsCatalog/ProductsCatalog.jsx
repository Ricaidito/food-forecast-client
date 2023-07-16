import "./ProductsCatalog.css";
import FoodForecastLogo from "../../images/LogoFoodForecast.png";
import ProfilePhoto from "../../images/ProfilePhoto.png";
import FoodExample from "../../images/FoodExample.png";

const ProductsCatalog = () => {
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
          <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow">
            <a href="#">
              <img
                className="p-8 rounded-t-lg"
                src={FoodExample}
                alt="product image"
              />
            </a>
            <div className="px-5 pb-5">
              <a href="#">
                <h5 className="text-gray-700 text-base font-bold leading-tight tracking-tight w-[141.11px]">
                  Short Ribs Certified Angus Beef, Lb
                </h5>
              </a>
              <div className="flex items-center mt-2.5 mb-3">
                <p className=" text-lg text-gray-700 font-bold leading-tight tracking-tight w-[141.11px]">
                  Categoria: Carne
                </p>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-gray-700">
                  Lugar: Nacional
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
          <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow">
            <a href="#">
              <img
                className="p-8 rounded-t-lg"
                src={FoodExample}
                alt="product image"
              />
            </a>
            <div className="px-5 pb-5">
              <a href="#">
                <h5 className="text-gray-700 text-base font-bold leading-tight tracking-tight w-[141.11px]">
                  Short Ribs Certified Angus Beef, Lb
                </h5>
              </a>
              <div className="flex items-center mt-2.5 mb-3">
                <p className=" text-lg text-gray-700 font-bold leading-tight tracking-tight w-[141.11px]">
                  Categoria: Carne
                </p>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-gray-700">
                  Lugar: Nacional
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
          <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow">
            <a href="#">
              <img
                className="p-8 rounded-t-lg"
                src={FoodExample}
                alt="product image"
              />
            </a>
            <div className="px-5 pb-5">
              <a href="#">
                <h5 className="text-gray-700 text-base font-bold leading-tight tracking-tight w-[141.11px]">
                  Short Ribs Certified Angus Beef, Lb
                </h5>
              </a>
              <div className="flex items-center mt-2.5 mb-3">
                <p className=" text-lg text-gray-700 font-bold leading-tight tracking-tight w-[141.11px]">
                  Categoria: Carne
                </p>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-gray-700">
                  Lugar: Nacional
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
          <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow">
            <a href="#">
              <img
                className="p-8 rounded-t-lg"
                src={FoodExample}
                alt="product image"
              />
            </a>
            <div className="px-5 pb-5">
              <a href="#">
                <h5 className="text-gray-700 text-base font-bold leading-tight tracking-tight w-[141.11px]">
                  Short Ribs Certified Angus Beef, Lb
                </h5>
              </a>
              <div className="flex items-center mt-2.5 mb-3">
                <p className=" text-lg text-gray-700 font-bold leading-tight tracking-tight w-[141.11px]">
                  Categoria: Carne
                </p>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-gray-700">
                  Lugar: Nacional
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
          <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow">
            <a href="#">
              <img
                className="p-8 rounded-t-lg"
                src={FoodExample}
                alt="product image"
              />
            </a>
            <div className="px-5 pb-5">
              <a href="#">
                <h5 className="text-gray-700 text-base font-bold leading-tight tracking-tight w-[141.11px]">
                  Short Ribs Certified Angus Beef, Lb
                </h5>
              </a>
              <div className="flex items-center mt-2.5 mb-3">
                <p className=" text-lg text-gray-700 font-bold leading-tight tracking-tight w-[141.11px]">
                  Categoria: Carne
                </p>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-gray-700">
                  Lugar: Nacional
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
          <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow">
            <a href="#">
              <img
                className="p-8 rounded-t-lg"
                src={FoodExample}
                alt="product image"
              />
            </a>
            <div className="px-5 pb-5">
              <a href="#">
                <h5 className="text-gray-700 text-base font-bold leading-tight tracking-tight w-[141.11px]">
                  Short Ribs Certified Angus Beef, Lb
                </h5>
              </a>
              <div className="flex items-center mt-2.5 mb-3">
                <p className=" text-lg text-gray-700 font-bold leading-tight tracking-tight w-[141.11px]">
                  Categoria: Carne
                </p>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-gray-700">
                  Lugar: Nacional
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
          <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow">
            <a href="#">
              <img
                className="p-8 rounded-t-lg"
                src={FoodExample}
                alt="product image"
              />
            </a>
            <div className="px-5 pb-5">
              <a href="#">
                <h5 className="text-gray-700 text-base font-bold leading-tight tracking-tight w-[141.11px]">
                  Short Ribs Certified Angus Beef, Lb
                </h5>
              </a>
              <div className="flex items-center mt-2.5 mb-3">
                <p className=" text-lg text-gray-700 font-bold leading-tight tracking-tight w-[141.11px]">
                  Categoria: Carne
                </p>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-gray-700">
                  Lugar: Nacional
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
          <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow">
            <a href="#">
              <img
                className="p-8 rounded-t-lg"
                src={FoodExample}
                alt="product image"
              />
            </a>
            <div className="px-5 pb-5">
              <a href="#">
                <h5 className="text-gray-700 text-base font-bold leading-tight tracking-tight w-[141.11px]">
                  Short Ribs Certified Angus Beef, Lb
                </h5>
              </a>
              <div className="flex items-center mt-2.5 mb-3">
                <p className=" text-lg text-gray-700 font-bold leading-tight tracking-tight w-[141.11px]">
                  Categoria: Carne
                </p>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-gray-700">
                  Lugar: Nacional
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
          <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow">
            <a href="#">
              <img
                className="p-8 rounded-t-lg"
                src={FoodExample}
                alt="product image"
              />
            </a>
            <div className="px-5 pb-5">
              <a href="#">
                <h5 className="text-gray-700 text-base font-bold leading-tight tracking-tight w-[141.11px]">
                  Short Ribs Certified Angus Beef, Lb
                </h5>
              </a>
              <div className="flex items-center mt-2.5 mb-3">
                <p className=" text-lg text-gray-700 font-bold leading-tight tracking-tight w-[141.11px]">
                  Categoria: Carne
                </p>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-gray-700">
                  Lugar: Nacional
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
          <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow">
            <a href="#">
              <img
                className="p-8 rounded-t-lg"
                src={FoodExample}
                alt="product image"
              />
            </a>
            <div className="px-5 pb-5">
              <a href="#">
                <h5 className="text-gray-700 text-base font-bold leading-tight tracking-tight w-[141.11px]">
                  Short Ribs Certified Angus Beef, Lb
                </h5>
              </a>
              <div className="flex items-center mt-2.5 mb-3">
                <p className=" text-lg text-gray-700 font-bold leading-tight tracking-tight w-[141.11px]">
                  Categoria: Carne
                </p>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-gray-700">
                  Lugar: Nacional
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
          <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow">
            <a href="#">
              <img
                className="p-8 rounded-t-lg"
                src={FoodExample}
                alt="product image"
              />
            </a>
            <div className="px-5 pb-5">
              <a href="#">
                <h5 className="text-gray-700 text-base font-bold leading-tight tracking-tight w-[141.11px]">
                  Short Ribs Certified Angus Beef, Lb
                </h5>
              </a>
              <div className="flex items-center mt-2.5 mb-3">
                <p className=" text-lg text-gray-700 font-bold leading-tight tracking-tight w-[141.11px]">
                  Categoria: Carne
                </p>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-gray-700">
                  Lugar: Nacional
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
        </div>
      </div>

      <div className=" pt-9 pl-[4rem]">
        <nav aria-label="Page navigation example">
          <ul className="inline-flex -space-x-px text-base h-10">
            <li>
              <a
                href="#"
                className="flex items-center justify-center px-4 h-10 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 "
              >
                Previous
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 "
              >
                1
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 "
              >
                2
              </a>
            </li>
            <li>
              <a
                href="#"
                aria-current="page"
                className="flex items-center justify-center px-4 h-10 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 "
              >
                3
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 "
              >
                4
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 "
              >
                5
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 "
              >
                Next
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default ProductsCatalog;
