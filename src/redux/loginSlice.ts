import type { UserMe } from '../interface/UserInfo';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { loginUser } from './loginThunk';
import { logoutUser } from './loginThunk';

interface LoginState { user: UserMe | null }

const initialState: LoginState = {  user: null, };

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    clearUser(state) {
      state.user = null;
      localStorage.removeItem('user');
    },
    setUser(state, action: PayloadAction<UserMe>) {
      state.user = action.payload;
    },

  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<UserMe>) => {
        state.user = action.payload;

        localStorage.setItem('user', JSON.stringify(action.payload));
      })
      .addCase(loginUser.rejected, (state) => {
        state.user = null;
     })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        localStorage.removeItem('user');
        localStorage.removeItem('orderId');
      });
  },
});

export const { clearUser, setUser } = loginSlice.actions;
export default loginSlice.reducer;
