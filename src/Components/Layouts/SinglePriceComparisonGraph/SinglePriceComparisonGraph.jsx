import { useEffect, useState, useRef } from "react";
import { Chart } from "chart.js/auto";
import { getProductsByIdWithPrice } from "../../../services/products.service";
import { getUserProductsWithPriceHistory } from "../../../services/userProducts.service";

const SinglePriceComparisonGraph = ({ productIds, userProductIds }) => {
  const [products, setProducts] = useState([]);
  const [chartInstance, setChartInstance] = useState(null);
  const chartRef = useRef(null);

  // Correct function usage
  const getProducts = productIds => {
    if (userProductIds === null) {
      getUserProductsWithPriceHistory([userProductIds])
        .then(response => {
          setProducts(response.data.products);
        })
        .catch(error => {
          console.error("Error fetching products:", error);
        });
    } else {
      getProductsByIdWithPrice([productIds])
        .then(response => {
          setProducts(response.data.products);
        })
        .catch(error => {
          console.error("Error fetching products:", error);
        });
    }
  };

  // Function corrected to use 'productPrice' instead of 'price'
  const calculateAveragePricePerMonth = priceHistory => {
    const monthlyPrices = {};

    // Group prices by month-year first
    priceHistory.forEach(({ date, productPrice }) => {
      const monthYear = new Date(date).toISOString().slice(0, 7); // YYYY-MM format

      if (!monthlyPrices[monthYear]) {
        monthlyPrices[monthYear] = { total: productPrice, count: 1 };
      } else {
        monthlyPrices[monthYear].total += productPrice;
        monthlyPrices[monthYear].count += 1;
      }
    });

    // Calculate averages and convert keys to Spanish month-year format
    const averages = {};
    Object.keys(monthlyPrices)
      .sort()
      .forEach(monthYear => {
        const [year, month] = monthYear.split("-");
        const date = new Date(year, month - 1);
        const label = date.toLocaleDateString("es-ES", {
          month: "long",
          year: "numeric",
        });
        averages[label] =
          monthlyPrices[monthYear].total / monthlyPrices[monthYear].count;
      });

    return averages;
  };

  // Corrected to use 'productName'
  const generateChartData = products => {
    // Calculate all possible labels from all products first to get the full range of dates
    let allDates = [];
    products.forEach(product => {
      const monthlyPrices = calculateAveragePricePerMonth(product.priceHistory);
      allDates = allDates.concat(Object.keys(monthlyPrices));
    });

    // Remove duplicates and sort
    const uniqueDates = [...new Set(allDates)].sort(
      (a, b) => new Date(a) - new Date(b)
    );

    // Generate dataset for each product
    const datasets = products.map(product => {
      const monthlyPrices = calculateAveragePricePerMonth(product.priceHistory);
      const data = uniqueDates.map(date => monthlyPrices[date] || null);
      // Ensure color string length is 6
      const randomColor = (
        "000000" + Math.floor(Math.random() * 16777215).toString(16)
      ).slice(-6);

      return {
        label: product.productName,
        data,
        fill: false,
        borderColor: "#" + randomColor,
      };
    });

    return { labels: uniqueDates, datasets };
  };

  useEffect(() => {
    getProducts(productIds);
  }, [productIds]);

  useEffect(() => {
    if (products.length > 0) {
      const chartData = generateChartData(products);

      if (chartInstance) {
        chartInstance.destroy();
      }

      const newChartInstance = new Chart(chartRef.current, {
        type: "line",
        data: chartData,
        options: {
          responsive: true,
          scales: {
            x: {
              display: true,
              title: {
                display: true,
                text: "Month",
              },
            },
            y: {
              display: true,
              title: {
                display: true,
                text: "Average Price",
              },
              beginAtZero: true,
            },
          },
        },
      });

      setChartInstance(newChartInstance);
    }
  }, [products]);

  return (
    <div>
      <canvas ref={chartRef} />
    </div>
  );
};

export default SinglePriceComparisonGraph;
