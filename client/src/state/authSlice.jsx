import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  token: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLogin: (state, action) => {
      console.log(`setlogin ${state.user}`);
      console.log(`setlogin ${state.token}`);
      // eslint-disable-next-line no-param-reassign
      state.user = action.payload.user;
      // eslint-disable-next-line no-param-reassign
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      // eslint-disable-next-line no-param-reassign
      state.user = null;
      // eslint-disable-next-line no-param-reassign
      state.user = null;
    },
  },
});

export const { setLogin, setLogout } = authSlice.actions;
export default authSlice.reducer;
