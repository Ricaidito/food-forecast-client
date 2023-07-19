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
      (response) => {
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
            <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow">
              <div className="px-5 pb-5">
                <h5 className="text-gray-700 text-base font-bold leading-tight tracking-tight mb-6">
                  Nombre: {name} {lastName}
                </h5>
                <div className="flex items-center mt-2.5 mb-6">
                  <p className=" text-lg text-gray-700 font-bold leading-tight tracking-tight w-[141.11px]">
                    Correo: {email}
                  </p>
                </div>
                <div className=" flex gap-x-2">
                  <button
                    className="inline-flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-md ml-[3.88rem]"
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
