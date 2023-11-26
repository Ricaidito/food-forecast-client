import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useUserContext from "../../../Contexts/useUserContext";
import { getProductsByIdWithPrice } from "../../../services/products.service";
import {
  getProductWatchlist,
  addProductWatchlist,
  deleteProductWatchlist,
} from "../../../services/watchlist.service";
import SinglePriceComparisonGraph from "../../Layouts/SinglePriceComparisonGraph/SinglePriceComparisonGraph";
import { Table } from "flowbite-react";
import { format, parseISO } from "date-fns";

const Product = () => {
  const { productId } = useParams();
  const { userID } = useUserContext();
  const [productWithPrice, setProduct] = useState({
    product: {
      _id: "",
      productName: "",
      category: "",
      imageUrl: "",
      productUrl: "",
      origin: "",
      extractionDate: "",
    },
    priceHistory: [],
  });

  const [isChecked, setIsChecked] = useState(false);

  const formatDateToMMDDYYYY = dateString => {
    const date = parseISO(dateString);
    return format(date, "MM-dd-yyyy");
  };

  const getProduct = () => {
    getProductsByIdWithPrice([productId]).then(response => {
      const productData = response.data.products[0];
      productData.priceHistory = productData.priceHistory.map(item => {
        return { ...item, date: formatDateToMMDDYYYY(item.date) };
      });
      setProduct(productData);
    });
  };

  const handleWatchlist = event => {
    if (event.target.checked) {
      console.log("hola!!");
      addProductWatchlist(userID, productId).then(() => {
        setIsChecked(true);
      });
    } else {
      deleteProductWatchlist(userID, productId).then(() => {
        setIsChecked(false);
      });
    }
  };

  const getWatchlist = () => {
    getProductWatchlist(userID).then(response => {
      const watchlist = response.data.watchList;
      const product = watchlist.find(item => item === productId);
      if (product) {
        setIsChecked(true);
      }
    });
  };

  useEffect(() => {
    getProduct();
    getWatchlist();
  }, []);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="label">{`Date: ${payload[0].payload.date}`}</p>
          <p className="intro">{`Price: ${payload[0].value}`}</p>
        </div>
      );
    }

    return null;
  };

  const formatDate = inputDate => {
    const date = new Date(inputDate);

    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString();

    const formattedDate = `${day}-${month}-${year}`;

    return formattedDate;
  };

  const latestPrice =
    productWithPrice.priceHistory[productWithPrice.priceHistory.length - 1]
      ?.productPrice | 0;

  return (
    <div className="m-10">
      <div className=" flex justify-center gap-56">
        <div>
          <div className="w-full max-w-sm rounded-lg border border-gray-200 bg-white shadow">
            <div>
              <img src={productWithPrice.imageUrl} alt="" />
            </div>

            <div className="px-5 pb-5 pt-6">
              <h5 className="mb-6 w-[171.11px] text-base font-bold leading-tight tracking-tight text-gray-700">
                Nombre: {productWithPrice.productName}
              </h5>
              <span className="text-lg font-bold text-gray-700">
                Precio actual: RD${latestPrice}
              </span>
              <div className="mb-3 mt-2.5 flex items-center">
                <p className="  text-lg font-bold leading-tight tracking-tight text-gray-700">
                  Categoria: {productWithPrice.category}
                </p>
              </div>
              <div className="mb-3 mt-2.5 flex items-center">
                <p className=" text-lg font-bold leading-tight tracking-tight text-gray-700">
                  Lugar: {productWithPrice.origin}
                </p>
              </div>
              <div className="mb-3 mt-2.5 flex items-center">
                <p className=" text-lg font-bold leading-tight tracking-tight text-gray-700">
                  Fecha de extracción:{" "}
                  {formatDate(productWithPrice.extractionDate)}
                </p>
              </div>
              <div>
                <div className=" mb-2">
                  <p className="text-md font-bold leading-tight tracking-tight text-gray-700">
                    ¿Recibir notificaciones de este producto al correo?
                  </p>
                </div>
                <label className="relative inline-flex cursor-pointer items-center">
                  <input
                    type="checkbox"
                    value=""
                    className="peer sr-only"
                    checked={isChecked}
                    onChange={handleWatchlist}
                  />
                  <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300"></div>
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6">
          <h3 className="mb-6 w-[141.11px] text-base font-bold leading-tight tracking-tight text-gray-700">
            Historial de Precios
          </h3>
          <div className="  flex justify-start gap-x-6">
            <div>
              <Table>
                <Table.Head>
                  <Table.HeadCell>Fecha</Table.HeadCell>
                  <Table.HeadCell>Precio</Table.HeadCell>
                </Table.Head>
                <Table.Body>
                  {productWithPrice.priceHistory.map(item => (
                    <Table.Row key={item._id}>
                      <Table.Cell>{item.date}</Table.Cell>
                      <Table.Cell>{item.productPrice}</Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            </div>
            <div>
              <div>
                <SinglePriceComparisonGraph productIds={productId} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
