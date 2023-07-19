import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProductByIdWithPrice } from "../../../services/products.service";

const Product = () => {
  const { productId } = useParams();
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

  const getProduct = () => {
    getProductByIdWithPrice(productId).then(response => {
      setProduct(response.data);
    });
  };

  const formatDate = inputDate => {
    const date = new Date(inputDate);

    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString();

    const formattedDate = `${day}-${month}-${year}`;

    return formattedDate;
  };

  useEffect(() => {
    getProduct();
  }, []);

  const latestPrice =
    productWithPrice.priceHistory[productWithPrice.priceHistory.length - 1]
      ?.productPrice | 0;

  return (
    <div className="m-2">
      <h1>{productWithPrice.product.productName}</h1>
      <img
        src={productWithPrice.product.imageUrl}
        alt={`${productWithPrice.product.productName}-image`}
      />
      <div className="p-2">
        <h2>Precio actual: ${latestPrice}</h2>
        <h2>Categoría: {productWithPrice.product.category}</h2>
        <h2>Lugar: {productWithPrice.product.origin}</h2>
        <h2>Fecha de extracción: {productWithPrice.product.extractionDate}</h2>
      </div>
      <div className="m-2">
        <h1>Historial de precios</h1>
        {productWithPrice.priceHistory.map(priceEntry => (
          <div key={priceEntry._id} className="p-2">
            <p>${priceEntry.productPrice}</p>
            <p>Fecha: {formatDate(priceEntry.date)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Product;
