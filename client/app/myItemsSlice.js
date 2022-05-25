import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  displayItem: true,
};

export const myItemsSlice = createSlice({
  name: 'myItems',
  initialState,
  reducers: {
    showItem: (state) => {
      state.displayItem = true;
    },
    removeItem: (state) => {
      state.displayItem = false;
    }
  }
});

export const { showItem, removeItem } = myItemsSlice.actions;

export default myItemsSlice.reducer;