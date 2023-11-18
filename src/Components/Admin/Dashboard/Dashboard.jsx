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
      <div className="m-2 p-2 pt-10 text-center">
        <p className="text-3xl font-medium text-black">
          ¡Bienvenido a Food Forecast!
        </p>
        <p>
          Aqui podras ver se comparan los precios de los productos que
          selecciones. Para comenzar, selecciona los productos que deseas
          comparar en el{" "}
          <Link
            to="/admin/products"
            className="font-bold underline decoration-sky-500"
          >
            CATALOGO
          </Link>
          .
        </p>

        <div></div>
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
