import React from 'react';
import '../styles/modal.css';

interface ModalProps {
  message: string;
  onClose: () => void;
  type?: 'success' | 'error';
}

const Modal: React.FC<ModalProps> = ({ message, onClose, type = 'success' }) => {
  return (
    <div className="modal">
      <div className={`modal-window ${type}`}>
        <p>{message}</p>
        <button onClick={onClose} className="modal-close-btn">ОК</button>
      </div>
    </div>
  );
};

export default Modal;
