import { Link, useNavigate } from "react-router-dom";
import type { RootState, AppDispatch } from '../redux/store';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../redux/loginThunk';
import '../styles/navabar.css';

export default function Navabar() {
  const user = useSelector((state: RootState) => state.login.user);
  const isAuthenticated = Boolean(user);
  const isStaff = user?.is_staff ?? false;
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const logout = async () => {
    try {
      const resultAction = await dispatch(logoutUser());
      if (logoutUser.fulfilled.match(resultAction)) {
        navigate('/'); 
      } else {
        alert('Ошибка выхода');
      }
    } catch (error) {
      console.error('Ошибка при выходе:', error);
    }
  };

return (
    <nav>
      <ul>
        {/* Доступно всем */}
        <li>
          <Link to="/">Главная</Link>
        </li>

        {!isAuthenticated && (
          <>
            {/* Только для неавторизованных */}
            <li>
              <Link to="/login">Войти</Link>
            </li>
          </>
        )}

        {isAuthenticated && !isStaff && (
          <>
            {/* Для обычных авторизованных пользователей */}
            <li>
              <Link to="/basket">Корзина</Link>
            </li>
            <li>
              <Link to="/my-orders">Мои заказы</Link>
            </li>
            <li>
              <button className="navabar-button" onClick={logout}>Выйти</button>
            </li>
          </>
        )}

        {isAuthenticated && isStaff && (
          <>
            <li>
              <Link to="/allOrders">Все заявки</Link>
            </li>
            <li>
              <button className="navabar-button" onClick={logout}>Выйти</button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}