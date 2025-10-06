import { createPortal } from "react-dom";

import "./Modal.css";

export default function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return createPortal(
    <div className="overlay" onClick={onClose}>
      <div
        className="content"
        onClick={(e) => e.stopPropagation()}
        style={{ background: "url('/img/Lines.svg')" }}
      >
        {children}
      </div>
    </div>,
    document.getElementById("modal-root")
  );
}
