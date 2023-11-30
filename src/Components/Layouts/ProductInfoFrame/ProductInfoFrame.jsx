import { useEffect } from "react";
import { Table } from "flowbite-react";
import {
  getDisplayCategory,
  getDisplayOrigin,
} from "../../../utils/displayUtils";

const ProductInfoFrame = ({ allProducts, onRemoveProduct }) => {
  const handleRemoveProduct = productId => {
    onRemoveProduct(productId);
  };

  useEffect(() => {}, [allProducts]);

  return (
    <div>
      <div>
        <Table striped>
          <Table.Head className="text-xs font-bold text-black">
            <Table.HeadCell>Nombre del Producto</Table.HeadCell>
            <Table.HeadCell>Categoria</Table.HeadCell>
            <Table.HeadCell>Origen</Table.HeadCell>
            <Table.HeadCell></Table.HeadCell>
          </Table.Head>
          <Table.Body>
            {allProducts.map(product => (
              <Table.Row key={product._id}>
                <Table.Cell className="text-md font-bold text-green-600">
                  {product.productName}
                </Table.Cell>
                <Table.Cell className="text-md font-bold text-black">
                  {getDisplayCategory(product.category)}
                </Table.Cell>
                <Table.Cell className="text-md font-bold text-black">
                  {getDisplayOrigin(product.origin)}
                </Table.Cell>
                <Table.Cell className="text-md font-bold text-black">
                  <button
                    onClick={() => handleRemoveProduct(product._id)}
                    className="rounded-md px-4 py-2 font-semibold"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="h-6 w-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    </div>
  );
};

export default ProductInfoFrame;
