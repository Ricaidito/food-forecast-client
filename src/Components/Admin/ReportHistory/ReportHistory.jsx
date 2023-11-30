import useUserContext from "../../../Contexts/useUserContext";
import { toast } from "react-toastify";
import axios from "axios";
import {
  TrashIcon,
  ArchiveBoxArrowDownIcon,
  DocumentTextIcon,
  XCircleIcon,
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
              className="p-1 text-red-500 hover:text-red-600"
            >
              <TrashIcon className="h-5 w-5" />
            </button>
          </li>
        ))}
      </ul>
      {userReports.length > 0 && (
        <button
          onClick={deleteAllReports}
          className="mt-4 flex items-center rounded bg-red-500 p-2 text-white hover:bg-red-600"
        >
          <XCircleIcon className="mr-2 h-5 w-5" />
          Limpiar Historial
        </button>
      )}
    </div>
  );
};

export default ReportHistory;
