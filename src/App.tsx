import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import Router from './Routes/Route.tsx';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';
import { useAppDispatch } from './hooks/useAppDispatch.ts';
import { initUserFromSession } from './redux/initUserFromSession';
import { setBasket } from './redux/basketSlice';
import type { BasketItem } from './redux/basketSlice';

axios.defaults.withCredentials = true;

function App() {
  const location = useLocation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const init = async () => {
      const result = await dispatch(initUserFromSession());

      if (initUserFromSession.fulfilled.match(result)) {
        const user = result.payload;
        const basketRaw = localStorage.getItem(`basket_${user.id}`);
        if (basketRaw) {
          try {
            const basket = JSON.parse(basketRaw) as BasketItem[];
            dispatch(setBasket(basket)); 
          } catch (e) {
            console.error('Ошибка чтения корзины из localStorage', e);
          }
        }
      }
    };

    init();
  }, [dispatch]);

  const hideLayoutOn = ['/login', '/register'];
  const hideLayout = hideLayoutOn.includes(location.pathname);

  return (
    <div className="App">
      {!hideLayout && <Header />}

      <div className="main-content">
        <Router />
      </div>

      {!hideLayout && <Footer />}
    </div>
  );
}

export default App;
