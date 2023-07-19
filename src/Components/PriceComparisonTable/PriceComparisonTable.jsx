import React, { useEffect, useState } from "react";

const PriceComparisonTable = ({ productId1, productId2 }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(
      `http://localhost:8000/prices/compare-products/${productId1}/${productId2}`
    )
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error("Error fetching data:", error));
  }, [productId1, productId2]);

  if (!data) {
    return <div>Cargando...</div>;
  }

  const { product1, prices1, product2, prices2 } = data;

  const calculatePriceDifference = prices => {
    const differences = [];
    for (let i = 1; i < prices.length; i++) {
      const priceDifference =
        prices[i].productPrice - prices[i - 1].productPrice;
      differences.push(priceDifference);
    }
    return differences;
  };

  const priceDifferences1 = calculatePriceDifference(prices1);
  const priceDifferences2 = calculatePriceDifference(prices2);

  const formatDate = dateString => {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };

  const roundToTwoDigits = number => Math.round(number * 100) / 100;

  return (
    <div className="container mx-auto p-4">
      <h2 className="mb-4 text-xl font-bold">Comparación de precios</h2>
      <table className="w-full table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2">Producto</th>
            <th className="px-4 py-2">Precio</th>
            <th className="px-4 py-2">Fecha</th>
            <th className="px-4 py-2">Cambio de precio</th>
          </tr>
        </thead>
        <tbody>
          {prices1.map((price, index) => (
            <tr key={price._id} className="border-b">
              <td className="px-4 py-2">{product1.productName}</td>
              <td className="px-4 py-2">RD${price.productPrice}</td>
              <td className="px-4 py-2">{formatDate(price.date)}</td>
              <td className={`px-4 py-2 ${index > 0 ? "text-yellow-500" : ""}`}>
                {index > 0
                  ? roundToTwoDigits(priceDifferences1[index - 1])
                  : "-"}
              </td>
            </tr>
          ))}
          {prices2.map((price, index) => (
            <tr key={price._id} className="border-b">
              <td className="px-4 py-2">{product2.productName}</td>
              <td className="px-4 py-2">RD${price.productPrice}</td>
              <td className="px-4 py-2">{formatDate(price.date)}</td>
              <td className={`px-4 py-2 ${index > 0 ? "text-yellow-500" : ""}`}>
                {index > 0
                  ? roundToTwoDigits(priceDifferences2[index - 1])
                  : "-"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PriceComparisonTable;
