import { useNavigate } from 'react-router-dom';
import type { RegisterResponse } from '../interface/RegisterUser';

export function useRegister() {
  const navigate = useNavigate();
  const isAuthenticated = Boolean(localStorage.getItem('access'));
  const isStaff = localStorage.getItem('is_staff') === 'false';

  const register = (response: RegisterResponse) => {
    const { access, refresh, user } = response;
    localStorage.setItem('access', access);
    localStorage.setItem('refresh', refresh);
    localStorage.setItem('is_staff', String(user.is_staff));
  };

  const logout = () => {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    localStorage.removeItem('is_staff');
    navigate('/');
  };

  return { isAuthenticated, isStaff, register, logout };
}

