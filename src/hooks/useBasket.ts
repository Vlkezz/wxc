import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../redux/store';
import { addToBasket, updateItemQuantity, removeItem, clearBasket, setBasket } from '../redux/basketSlice';
import type { Service } from '../interface/Service';
import { useEffect } from 'react';
import type { BasketItem } from '../redux/basketSlice';

export const useBasket = () => {
  const dispatch = useDispatch();
  const items = useSelector((state: RootState) => state.basket.items);
  const user = useSelector((state: RootState) => state.login.user);

  // Функция добавления товара в корзину
  const addToBasketHandler = (service: Service) => {
    if (!items.some(item => item.service.id === service.id)) {
      dispatch(addToBasket(service));  // Вызываем правильное действие
      return true; // Успешное добавление
    }
    return false; // Товар уже в корзине
  };

  // Проверка, есть ли товар в корзине
  const isInBasket = (id: number) => {
    return items.some(item => item.service.id === id);
  };

  // Обновление количества товара
  const updateItemQuantityHandler = (id: number, quantity: number) => {
    dispatch(updateItemQuantity({ id, quantity }));
  };

  // Удаление товара из корзины
  const removeFromBasketHandler = (id: number) => {
    dispatch(removeItem(id));  // Используем экшн из слайса
  };

  // Очистка корзины
  const clearBasketHandler = () => {
  if (user && user.id) {
    localStorage.removeItem(`basket_${user.id}`);
  }
  dispatch(clearBasket());
};

  // Синхронизация с localStorage
  useEffect(() => {
    if (user) {
      const saved = localStorage.getItem(`basket_${user.id}`);
      if (saved) {
        dispatch(setBasket(JSON.parse(saved) as BasketItem[]));  // Диспатчим слайс
      }
    }
  }, [user, dispatch]);

  useEffect(() => {
    if (user) {
      localStorage.setItem(`basket_${user.id}`, JSON.stringify(items));  // Сохраняем в localStorage
    }
  }, [items, user]);

  return {
    add: addToBasketHandler,          // Используем добавленную функцию
    isInBasket,
    items,
    remove: removeFromBasketHandler,  // Используем функцию удаления
    updateitemQuantity: updateItemQuantityHandler,  // Используем обновленную функцию
    clear: clearBasketHandler,        // Используем функцию очистки корзины
    count: items.reduce((sum, item) => sum + item.quantity, 0),  // Подсчет общего количества товаров
    totalPrice: items.reduce((sum, item) => sum + (item.service.price * item.quantity), 0)  // Подсчет общей стоимости товаров
  };
};