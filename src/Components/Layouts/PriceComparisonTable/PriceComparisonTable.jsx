import { useEffect, useState, useMemo, useCallback } from "react";
import { Table } from "flowbite-react";

const PriceComparisonTable = ({ allProducts }) => {
  const [uniqueMonths, setUniqueMonths] = useState([]);

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
      <Table striped>
        <Table.Head className="text-xs font-bold text-black">
          <Table.HeadCell>Nombre del Producto</Table.HeadCell>
          {uniqueMonths.map(month => (
            <Table.HeadCell key={month}>{month}</Table.HeadCell>
          ))}
        </Table.Head>
        <Table.Body>
          {allProducts.map(product => (
            <Table.Row key={product._id}>
              <Table.Cell className="text-md font-bold text-lime-600">
                {product.productName}
              </Table.Cell>
              {uniqueMonths.map(month => (
                <Table.Cell
                  key={month}
                  className="text-md font-bold uppercase text-black"
                >
                  {product.averagePrices && product.averagePrices[month]
                    ? product.averagePrices[month].toFixed(2)
                    : ""}
                </Table.Cell>
              ))}
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};

export default PriceComparisonTable;
