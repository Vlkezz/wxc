import { createSlice } from '@reduxjs/toolkit';
import type { Service } from '../interface/Service';
import type { PayloadAction} from '@reduxjs/toolkit';

// Определяем тип элемента корзины прямо в слайсе
export interface BasketItem {
  service: Service;
  quantity: number;
}

interface BasketState {
  items: BasketItem[];
}

const initialState: BasketState = {
  items: [],
};

export const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    addToBasket: (state, action: PayloadAction<Service>) => {
      const existingItem = state.items.find(
        item => item.service.id === action.payload.id
      );
      if (!existingItem) {
        state.items.push({
          service: action.payload,
          quantity: 1
        });
      }
    },
    updateItemQuantity: (
      state, 
      action: PayloadAction<{ id: number; quantity: number }>
    ) => {
      const item = state.items.find(item => item.service.id === action.payload.id);
      if (item) {
        item.quantity = Math.max(1, action.payload.quantity); // Не меньше 1
      }
    },
    removeItem: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => item.service.id !== action.payload);
    },
    clearBasket: () => initialState,
    setBasket: (state, action: PayloadAction<BasketItem[]>) => {
      state.items = action.payload;
    }
  },
});

export const { 
  addToBasket, 
  updateItemQuantity, 
  removeItem, 
  clearBasket,
  setBasket
} = basketSlice.actions;

export default basketSlice.reducer;