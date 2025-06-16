import React from 'react';
import '../styles/authCard.css';

interface AuthCardProps { title: string; onSubmit: (e: React.FormEvent) => void;  onClose?: () => void; children: React.ReactNode; }

const AuthCard: React.FC<AuthCardProps> = ({ title, onSubmit,onClose , children }) => {
  return (
    <div className="container d-flex flex-column justify-content-center align-items-center">
      <form className="card p-4 shadow" style={{ maxWidth: '400px', width: '100%' }} onSubmit={onSubmit}> 
        {onClose && (
          <button type="button" onClick={onClose} className="close-button">
            <img src="/images/close.png" alt="Закрыть"/>
          </button>
        )}

        <h2 className="mb-2 text-center">{title}</h2>
        {children}
      </form>
    </div>
  );
};

export default AuthCard;
