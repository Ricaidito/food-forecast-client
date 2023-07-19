import "./Settings.css";
import useUserContext from "../../../Contexts/useUserContext";
import { getUserImage } from "../../../services/user.service";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const Settings = () => {
  const [userImage, setUserImage] = useState();
  const { userID, name, lastName, email, logout } = useUserContext();

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    sessionStorage.removeItem("session");
    navigate("/");
  };

  useEffect(() => {
    getUserImage(userID).then(
      response => {
        setUserImage(response.data);
      },
      [userID]
    );
  });

  return (
    <div className=" mt-20">
      <div className=" grid justify-items-center">
        <div className=" flex gap-x-16">
          <div className=" mt-24">
            <div className="w-full max-w-sm rounded-lg border border-gray-200 bg-white shadow">
              <div className="px-5 pb-5">
                <h5 className="mb-6 text-base font-bold leading-tight tracking-tight text-gray-700">
                  Nombre: {name} {lastName}
                </h5>
                <div className="mb-6 mt-2.5 flex items-center">
                  <p className=" w-[141.11px] text-lg font-bold leading-tight tracking-tight text-gray-700">
                    Correo: {email}
                  </p>
                </div>
                <div className=" flex gap-x-2">
                  <button
                    className="ml-[3.88rem] inline-flex items-center rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
                    onClick={() => handleLogout()}
                  >
                    Salir
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div>
            <img src={`data:image/jpeg;base64,${userImage}`} alt="User Image" />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Settings;
