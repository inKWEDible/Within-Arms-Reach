import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  loggedIn: false,
}

export const userSlice = createSlice({
  name: 'userStatus',
  initialState,
  reducers:{
    logIn: (state) => {
      state.loggedIn = true;
    },
    logOut: (state) => {
      state.loggedIn = false;
    }
  }
})

export const { logIn, logOut } = userSlice.actions

export default userSlice.reducer;