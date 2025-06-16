import type { Service } from '../interface/Service';
import type { ServiceFilter } from '../interface/Form';
import axios from 'axios';

export async function ServicesAPI(filters: ServiceFilter): Promise<Service[]> {
  try {
    const params: Record<string, string> = {};

    if (filters.name) params.name = filters.name;
    if (filters.price_min != null) params.price_min = String(filters.price_min);
    if (filters.price_max != null) params.price_max = String(filters.price_max);

    const response = await axios.get<Service[]>('/api/services/');

    return response.data;
  } 
    catch (error: any) 
  {
    throw new Error('Ошибка при загрузке услуг');
  }
}
