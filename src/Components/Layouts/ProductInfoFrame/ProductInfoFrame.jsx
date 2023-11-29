import React, { useEffect } from "react";
import { useProductContext } from "../../../Contexts/ProductContext";

const ProductInfoFrame = ({ allProducts, onRemoveProduct }) => {
  const handleRemoveProduct = productId => {
    onRemoveProduct(productId);
  };

  useEffect(() => {}, [allProducts]);

  return (
    <div>
      <div>
        <table className="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
          <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Nombre del Producto
              </th>
              <th scope="col" className="px-6 py-3">
                Categoria
              </th>
              <th scope="col" className="px-6 py-3">
                Origen
              </th>
              <th scope="col" className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {allProducts.map(product => (
              <tr
                key={product._id}
                className="border-b bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <th
                  scope="row"
                  className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                >
                  {product.productName}
                </th>
                <td className="px-6 py-4 uppercase">{product.category}</td>
                <td className="px-6 py-4 uppercase">{product.origin}</td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => handleRemoveProduct(product._id)}
                    className="rounded-md px-4 py-2 font-semibold"
                  >
                    <svg
                      className="h-8 w-8 text-black hover:text-red-600"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      {" "}
                      <line x1="18" y1="6" x2="6" y2="18" />{" "}
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductInfoFrame;
