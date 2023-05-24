/* eslint-disable prettier/prettier */
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
      // console.log(`output: ${newArray}`);
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
      const last_idx = inputArray.length - 1;
      if (id === 0) {
        const newArray = [
          {
            Argument: 'outSide',
            hasAction: true,
            property: {
              actions: [
                { id: 0, hasValue: false, value: '', functionName: 'color' },
              ],
            },
          },
        ];
        state.EngineInput = newArray;
      } else if (
        inputArray[last_idx].hasAction === true &&
        inputArray[last_idx].Argument !== 'variable'
      ) {
        const action_id = inputArray[last_idx].property.actions.length;
        const action_last_idx =
          inputArray[last_idx].property.actions.length - 1;
        if (
          inputArray[last_idx].property.actions[action_last_idx].hasValue ===
          true
        ) {
          const newArray = [
            ...inputArray[last_idx].property.actions,
            {
              id: action_id,
              hasValue: false,
              value: '',
              functionName: 'color',
            },
          ];
          inputArray[last_idx].property.actions = newArray;
        } else {
          return;
        }
      } else {
        return;
      }
    },
    colorTypeAction: (state, action) => {
      const inputArray = state.EngineInput;
      inputArray.map((item) => {
        if (!item.hasAction) {
          if (item.Argument === 'outSide') {
            const actionArray = item.property.actions;
            item.property.actions.map((act) => {
              if (!act.hasValue) {
                if (act.functionName === 'color') {
                  const newArray = [...actionArray];
                  newArray[act.id].value = action.payload;
                  newArray[act.id].hasValue = true;
                  item.property.actions = newArray;
                  return;
                } else {
                  // eslint-disable-next-line no-useless-return
                  return;
                }
              } else if (act.id === inputArray.length - 1) {
                if (act.functionName === 'color') {
                  const newArray = [...inputArray];
                  newArray[act.id].value = action.payload;
                  newArray[act.id].hasValue = true;
                  item.property.actions = newArray;
                  return;
                }
              }
            });
          }
          if (item.Argument === 'variable') {
            console.log('execute');
            console.log('var');
            if (!item.hasAction) {
              item.property.varValue = action.payload;
              item.hasAction = true;
            } else {
              return;
            }
          }
        }
      });
    },
    variableAction: (state, action) => {
      const inputArray = state.EngineInput;
      const id = inputArray.length;
      const last_idx = inputArray.length - 1;
      let last_action_idx = 0;
      let var_hasvalue = false;
      if (inputArray[last_idx] != undefined) {
        if (inputArray[last_idx].Argument != 'variable') {
          last_action_idx = inputArray[last_idx].property?.actions.length - 1;
          var_hasvalue =
            inputArray[last_idx].property.actions[last_action_idx].hasValue;
        }
      }
      if (id === 0) {
        const newArray = [
          {
            Argument: 'variable',
            hasAction: false,
            property: {
              varName: action.payload,
              varValue: '',
            },
          },
        ];
        state.EngineInput = newArray;
      } else if (var_hasvalue) {
        const newArray = [
          ...inputArray,
          {
            Argument: 'variable',
            hasAction: false,
            property: {
              varName: action.payload,
              varValue: '',
            },
          },
        ];
        state.EngineInput = newArray;
      } else {
        return;
      }
    },
  },
});

export const {
  runCode,
  resetCode,
  undoCode,
  colorAction,
  colorTypeAction,
  variableAction,
} = actionSlice.actions;

export const selectEngineOutput = (state) => state.action.EngineOutput;
export const selectEngineInput = (state) => state.action.EngineInput;
export default actionSlice.reducer;
