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
      <div className=" pl-[8.88rem]">
        <p className="text-3xl font-medium text-black">Canasta Basica</p>
        <p className="text-2xl font-medium text-black">
          Fecha Extraida: {convertDateFormat(basket.extractionDate)}
        </p>
        <p className="text-1xl font-medium text-black">
          Precio total de la canasta: RD${basket.totalAmount}
        </p>
      </div>
      <div className=" pl-[8.88rem]">
        <p className="text-3xl font-medium text-black">
          Comparación con canasta anterior
        </p>
        <p className="text-2xl font-medium text-black">
          Diferencia: RD${basketInfo.difference}
        </p>
        <p className="text-1xl font-medium text-black">
          Precio total de la canasta anterior: RD${basketInfo.previousPrice}
        </p>
        <p className="text-1xl font-medium text-black">
          Fecha Extraida: {convertDateFormat(basketInfo.previousExtractionDate)}
        </p>
      </div>
      <div className=" mt-8">
        <Table>
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
