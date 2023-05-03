import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  token: null,
  isAuth: false,
  value: 0,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    increment: (state, action) => {
      state.value += action.payload;
    },
    setLogin: (state, action) => {
      console.log(`setlogin ${state.user}`);
      console.log(`setlogin ${state.token}`);
      // eslint-disable-next-line no-param-reassign
      state.user = action.payload.user;
      // eslint-disable-next-line no-param-reassign
      state.token = action.payload.token;
      state.isAuth = true;
    },
    setLogout: (state) => {
      // eslint-disable-next-line no-param-reassign
      state.user = null;
      // eslint-disable-next-line no-param-reassign
      state.user = null;
      state.isAuth = false;
    },
  },
});

export const { setLogin, setLogout, increment } = authSlice.actions;
export default authSlice.reducer;
