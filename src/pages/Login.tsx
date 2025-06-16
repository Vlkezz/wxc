import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/loginForm.css';
import Modal from '../components/Modal';
import AuthCard from '../components/AuthCard';
import { useDispatch } from 'react-redux';
import { loginUser } from '../redux/loginThunk';
import type {  AppDispatch } from '../redux/store';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [modal, setModal] = useState<{ message: string; type: 'success' |'error' } | null>(null);
  const navigate = useNavigate();
  const goToRegister = () => {navigate('/register'); };
  const dispatch = useDispatch<AppDispatch>();
  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setModal(null);


   try {
      const resultAction = await dispatch(loginUser({ username, password }));

      if (loginUser.fulfilled.match(resultAction)) {
        setModal({ message: 'Вы успешно вошли!', type: 'success' });
        setTimeout(() => navigate('/'), 1000);
      } else if (loginUser.rejected.match(resultAction)) {
        setModal({ message: resultAction.payload ?? 'Ошибка входа', type: 'error' });
      }
    } catch (err) {
      setModal({ message: 'Ошибка при запросе', type: 'error' });
      console.error(err);
    }
  };
 
  useEffect(() => {
    document.body.style.backgroundColor = 'whitesmoke';

    return () => {
      document.body.style.backgroundColor = '';
    };
  }, []);

  return (
    <>
        {modal && (
            <Modal
                message={modal.message}
                type={modal.type}
                onClose={() => setModal(null)}
    />
        )}
     <AuthCard title="Вход" onSubmit={handleSubmit} onClose={() => navigate('/')}> 
      <div className="mb-2">
        <input
          type="text"
          className="form-control custom-log"
          placeholder="Введите имя"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>

      <div className="mb-2">
        <input
          type="password"
          className="form-control custom-password"
          placeholder="Введите пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

        <button type="submit" className="btn w-100 custom-login">
          Войти
        </button>
        <p className="mb-2 text-center ">
        Нет аккаунта?{' '}
        <button type="button" className="сustom-register" onClick={goToRegister}>
          Зарегистрироваться
        </button>
      </p>

    </AuthCard>
    </>
  );
};

export default LoginForm;
