// ProductContext.js
import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";

const ProductContext = createContext();

export function useProductContext() {
  return useContext(ProductContext);
}

export function ProductProvider({ children }) {
  // State for product IDs
  const [selectedProductIds, setSelectedProductIds] = useState(
    () => JSON.parse(window.localStorage.getItem("selectedProductIds")) || []
  );

  // State for user product IDs
  const [selectedUserProductIds, setSelectedUserProductIds] = useState(
    () =>
      JSON.parse(window.localStorage.getItem("selectedUserProductIds")) || []
  );

  // Effect for persisting product IDs
  useEffect(() => {
    window.localStorage.setItem(
      "selectedProductIds",
      JSON.stringify(selectedProductIds)
    );
  }, [selectedProductIds]);

  // Effect for persisting user product IDs
  useEffect(() => {
    window.localStorage.setItem(
      "selectedUserProductIds",
      JSON.stringify(selectedUserProductIds)
    );
  }, [selectedUserProductIds]);

  // Product ID management
  const addProductId = productId => {
    if (!selectedProductIds.includes(productId)) {
      setSelectedProductIds(prevIds => [...prevIds, productId]);
      toast.success("Producto Añadido Correctamente!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const removeProductId = productId => {
    setSelectedProductIds(prevIds => prevIds.filter(id => id !== productId));
    toast.success("Producto Eliminado Correctamente!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const clearProductIds = () => {
    setSelectedProductIds([]);
  };

  const isProductIdSelected = productId => {
    return selectedProductIds.includes(productId);
  };

  // User Product ID management
  const addUserProductId = userProductId => {
    if (!selectedUserProductIds.includes(userProductId)) {
      setSelectedUserProductIds(prevIds => [...prevIds, userProductId]);
      toast.success("Producto Añadido Correctamente!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const removeUserProductId = userProductId => {
    setSelectedUserProductIds(prevIds =>
      prevIds.filter(id => id !== userProductId)
    );
    toast.success("Producto Eliminado Correctamente!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const clearUserProductIds = () => {
    setSelectedUserProductIds([]);
  };

  const isUserProductIdSelected = userProductId => {
    return selectedUserProductIds.includes(userProductId);
  };

  return (
    <ProductContext.Provider
      value={{
        selectedProductIds,
        addProductId,
        removeProductId,
        clearProductIds,
        isProductIdSelected,
        selectedUserProductIds,
        addUserProductId,
        removeUserProductId,
        clearUserProductIds,
        isUserProductIdSelected,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}
