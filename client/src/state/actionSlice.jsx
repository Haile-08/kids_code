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
        inputArray[last_idx].Argument !== 'variable' &&
        inputArray[last_idx].Argument !== 'if'
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
      } else if (
        inputArray[last_idx].hasAction === true &&
        inputArray[last_idx].Argument === 'if'
      ) {
        const last_action_idx =
          inputArray[last_idx].property.if_Action.length - 1;
        if (
          inputArray[last_idx].property.obj4 !== '' &&
          inputArray[last_idx].property.if_Action.length === 0
        ) {
          const idx = inputArray[last_idx].property.if_Action.length;

          const newArray = [
            ...inputArray[last_idx].property.if_Action,
            { id: idx, hasValue: false, value: '', functionName: 'color' },
          ];
          inputArray[last_idx].property.if_Action = newArray;
        } else if (
          inputArray[last_idx].property.obj4 !== '' &&
          inputArray[last_idx].property.if_Action[last_action_idx].hasValue ===
            true
        ) {
          const newArray = [
            ...inputArray[last_idx].property.if_Action,
            { id: idx, hasValue: false, value: '', functionName: 'color' },
          ];
          inputArray[last_idx].property.if_Action = newArray;
        } else {
          return;
        }
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
        } else if (item.Argument === 'if' && idx === inputArray.length - 1) {
          const last_idx = item.property.if_Action.length - 1;
          if (item.property.obj2 === '' && item.property.obj3 === '') {
            item.property.obj2 = action.payload;
          } else if (item.property.obj2 !== '' && item.property.obj3 === '') {
            item.property.obj2 = action.payload;
          } else if (
            item.property.obj2 !== '' &&
            item.property.obj4 === '' &&
            item.property.obj3 !== ''
          ) {
            item.hasAction = true;
            item.property.obj4 = action.payload;
          } else if (
            item.property.obj4 !== '' &&
            item.property.if_Action.length === 0
          ) {
            item.hasAction = true;
            item.property.obj4 = action.payload;
          } else if (
            item.property.if_Action.length !== 0 &&
            item.property.if_Action[last_idx].hasAction === true
          ) {
            item.property.if_Action[last_idx].value = action.payload;
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
    operatorsAction: (state, action) => {
      const inputArray = state.EngineInput;
      const last_idx = inputArray.length - 1;
      if (
        inputArray[last_idx].Argument == 'if' &&
        inputArray[last_idx].property.obj2 !== ''
      ) {
        const action_Object = inputArray[last_idx].property;
        action_Object.obj3 = action.payload;
      }
    },
    conditionalAction: (state, action) => {
      const inputArray = state.EngineInput;
      const id = inputArray.length;
      const last_idx = inputArray.length - 1;
      if (id === 0) {
        const newArray = [
          {
            Argument: 'if',
            hasAction: false,
            property: {
              obj1: 'if',
              obj2: '',
              obj3: '',
              obj4: '',
              if_Action: [],
              obj5: '',
              else_Action: [],
            },
          },
        ];
        state.EngineInput = newArray;
      } else if (
        inputArray[last_idx].Argument === 'variable' &&
        inputArray[last_idx].property.hasValue
      ) {
        const newArray = [
          ...inputArray,
          {
            Argument: 'if',
            hasAction: false,
            property: {
              obj1: 'if',
              obj2: '',
              obj3: '',
              obj4: '',
              if_Action: [],
              obj5: '',
              else_Action: [],
            },
          },
        ];
        state.EngineInput = newArray;
      } else if (inputArray[last_idx].Argument === 'outSide') {
        const last_action_idx = inputArray[last_idx].property.actions - 1;
        const action_Array = inputArray[last_idx].property.actions;
        if (action_Array[last_action_idx].hasValue == true) {
          const newArray = [
            ...inputArray,
            {
              Argument: 'if',
              hasAction: false,
              property: {
                obj1: 'if',
                obj2: '',
                obj3: '',
                obj4: '',
                if_Action: [],
                obj5: '',
                else_Action: [],
              },
            },
          ];
          state.EngineInput = newArray;
        }
      } else if (
        action.payload === 'else' &&
        inputArray[last_idx].Argument === 'if'
      ) {
        if (
          inputArray[last_idx].property.obj2 != '' &&
          inputArray[last_idx].property.obj3 != '' &&
          inputArray[last_idx].property.obj4 != '' &&
          inputArray[last_idx].property.if_Action != []
        ) {
          const newArray = [
            ...inputArray,
            {
              Argument: 'if',
              hasAction: false,
              property: {
                obj1: 'if',
                obj2: '',
                obj3: '',
                obj4: '',
                if_Action: [],
                obj5: action.payload,
                else_Action: [],
              },
            },
          ];
          state.EngineInput = newArray;
        }
      }
      {
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
  conditionalAction,
  operatorsAction,
} = actionSlice.actions;

export const selectEngineOutput = (state) => state.action.EngineOutput;
export const selectEngineInput = (state) => state.action.EngineInput;
export default actionSlice.reducer;
