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
        const actionArray = inputArray[last_idx].property.actions;
        if (
          inputArray[last_idx].property.actions[action_last_idx].hasValue ===
          true
        ) {
          const newArray = [
            ...actionArray,
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
      } else if (
        inputArray[last_idx]?.property.hasValue === true &&
        inputArray[last_idx].Argument === 'variable'
      ) {
        console.log('from color after var');
        const newArray = [
          ...inputArray,
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
      } else {
        return;
      }
    },
    colorTypeAction: (state, action) => {
      const inputArray = state.EngineInput;
      inputArray.map((item, idx) => {
        const inputLength = inputArray.length;
        if (item.Argument === 'outSide' && idx === inputArray.length - 1) {
          const actionArray = item.property.actions;
          item.property.actions.map((act) => {
            if (!act.hasValue && act.id === actionArray.length - 1) {
              if (act.functionName === 'color') {
                const newArray = [...actionArray];
                newArray[act.id].value = action.payload;
                newArray[act.id].hasValue = true;
                item.property.actions = newArray;
                return;
              } else {
                return;
              }
            } else if (act.hasValue && act.id === actionArray.length - 1) {
              if (act.functionName === 'color') {
                const newArray = [...actionArray];
                newArray[act.id].value = action.payload;
                newArray[act.id].hasValue = true;
                item.property.actions = newArray;
                return;
              }
            }
          });
        } else if (
          item.Argument === 'variable' &&
          idx === inputArray.length - 1
        ) {
          // console.log('execute');
          // console.log('var', item.property.varValue);

          if (!item.property.hasValue) {
            item.property.varValue = action.payload;
            item.property.hasValue = true;
          } else if (idx === inputLength - 1) {
            item.property.varValue = action.payload;
            item.property.hasValue = true;
          } else {
            return;
          }
        }
      });
    },
    variableAction: (state, action) => {
      const inputArray = state.EngineInput;
      const id = inputArray.length;
      const last_idx = inputArray.length - 1;
      let last_action_idx = 0;
      let color_hasvalue = false;
      let var_hasValue = false;
      if (inputArray[last_idx] != undefined) {
        if (inputArray[last_idx].Argument != 'variable') {
          last_action_idx = inputArray[last_idx].property?.actions.length - 1;
          color_hasvalue =
            inputArray[last_idx].property.actions[last_action_idx].hasValue;
        } else if (inputArray[last_idx].Argument === 'variable') {
          var_hasValue = inputArray[last_idx].property.hasValue;
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
              hasValue: false,
            },
          },
        ];
        state.EngineInput = newArray;
      } else if (color_hasvalue) {
        const newArray = [
          ...inputArray,
          {
            Argument: 'variable',
            hasAction: false,
            property: {
              varName: action.payload,
              varValue: '',
              hasValue: false,
            },
          },
        ];
        state.EngineInput = newArray;
      } else if (
        !color_hasvalue &&
        inputArray[last_idx].Argument === 'outSide'
      ) {
        //passing var with value to color action with no var

        let listOfActions = inputArray[last_idx]?.property.actions;
        console.log('actions last ', listOfActions[last_action_idx].hasValue);
        const isThereVariable = inputArray.some(
          (inP) => inP.property.varName === action.payload
        );
        if (isThereVariable) {
          //find the last variable in the array
          const action_last_idx =
            inputArray[last_idx]?.property.actions.length - 1;
          let actions_array = inputArray[last_idx]?.property.actions;
          actions_array[action_last_idx].value = action.payload;
          actions_array[action_last_idx].hasValue = true;
        } else {
          console.log(
            `${action.payload} is not defined: Error assigning undefined variable`
          );
        }
      } else if (var_hasValue) {
        //increment new var after a var with value
        const newArray = [
          ...inputArray,
          {
            Argument: 'variable',
            hasAction: false,
            property: {
              varName: action.payload,
              varValue: '',
              hasValue: false,
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
