import { createAsyncThunk } from '@reduxjs/toolkit';
import { loginUserAPI } from '../API/loginUser';
import { logoutAPI } from '../API/logout';
import { UserMeAPI } from '../API/Userme';
import type { UserMe } from '../interface/UserInfo';
import type { LoginData } from '../interface/LoginUser';

export const loginUser = createAsyncThunk<
  UserMe,                          // тип возвращаемого значения (payload)
  LoginData,                      // тип аргумента (данные логина)
  { rejectValue: string }         // тип для rejectWithValue (ошибка)
>(
  'auth/loginUser',
  async (credentials, { rejectWithValue }) => {
    try {
      // Логинимся, сервер ставит куки
      await loginUserAPI(credentials);
      // Получаем профиль пользователя
      const user = await UserMeAPI();
      return user;
    } 
    catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const logoutUser = createAsyncThunk('auth/logoutUser', async (_, { rejectWithValue }) => {
  try {
    await logoutAPI();
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});