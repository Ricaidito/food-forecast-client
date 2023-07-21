// ProductContext.js
import React, { createContext, useContext, useState } from "react";

const ProductContext = createContext();

export function useProductContext() {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProductContext must be used within a ProductProvider");
  }
  return context;
}

export function ProductProvider({ children }) {
  const [selectedProductIds, setSelectedProductIds] = useState([]);

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
