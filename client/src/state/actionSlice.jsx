import { createSlice } from '@reduxjs/toolkit';
import { Engine } from '../utils';

const initialState = {
  EngineInput: [],
  EngineOutput: [],
  GameResult: { check: false, optimum: false },
};

export const actionSlice = createSlice({
  name: 'action',
  initialState,
  reducers: {
    runCode: (state) => {
      console.log(`input: ${state.EngineInput}`);
      const newArray = Engine(state.EngineInput);
      console.log(`output: ${newArray}`);
      state.EngineOutput = newArray;
    },
    resetCode: (state) => {
      state.EngineInput = [];
      state.EngineOutput = [];
    },
    undoCode: (state) => {
      const inputarray = [...state.EngineInput];
      const ouputarray = [...state.EngineOutput];
      inputarray.pop();
      ouputarray.pop();
      state.EngineInput = inputarray;
      state.EngineOutput = ouputarray;
    },
    colorAction: (state) => {
      const inputArray = state.EngineInput;
      const id = inputArray.length;
      const index = inputArray.length - 1;
      if (id === 0) {
        const newArray = [
          ...inputArray,
          { id, hasValue: false, value: '', functionName: 'color' },
        ];
        console.log(newArray);
        state.EngineInput = newArray;
      } else if (inputArray[index].hasValue === true) {
        const newArray = [
          ...inputArray,
          { id, hasValue: false, value: '', functionName: 'color' },
        ];
        console.log(newArray);
        state.EngineInput = newArray;
      } else {
        // eslint-disable-next-line no-useless-return
        return;
      }
    },
    colorTypeAction: (state, action) => {
      const inputArray = state.EngineInput;
      inputArray.map((item) => {
        if (!item.hasValue) {
          if (item.functionName === 'color') {
            const newArray = [...inputArray];
            newArray[item.id].value = action.payload;
            newArray[item.id].hasValue = true;
            state.EngineInput = newArray;
          } else {
            // eslint-disable-next-line no-useless-return
            return;
          }
        } else if (item.id === inputArray.length - 1) {
          if (item.functionName === 'color') {
            const newArray = [...inputArray];
            newArray[item.id].value = action.payload;
            newArray[item.id].hasValue = true;
            state.EngineInput = newArray;
          }
        }
      });
    },
  },
});

export const { runCode, resetCode, undoCode, colorAction, colorTypeAction } =
  actionSlice.actions;

export const selectEngineOutput = (state) => state.action.EngineOutput;
export default actionSlice.reducer;
