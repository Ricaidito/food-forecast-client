const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black opacity-50"></div>

      <div className="z-10 m-auto max-w-md rounded-lg bg-white p-4">
        <button onClick={onClose} className="float-right text-lg">
          ×
        </button>
        {/* children es lo que va dentro de las etiquetas del componente cuando lo usas */}
        {children}
      </div>
    </div>
  );
};

export default Modal;
