import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useProductContext } from "../../Contexts/ProductContext";

const ProductInfo = ({ productId }) => {
  const [product, setProduct] = useState(null);
  const { removeProductId } = useProductContext();

  useEffect(() => {
    axios
      .get(
        `https://food-forecast-server.azurewebsites.net/products/product-info/${productId}`
      )
      .then(response => {
        setProduct(response.data);
      });
  }, []);

  if (!product) return <div>Cargando...</div>;

  const formatDate = dateString => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  return (
    <div className="rounded-lg bg-gray-100 p-4 shadow-md">
      <div
        onClick={() => {
          console.log("Removing product with id:", productId);
          removeProductId(productId);
        }}
      >
        <svg
          className="h-6 w-6 text-gray-800 dark:text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 14"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
          />
        </svg>
      </div>
      <Link to={`/admin/product/${productId}`}>
        <img
          className="mb-4 rounded-lg shadow-md"
          src={product?.productInfo.imageUrl}
          alt={product?.productInfo.productName}
        />
      </Link>
      <p className="mb-2">
        <span className="font-bold">{product?.productInfo.productName}</span>{" "}
      </p>
      <p className="mb-2">
        <span className="font-bold">Categoría:</span>{" "}
        {product?.productInfo.category}
      </p>
      <p className="mb-2">
        <span className="font-bold">Lugar:</span> {product?.productInfo.origin}
      </p>
      <p className="mb-2">
        <span className="font-bold">Fecha de extracción:</span>{" "}
        {formatDate(product?.productInfo.extractionDate)}
      </p>

      <h2 className="mb-4 mt-4 text-xl font-bold">
        Precio: RD${product?.price.productPrice}
      </h2>
    </div>
  );
};

export default ProductInfo;
