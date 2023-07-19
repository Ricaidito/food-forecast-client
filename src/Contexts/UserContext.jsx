import { createContext, useReducer, useEffect } from "react";

// Initial state
const initialState = {
  userID: sessionStorage.getItem("userID") || null,
  name: sessionStorage.getItem("name") || null,
  lastName: sessionStorage.getItem("lastName") || null,
  email: sessionStorage.getItem("email") || null,
  isLogged: sessionStorage.getItem("isLogged") === "true" || false,
};

// Create context
export const UserContext = createContext(initialState);

// Reducer
const userReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        userID: action.payload._id,
        name: action.payload.name,
        lastName: action.payload.lastName,
        email: action.payload.email,
        isLogged: true,
      };
    case "LOGOUT":
      return {
        ...state,
        userID: null,
        name: null,
        lastName: null,
        email: null,
        isLogged: false,
      };
    default:
      return state;
  }
};

// Provider component
export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  useEffect(() => {
    sessionStorage.setItem("userID", state.userID);
    sessionStorage.setItem("name", state.name);
    sessionStorage.setItem("lastName", state.lastName);
    sessionStorage.setItem("email", state.email);
    sessionStorage.setItem("isLogged", state.isLogged);
  }, [state]);

  // Actions
  const login = (userData) => {
    dispatch({
      type: "LOGIN",
      payload: userData,
    });
  };

  const logout = () => {
    dispatch({
      type: "LOGOUT",
    });
  };

  return (
    <UserContext.Provider value={{ ...state, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
