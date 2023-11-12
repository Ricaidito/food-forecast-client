import { useEffect, useState } from "react";
import { getProductByIdWithPrice } from "../../services/products.service";

const PriceComparisonTable = ({ productIds }) => {
  const [products, setProducts] = useState([]);
  const [uniqueMonths, setUniqueMonths] = useState([]);
  let uniqueMonthsSet = new Set();

  const calculateAveragePrices = product => {
    const averagePrices = {};

    product.priceHistory.forEach(priceHistoryItem => {
      const date = new Date(priceHistoryItem.date);
      const month = date.getFullYear() + "-" + (date.getMonth() + 1);

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

    getProductByIdWithPrice(productIds).then(response => {
      response.data.products.forEach(product => {
        calculateAveragePrices(product);
      });

      setUniqueMonths(Array.from(uniqueMonthsSet).sort());
      setProducts(response.data.products);
    });
  };

  useEffect(() => {
    getProducts(productIds);
  }, [productIds]);

  return (
    <table>
      <thead>
        <tr>
          <th>Product</th>
          {uniqueMonths.map(month => (
            <th key={month}>{month}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {products.map(product => (
          <tr key={product._id}>
            <td>{product.productName}</td>
            {uniqueMonths.map(month => (
              <td key={month}>{product.averagePrices[month] || ""}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PriceComparisonTable;
