import type { RegisterData, RegisterResponse} from '../interface/RegisterUser';
import axios from 'axios';

export async function registerUserAPI(data: RegisterData): Promise<RegisterResponse> {
  try {
    const response = await axios.post<RegisterResponse>('/api/register/', data, 
    {
      headers: { 'Content-Type': 'application/json','Accept-Language': 'ru', },
    });

    console.log('Ответ от сервера:', response.data);
    return response.data;

     } catch (error: any) {
        if (error.response && error.response.data)
    {
        const errorData = error.response.data;
        const message = Object.values(errorData).flat().join('\n\n') || 'Ошибка регистрации';
        throw new Error(message);
    } 
    else 
    {
        throw new Error('Ошибка, нет данных.');
    }
  }
}
