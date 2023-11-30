import { getProducts } from "../../../services/products.service";
import { useState, useEffect } from "react";
import SearchBar from "../../Layouts/SearchBar/SearchBar";
import { Link } from "react-router-dom";
import { useProductContext } from "../../../Contexts/ProductContext";
import CategoryFilter from "../../Layouts/CategoryFilter/CategoryFilter";
import "./ProductsCatalog.css";

const ProductsCatalog = () => {
  const { isProductIdSelected, addProductId, removeProductId } =
    useProductContext();
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
      <div className="m-0 p-0 pt-5 text-center">
        <div className="container mx-auto px-6 py-5 text-center">
          <h1 className="mb-6 text-4xl font-bold text-gray-800 md:text-6xl">
            Catálogo de <span className="text-green-600">Productos</span>
          </h1>
          <p className="mb-8 text-base text-gray-600 md:text-lg">
            Aqui podrás ver los productos que tenemos disponibles para comparar.
          </p>
        </div>
      </div>
      <div className="mt-5 flex justify-center">
        <SearchBar />
      </div>
      <div className=" flex justify-center">
        <div className=" mt-[2.71rem] flex w-96 justify-center">
          <CategoryFilter switchCategory={setCategory} />
        </div>
      </div>

      <div className=" pt-[2.71rem]">
        <div className=" m-4 flex flex-wrap justify-center">
          {products.map(p => (
            <div
              key={p._id}
              className=" m-3 w-1/6 max-w-sm flex-shrink flex-grow rounded-lg border border-gray-200 bg-gray-100 shadow"
            >
              <div className=" h-4 w-full rounded-t-lg bg-green-600"></div>
              <Link to={`/admin/product/${p._id}`}>
                <img
                  className=" rounded-t-lg  p-8"
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
                  {!isProductIdSelected(p._id) ? (
                    <div onClick={() => addProductId(p._id)}>
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
                          d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3"
                        />
                      </svg>
                    </div>
                  ) : (
                    <div onClick={() => removeProductId(p._id)}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="h-6 w-6"
                      >
                        <path d="M11.644 1.59a.75.75 0 01.712 0l9.75 5.25a.75.75 0 010 1.32l-9.75 5.25a.75.75 0 01-.712 0l-9.75-5.25a.75.75 0 010-1.32l9.75-5.25z" />
                        <path d="M3.265 10.602l7.668 4.129a2.25 2.25 0 002.134 0l7.668-4.13 1.37.739a.75.75 0 010 1.32l-9.75 5.25a.75.75 0 01-.71 0l-9.75-5.25a.75.75 0 010-1.32l1.37-.738z" />
                        <path d="M10.933 19.231l-7.668-4.13-1.37.739a.75.75 0 000 1.32l9.75 5.25c.221.12.489.12.71 0l9.75-5.25a.75.75 0 000-1.32l-1.37-.738-7.668 4.13a2.25 2.25 0 01-2.134-.001z" />
                      </svg>
                    </div>
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
            Página {currentPage}
          </span>
        </span>
        <div className="xs:mt-0 mb-4 mt-2 inline-flex">
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
            Anterior
          </button>
          <button
            onClick={() => handleNextPage()}
            className="flex h-10 items-center justify-center rounded-r border-0 border-l border-gray-700 bg-green-700 px-4 text-base font-medium text-white hover:bg-green-900"
          >
            Siguiente
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
