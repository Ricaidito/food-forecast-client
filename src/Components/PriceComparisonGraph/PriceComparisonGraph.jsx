import { useEffect, useState, useRef } from "react";
import { Chart } from "chart.js/auto";
import { getProductByIdWithPrice } from "../../services/products.service";

const PriceComparisonGraph = ({ productIds }) => {
  const [products, setProducts] = useState([]);
  const [chartInstance, setChartInstance] = useState(null);
  const chartRef = useRef(null);

  const getProducts = productIds => {
    getProductByIdWithPrice(productIds)
      .then(response => {
        setProducts(response.data.products);
      })
      .catch(error => {
        console.error("Error fetching products:", error);
      });
  };

  const calculateAveragePricePerMonth = priceHistory => {
    const monthlyPrices = {};

    priceHistory.forEach(({ date, price }) => {
      const monthYear = new Date(date).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      });

      if (!monthlyPrices[monthYear]) {
        monthlyPrices[monthYear] = { total: price, count: 1 };
      } else {
        monthlyPrices[monthYear].total += price;
        monthlyPrices[monthYear].count += 1;
      }
    });

    for (const monthYear in monthlyPrices) {
      monthlyPrices[monthYear] =
        monthlyPrices[monthYear].total / monthlyPrices[monthYear].count;
    }

    return monthlyPrices;
  };

  const generateChartData = products => {
    const datasets = products.map(product => {
      const monthlyPrices = calculateAveragePricePerMonth(product.priceHistory);

      return {
        label: product.name,
        data: Object.values(monthlyPrices),
        fill: false,
        borderColor: "#" + Math.floor(Math.random() * 16777215).toString(16), // Random color
      };
    });

    return {
      labels: Object.keys(
        calculateAveragePricePerMonth(products[0].priceHistory)
      ),
      datasets,
    };
  };

  useEffect(() => {
    getProducts(productIds);
  }, [productIds]);

  useEffect(() => {
    if (products.length > 0) {
      const chartData = generateChartData(products);

      // If there's an existing chart instance, destroy it
      if (chartInstance) {
        chartInstance.destroy();
      }

      // Create a new chart instance and save it in the state
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
                text: "Price",
              },
            },
          },
        },
      });

      setChartInstance(newChartInstance);
    }
  }, [products]);

  return (
    <div>
      <h1>Price Comparison Graph</h1>
      <canvas ref={chartRef} />
    </div>
  );
};

export default PriceComparisonGraph;
