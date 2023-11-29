import { useCallback, useEffect, useState, useMemo } from "react";
import { getProductsByIdWithPrice } from "../../../services/products.service";
import useUserContext from "../../../Contexts/useUserContext";
import { getUserProductsWithPriceHistory } from "../../../services/userProducts.service";

const useFetchUserProducts = (userID, productIds) => {
  const [userProducts, setUserProducts] = useState([]);

  useEffect(() => {
    getUserProductsWithPriceHistory(userID, productIds)
      .then(response => {
        setUserProducts(response.data);
      })
      .catch(error => {
        console.error("Error fetching user products:", error);
      });
  }, [userID, productIds]);

  return userProducts;
};
const useFetchCatalogProducts = catalogProductIds => {
  const [catalogProducts, setCatalogProducts] = useState([]);

  useEffect(() => {
    getProductsByIdWithPrice(catalogProductIds)
      .then(response => {
        setCatalogProducts(response.data.products);
      })
      .catch(error => {
        console.error("Error fetching products:", error);
      });
  });

  return catalogProducts;
};
const PriceComparisonTable = ({ productIds, userProductIds }) => {
  const [uniqueMonths, setUniqueMonths] = useState([]);
  const { userID } = useUserContext();
  const userProducts = useFetchUserProducts(userID, userProductIds);
  const catalogProducts = useFetchCatalogProducts(productIds);
  const allProducts = useMemo(
    () => [...userProducts, ...catalogProducts],
    [userProducts, catalogProducts]
  );

  const calculateAveragePrices = useCallback(product => {
    const averagePrices = {};
    let months = new Set();

    product.priceHistory.forEach(priceHistoryItem => {
      const date = new Date(priceHistoryItem.date);
      const month = date.toLocaleDateString("es-ES", {
        month: "long",
        year: "numeric",
      });

      months.add(month);

      if (!averagePrices[month]) {
        averagePrices[month] = { total: 0, count: 0 };
      }
      averagePrices[month].total += priceHistoryItem.productPrice;
      averagePrices[month].count += 1;
    });

    for (const month in averagePrices) {
      const average = averagePrices[month].total / averagePrices[month].count;
      averagePrices[month] = parseFloat(average.toFixed(2));
    }

    product.averagePrices = averagePrices;
    return Array.from(months);
  }, []);

  const sortedUniqueMonths = useMemo(() => {
    let tempUniqueMonthsSet = new Set();
    allProducts.forEach(product => {
      const productMonths = calculateAveragePrices(product);
      productMonths.forEach(month => tempUniqueMonthsSet.add(month));
    });
    return Array.from(tempUniqueMonthsSet).sort(
      (a, b) => new Date(a) - new Date(b)
    );
  }, [allProducts, calculateAveragePrices]);

  useEffect(() => {
    setUniqueMonths(sortedUniqueMonths);
  }, [sortedUniqueMonths]);

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
          {allProducts.map(product => (
            <tr key={product._id} className="border-b bg-white">
              <th
                scope="row"
                className="whitespace-nowrap px-6 py-4 font-medium text-gray-900"
              >
                {product.productName}
              </th>
              {uniqueMonths.map(month => (
                <td key={month} className="px-6 py-4">
                  {product.averagePrices && product.averagePrices[month]
                    ? product.averagePrices[month].toFixed(2)
                    : ""}
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
