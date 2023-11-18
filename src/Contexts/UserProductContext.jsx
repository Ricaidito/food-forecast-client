import React, { createContext, useContext, useState, useEffect } from "react";

const UserProductContext = createContext();

export const useUserProductContext = () => useContext(UserProductContext);

export const UserProductProvider = ({ children }) => {
  const [userSelectedProductIds, setSelectedProductIds] = useState(() => {
    const storedIds = window.localStorage.getItem("userSelectedProductIds");
    return storedIds ? JSON.parse(storedIds) : [];
  });

  useEffect(() => {
    window.localStorage.setItem(
      "userSelectedProductIds",
      JSON.stringify(userSelectedProductIds)
    );
  }, [userSelectedProductIds]);

  const addUserProductId = productId => {
    setSelectedProductIds(prevIds =>
      prevIds.includes(productId) ? prevIds : [...prevIds, productId]
    );
  };

  const removeUserProductId = productId => {
    setSelectedProductIds(prevIds => prevIds.filter(id => id !== productId));
  };

  const clearUserProductIds = () => {
    setSelectedProductIds([]);
  };

  const isUserProductIdSelected = productId => {
    return userSelectedProductIds.includes(productId);
  };

  return (
    <UserProductContext.Provider
      value={{
        userSelectedProductIds,
        addUserProductId,
        removeUserProductId,
        clearUserProductIds,
        isUserProductIdSelected,
      }}
    >
      {children}
    </UserProductContext.Provider>
  );
};
