import type { OrderServiceResponce  } from '../interface/AddServiceInOrder';
import axios from 'axios';

export const getALlOrdersServiceAPI = async (): Promise<OrderServiceResponce []> => {
  try {
    const response = await axios.get<OrderServiceResponce []>('api/orderservices/',  {
      headers: { 'Content-Type': 'application/json', 'Accept-Language': 'ru' }
    });

    return response.data;
  } catch (error: any) {
    console.error('Ошибка при получении заказов:', error);
    throw new Error('Ошибка при получении заказов');
  }
};