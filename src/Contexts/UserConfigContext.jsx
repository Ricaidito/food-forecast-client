import React, { createContext, useState, useContext, useEffect } from "react";
import useUserContext from "./useUserContext";

const UserConfigContext = createContext();

export const useUserConfigContext = () => useContext(UserConfigContext);

export const UserConfigContextProvider = ({ children }) => {
  const [userConfig, setUserConfig] = useState(() => {
    const savedConfig = localStorage.getItem("userConfig");
    return savedConfig ? JSON.parse(savedConfig) : null;
  });

  const { userID } = useUserContext();

  const fetchUserConfig = async () => {
    try {
      if (!userID) return;
      const response = await fetch(
        `https://food-forecast-server.azurewebsites.net/user-config/config/${userID}`
      );
      const data = await response.json();
      setUserConfig(data);
    } catch (error) {
      console.error("Error fetching user config:", error);
    }
  };

  useEffect(() => {
    if (userID) {
      fetchUserConfig();
    }
  }, [userID]);

  useEffect(() => {
    if (userConfig) {
      localStorage.setItem("userConfig", JSON.stringify(userConfig));
    }
  }, [userConfig]);

  const removeUserConfig = () => {
    setUserConfig(null);
    localStorage.removeItem("userConfig");
  };

  const refetchUserConfig = () => {
    fetchUserConfig();
  };

  return (
    <UserConfigContext.Provider
      value={{ ...userConfig, removeUserConfig, refetchUserConfig }}
    >
      {children}
    </UserConfigContext.Provider>
  );
};
