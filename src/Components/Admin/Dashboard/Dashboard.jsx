import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { format, parseISO } from "date-fns";
import PriceComparisonTable from "../../PriceComparisonTable/PriceComparisonTable";
import ProductInfoFrame from "../../ProductInfoFrame/ProductInfoFrame";
import { useProductContext } from "../../../Contexts/ProductContext";
import { Link } from "react-router-dom";

const data = [
  {
    _id: "64b4892f7d2c349327fdb377",
    productPrice: 69,
    productUrl: "https://sirena.do/products/index/product1",
    date: "2023-07-16",
  },
  {
    _id: "64b4892f7d2c349327fdb377",
    productPrice: 46,
    productUrl: "https://sirena.do/products/index/product1",
    date: "2023-07-17",
  },
  {
    _id: "64b4892f7d2c349327fdb377",
    productPrice: 90,
    productUrl: "https://sirena.do/products/index/product2",
    date: "2023-07-16",
  },
  {
    _id: "64b4892f7d2c349327fdb377",
    productPrice: 54,
    productUrl: "https://sirena.do/products/index/product2",
    date: "2023-07-17",
  },
];

data.forEach(item => {
  item.date = parseISO(item.date);
});

const getRandomColor = () => {
  let letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const renderLines = () => {
  const productUrls = [...new Set(data.map(item => item.productUrl))];

  return productUrls.map(url => {
    return (
      <Line
        key={url}
        type="monotone"
        dataKey="productPrice"
        stroke={getRandomColor()}
        data={data.filter(item => item.productUrl === url)}
        name={url}
      />
    );
  });
};

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="label">{`Date: ${format(
          payload[0].payload.date,
          "dd/MM/yyyy"
        )}`}</p>
        <p className="intro">{`Price: ${payload[0].value}`}</p>
        <p className="intro">{`Product: ${payload[0].name}`}</p>
      </div>
    );
  }

  return null;
};

const MyLineChart = () => (
  <div>
    <LineChart
      width={500}
      height={300}
      data={data}
      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey={data => format(data.date, "dd/MM/yyyy")} />
      <YAxis />
      <Tooltip content={<CustomTooltip />} />
      <Legend />
      {renderLines()}
    </LineChart>
  </div>
);

const Dashboard = () => {
  const { selectedProductIds } = useProductContext();

  if (selectedProductIds.length === 0) {
    return (
      <div className="m-2 p-2">
        <p className="text-3xl font-medium text-black">
          Parece que no has seleccionado ningún producto para comparar
        </p>
        <p>
          Puedes seleccionar los productos en el{" "}
          <Link to="/admin/products" className="underline decoration-sky-500">
            catalogo
          </Link>
        </p>
      </div>
    );
  }

  return (
    <div className="m-2 p-2">
      <ProductInfoFrame productIds={selectedProductIds} />
      <PriceComparisonTable productIds={selectedProductIds} />
      {/* <MyLineChart /> */}
    </div>
  );
};

export default Dashboard;
