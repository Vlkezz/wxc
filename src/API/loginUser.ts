import type { LoginData, LoginResponse } from '../interface/LoginUser';
import type { UserMe } from '../interface/UserInfo';
import { UserMeAPI } from './Userme'; 
import axios from 'axios';

export async function loginUserAPI(data: LoginData): Promise<{ loginResponse: LoginResponse; user: UserMe }> {
  try {
    const response = await axios.post<LoginResponse>('/api/login/',data);

    console.log('Ответ от сервера:', response.data);
  
    const user = await UserMeAPI();
    console.log('Данные:', user );
    return { loginResponse: response.data, user };;

    } catch (error: any) {
        if (error.response && error.response.data)
    {
        const errorData = error.response.data;
        const message = Object.values(errorData).flat().join('\n\n') || 'Ошибка входа';
        throw new Error(message);
    } 
    else 
    {
        throw new Error('Ошибка, нет данных.');
    }
  }
}
