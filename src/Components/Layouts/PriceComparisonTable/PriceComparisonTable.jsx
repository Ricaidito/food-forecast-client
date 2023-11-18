import { useEffect, useState } from "react";
import { getProductsByIdWithPrice } from "../../../services/products.service";

const PriceComparisonTable = ({ productIds }) => {
  const [products, setProducts] = useState([]);
  const [uniqueMonths, setUniqueMonths] = useState([]);
  let uniqueMonthsSet = new Set();

  const calculateAveragePrices = product => {
    const averagePrices = {};

    product.priceHistory.forEach(priceHistoryItem => {
      const date = new Date(priceHistoryItem.date);
      const month = date.toLocaleDateString("es-ES", {
        month: "long",
        year: "numeric",
      });

      if (averagePrices[month]) {
        averagePrices[month].total += priceHistoryItem.productPrice;
        averagePrices[month].count += 1;
      } else {
        averagePrices[month] = {
          total: priceHistoryItem.productPrice,
          count: 1,
        };
      }

      uniqueMonthsSet.add(month);
    });

    for (const month in averagePrices) {
      averagePrices[month] =
        averagePrices[month].total / averagePrices[month].count;
    }

    product.averagePrices = averagePrices;
  };

  const getProducts = productIds => {
    uniqueMonthsSet = new Set();

    getProductsByIdWithPrice(productIds).then(response => {
      response.data.products.forEach(product => {
        calculateAveragePrices(product);
      });

      setUniqueMonths(
        Array.from(uniqueMonthsSet).sort((a, b) => new Date(a) - new Date(b))
      );
      setProducts(response.data.products);
    });
  };

  useEffect(() => {
    getProducts(productIds);
  }, [productIds]);

  return (
    <div>
      <table className="w-full text-left text-sm text-gray-500 rtl:text-right">
        <thead className="bg-gray-50 text-xs uppercase text-gray-700">
          <tr>
            <th scope="col" className="px-6 py-3">
              Nombre del Producto
            </th>
            {uniqueMonths.map(month => (
              <th key={month} scope="col" className="px-6 py-3">
                {month}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product._id} className="border-b bg-white">
              <th
                scope="row"
                className="whitespace-nowrap px-6 py-4 font-medium text-gray-900"
              >
                {product.productName}
              </th>
              {uniqueMonths.map(month => (
                <td key={month} className="px-6 py-4">
                  {product.averagePrices[month] || ""}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PriceComparisonTable;
