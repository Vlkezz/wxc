// src/redux/initUserFromSession.ts
import { UserMeAPI } from '../API/Userme';
import type { UserMe } from '../interface/UserInfo';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { setUser } from './loginSlice'; 

export const initUserFromSession = createAsyncThunk<
  UserMe, 
  void,
  { rejectValue: string }
>('auth/initUserFromSession', async (_, { dispatch, rejectWithValue }) => {
  try {
    // 🔹 Восстанавливаем user из localStorage
    const localUser = localStorage.getItem('user');
    if (localUser) {
      const parsedUser = JSON.parse(localUser) as UserMe;
      dispatch(setUser(parsedUser)); // сразу обновляем Redux
    }

    //  Получаем user с сервера (по сессии через cookie)
    const user = await UserMeAPI();
    localStorage.setItem('user', JSON.stringify(user));
    return user;
  } catch (error: any) {
    localStorage.removeItem('user');
    return rejectWithValue('Пользователь не авторизован');
  }
});
