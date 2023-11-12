import { format, parseISO } from "date-fns";
import PriceComparisonTable from "../../PriceComparisonTable/PriceComparisonTable";
import ProductInfoFrame from "../../ProductInfoFrame/ProductInfoFrame";
import { useProductContext } from "../../../Contexts/ProductContext";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { selectedProductIds } = useProductContext();

  if (selectedProductIds.length === 0) {
    return (
      <div className="m-2 p-2">
        <p className="text-3xl font-medium text-black">
          Parece que no has seleccionado ningún producto para comparar
        </p>
        <p>
          Puedes seleccionar los productos en el{" "}
          <Link to="/admin/products" className="underline decoration-sky-500">
            catalogo
          </Link>
        </p>
      </div>
    );
  }

  return (
    <div className="m-2 p-2">
      <ProductInfoFrame productIds={selectedProductIds} />
      <PriceComparisonTable productIds={selectedProductIds} />
      {/* <MyLineChart /> */}
    </div>
  );
};

export default Dashboard;
