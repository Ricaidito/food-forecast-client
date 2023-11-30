import PriceComparisonTable from "../../Layouts/PriceComparisonTable/PriceComparisonTable";
import PriceComparisonGraph from "../../Layouts/PriceComparisonGraph/PriceComparisonGraph";
import ProductInfoFrame from "../../Layouts/ProductInfoFrame/ProductInfoFrame";
import { useProductContext } from "../../../Contexts/ProductContext";
import useUserContext from "../../../Contexts/useUserContext";
import { getUserProductsWithPriceHistory } from "../../../services/userProducts.service";
import { getProductsByIdWithPrice } from "../../../services/products.service";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useUserConfigContext } from "../../../Contexts/UserConfigContext";
import axios from "axios";
import ReportHistory from "../ReportHistory/ReportHistory";

const useFetchUserProducts = (userID, productIds) => {
  const [userProducts, setUserProducts] = useState([]);

  useEffect(() => {
    if (productIds && productIds.length >= 0) {
      getUserProductsWithPriceHistory(userID, productIds)
        .then(response => {
          setUserProducts(response.data);
        })
        .catch(error => {
          console.error("Error fetching user products:", error);
        });
    }
  }, [userID, productIds]);

  return userProducts;
};

const useFetchCatalogProducts = catalogProductIds => {
  const [catalogProducts, setCatalogProducts] = useState([]);

  useEffect(() => {
    if (catalogProductIds && catalogProductIds.length >= 0) {
      getProductsByIdWithPrice(catalogProductIds)
        .then(response => {
          setCatalogProducts(response.data.products);
        })
        .catch(error => {
          console.error("Error fetching products:", error);
        });
    }
  }, [catalogProductIds]);

  return catalogProducts;
};

const Dashboard = () => {
  const date = new Date();
  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = date.toLocaleDateString("es-ES", options);
  const { userID, name } = useUserContext();
  const { hasSubscription } = useUserConfigContext();
  const {
    selectedProductIds,
    selectedUserProductIds,
    removeProductId,
    removeUserProductId,
    isProductIdSelected,
  } = useProductContext();
  const catalogProductIds = useFetchCatalogProducts(selectedProductIds);
  const userProducts = useFetchUserProducts(userID, selectedUserProductIds);
  const allProducts = [...catalogProductIds, ...userProducts];
  const [userReports, setUserReports] = useState([]);

  const handleRemoveProduct = productId => {
    if (isProductIdSelected(productId)) {
      removeProductId(productId);
    } else {
      removeUserProductId(productId);
    }
  };

  const generateReportName = () => {
    const currentDate = new Date();
    const reportDate = currentDate.toLocaleDateString().split("/");
    const [day, month, year] = reportDate;
    const formattedDate = `${year}_${month}_${day}`;
    return `reporte_${formattedDate}.pdf`;
  };

  const downloadReport = async () => {
    try {
      const response = await axios.get(
        `https://food-forecast-server.azurewebsites.net/reports/${userID}`,
        {
          responseType: "blob",
        }
      );

      const pdfBlob = new Blob([response.data], { type: "application/pdf" });

      const downloadUrl = window.URL.createObjectURL(pdfBlob);
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.setAttribute("download", generateReportName());
      document.body.appendChild(link);
      link.click();
      link.remove();

      toast.success("¡Descarga Exitosa!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "light",
      });
      fetchUserReports();
    } catch (error) {
      console.error("Error downloading the file", error);
      toast.error("Ha ocurrido un error con la desgarga.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const fetchUserReports = async () => {
    try {
      const reports = await axios.get(
        `https://food-forecast-server.azurewebsites.net/reports/history/${userID}`
      );
      setUserReports(reports.data);
    } catch (error) {
      toast.error("Error cargando historial de reportes");
    }
  };

  const subscriptionError = () => {
    toast.warn("Necesita la Suscripción Premium!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  useEffect(() => {
    fetchUserReports();
  }, []);

  if (selectedProductIds.length === 0) {
    return (
      <div className="m-0 p-0 pt-5 text-center">
        <div className="container mx-auto px-6 py-20 text-center">
          <h1 className="mb-6 text-4xl font-bold text-gray-800 md:text-6xl">
            ¡Bienvenid@ a <span className="text-green-600">Food Forecast!</span>
          </h1>
          <p className="mb-6 text-base text-gray-600 md:text-lg">
            Aqui podrás ver y comparar los precios de los productos que
            selecciones. Para comenzar, selecciona los productos que deseas
            comparar en el cátalogo.
          </p>
          <p className="pt-2 text-lg text-gray-400 dark:text-gray-400">
            Todavía no tienes productos a comparar.
          </p>
          <div className="mt-6 flex justify-center">
            <Link to="/admin/products">
              <p className="rounded-full bg-green-600 px-4 py-2 font-bold text-white transition duration-300 ease-in-out hover:bg-green-700">
                ¡Ir al catálogo!
              </p>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="m-2 p-2">
      <div className=" mb-12 mt-2">
        <p className="text-center text-3xl font-bold text-black">DASHBOARD</p>
      </div>
      <div className=" flex justify-between">
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
          {hasSubscription ? (
            <>
              <button
                className="mt-4 h-9 w-[11rem] rounded-md bg-lime-600 font-medium text-white shadow hover:bg-white hover:text-lime-600 hover:shadow-lg"
                onClick={downloadReport}
              >
                Descargar Reporte
              </button>
              <ReportHistory
                userReports={userReports}
                fetchReports={fetchUserReports}
              />
            </>
          ) : (
            <button
              className="text-white-500 mt-4 h-9 w-[11rem] cursor-not-allowed rounded-md bg-gray-300 font-medium text-white shadow"
              onClick={() => subscriptionError()}
            >
              Descargar Reporte
            </button>
          )}
        </div>
        <div className=" h-[20rem] overflow-hidden overflow-y-auto rounded-[10px] border border-lime-900 border-opacity-25 p-6 text-start shadow-lg">
          <p className=" text-l mb-2 text-center font-medium uppercase text-black">
            Productos Seleccionados
          </p>
          <ProductInfoFrame
            allProducts={allProducts}
            onRemoveProduct={handleRemoveProduct}
          />
        </div>
      </div>
      <div className=" flex justify-center ">
        <div className=" mt-10">
          <div className=" mb-4 w-[50rem] overflow-hidden rounded-[10px] border border-lime-900 border-opacity-25 p-6 shadow-lg">
            <p className=" text-md mb-3 text-center font-semibold uppercase text-black">
              Grafica de Comparacion
            </p>
            <div>
              <PriceComparisonGraph allProducts={allProducts} />
            </div>
          </div>
          <div className=" h-[30rem] w-[50rem] overflow-hidden overflow-y-auto rounded-[10px] border border-lime-900 border-opacity-25 p-6 shadow-lg">
            <p className=" text-md mb-3 text-center font-semibold uppercase text-black">
              Tabla de Comparacion
            </p>
            <PriceComparisonTable allProducts={allProducts} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
