// ProductContext.js
import React, { createContext, useContext, useState, useEffect } from "react";

const ProductContext = createContext();

export function useProductContext() {
  return useContext(ProductContext);
}

export function ProductProvider({ children }) {
  const [selectedProductIds, setSelectedProductIds] = useState(
    () => JSON.parse(window.localStorage.getItem("selectedProductIds")) || []
  );

  useEffect(() => {
    window.localStorage.setItem(
      "selectedProductIds",
      JSON.stringify(selectedProductIds)
    );
  }, [selectedProductIds]);

  const addProductId = productId => {
    if (!selectedProductIds.includes(productId)) {
      setSelectedProductIds(prevIds => [...prevIds, productId]);
    }
  };

  const removeProductId = productId => {
    setSelectedProductIds(prevIds => prevIds.filter(id => id !== productId));
  };

  const clearProductIds = () => {
    setSelectedProductIds([]);
  };

  const isProductIdSelected = productId => {
    return selectedProductIds.includes(productId);
  };

  return (
    <ProductContext.Provider
      value={{
        selectedProductIds,
        addProductId,
        removeProductId,
        clearProductIds,
        isProductIdSelected,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}
