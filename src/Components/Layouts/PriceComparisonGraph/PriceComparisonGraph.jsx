import { useEffect, useState, useRef } from "react";
import { Chart } from "chart.js/auto";

const shouldUpdateChart = (newProducts, prevProducts) => {
  const newProductsString = JSON.stringify(
    newProducts.map(product => {
      return { id: product._id, lastUpdate: product.lastUpdate };
    })
  );
  const prevProductsString = JSON.stringify(
    prevProducts.map(product => {
      return { id: product._id, lastUpdate: product.lastUpdate };
    })
  );

  return newProductsString !== prevProductsString;
};

const PriceComparisonGraph = ({ allProducts }) => {
  const [chartInstance, setChartInstance] = useState(null);
  const chartRef = useRef(null);
  const [prevProducts, setPrevProducts] = useState([]);

  const calculateAveragePricePerMonth = priceHistory => {
    const monthlyPrices = {};

    priceHistory.forEach(({ date, productPrice }) => {
      const monthYear = new Date(date).toISOString().slice(0, 7);

      if (!monthlyPrices[monthYear]) {
        monthlyPrices[monthYear] = { total: productPrice, count: 1 };
      } else {
        monthlyPrices[monthYear].total += productPrice;
        monthlyPrices[monthYear].count += 1;
      }
    });

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

  const generateChartData = products => {
    let allDates = [];
    products.forEach(product => {
      const monthlyPrices = calculateAveragePricePerMonth(product.priceHistory);
      allDates = allDates.concat(Object.keys(monthlyPrices));
    });

    const uniqueDates = [...new Set(allDates)].sort(
      (a, b) => new Date(a) - new Date(b)
    );

    const datasets = products.map(product => {
      const monthlyPrices = calculateAveragePricePerMonth(product.priceHistory);
      const data = uniqueDates.map(date => monthlyPrices[date] || null);
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
    if (
      allProducts.length > 0 &&
      shouldUpdateChart(allProducts, prevProducts)
    ) {
      const chartData = generateChartData(allProducts);

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
                text: "Mes",
              },
            },
            y: {
              display: true,
              title: {
                display: true,
                text: "Precio Promedio",
              },
              beginAtZero: true,
            },
          },
        },
      });

      setPrevProducts(allProducts);

      setChartInstance(newChartInstance);
    }
  }, [allProducts]);

  return (
    <div className="flex min-h-[300px] w-full min-w-[300px] items-center justify-center">
      <canvas ref={chartRef} className=" h-full w-full" />
    </div>
  );
};

export default PriceComparisonGraph;
