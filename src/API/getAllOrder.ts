import type { OrderResponse } from '../interface/CreateOrder';
import axios from 'axios';

export const getAllOrderAPI = async (): Promise<OrderResponse[]> => {
  try {
   const response = await axios.get<OrderResponse[]>('/api/orders/', {
   headers: { 'Content-Type': 'application/json', 'Accept-Language': 'ru' }
});

    return response.data;
  } catch (error: any) {
    console.error('Ошибка при получении заказов:', error);
    throw new Error('Ошибка при получении заказов');
  }
};