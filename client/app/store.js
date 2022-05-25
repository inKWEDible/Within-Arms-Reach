import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice';
import itemReducer from './myItemsSlice';

export const store = configureStore({
  reducer: {
    userStatus: userReducer,
    itemDisplay: itemReducer,
  },
});