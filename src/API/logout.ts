import axios from 'axios';

export interface LogoutResponse {detail: string;}

export async function logoutAPI(): Promise<LogoutResponse>  {
  try {
    const response =  await axios.post('/api/logout/', null);
    return response.data; 
  } 
  catch (error) {
    console.error('Ошибка при выходе:', error);
    throw error;
  }
}
