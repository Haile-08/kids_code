import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  EngineInput: [{ name: 'move', value: 'move' }],
  EngineOutput: [{ name: 'move', value: 'move' }],
  GameResult: { check: false, optimum: false },
};

export const actionSlice = createSlice({
  name: 'action',
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

export const { setLogin, setLogout } = actionSlice.actions;
export default actionSlice.reducer;
