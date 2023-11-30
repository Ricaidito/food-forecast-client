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
      <div className="container mx-auto px-6 py-20 text-center">
        <h1 className="mb-6 text-4xl font-bold text-gray-800 md:text-6xl">
          ¡Bienvenid@, <span className=" text-green-600">{name}!</span>
        </h1>
      </div>
      <div className=" flex flex-wrap ">
        <div className=" w-1/10 m-3 flex-shrink flex-grow overflow-hidden rounded-[10px] border border-lime-900 border-opacity-25 p-6 text-start shadow-lg">
          {hasSubscription ? (
            <>
              <p className=" mb-3 text-xl font-bold">Reporteria 👑</p>
              <p className=" uppercase">
                <span className=" font-semibold">FECHA: </span>
                {formattedDate}
              </p>

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
            <div className="container mx-auto px-6 py-20 text-center">
              <div>
                <p className="text-center text-2xl font-bold">
                  Para generar reportes debes ser{" "}
                  <Link to="/admin/subscriptions">
                    <span className=" cursor-pointer text-yellow-300">
                      Premium
                    </span>
                  </Link>
                </p>
                <div className=" mt-10 flex justify-center">
                  <svg
                    fill="#000000"
                    height="60px"
                    width="60px"
                    version="1.1"
                    id="Layer_1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    viewBox="0 0 330 330"
                    xmlSpace="preserve"
                  >
                    <g id="XMLID_509_">
                      <path
                        id="XMLID_510_"
                        d="M65,330h200c8.284,0,15-6.716,15-15V145c0-8.284-6.716-15-15-15h-15V85c0-46.869-38.131-85-85-85
		S80,38.131,80,85v45H65c-8.284,0-15,6.716-15,15v170C50,323.284,56.716,330,65,330z M180,234.986V255c0,8.284-6.716,15-15,15
		s-15-6.716-15-15v-20.014c-6.068-4.565-10-11.824-10-19.986c0-13.785,11.215-25,25-25s25,11.215,25,25
		C190,223.162,186.068,230.421,180,234.986z M110,85c0-30.327,24.673-55,55-55s55,24.673,55,55v45H110V85z"
                      />
                    </g>
                  </svg>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className=" w-1/10 m-3 h-[25rem] flex-shrink flex-grow overflow-hidden overflow-x-auto overflow-y-auto rounded-[10px] border border-lime-900 border-opacity-25 p-6 shadow-lg">
          <p className=" mb-2 text-center text-xl font-bold text-black">
            Productos Seleccionados
          </p>
          <div>
            <ProductInfoFrame
              allProducts={allProducts}
              onRemoveProduct={handleRemoveProduct}
            />
          </div>
        </div>
      </div>
      <div className=" flex flex-wrap">
        <div className=" w-1/10 m-3 h-[25rem] flex-shrink flex-grow overflow-hidden overflow-x-auto overflow-y-auto rounded-[10px] border border-lime-900 border-opacity-25 p-6 shadow-lg">
          <p className=" mb-3 text-center text-xl font-bold text-black">
            Tabla de Comparacion
          </p>
          <div>
            <PriceComparisonTable allProducts={allProducts} />
          </div>
        </div>
        <div className=" w-1/10 m-3 flex-shrink flex-grow rounded-[10px] border border-lime-900 border-opacity-25 p-6 shadow-lg">
          <p className=" mb-3 text-center text-xl font-bold text-black">
            Grafica de Comparacion
          </p>
          <div>
            <PriceComparisonGraph allProducts={allProducts} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
