import "./Basket.css";
import { useState, useEffect } from "react";
import { getBasket } from "../../../services/basket.service";
import { Table } from "flowbite-react";

const Basket = () => {
  const [basket, setBasket] = useState([]);
  const [date, setDate] = useState();

  const convertDateFormat = input => {
    let date = new Date(input);
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
      setBasket(response.data.products);
      setDate(convertDateFormat(response.data.extractionDate));
    });
  }, []);

  console.log(basket);

  return (
    <div>
      <div className=" pl-[8.88rem]">
        <p className="text-3xl font-medium text-black">Canasta Basica</p>
        <p className="text-2xl font-medium text-black">
          Fecha Extraida: {date}
        </p>
      </div>
      <div className=" mt-8">
        <Table>
          <Table.Head>
            <Table.HeadCell>{""}</Table.HeadCell>
            <Table.HeadCell>Nombre</Table.HeadCell>
            <Table.HeadCell>Precio</Table.HeadCell>
          </Table.Head>
          <Table.Body>
            {basket.map(item => (
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
