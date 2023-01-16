import { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { FaTimes } from "react-icons/fa";

const Modal = ({ show, onClose, children, title }) => {
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  const handleClose = (e) => {
    e.preventDefault();
    onClose();
  };

  const modalContent = show ? (
    <div className="absolute h-[100%] bg-opacity-20 bg-black top-0 left-0 bottom-0 right-0">
      <div className="h-96 w-96 p-8 rounded-md shadow-xl bg-white relative top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-100">
        <div className="flex justify-end">
          <button
            className="text-xl transition-all hover:text-rose-600"
            onClick={(e) => handleClose(e)}
          >
            <FaTimes />
          </button>
        </div>
        {title && <div>{title}</div>}
        <div className="modal-body">{children}</div>
      </div>
    </div>
  ) : null;

  if (isBrowser) {
    return ReactDOM.createPortal(
      modalContent,
      document.getElementById("modal-root")
    );
  } else {
    return null;
  }
};

export default Modal;
