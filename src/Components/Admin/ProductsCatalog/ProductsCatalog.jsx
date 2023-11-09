import { getProducts } from "../../../services/products.service";
import { useState, useEffect } from "react";
import SearchBar from "../../SearchBar/SearchBar";
import { Link } from "react-router-dom";
import { useProductContext } from "../../../Contexts/ProductContext";
import CategoryFilter from "../../CategoryFilter/CategoryFilter";
import "./ProductsCatalog.css";

const ProductsCatalog = () => {
  const { isProductIdSelected, addProductId } = useProductContext();
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [category, setCategory] = useState(null);

  const getAllProducts = (page, selectedCategory) => {
    return getProducts(page, selectedCategory);
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
    window.scrollTo(0, 0);
  };

  const handlePreviousPage = () => {
    if (currentPage === 1) {
      return;
    }

    setCurrentPage(currentPage - 1);
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    getAllProducts(currentPage, category).then(response => {
      setProducts(response.data);
    });
  }, [currentPage, category]);

  return (
    <div>
      <div className=" pl-[8.88rem] pt-[2.94rem]">
        <p className="text-3xl font-medium text-black">CATALOGO</p>
      </div>

      <div className=" ml-[4.88rem] mt-5">
        <SearchBar />
      </div>

      <div className=" ml-[4.88rem] mt-[2.71rem] w-96 ">
        <CategoryFilter switchCategory={setCategory} />
      </div>

      <div className=" pt-[2.71rem]">
        <div className=" grid grid-cols-6 justify-items-center gap-y-6">
          {products.map(p => (
            <div
              key={p._id}
              className="w-full max-w-sm rounded-lg border border-gray-200 bg-white shadow"
            >
              <Link to={`/admin/product/${p._id}`}>
                <img
                  className="rounded-t-lg p-8"
                  src={p.imageUrl}
                  alt="product image"
                />
              </Link>
              <div className="px-5 pb-5">
                <a href="#">
                  <h5 className="w-[141.11px] text-base font-bold leading-tight tracking-tight text-gray-700">
                    {p.productName}
                  </h5>
                </a>
                <div className="mb-3 mt-2.5 flex items-center">
                  <p className=" w-[141.11px] text-lg font-bold leading-tight tracking-tight text-gray-700">
                    Categoria: {p.category}
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-gray-700">
                    Lugar: {p.origin}
                  </span>
                  {!isProductIdSelected(p._id) && (
                    <button
                      onClick={() => {
                        addProductId(p._id);
                      }}
                      className="rounded-lg bg-green-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-blue-300"
                    >
                      Comparar
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col items-center">
        <span className="text-sm text-gray-700">
          <span className="font-semibold text-gray-900">
            Page {currentPage}
          </span>
        </span>
        <div className="xs:mt-0 mt-2 inline-flex">
          <button
            onClick={() => handlePreviousPage()}
            className="flex h-10 items-center justify-center rounded-l bg-green-700 px-4 text-base font-medium text-white hover:bg-green-900"
          >
            <svg
              className="mr-2 h-3.5 w-3.5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 5H1m0 0 4 4M1 5l4-4"
              />
            </svg>
            Prev
          </button>
          <button
            onClick={() => handleNextPage()}
            className="flex h-10 items-center justify-center rounded-r border-0 border-l border-gray-700 bg-green-700 px-4 text-base font-medium text-white hover:bg-green-900"
          >
            Next
            <svg
              className="ml-2 h-3.5 w-3.5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductsCatalog;
