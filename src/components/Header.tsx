import '../styles/header.css';
import Navabar from './Navabar';
import type { RootState } from '../redux/store';
import { useSelector } from 'react-redux';
 
export default function Header() {
  const user = useSelector((state: RootState) => state.login.user);
  const isAuthenticated = Boolean(user);
  const isStaff = user?.is_staff ?? false;
  const username = user?.username || '';
 
  return (
    <header>
      <div className="start">
        <h1>
          {isAuthenticated 
            ? isStaff
              ? <>Добро пожаловать администратор: <span className="admin-username">{username}</span></>
              : <>C возвращением <span className='user-username'>{username}</span></>
            : "Добро пожаловать на сайт для работы с серверным ПО"
          }
        </h1>
      </div>
        < Navabar />
    </header>
  );
}
