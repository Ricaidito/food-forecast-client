import { useContext } from "react";
import { UserContext } from "./UserContext";

const useUserContext = () => useContext(UserContext);

export default useUserContext;
