import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthCard from '../components/AuthCard';
import '../styles/registeForm.css';
import { registerUserAPI } from '../API/registerUser';
import Modal from '../components/Modal';
import { useRegister } from '../hooks/useRegister';

const RegisterForm: React.FC = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [modal, setModal] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
    const { register } = useRegister();
    const goToLogin = () => { navigate('/login'); };
    const navigate = useNavigate();
    const handleSubmit = async (e: React.FormEvent) => { e.preventDefault();

        try {
            const responce  = await registerUserAPI({username,email,password,confirmPassword});
            register(responce);
            setModal({ message: 'Спасибо за регистрацию на нашем сайте!', type: 'success' });
            setTimeout(() => { setModal(null); navigate('/'); }, 1500);
        } catch (err: any) {
            setModal({ message: err.message, type: 'error' });
            console.error('Ошибка регистрации:', err);
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
            <AuthCard title="Регистрация" onSubmit={handleSubmit} onClose={() => navigate('/')}>
                <div className="mb-2">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Имя пользователя"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-2">
                    <input
                        type="email"
                        className="form-control"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-2">
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Пароль"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-2">
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Повторите пароль"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>

                <button type="submit" className="btn w-100 custom-register">
                    Зарегистрироваться
                </button>

                <p className="mb-2 text-center ">
                    Уже есть аккаунт?{' '}
                    <button type="button" className="сustom-register" onClick={goToLogin}>
                        Войти
                    </button>
                </p>
            </AuthCard>
        </>
    );
};

export default RegisterForm;
