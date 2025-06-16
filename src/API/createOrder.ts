import type { OrderResponse } from '../interface/CreateOrder';  
import axios from 'axios';
import { addServicesToOrder } from './addServiceInOrder';

export async function CreateOrderAPI(): Promise<OrderResponse> {
  try {
    const response = await axios.post('/api/orders/create/', {}, {
      headers: { 'Content-Type': 'application/json', 'Accept-Language': 'ru' },
    });

    const orderId = response.data.id;
    localStorage.setItem('orderId', orderId.toString());

    const userRaw = localStorage.getItem('user');
    const user = userRaw ? JSON.parse(userRaw) : null;

    if (user && user.id) {
      const basketRaw = localStorage.getItem(`basket_${user.id}`);

      if (basketRaw) {
        let basket;
        try {
          basket = JSON.parse(basketRaw);
        } catch (e) {
          console.error('Ошибка парсинга basket из localStorage:', e);
          return response.data; 
        }

        const serviceIds: number[] = basket
          .map((item: any) => item.service?.id)
          .filter((id: number | undefined): id is number => typeof id === 'number');

        if (serviceIds.length > 0) {
          try {
            const addServicesResponse = await addServicesToOrder({ order: orderId, services: serviceIds });
            console.log('addServicesToOrder успешно выполнена, ответ:', addServicesResponse);
          } catch (error) {
            console.error('Ошибка при вызове addServicesToOrder:', error);
          }
        } 
      }
    }
    
    return response.data;
  } catch (error: any) {
    console.error('Ошибка при создании заказа:', error);
    throw new Error('Ошибка создания заказа');
  }
}
