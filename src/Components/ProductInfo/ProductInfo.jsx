const ProductInfo = ({ product }) => {
  const formatDate = dateString => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  };

  return (
    <div className="rounded-lg bg-gray-100 p-4 shadow-md">
      <img
        className="mb-4 rounded-lg shadow-md"
        src={product?.productInfo.imageUrl}
        alt={product?.productInfo.productName}
      />
      <p className="mb-2">
        <span className="font-bold">{product?.productInfo.productName}</span>{" "}
      </p>
      <p className="mb-2">
        <span className="font-bold">Categoría:</span>{" "}
        {product?.productInfo.category}
      </p>
      <p className="mb-2">
        <span className="font-bold">Lugar:</span> {product?.productInfo.origin}
      </p>
      <p className="mb-2">
        <span className="font-bold">Fecha de extracción:</span>{" "}
        {formatDate(product?.productInfo.extractionDate)}
      </p>

      <h2 className="mb-4 mt-4 text-xl font-bold">
        Precio: RD${product?.price.productPrice}
      </h2>
    </div>
  );
};

export default ProductInfo;
