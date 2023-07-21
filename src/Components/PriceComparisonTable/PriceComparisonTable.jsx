import { useEffect, useState } from "react";

const PriceComparisonTable = ({ productIds }) => {
  const [productData, setProductData] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8000/prices/compare-products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productIds }), // Send productIds in the request body as an array
    })
      .then(response => response.json())
      .then(data => setProductData(data))
      .catch(error => console.error("Error fetching data:", error));
  }, [productIds.join(",")]);

  if (!productData) return <div>Cargando...</div>;

  const calculatePriceDifferences = prices => {
    const differences = [];
    for (let i = 1; i < prices.length; i++) {
      const priceDifference =
        prices[i].productPrice - prices[i - 1].productPrice;
      differences.push(priceDifference);
    }
    return differences;
  };

  const formatDate = dateString => {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };

  const roundToTwoDigits = number => Math.round(number * 100) / 100;

  return (
    <div className="container mx-auto p-4">
      <h2 className="mb-4 text-xl font-bold">Comparación de precios</h2>
      {productIds.map((productId, index) => {
        const product = productData[`product${index + 1}`];
        const prices = productData[`prices${index + 1}`];
        const priceDifferences = calculatePriceDifferences(prices);

        return (
          <table key={productId} className="w-full table-auto">
            <thead>
              <tr>
                <th className="px-4 py-2">Producto</th>
                <th className="px-4 py-2">Precio</th>
                <th className="px-4 py-2">Fecha</th>
                <th className="px-4 py-2">Cambio de precio</th>
              </tr>
            </thead>
            <tbody>
              {prices.map((price, idx) => (
                <tr key={price._id} className="border-b">
                  <td className="px-4 py-2">{product.productName}</td>
                  <td className="px-4 py-2">RD${price.productPrice}</td>
                  <td className="px-4 py-2">{formatDate(price.date)}</td>
                  <td
                    className={`px-4 py-2 ${idx > 0 ? "text-yellow-500" : ""}`}
                  >
                    {idx > 0
                      ? roundToTwoDigits(priceDifferences[idx - 1])
                      : "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        );
      })}
    </div>
  );
};

export default PriceComparisonTable;
