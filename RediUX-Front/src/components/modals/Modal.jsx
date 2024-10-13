import React from "react";
import ReactDOM from "react-dom";

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  onConfirm = null,
  onConfirmText = "Confirmar",
}) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-11/12 md:w-1/2 lg:w-1/3">
        <div className="border-b px-4 py-2 flex justify-between items-center">
          <h2 className="text-xl font-semibold">{title}</h2>
          <button
            className="text-gray-500 hover:text-gray-700"
            onClick={onClose}
          >
            &times;
          </button>
        </div>
        <div className="p-4">{children}</div>
        <div className="border-t px-4 py-2 flex justify-end items-center gap-4">
          <button className="red_dark_btn_layout w-3/12" onClick={onClose}>
            Fechar
          </button>
          {onConfirm && (
            <button className="blue_dark_btn_layout w-3/12" onClick={onConfirm}>
              {onConfirmText}
            </button>
          )}
        </div>
      </div>
    </div>,
    document.getElementById("modal-root")
  );
};

export default Modal;
