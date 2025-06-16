import axios from 'axios';
import type { OrderServiceData, OrderServiceResponce } from '../interface/AddServiceInOrder'; 

export const addServicesToOrder = async (data: OrderServiceData): Promise<OrderServiceResponce[]> => {
  try {
    // Отправляем запрос на сервер
    const response = await axios.post<OrderServiceResponce[]>('/api/orderservices/', data,
    {
      headers: { 'Content-Type': 'application/json','Accept-Language': 'ru', },
    });

    // Возвращаем данные, полученные от сервера
    return response.data;
  } catch (error: any) {
    console.error('Ошибка при добавлении услуг в заказ:', error);
    throw new Error('Ошибка при добавлении услуг в заказ');
  }
};