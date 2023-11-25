import PriceComparisonTable from "../../Layouts/PriceComparisonTable/PriceComparisonTable";
import PriceComparisonGraph from "../../Layouts/PriceComparisonGraph/PriceComparisonGraph";
import ProductInfoFrame from "../../Layouts/ProductInfoFrame/ProductInfoFrame";
import { useProductContext } from "../../../Contexts/ProductContext";
import useUserContext from "../../../Contexts/useUserContext";

import { Link } from "react-router-dom";

const Dashboard = () => {
  const date = new Date();
  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = date.toLocaleDateString("es-ES", options);
  const { selectedProductIds } = useProductContext();
  const { name } = useUserContext();

  if (selectedProductIds.length === 0) {
    return (
      <div className="m-0 p-0 pt-5 text-center">
        <title>Food Forecast</title>
        <div className="container mx-auto px-6 py-20 text-center">
          <h1 className="mb-6 text-4xl font-bold text-gray-800 md:text-6xl">
            ¡Bienvenido a <span className="text-green-600">Food Forecast!</span>
          </h1>
          <p className="mb-8 text-base text-gray-600 md:text-lg">
            Aqui podrás ver y comparar los precios de los productos que
            selecciones. Para comenzar, selecciona los productos que deseas
            comparar en el
          </p>
          <div className="flex justify-center mb-20">
            <Link to="/admin/products">
              <a className="rounded-full bg-green-600 px-4 py-2 font-bold text-white transition duration-300 ease-in-out hover:bg-green-700">
                CATALOGO
              </a>
            </Link>
          </div>
          <p className="text-lg pt-10 text-gray-400 dark:text-gray-400">
          Todavía no tienes productos a comparar.
        </p>
        </div>
      </div>
    );
  }

  return (
    <div className="m-2 p-2">
      <div className=" mb-12 mt-2">
        <p className="text-center text-3xl font-bold text-black">DASHBOARD</p>
      </div>
      <div className=" flex justify-center space-x-[30rem] ">
        <div className=" overflow-hidden rounded-[10px] border border-lime-900 border-opacity-25 p-6 text-start shadow-lg">
          <p className=" text-xl font-medium uppercase">
            Bienvenido a Food Forecast, {name}!
          </p>
          <p>
            Aqui podras ver la comparacion de los productos que seleccionaste
          </p>
          <p className=" uppercase">
            <span className=" font-semibold">FECHA: </span>
            {formattedDate}
          </p>
        </div>
        <div className=" h-[20rem] overflow-hidden overflow-y-auto rounded-[10px] border border-lime-900 border-opacity-25 p-6 text-start shadow-lg">
          <p className=" text-l mb-2 text-center font-medium uppercase text-black">
            Productos Seleccionados
          </p>
          <ProductInfoFrame productIds={selectedProductIds} />
        </div>
      </div>
      <div className=" mt-10 flex justify-center">
        <div className=" mr-14 h-[40rem] w-[70rem] overflow-hidden rounded-[10px] border border-lime-900 border-opacity-25 p-6 shadow-lg">
          <p className=" text-md mb-3 text-center font-semibold uppercase text-black">
            Grafica de Comparacion
          </p>
          <div>
            <PriceComparisonGraph productIds={selectedProductIds} />
          </div>
        </div>
        <div className=" h-[40rem] overflow-hidden overflow-y-auto rounded-[10px] border border-lime-900 border-opacity-25 p-6 shadow-lg">
          <p className=" text-md mb-3 text-center font-semibold uppercase text-black">
            Tabla de Comparacion
          </p>
          <PriceComparisonTable productIds={selectedProductIds} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
