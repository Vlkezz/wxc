import type { Service } from '../interface/Service';
import axios from 'axios';

export async function ServiceByIdAPI(id: string): Promise<Service> {
  try {
    const response = await axios.get<Service>(`/api/services/${id}`);

    return response.data;
  } 
    catch (error: any) 
  {
    throw new Error('Ошибка загрузки услуги');
  }
}
