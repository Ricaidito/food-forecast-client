import { useState, useEffect } from "react";
import useUserContext from "../../../../Contexts/useUserContext";
import { useParams } from "react-router-dom";
import BufferImage from "../../../BufferImage/BufferImage";
import { Datepicker, Table } from "flowbite-react";
import SingleUserPriceComparisonGraph from "../../../Layouts/SingleUserPriceComparisonGraph/SingleUserPriceComparisonGraph";
import {
  updateUserProductsPrice,
  getUserProductById,
  updateUserPoduct,
} from "../../../../services/userProducts.service";
import { upperCase } from "lodash";
import CATEGORIES from "../../../../categories/productCategories";
import { toast } from "react-toastify";

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

  const changeDateFormat = date => {
    const options = { day: "numeric", month: "long", year: "numeric" };
    return new Intl.DateTimeFormat("es-ES", options).format(date);
  };

  const getProduct = () => {
    getUserProductById(userID, productId).then(response => {
      const data = response.data;
      if (data && data.priceHistory) {
        data.priceHistory.sort((a, b) => new Date(b.date) - new Date(a.date));
        data.priceHistory = data.priceHistory.map(history => {
          return {
            ...history,
            date: upperCase(changeDateFormat(new Date(history.date))),
          };
        });
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
        toast.success("Precio Actualizado Correctamente!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    );
  };

  const handleUpdateProduct = async () => {
    const formData = new FormData();
    formData.append("productName", product.productName);
    formData.append("category", product.category);
    formData.append("origin", product.origin);
    formData.append("productImage", product.productImage);
    await updateUserPoduct(userID, productId, formData);
    getProduct();
    toast.success("Cambios Realizados Correctamente!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  console.log(product);

  return (
    <div className=" mb-12">
      <div className="container mx-auto px-6 py-20 text-center">
        <h1 className="mb-2 text-4xl font-bold text-gray-800 md:text-6xl">
          Info de Mi <span className="text-green-600">Producto</span>
        </h1>
      </div>
      <div className=" mt-6 flex justify-center space-x-[20rem]">
        <div className="bg-gray-100 p-6">
          <div className="mx-auto w-full rounded bg-white p-6 shadow-md">
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
              <label className="mb-2 block text-gray-600">Precio actual:</label>
              <input
                type="text"
                className="w-full rounded border bg-gray-100 p-2"
                value={`$${product.priceHistory[0].price} DOP`}
                disabled
              />
            </div>

            <div className="mb-4">
              <label className="mb-2 block text-gray-600">Categoría:</label>
              <select
                id="products"
                className="w-full rounded-lg border p-2"
                value={product.category}
                onChange={e =>
                  setProduct({ ...product, category: e.target.value })
                }
              >
                <option defaultValue>Escoge la categoria</option>
                {CATEGORIES.map(({ categoryValue, text }) => (
                  <option key={categoryValue} value={categoryValue}>
                    {text}
                  </option>
                ))}
              </select>
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
              <button
                className="rounded bg-lime-600 p-2 text-white hover:bg-lime-700"
                onClick={() => handleUpdateProduct()}
              >
                Guardar cambios
              </button>
            </div>
          </div>
        </div>
        <div>
          <div className=" w-[30rem] bg-gray-100 p-6">
            <div className="mx-auto w-full max-w-2xl rounded bg-white p-6 shadow-md">
              <p className=" text-lg font-semibold">Actualización de precio</p>
              <div className=" my-4">
                <p className=" mb-2 block text-gray-600">Precio nuevo:</p>
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
                  Fecha de actualizacion:
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
                  Actualizar precio
                </button>
              </div>
            </div>
          </div>
          <div className=" mt-6 w-[30rem] bg-gray-100 p-6">
            <div className="mx-auto h-[30rem] w-full max-w-2xl overflow-y-auto rounded bg-white p-6 shadow-md">
              {product.priceHistory && product.priceHistory.length > 0 && (
                <Table>
                  <Table.Head>
                    <Table.HeadCell>Fecha</Table.HeadCell>
                    <Table.HeadCell>Precio</Table.HeadCell>
                  </Table.Head>
                  <Table.Body>
                    {product.priceHistory.map((history, index) => (
                      <Table.Row key={index}>
                        <Table.Cell>{history.date}</Table.Cell>
                        <Table.Cell>${history.price} DOP</Table.Cell>
                      </Table.Row>
                    ))}
                  </Table.Body>
                </Table>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className=" mt-5">
        <p className="mb-2 block text-center font-semibold text-gray-600">
          Grafica de comportamiento
        </p>
        <div className=" mt-4 flex justify-center">
          <div className=" w-[60rem] ">
            <SingleUserPriceComparisonGraph productIds={productId} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProductInfo;
