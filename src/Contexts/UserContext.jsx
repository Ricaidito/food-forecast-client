import { createContext, useReducer } from "react";

// Initial state
const initialState = {
  userID: null,
  name: null,
  lastName: null,
  email: null,
  isLogged: false,
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
