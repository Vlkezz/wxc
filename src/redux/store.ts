import { configureStore } from "@reduxjs/toolkit";
import loginReducer from './loginSlice'; 
import basketReducer from './basketSlice';

export const loginUserStore = configureStore({
reducer:
    {
      login: loginReducer,
      basket: basketReducer,
    },
    devTools:true,
});

export type AppDispatch = typeof loginUserStore.dispatch;
export type RootState = ReturnType<typeof loginUserStore.getState>;

