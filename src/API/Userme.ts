import type { UserMe } from '../interface/UserInfo';
import axios from 'axios';

export async function UserMeAPI(): Promise<UserMe> {
  const response = await axios.get<UserMe>('/api/me/');
  return response.data;
}