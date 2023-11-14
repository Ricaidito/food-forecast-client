import { useState, useEffect } from "react";
import useUserContext from "../../../../Contexts/useUserContext";
import { useParams } from "react-router-dom";
import axios from "axios";
import BufferImage from "../../../BufferImage/BufferImage";

const MyProductInfo = () => {
  const { userID } = useUserContext();
  const { productId } = useParams();
  const [product, setProduct] = useState({
    productName: "",
    price: "",
    category: "",
    origin: "",
    productImage: null,
  });

  useEffect(() => {
    const getProduct = async () => {
      const { data } = await axios.get(
        `https://food-forecast-server.azurewebsites.net/user-products/${userID}/products/${productId}`
      );
      setProduct(data);
    };
    getProduct();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="mx-auto w-full max-w-2xl rounded bg-white p-6 shadow-md">
        <h1 className="mb-4 text-2xl font-semibold">Detalles del producto</h1>

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
          <label className="mb-2 block text-gray-600">Precio:</label>
          <input
            type="number"
            className="w-full rounded border p-2"
            value={product.price}
            onChange={e => setProduct({ ...product, price: e.target.value })}
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
            onChange={e => setProduct({ ...product, category: e.target.value })}
          />
        </div>

        <div className="mb-4">
          <label className="mb-2 block text-gray-600">Origen:</label>
          <input
            type="text"
            className="w-full rounded border p-2"
            value={product.origin}
            onChange={e => setProduct({ ...product, origin: e.target.value })}
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
            Guardar cambios
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyProductInfo;
