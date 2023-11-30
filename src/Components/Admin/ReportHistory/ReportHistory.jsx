import useUserContext from "../../../Contexts/useUserContext";
import { toast } from "react-toastify";
import axios from "axios";
import {
  TrashIcon,
  ArchiveBoxArrowDownIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline";

const ReportHistory = ({ userReports, fetchReports }) => {
  const { userID } = useUserContext();

  const downloadReport = async report => {
    try {
      const response = await axios.get(
        `https://food-forecast-server.azurewebsites.net/reports/data/${report._id}`,
        {
          responseType: "blob",
        }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", report.fileName);
      document.body.appendChild(link);
      link.click();
      toast.success("Reporte descargado");
    } catch (error) {
      toast.error("Error descargando reporte");
    }
  };

  const deleteReport = async report => {
    try {
      await axios.delete(
        `https://food-forecast-server.azurewebsites.net/reports/${report._id}`
      );
      toast.success("Reporte eliminado.");
      fetchReports();
    } catch (error) {
      toast.error("Error eliminando reporte.");
    }
  };

  const deleteAllReports = async () => {
    try {
      await axios.delete(
        `https://food-forecast-server.azurewebsites.net/reports/history/${userID}`
      );
      toast.success("Reportes eliminados.");
      fetchReports();
    } catch (error) {
      toast.error("Error eliminando reportes.");
    }
  };

  if (userReports.length === 0)
    return (
      <div className="p-4">
        <p className="font-bold">Historial de reportes generados:</p>
        <p>Aún no has generado reportes...</p>
      </div>
    );

  return (
    <div className="p-4">
      <p className="mb-2 font-bold">Historial de reportes generados:</p>
      <ul className="h-[7rem] space-y-2 overflow-hidden overflow-y-auto">
        {userReports.map(report => (
          <li key={report._id} className="flex items-center justify-between">
            <DocumentTextIcon className="h-5 w-5 text-gray-500" />
            <span className="ml-2 flex-1">{report.fileName}</span>
            <button
              onClick={() => downloadReport(report)}
              className="p-1 text-green-500 hover:text-green-600"
            >
              <ArchiveBoxArrowDownIcon className="h-5 w-5" />
            </button>
            <button
              onClick={() => deleteReport(report)}
              className="p-1 text-red-600"
            >
              <TrashIcon className="h-5 w-5" />
            </button>
          </li>
        ))}
      </ul>
      {userReports.length > 0 && (
        <button
          onClick={deleteAllReports}
          className="mt-4 flex items-center rounded bg-red-600 p-2 text-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="mr-2 h-5 w-5"
          >
            <path
              fillRule="evenodd"
              d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z"
              clipRule="evenodd"
            />
          </svg>
          Limpiar Historial
        </button>
      )}
    </div>
  );
};

export default ReportHistory;
