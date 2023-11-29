import { useState, useEffect } from "react";
import { getBasket, getBasketInfo } from "../../../services/basket.service";
import { Table } from "flowbite-react";
import "./Basket.css";

const Basket = () => {
  const [basket, setBasket] = useState({});
  const [basketInfo, setBasketInfo] = useState({});

  const convertDateFormat = inputDate => {
    let date = new Date(inputDate);
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let year = date.getFullYear();
    month = month < 10 ? "0" + month : month;
    day = day < 10 ? "0" + day : day;
    let formattedDate = month + "-" + day + "-" + year;
    return formattedDate;
  };

  useEffect(() => {
    getBasket().then(response => {
      setBasket(response.data);
    });
    getBasketInfo().then(response => {
      setBasketInfo(response.data);
    });
  }, []);

  return (
    <div>
      <div className="m-0 p-0 pt-5 text-center">
        <div className="container mx-auto px-6 py-5 text-center">
          <h1 className="mb-6 text-4xl font-bold text-gray-800 md:text-6xl">
            Canasta <span className="text-green-600">Básica</span>
          </h1>
          <p className="mb-1 text-base text-gray-600 md:text-lg">
            Aquí podrás encontrar los productos de la canasta básica familiar y
            podrás compararla con la canasta anterior.
          </p>
        </div>
      </div>
      <div className="container mx-auto px-6 py-0">
        <div className="mb-6 text-center">
          <div className="mb-8 mt-2"></div>
          <p className="text-black-600 text-xl font-medium">
            Diferencia: {""}
            <span
              className={`text-xl font-bold ${
                basketInfo.difference === 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              {basketInfo.difference === 0
                ? "El precio se mantiene igual"
                : `RD$${basketInfo.difference}`}
            </span>
          </p>
        </div>
        <hr className="border-gray-300" />{" "}
        <div className="container mx-auto px-6">
          <div className="-mx-3 flex flex-wrap">
            <div className="mb-6 w-full px-3 md:mb-0 md:w-1/2">
              <div className="rounded-md bg-white p-6 shadow-lg transition-shadow duration-300 hover:shadow-xl">
                <span className="mb-2 mr-2 inline-block rounded bg-green-200 px-2.5 py-0.5 text-sm font-semibold text-green-800 dark:bg-green-800 dark:text-green-200">
                  Canasta Actual
                </span>
                <p className="text-2xl font-medium text-black">
                  Fecha: {convertDateFormat(basket.extractionDate)}
                </p>
                <p className="text-xl font-medium text-black">
                  Precio total de la canasta: RD${basket.totalAmount}
                </p>
              </div>
            </div>

            <div className="w-full px-3 md:w-1/2">
              <div className="rounded-md bg-white p-6 shadow-lg transition-shadow duration-300 hover:shadow-xl">
                <span className="mb-2 mr-2 inline-block rounded bg-red-200 px-2.5 py-0.5 text-sm font-semibold text-red-800 dark:bg-red-800 dark:text-red-200">
                  Canasta Anterior
                </span>
                <p className="text-2xl font-medium text-black">
                  Fecha: {convertDateFormat(basketInfo.previousExtractionDate)}
                </p>
                <p className="text-xl font-medium text-black">
                  Precio total de la canasta: RD$
                  {basketInfo.previousPrice}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8">
        <Table hoverable>
          <Table.Head>
            <Table.HeadCell>Imagen</Table.HeadCell>
            <Table.HeadCell>Nombre</Table.HeadCell>
            <Table.HeadCell>Precio</Table.HeadCell>
          </Table.Head>
          <Table.Body>
            {basket.products?.map(item => (
              <Table.Row key={item._id}>
                <Table.Cell>
                  <img
                    src={item.imageUrl}
                    className=" h-40 w-40 rounded-t-lg"
                    alt="Foto producto"
                  />
                </Table.Cell>
                <Table.Cell>{item.productName}</Table.Cell>
                <Table.Cell>RD${item.productPrice}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    </div>
  );
};

export default Basket;
