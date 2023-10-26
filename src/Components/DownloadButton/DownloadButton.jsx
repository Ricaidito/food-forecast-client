import axios from "axios";

const DownloadButton = ({ downloadUrl, fileName, children }) => {
  const handleDownload = async () => {
    try {
      const response = await axios.get(downloadUrl, {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();

      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error during file download:", error);
    }
  };

  return (
    <div className="mt-5 flex justify-center">
      <button
        onClick={handleDownload}
        className="inline-flex items-center rounded bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-700"
      >
        <svg
          className="mr-2 h-4 w-4 fill-current"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
        >
          <path d="M.5 9.5a.5.5 0 0 1 .5-.5h4.5V1.5a.5.5 0 0 1 1 0v7.5h4.5a.5.5 0 0 1 0 1H9v4.5a.5.5 0 0 1-1 0V10H1a.5.5 0 0 1-.5-.5zM4 0a.5.5 0 0 1 .5.5V8h3V.5a.5.5 0 0 1 1 0V8h3.5a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-.5.5H1a.5.5 0 0 1-.5-.5v-6a.5.5 0 0 1 .5-.5H4V.5A.5.5 0 0 1 4 0z" />
        </svg>
        {children}
      </button>
    </div>
  );
};

export default DownloadButton;
