import { useState, useEffect } from "react";
import useUserContext from "../../../../Contexts/useUserContext";
import { useParams } from "react-router-dom";
import BufferImage from "../../../BufferImage/BufferImage";
import { Datepicker } from "flowbite-react";
import {
  updateUserProductsPrice,
  getUserProductById,
} from "../../../../services/userProducts.service";

const MyProductInfo = () => {
  const { userID } = useUserContext();
  const { productId } = useParams();
  const [product, setProduct] = useState({
    productName: "",
    price: "",
    priceHistory: [
      {
        price: "",
        date: "",
      },
    ],
    category: "",
    origin: "",
    productImage: null,
  });
  const handleDateChange = date => {
    return date.toISOString();
  };

  const getProduct = () => {
    getUserProductById(userID, productId).then(response => {
      const data = response.data;
      if (data && data.priceHistory) {
        data.priceHistory.sort((a, b) => new Date(b.date) - new Date(a.date));
      }
      setProduct(data);
    });
  };

  const [newPrice, setNewPrice] = useState(0);
  const [updateDate, setUpdateDate] = useState(handleDateChange(new Date()));

  useEffect(() => {
    getProduct();
  }, []);

  const handleUpdatePrice = () => {
    updateUserProductsPrice(userID, productId, newPrice, updateDate).then(
      () => {
        getProduct();
      }
    );
  };

  return (
    <div>
      <div className=" flex justify-center space-x-[50rem]">
        <div className=" w-[30rem] bg-gray-100 p-6">
          <div className="mx-auto w-full max-w-2xl rounded bg-white p-6 shadow-md">
            <h1 className="mb-4 text-2xl font-semibold">
              Detalles del producto
            </h1>

            <div className="mb-4">
              <label className="mb-2 block text-gray-600">Nombre:</label>
              <input
                type="text"
                className="w-full rounded border p-2"
                value={product.productName}
                onChange={e =>
                  setProduct({ ...product, productName: e.target.value })
                }
              />
            </div>

            <div className="mb-4">
              <label className="mb-2 block text-gray-600">
                Precio Mas Reciente:
              </label>
              <input
                type="number"
                className="w-full rounded border p-2"
                value={product.priceHistory[0].price}
                disabled
              />
            </div>

            {product.priceHistory && product.priceHistory.length > 1 && (
              <div className="mb-4">
                <label className="mb-2 block text-gray-600">
                  Historial de precios:
                </label>
                <ul>
                  {product.priceHistory.map((history, index) => (
                    <li key={index} className="mb-1">
                      Date: {history.date}, Price: ${history.price}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mb-4">
              <label className="mb-2 block text-gray-600">Categoría:</label>
              <input
                type="text"
                className="w-full rounded border p-2"
                value={product.category}
                onChange={e =>
                  setProduct({ ...product, category: e.target.value })
                }
              />
            </div>

            <div className="mb-4">
              <label className="mb-2 block text-gray-600">Origen:</label>
              <input
                type="text"
                className="w-full rounded border p-2"
                value={product.origin}
                onChange={e =>
                  setProduct({ ...product, origin: e.target.value })
                }
              />
            </div>

            <div className="mb-4">
              <label className="mb-2 block text-gray-600">Imagen:</label>
              <BufferImage
                bufferImage={product.productImage}
                className="mb-2 w-48"
              />
              <input
                type="file"
                className="w-full rounded border p-2"
                onChange={e =>
                  setProduct({ ...product, productImage: e.target.files[0] })
                }
              />
            </div>

            <div>
              <button className="rounded bg-lime-600 p-2 text-white hover:bg-lime-700">
                Guardar Cambios
              </button>
            </div>
          </div>
        </div>
        <div>
          <div className=" w-[30rem] bg-gray-100 p-6">
            <div className="mx-auto w-full max-w-2xl rounded bg-white p-6 shadow-md">
              <p className=" text-lg font-semibold">Actualizacion de Precio</p>
              <div className=" my-4">
                <p className=" mb-2 block text-gray-600">Precio Nuevo:</p>
                <input
                  type="number"
                  step="0.01"
                  className="w-full rounded border p-2"
                  value={newPrice}
                  onChange={e => setNewPrice(e.target.value)}
                />
              </div>
              <div>
                <p className="mb-2 block text-gray-600">
                  Fecha de Actualizacion:
                </p>
                <Datepicker
                  name="updateDate"
                  language="es-ES"
                  onSelectedDateChanged={date =>
                    setUpdateDate(handleDateChange(date))
                  }
                />
              </div>
              <div className="mt-4">
                <button
                  className="rounded bg-lime-600 p-2 text-white hover:bg-lime-700"
                  onClick={handleUpdatePrice}
                >
                  Actualizar Precio
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProductInfo;
