import React from "react";
import ProductInfo from "../ProductInfo/ProductInfo";

const ProductInfoFrame = ({ productIds }) => {
  return (
    <div className="m-2 flex justify-evenly p-2">
      {productIds.map(id => (
        <ProductInfo key={id} productId={id} />
      ))}
    </div>
  );
};

export default ProductInfoFrame;
