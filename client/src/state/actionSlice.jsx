/* eslint-disable prettier/prettier */
import { createSlice } from '@reduxjs/toolkit';
import { Engine } from '../utils';

const initialState = {
  EngineInput: [],
  EngineOutput: [],
  GameResult: { check: false, optimum: false },
  modal: false,
};

export const actionSlice = createSlice({
  name: 'action',
  initialState,
  reducers: {
    modalOff: (state) => {
      state.modal = false;
    },
    modalOn: (state) => {
      state.modal = true;
    },
    runCode: (state) => {
      const newArray = Engine(state.EngineInput);
      // console.log(`output: ${newArray}`);
      state.EngineOutput = newArray;
    },
    resetCode: (state) => {
      state.EngineInput = [];
      state.EngineOutput = [];
    },
    dispatchRedVar: (state) => {
      const newArray = [
        {
          Argument: 'variable',
          hasAction: true,
          property: {
            varName: 'var1',
            varValue: 'red',
            hasValue: true,
          },
        },
      ];
      state.EngineInput = newArray;
    },
    dispatchIfVar: (state) => {
      const newArray = [
        {
          Argument: 'variable',
          hasAction: true,
          property: {
            varName: 'var1',
            varValue: 'red',
            hasValue: true,
          },
        },
        {
          Argument: 'if',
          hasAction: true,
          property: {
            actionNameIf: 'if',
            firstArg: 'var1',
            operator: '==',
            secondArg: 'green',
            if_Action: [],
            actionNameElse: '',
            else_Action: [],
            IfblockComplete: '',
            ElseblockComplete: '',
          },
        },
      ];
      state.EngineInput = newArray;
    },
    undoCode: (state) => {
      const inputarray = [...state.EngineInput];
      const ouputarray = [...state.EngineOutput];

      console.log(typeof inputarray);
      const lastInputArray = inputarray[inputarray.length - 1];

      if (lastInputArray.Argument === 'outSide') {
        const OutSideActionLength = lastInputArray?.property?.actions.length;
        if (OutSideActionLength === 1) {
          inputarray.pop();
        } else {
          const outSideActions = lastInputArray.property.actions;
          outSideActions.pop();
          lastInputArray.property.actions = outSideActions;
          inputarray[inputarray.length - 1] = { ...lastInputArray };
        }
      } else if (lastInputArray.Argument === 'variable') {
        inputarray.pop();
      } else if (
        lastInputArray.Argument === 'if' &&
        lastInputArray?.property?.else_Action.length !== 0
      ) {
        const elseActionLength = lastInputArray?.property?.else_Action.length;
        if (elseActionLength === 0) {
          inputarray.pop();
        } else {
          const elseActions = lastInputArray.property.else_Action;
          elseActions.pop();
          lastInputArray.property.else_Action = elseActions;
          inputarray[inputarray.length - 1] = { ...lastInputArray };
        }
      } else if (
        lastInputArray.Argument === 'if' &&
        lastInputArray?.property?.if_Action.length !== 0
      ) {
        const ifActionLength = lastInputArray?.property?.if_Action.length;
        if (ifActionLength === 0) {
          inputarray.pop();
        } else {
          const ifActions = lastInputArray.property.if_Action;
          ifActions.pop();
          lastInputArray.property.if_Action = ifActions;
          inputarray[inputarray.length - 1] = { ...lastInputArray };
        }
      } else if (
        lastInputArray.Argument === 'if' &&
        lastInputArray?.property?.else_Action.length === 0 &&
        lastInputArray?.property?.if_Action.length === 0
      ) {
        inputarray.pop();
      } else if (lastInputArray.Argument === 'for') {
        const forActionLength = lastInputArray?.property?.for_Action.length;
        if (forActionLength === 0) {
          inputarray.pop();
        } else {
          const forActions = lastInputArray.property.for_Action;
          forActions.pop();
          lastInputArray.property.for_Action = forActions;
          inputarray[inputarray.length - 1] = { ...lastInputArray };
        }
      } else if (lastInputArray.Argument === 'while') {
        const whileActionLength = lastInputArray?.property?.while_Action.length;
        if (whileActionLength === 0) {
          inputarray.pop();
        } else {
          const whileActions = lastInputArray.property.while_Action;
          whileActions.pop();
          lastInputArray.property.while_Action = whileActions;
          inputarray[inputarray.length - 1] = { ...lastInputArray };
        }
      }

      // inputarray.pop();
      // ouputarray.pop();
      state.EngineInput = inputarray;
      state.EngineOutput = ouputarray;
    },
    moveAction: (state) => {
      const inputArray = state.EngineInput;
      const id = inputArray.length;
      const last_idx = inputArray.length - 1;
      if (id === 0) {
        const newArray = [
          {
            Argument: 'outSide',
            hasAction: true,
            property: {
              actions: [{ id, hasValue: true, functionName: 'move' }],
            },
          },
        ];
        state.EngineInput = newArray;
      } else if (
        inputArray[last_idx].hasAction === true &&
        inputArray[last_idx].Argument === 'outSide'
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
            { id: action_id, hasValue: true, functionName: 'move' },
          ];
          inputArray[last_idx].property.actions = newArray;
        }
      } else if (
        inputArray[last_idx]?.property.hasValue === true &&
        inputArray[last_idx].Argument === 'variable'
      ) {
        const newArray = [
          ...inputArray,
          {
            Argument: 'outSide',
            hasAction: true,
            property: {
              actions: [{ id: 0, hasValue: true, functionName: 'move' }],
            },
          },
        ];
        state.EngineInput = newArray;
      } else if (
        inputArray[last_idx].hasAction === true &&
        inputArray[last_idx].Argument === 'if' &&
        inputArray[last_idx].property.actionNameElse === '' &&
        inputArray[last_idx].property.IfblockComplete === ''
      ) {
        const last_action_idx =
          inputArray[last_idx].property.if_Action.length - 1;
        if (
          inputArray[last_idx].property.secondArg !== '' &&
          inputArray[last_idx].property.if_Action.length === 0
        ) {
          const idx = inputArray[last_idx].property.if_Action.length;
          console.log('property.if_Action.length === 0 ');

          const newArray = [
            {
              id: idx,
              hasValue: true,
              functionName: 'move',
            },
          ];
          inputArray[last_idx].property.if_Action = newArray;
        } else if (
          inputArray[last_idx].property.secondArg !== '' &&
          inputArray[last_idx].property.if_Action[last_action_idx].hasValue ===
            true &&
          inputArray[last_idx].property.if_Action.length !== 0
        ) {
          const idx = inputArray[last_idx].property.if_Action.length;
          const newArray = [
            ...inputArray[last_idx].property.if_Action,
            {
              id: idx,
              hasValue: true,
              functionName: 'move',
            },
          ];
          inputArray[last_idx].property.if_Action = newArray;
        } else {
          return;
        }
      } else if (
        inputArray[last_idx].Argument === 'if' &&
        inputArray[last_idx].hasAction === true &&
        inputArray[last_idx].property.actionNameElse === '' &&
        inputArray[last_idx].property.IfblockComplete !== ''
      ) {
        const newArray = [
          ...inputArray,
          {
            Argument: 'outSide',
            hasAction: true,
            property: {
              actions: [
                {
                  id: 0,
                  hasValue: true,
                  functionName: 'move',
                },
              ],
            },
          },
        ];
        state.EngineInput = newArray;
      } else if (
        inputArray[last_idx].Argument === 'if' &&
        inputArray[last_idx].hasAction === true &&
        inputArray[last_idx].property.actionNameElse !== '' &&
        inputArray[last_idx].property.ElseblockComplete !== ''
      ) {
        const newArray = [
          ...inputArray,
          {
            Argument: 'outSide',
            hasAction: true,
            property: {
              actions: [
                {
                  id: 0,
                  hasValue: true,
                  functionName: 'move',
                },
              ],
            },
          },
        ];
        state.EngineInput = newArray;
      } else if (
        inputArray[last_idx].Argument === 'if' &&
        inputArray[last_idx].property.actionNameElse !== '' &&
        inputArray[last_idx].property.ElseblockComplete === ''
      ) {
        const last_else_action_idx =
          inputArray[last_idx].property.else_Action.length - 1;
        if (inputArray[last_idx].property.else_Action.length === 0) {
          const idx = inputArray[last_idx].property.else_Action;
          const newArray = [
            {
              id: idx,
              hasValue: true,
              functionName: 'move',
            },
          ];
          inputArray[last_idx].property.else_Action = newArray;
        } else if (
          inputArray[last_idx].property.else_Action.length !== 0 &&
          inputArray[last_idx].property.else_Action[last_else_action_idx]
            .hasValue === true
        ) {
          console.log('color after color in the else ');
          const idx = inputArray[last_idx].property.else_Action.length;
          const newArray = [
            ...inputArray[last_idx].property.else_Action,
            {
              id: idx,
              hasValue: true,
              functionName: 'move',
            },
          ];
          inputArray[last_idx].property.else_Action = newArray;
        } else {
          return;
        }
      } else if (
        inputArray[last_idx].Argument === 'for' &&
        inputArray[last_idx].property.thirdOperator !== '' &&
        inputArray[last_idx].property.completeForBlock === ''
      ) {
        const last_else_action_idx =
          inputArray[last_idx].property.for_Action.length - 1;
        if (inputArray[last_idx].property.for_Action.length === 0) {
          const idx = inputArray[last_idx].property.for_Action;
          const newArray = [
            {
              id: idx,
              hasValue: true,
              functionName: 'move',
            },
          ];
          inputArray[last_idx].property.for_Action = newArray;
          inputArray[last_idx].hasAction = true;
        } else if (
          inputArray[last_idx].property.for_Action.length !== 0 &&
          inputArray[last_idx].property.for_Action[last_else_action_idx]
            .hasValue === true
        ) {
          const idx = inputArray[last_idx].property.for_Action.length;
          const newArray = [
            ...inputArray[last_idx].property.for_Action,
            {
              id: idx,
              hasValue: true,
              functionName: 'move',
            },
          ];
          inputArray[last_idx].property.for_Action = newArray;
          inputArray[last_idx].hasAction = true;
        } else {
          return;
        }
      } else if (
        inputArray[last_idx].Argument === 'for' &&
        inputArray[last_idx].property.thirdOperator !== '' &&
        inputArray[last_idx].property.completeForBlock !== ''
      ) {
        const newArray = [
          ...inputArray,
          {
            Argument: 'outSide',
            hasAction: true,
            property: {
              actions: [
                {
                  id: 0,
                  hasValue: true,
                  functionName: 'move',
                },
              ],
            },
          },
        ];
        state.EngineInput = newArray;
      } else if (
        inputArray[last_idx].Argument === 'while' &&
        inputArray[last_idx].property.firstOperator !== '' &&
        inputArray[last_idx].property.secondArg !== '' &&
        inputArray[last_idx].property.completeWhileBlock === ''
      ) {
        const last_else_action_idx =
          inputArray[last_idx].property.while_Action.length - 1;
        if (inputArray[last_idx].property.while_Action.length === 0) {
          const idx = inputArray[last_idx].property.while_Action.length;
          const newArray = [
            {
              id: idx,
              hasValue: true,
              functionName: 'move',
            },
          ];
          inputArray[last_idx].property.while_Action = newArray;
          inputArray[last_idx].hasAction = true;
        } else if (
          inputArray[last_idx].property.while_Action.length !== 0 &&
          inputArray[last_idx].property.while_Action[last_else_action_idx]
            .hasValue === true
        ) {
          const idx = inputArray[last_idx].property.while_Action.length;
          const newArray = [
            ...inputArray[last_idx].property.while_Action,
            {
              id: idx,
              hasValue: true,
              functionName: 'move',
            },
          ];
          inputArray[last_idx].property.while_Action = newArray;
          inputArray[last_idx].hasAction = true;
        } else {
          return;
        }
      } else if (
        inputArray[last_idx].Argument === 'while' &&
        inputArray[last_idx].property.thirdArg !== '' &&
        inputArray[last_idx].property.completeWhileBlock !== ''
      ) {
        if (inputArray[last_idx].property.secondOperator !== '') {
          const newArray = [
            ...inputArray,
            {
              Argument: 'outSide',
              hasAction: true,
              property: {
                actions: [
                  {
                    id: 0,
                    hasValue: true,
                    functionName: 'move',
                  },
                ],
              },
            },
          ];
          state.EngineInput = newArray;
        } else {
          console.log(
            'finish the incremental condition in the while loop first'
          );
        }
      }
    },
    numberAction: (state, action) => {
      const inputArray = state.EngineInput;
      inputArray.map((item, idx) => {
        const inputLength = inputArray.length;
        if (item.Argument === 'variable' && idx === inputArray.length - 1) {
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
          const IfAction_last_idx = item.property.if_Action.length - 1;
          if (!item.property.actionNameElse) {
            if (
              item.property.firstArg === '' &&
              item.property.operator === ''
            ) {
              item.property.firstArg = action.payload;
            } else if (
              item.property.firstArg !== '' &&
              item.property.operator === ''
            ) {
              item.property.firstArg = action.payload;
            } else if (
              item.property.firstArg !== '' &&
              item.property.secondArg === '' &&
              item.property.operator !== ''
            ) {
              item.hasAction = true;
              item.property.secondArg = action.payload;
            } else if (
              item.property.secondArg !== '' &&
              item.property.if_Action.length === 0
            ) {
              item.hasAction = true;
              item.property.secondArg = action.payload;
            } else if (
              item.property.if_Action.length !== 0 &&
              item.hasAction === true
            ) {
              //but what are the values that goes in to the this array
              const ifActionList = item.property.if_Action;
              ifActionList[IfAction_last_idx].value = action.payload;
              ifActionList[IfAction_last_idx].hasValue = true;
              item.property.if_Action = ifActionList;
            }
          } else {
            const elseAction_last_idx = item.property.else_Action.length - 1;
            const elseActionList = item.property.else_Action;
            elseActionList[elseAction_last_idx].value = action.payload;
            elseActionList[elseAction_last_idx].hasValue = true;
            item.property.else_Action = elseActionList;
          }
        } else if (item.Argument === 'for' && idx === inputArray.length - 1) {
          const Action_last_idx = item.property.for_Action.length - 1;
          if (
            item.property.firstArg === '' &&
            item.property.firstOperator === ''
          ) {
            item.property.firstArg = action.payload;
          } else if (
            item.property.secondArg === '' &&
            item.property.thirdArg === ''
          ) {
            item.property.secondArg = action.payload;
          } else if (
            item.property.thirdArg === '' &&
            item.property.fourthArg === ''
          ) {
            if (action.payload === item.property.firstArg) {
              item.property.thirdArg = action.payload;
            }
          } else if (
            item.property.fourthArg === '' &&
            item.property.fifthArg === ''
          ) {
            item.property.fourthArg = action.payload;
          } else if (
            item.property.fifthArg === '' &&
            item.property.thirdOperator === ''
          ) {
            if (action.payload === item.property.firstArg) {
              item.property.fifthArg = action.payload;
            }
          } else if (
            item.property.firstArg !== '' &&
            item.property.firstOperator === ''
          ) {
            item.property.firstArg = action.payload;
          } else if (
            item.property.secondArg !== '' &&
            item.property.thirdArg === ''
          ) {
            item.property.secondArg = action.payload;
          } else if (
            item.property.thirdArg !== '' &&
            item.property.secondArg === ''
          ) {
            if (action.payload === item.property.firstArg) {
              item.property.thirdArg = action.payload;
            }
          } else if (
            item.property.fourthArg !== '' &&
            item.property.fifthArg === ''
          ) {
            item.property.fourthArg = action.payload;
          } else if (
            item.property.fifthArg !== '' &&
            item.property.thirdOperator === ''
          ) {
            if (action.payload === item.property.firstArg) {
              item.property.fifthArg = action.payload;
            }
          } else {
            //but what are the values that goes in to the this array
            const forActionList = item.property.for_Action;
            forActionList[Action_last_idx].value = action.payload;
            forActionList[Action_last_idx].hasValue = true;
          }
        } else if (item.Argument === 'while') {
          const Action_last_idx = item.property.while_Action.length - 1;
          if (
            item.property.firstArg === '' &&
            item.property.firstOperator === ''
          ) {
            item.property.firstArg = action.payload;
          } else if (
            item.property.firstArg !== '' &&
            item.property.firstOperator === ''
          ) {
            item.property.firstArg = action.payload;
          } else if (
            item.property.secondArg === '' &&
            item.property.while_Action.length === 0 &&
            item.property.firstOperator !== ''
          ) {
            item.property.secondArg = action.payload;
          } else if (
            item.property.secondArg !== '' &&
            item.property.while_Action.length === 0 &&
            item.property.firstOperator !== ''
          ) {
            item.property.secondArg = action.payload;
          } else if (
            item.property.firstOperator !== '' &&
            item.property.secondArg !== '' &&
            item.property.firstArg !== '' &&
            item.property.completeWhileBlock === ''
          ) {
            //but what are the values that goes in to the this array
            const whileActionList = item.property.while_Action;
            whileActionList[Action_last_idx].value = action.payload;
            whileActionList[Action_last_idx].hasValue = true;
          }
        }
      });
    },
    turnAction: (state) => {
      const inputArray = state.EngineInput;
      const id = inputArray.length;
      const last_idx = inputArray.length - 1;
      if (id === 0) {
        const newArray = [
          {
            Argument: 'outSide',
            hasAction: true,
            property: {
              actions: [{ id, hasValue: true, functionName: 'turn' }],
            },
          },
        ];
        state.EngineInput = newArray;
      } else if (
        inputArray[last_idx].hasAction === true &&
        inputArray[last_idx].Argument === 'outSide'
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
            { id: action_id, hasValue: true, functionName: 'turn' },
          ];
          inputArray[last_idx].property.actions = newArray;
        }
      } else if (
        inputArray[last_idx]?.property.hasValue === true &&
        inputArray[last_idx].Argument === 'variable'
      ) {
        const newArray = [
          ...inputArray,
          {
            Argument: 'outSide',
            hasAction: true,
            property: {
              actions: [{ id: 0, hasValue: true, functionName: 'turn' }],
            },
          },
        ];
        state.EngineInput = newArray;
      } else if (
        inputArray[last_idx].hasAction === true &&
        inputArray[last_idx].Argument === 'if' &&
        inputArray[last_idx].property.actionNameElse === '' &&
        inputArray[last_idx].property.IfblockComplete === ''
      ) {
        const last_action_idx =
          inputArray[last_idx].property.if_Action.length - 1;
        if (
          inputArray[last_idx].property.secondArg !== '' &&
          inputArray[last_idx].property.if_Action.length === 0
        ) {
          const idx = inputArray[last_idx].property.if_Action.length;
          console.log('property.if_Action.length === 0 ');

          const newArray = [{ id: idx, hasValue: true, functionName: 'turn' }];
          inputArray[last_idx].property.if_Action = newArray;
        } else if (
          inputArray[last_idx].property.secondArg !== '' &&
          inputArray[last_idx].property.if_Action[last_action_idx].hasValue ===
            true &&
          inputArray[last_idx].property.if_Action.length !== 0
        ) {
          const idx = inputArray[last_idx].property.if_Action.length;
          const newArray = [
            ...inputArray[last_idx].property.if_Action,
            { id: idx, hasValue: true, functionName: 'turn' },
          ];
          inputArray[last_idx].property.if_Action = newArray;
        } else {
          return;
        }
      } else if (
        inputArray[last_idx].Argument === 'if' &&
        inputArray[last_idx].hasAction === true &&
        inputArray[last_idx].property.actionNameElse === '' &&
        inputArray[last_idx].property.IfblockComplete !== ''
      ) {
        const newArray = [
          ...inputArray,
          {
            Argument: 'outSide',
            hasAction: true,
            property: {
              actions: [{ id: 0, hasValue: true, functionName: 'turn' }],
            },
          },
        ];
        state.EngineInput = newArray;
      } else if (
        inputArray[last_idx].Argument === 'if' &&
        inputArray[last_idx].hasAction === true &&
        inputArray[last_idx].property.actionNameElse !== '' &&
        inputArray[last_idx].property.ElseblockComplete !== ''
      ) {
        const newArray = [
          ...inputArray,
          {
            Argument: 'outSide',
            hasAction: true,
            property: {
              actions: [{ id: 0, hasValue: true, functionName: 'turn' }],
            },
          },
        ];
        state.EngineInput = newArray;
      } else if (
        inputArray[last_idx].Argument === 'if' &&
        inputArray[last_idx].property.actionNameElse !== '' &&
        inputArray[last_idx].property.ElseblockComplete === ''
      ) {
        const last_else_action_idx =
          inputArray[last_idx].property.else_Action.length - 1;
        if (inputArray[last_idx].property.else_Action.length === 0) {
          const idx = inputArray[last_idx].property.else_Action;
          const newArray = [{ id: idx, hasValue: true, functionName: 'turn' }];
          inputArray[last_idx].property.else_Action = newArray;
        } else if (
          inputArray[last_idx].property.else_Action.length !== 0 &&
          inputArray[last_idx].property.else_Action[last_else_action_idx]
            .hasValue === true
        ) {
          console.log('color after color in the else ');
          const idx = inputArray[last_idx].property.else_Action.length;
          const newArray = [
            ...inputArray[last_idx].property.else_Action,
            { id: idx, hasValue: true, functionName: 'turn' },
          ];
          inputArray[last_idx].property.else_Action = newArray;
        } else {
          return;
        }
      } else if (
        inputArray[last_idx].Argument === 'for' &&
        inputArray[last_idx].property.thirdOperator !== '' &&
        inputArray[last_idx].property.completeForBlock === ''
      ) {
        const last_else_action_idx =
          inputArray[last_idx].property.for_Action.length - 1;
        if (inputArray[last_idx].property.for_Action.length === 0) {
          const idx = inputArray[last_idx].property.for_Action;
          const newArray = [{ id: idx, hasValue: true, functionName: 'turn' }];
          inputArray[last_idx].property.for_Action = newArray;
          inputArray[last_idx].hasAction = true;
        } else if (
          inputArray[last_idx].property.for_Action.length !== 0 &&
          inputArray[last_idx].property.for_Action[last_else_action_idx]
            .hasValue === true
        ) {
          const idx = inputArray[last_idx].property.for_Action.length;
          const newArray = [
            ...inputArray[last_idx].property.for_Action,
            { id: idx, hasValue: true, functionName: 'turn' },
          ];
          inputArray[last_idx].property.for_Action = newArray;
          inputArray[last_idx].hasAction = true;
        } else {
          return;
        }
      } else if (
        inputArray[last_idx].Argument === 'for' &&
        inputArray[last_idx].property.thirdOperator !== '' &&
        inputArray[last_idx].property.completeForBlock !== ''
      ) {
        const newArray = [
          ...inputArray,
          {
            Argument: 'outSide',
            hasAction: true,
            property: {
              actions: [{ id: 0, hasValue: true, functionName: 'turn' }],
            },
          },
        ];
        state.EngineInput = newArray;
      } else if (
        inputArray[last_idx].Argument === 'while' &&
        inputArray[last_idx].property.firstOperator !== '' &&
        inputArray[last_idx].property.secondArg !== '' &&
        inputArray[last_idx].property.completeWhileBlock === ''
      ) {
        const last_else_action_idx =
          inputArray[last_idx].property.while_Action.length - 1;
        if (inputArray[last_idx].property.while_Action.length === 0) {
          const idx = inputArray[last_idx].property.while_Action.length;
          const newArray = [{ id: idx, hasValue: true, functionName: 'turn' }];
          inputArray[last_idx].property.while_Action = newArray;
          inputArray[last_idx].hasAction = true;
        } else if (
          inputArray[last_idx].property.while_Action.length !== 0 &&
          inputArray[last_idx].property.while_Action[last_else_action_idx]
            .hasValue === true
        ) {
          const idx = inputArray[last_idx].property.while_Action.length;
          const newArray = [
            ...inputArray[last_idx].property.while_Action,
            { id: idx, hasValue: true, functionName: 'turn' },
          ];
          inputArray[last_idx].property.while_Action = newArray;
          inputArray[last_idx].hasAction = true;
        } else {
          return;
        }
      } else if (
        inputArray[last_idx].Argument === 'while' &&
        inputArray[last_idx].property.thirdArg !== '' &&
        inputArray[last_idx].property.completeWhileBlock !== ''
      ) {
        if (inputArray[last_idx].property.secondOperator !== '') {
          const newArray = [
            ...inputArray,
            {
              Argument: 'outSide',
              hasAction: true,
              property: {
                actions: [{ id: 0, hasValue: true, functionName: 'turn' }],
              },
            },
          ];
          state.EngineInput = newArray;
        } else {
          console.log(
            'finish the incremental condition in the while loop first'
          );
        }
      }
    },
    dropAction: (state) => {
      const inputArray = state.EngineInput;
      const id = inputArray.length;
      const last_idx = inputArray.length - 1;
      if (id === 0) {
        const newArray = [
          {
            Argument: 'outSide',
            hasAction: true,
            property: {
              actions: [{ id, hasValue: true, functionName: 'dropBox' }],
            },
          },
        ];
        state.EngineInput = newArray;
      } else if (
        inputArray[last_idx].hasAction === true &&
        inputArray[last_idx].Argument === 'outSide'
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
            { id: action_id, hasValue: true, functionName: 'dropBox' },
          ];
          inputArray[last_idx].property.actions = newArray;
        }
      } else if (
        inputArray[last_idx]?.property.hasValue === true &&
        inputArray[last_idx].Argument === 'variable'
      ) {
        const newArray = [
          ...inputArray,
          {
            Argument: 'outSide',
            hasAction: true,
            property: {
              actions: [{ id: 0, hasValue: true, functionName: 'dropBox' }],
            },
          },
        ];
        state.EngineInput = newArray;
      } else if (
        inputArray[last_idx].hasAction === true &&
        inputArray[last_idx].Argument === 'if' &&
        inputArray[last_idx].property.actionNameElse === '' &&
        inputArray[last_idx].property.IfblockComplete === ''
      ) {
        const last_action_idx =
          inputArray[last_idx].property.if_Action.length - 1;
        if (
          inputArray[last_idx].property.secondArg !== '' &&
          inputArray[last_idx].property.if_Action.length === 0
        ) {
          const idx = inputArray[last_idx].property.if_Action.length;
          console.log('property.if_Action.length === 0 ');

          const newArray = [
            { id: idx, hasValue: true, functionName: 'dropBox' },
          ];
          inputArray[last_idx].property.if_Action = newArray;
        } else if (
          inputArray[last_idx].property.secondArg !== '' &&
          inputArray[last_idx].property.if_Action[last_action_idx].hasValue ===
            true &&
          inputArray[last_idx].property.if_Action.length !== 0
        ) {
          const idx = inputArray[last_idx].property.if_Action.length;
          const newArray = [
            ...inputArray[last_idx].property.if_Action,
            { id: idx, hasValue: true, functionName: 'dropBox' },
          ];
          inputArray[last_idx].property.if_Action = newArray;
        } else {
          return;
        }
      } else if (
        inputArray[last_idx].Argument === 'if' &&
        inputArray[last_idx].hasAction === true &&
        inputArray[last_idx].property.actionNameElse === '' &&
        inputArray[last_idx].property.IfblockComplete !== ''
      ) {
        const newArray = [
          ...inputArray,
          {
            Argument: 'outSide',
            hasAction: true,
            property: {
              actions: [{ id: 0, hasValue: true, functionName: 'dropBox' }],
            },
          },
        ];
        state.EngineInput = newArray;
      } else if (
        inputArray[last_idx].Argument === 'if' &&
        inputArray[last_idx].hasAction === true &&
        inputArray[last_idx].property.actionNameElse !== '' &&
        inputArray[last_idx].property.ElseblockComplete !== ''
      ) {
        const newArray = [
          ...inputArray,
          {
            Argument: 'outSide',
            hasAction: true,
            property: {
              actions: [{ id: 0, hasValue: true, functionName: 'dropBox' }],
            },
          },
        ];
        state.EngineInput = newArray;
      } else if (
        inputArray[last_idx].Argument === 'if' &&
        inputArray[last_idx].property.actionNameElse !== '' &&
        inputArray[last_idx].property.ElseblockComplete === ''
      ) {
        const last_else_action_idx =
          inputArray[last_idx].property.else_Action.length - 1;
        if (inputArray[last_idx].property.else_Action.length === 0) {
          const idx = inputArray[last_idx].property.else_Action;
          const newArray = [
            { id: idx, hasValue: true, functionName: 'dropBox' },
          ];
          inputArray[last_idx].property.else_Action = newArray;
        } else if (
          inputArray[last_idx].property.else_Action.length !== 0 &&
          inputArray[last_idx].property.else_Action[last_else_action_idx]
            .hasValue === true
        ) {
          console.log('color after color in the else ');
          const idx = inputArray[last_idx].property.else_Action.length;
          const newArray = [
            ...inputArray[last_idx].property.else_Action,
            { id: idx, hasValue: true, functionName: 'dropBox' },
          ];
          inputArray[last_idx].property.else_Action = newArray;
        } else {
          return;
        }
      } else if (
        inputArray[last_idx].Argument === 'for' &&
        inputArray[last_idx].property.thirdOperator !== '' &&
        inputArray[last_idx].property.completeForBlock === ''
      ) {
        const last_else_action_idx =
          inputArray[last_idx].property.for_Action.length - 1;
        if (inputArray[last_idx].property.for_Action.length === 0) {
          const idx = inputArray[last_idx].property.for_Action;
          const newArray = [
            { id: idx, hasValue: true, functionName: 'dropBox' },
          ];
          inputArray[last_idx].property.for_Action = newArray;
          inputArray[last_idx].hasAction = true;
        } else if (
          inputArray[last_idx].property.for_Action.length !== 0 &&
          inputArray[last_idx].property.for_Action[last_else_action_idx]
            .hasValue === true
        ) {
          const idx = inputArray[last_idx].property.for_Action.length;
          const newArray = [
            ...inputArray[last_idx].property.for_Action,
            { id: idx, hasValue: true, functionName: 'dropBox' },
          ];
          inputArray[last_idx].property.for_Action = newArray;
          inputArray[last_idx].hasAction = true;
        } else {
          return;
        }
      } else if (
        inputArray[last_idx].Argument === 'for' &&
        inputArray[last_idx].property.thirdOperator !== '' &&
        inputArray[last_idx].property.completeForBlock !== ''
      ) {
        const newArray = [
          ...inputArray,
          {
            Argument: 'outSide',
            hasAction: true,
            property: {
              actions: [{ id: 0, hasValue: true, functionName: 'dropBox' }],
            },
          },
        ];
        state.EngineInput = newArray;
      } else if (
        inputArray[last_idx].Argument === 'while' &&
        inputArray[last_idx].property.firstOperator !== '' &&
        inputArray[last_idx].property.secondArg !== '' &&
        inputArray[last_idx].property.completeWhileBlock === ''
      ) {
        const last_else_action_idx =
          inputArray[last_idx].property.while_Action.length - 1;
        if (inputArray[last_idx].property.while_Action.length === 0) {
          const idx = inputArray[last_idx].property.while_Action.length;
          const newArray = [
            { id: idx, hasValue: true, functionName: 'dropBox' },
          ];
          inputArray[last_idx].property.while_Action = newArray;
          inputArray[last_idx].hasAction = true;
        } else if (
          inputArray[last_idx].property.while_Action.length !== 0 &&
          inputArray[last_idx].property.while_Action[last_else_action_idx]
            .hasValue === true
        ) {
          const idx = inputArray[last_idx].property.while_Action.length;
          const newArray = [
            ...inputArray[last_idx].property.while_Action,
            { id: idx, hasValue: true, functionName: 'dropBox' },
          ];
          inputArray[last_idx].property.while_Action = newArray;
          inputArray[last_idx].hasAction = true;
        } else {
          return;
        }
      } else if (
        inputArray[last_idx].Argument === 'while' &&
        inputArray[last_idx].property.thirdArg !== '' &&
        inputArray[last_idx].property.completeWhileBlock !== ''
      ) {
        if (inputArray[last_idx].property.secondOperator !== '') {
          const newArray = [
            ...inputArray,
            {
              Argument: 'outSide',
              hasAction: true,
              property: {
                actions: [{ id: 0, hasValue: true, functionName: 'dropBox' }],
              },
            },
          ];
          state.EngineInput = newArray;
        } else {
          console.log(
            'finish the incremental condition in the while loop first'
          );
        }
      }
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
        inputArray[last_idx].Argument === 'outSide'
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
        inputArray[last_idx].Argument === 'if' &&
        inputArray[last_idx].property.actionNameElse === '' &&
        inputArray[last_idx].property.IfblockComplete === ''
      ) {
        const last_action_idx =
          inputArray[last_idx].property.if_Action.length - 1;
        if (
          inputArray[last_idx].property.secondArg !== '' &&
          inputArray[last_idx].property.if_Action.length === 0
        ) {
          const idx = inputArray[last_idx].property.if_Action.length;
          console.log('property.if_Action.length === 0 ');

          const newArray = [
            {
              id: idx,
              hasValue: false,
              value: '',
              functionName: 'color',
              valueWithVariable: false,
              variableName: '',
            },
          ];
          inputArray[last_idx].property.if_Action = newArray;
        } else if (
          inputArray[last_idx].property.secondArg !== '' &&
          inputArray[last_idx].property.if_Action[last_action_idx].hasValue ===
            true &&
          inputArray[last_idx].property.if_Action.length !== 0
        ) {
          console.log('color after color in the if ');
          const idx = inputArray[last_idx].property.if_Action.length;
          const newArray = [
            ...inputArray[last_idx].property.if_Action,
            {
              id: idx,
              hasValue: false,
              value: '',
              functionName: 'color',
              valueWithVariable: false,
              variableName: '',
            },
          ];
          inputArray[last_idx].property.if_Action = newArray;
        } else {
          return;
        }
      } else if (
        inputArray[last_idx].Argument === 'if' &&
        inputArray[last_idx].hasAction === true &&
        inputArray[last_idx].property.actionNameElse === '' &&
        inputArray[last_idx].property.IfblockComplete !== ''
      ) {
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
        inputArray[last_idx].Argument === 'if' &&
        inputArray[last_idx].hasAction === true &&
        inputArray[last_idx].property.actionNameElse !== '' &&
        inputArray[last_idx].property.ElseblockComplete !== ''
      ) {
        console.log('color after if ');
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
        inputArray[last_idx].Argument === 'if' &&
        inputArray[last_idx].property.actionNameElse !== '' &&
        inputArray[last_idx].property.ElseblockComplete === ''
      ) {
        const last_else_action_idx =
          inputArray[last_idx].property.else_Action.length - 1;
        if (inputArray[last_idx].property.else_Action.length === 0) {
          const idx = inputArray[last_idx].property.else_Action;
          const newArray = [
            {
              id: idx,
              hasValue: false,
              value: '',
              functionName: 'color',
              valueWithVariable: false,
              variableName: '',
            },
          ];
          inputArray[last_idx].property.else_Action = newArray;
        } else if (
          inputArray[last_idx].property.else_Action.length !== 0 &&
          inputArray[last_idx].property.else_Action[last_else_action_idx]
            .hasValue === true
        ) {
          console.log('color after color in the else ');
          const idx = inputArray[last_idx].property.else_Action.length;
          const newArray = [
            ...inputArray[last_idx].property.else_Action,
            {
              id: idx,
              hasValue: false,
              value: '',
              functionName: 'color',
              valueWithVariable: false,
              variableName: '',
            },
          ];
          inputArray[last_idx].property.else_Action = newArray;
        } else {
          return;
        }
      } else if (
        inputArray[last_idx].Argument === 'for' &&
        inputArray[last_idx].property.thirdOperator !== '' &&
        inputArray[last_idx].property.completeForBlock === ''
      ) {
        const last_else_action_idx =
          inputArray[last_idx].property.for_Action.length - 1;
        if (inputArray[last_idx].property.for_Action.length === 0) {
          const idx = inputArray[last_idx].property.for_Action;
          const newArray = [
            { id: idx, hasValue: false, value: '', functionName: 'color' },
          ];
          inputArray[last_idx].property.for_Action = newArray;
          inputArray[last_idx].hasAction = true;
        } else if (
          inputArray[last_idx].property.for_Action.length !== 0 &&
          inputArray[last_idx].property.for_Action[last_else_action_idx]
            .hasValue === true
        ) {
          const idx = inputArray[last_idx].property.for_Action.length;
          const newArray = [
            ...inputArray[last_idx].property.for_Action,
            { id: idx, hasValue: false, value: '', functionName: 'color' },
          ];
          inputArray[last_idx].property.for_Action = newArray;
          inputArray[last_idx].hasAction = true;
        } else {
          return;
        }
      } else if (
        inputArray[last_idx].Argument === 'for' &&
        inputArray[last_idx].property.thirdOperator !== '' &&
        inputArray[last_idx].property.completeForBlock !== ''
      ) {
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
        inputArray[last_idx].Argument === 'while' &&
        inputArray[last_idx].property.firstOperator !== '' &&
        inputArray[last_idx].property.secondArg !== '' &&
        inputArray[last_idx].property.completeWhileBlock === ''
      ) {
        const last_else_action_idx =
          inputArray[last_idx].property.while_Action.length - 1;
        if (inputArray[last_idx].property.while_Action.length === 0) {
          const idx = inputArray[last_idx].property.while_Action.length;
          const newArray = [
            { id: idx, hasValue: false, value: '', functionName: 'color' },
          ];
          inputArray[last_idx].property.while_Action = newArray;
          inputArray[last_idx].hasAction = true;
        } else if (
          inputArray[last_idx].property.while_Action.length !== 0 &&
          inputArray[last_idx].property.while_Action[last_else_action_idx]
            .hasValue === true
        ) {
          const idx = inputArray[last_idx].property.while_Action.length;
          const newArray = [
            ...inputArray[last_idx].property.while_Action,
            { id: idx, hasValue: false, value: '', functionName: 'color' },
          ];
          inputArray[last_idx].property.while_Action = newArray;
          inputArray[last_idx].hasAction = true;
        } else {
          return;
        }
      } else if (
        inputArray[last_idx].Argument === 'while' &&
        inputArray[last_idx].property.thirdArg !== '' &&
        inputArray[last_idx].property.completeWhileBlock !== ''
      ) {
        if (inputArray[last_idx].property.secondOperator !== '') {
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
          console.log(
            'finish the incremental condition in the while loop first'
          );
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
          const IfAction_last_idx = item.property.if_Action.length - 1;
          if (!item.property.actionNameElse) {
            if (
              item.property.firstArg === '' &&
              item.property.operator === ''
            ) {
              item.property.firstArg = action.payload;
            } else if (
              item.property.firstArg !== '' &&
              item.property.operator === ''
            ) {
              item.property.firstArg = action.payload;
            } else if (
              item.property.firstArg !== '' &&
              item.property.secondArg === '' &&
              item.property.operator !== ''
            ) {
              item.hasAction = true;
              item.property.secondArg = action.payload;
            } else if (
              item.property.secondArg !== '' &&
              item.property.if_Action.length === 0
            ) {
              item.hasAction = true;
              item.property.secondArg = action.payload;
            } else if (
              item.property.if_Action.length !== 0 &&
              item.hasAction === true
            ) {
              //but what are the values that goes in to the this array
              const ifActionList = item.property.if_Action;
              ifActionList[IfAction_last_idx].value = action.payload;
              ifActionList[IfAction_last_idx].hasValue = true;
              item.property.if_Action = ifActionList;
            }
          } else {
            const elseAction_last_idx = item.property.else_Action.length - 1;
            const elseActionList = item.property.else_Action;
            elseActionList[elseAction_last_idx].value = action.payload;
            elseActionList[elseAction_last_idx].hasValue = true;
            item.property.else_Action = elseActionList;
          }
        } else if (item.Argument === 'for' && idx === inputArray.length - 1) {
          const Action_last_idx = item.property.for_Action.length - 1;
          if (
            item.property.firstArg === '' &&
            item.property.firstOperator === ''
          ) {
            item.property.firstArg = action.payload;
          } else if (
            item.property.secondArg === '' &&
            item.property.thirdArg === ''
          ) {
            item.property.secondArg = action.payload;
          } else if (
            item.property.thirdArg === '' &&
            item.property.fourthArg === ''
          ) {
            if (action.payload === item.property.firstArg) {
              item.property.thirdArg = action.payload;
            }
          } else if (
            item.property.fourthArg === '' &&
            item.property.fifthArg === ''
          ) {
            item.property.fourthArg = action.payload;
          } else if (
            item.property.fifthArg === '' &&
            item.property.thirdOperator === ''
          ) {
            if (action.payload === item.property.firstArg) {
              item.property.fifthArg = action.payload;
            }
          } else if (
            item.property.firstArg !== '' &&
            item.property.firstOperator === ''
          ) {
            item.property.firstArg = action.payload;
          } else if (
            item.property.secondArg !== '' &&
            item.property.thirdArg === ''
          ) {
            item.property.secondArg = action.payload;
          } else if (
            item.property.thirdArg !== '' &&
            item.property.secondArg === ''
          ) {
            if (action.payload === item.property.firstArg) {
              item.property.thirdArg = action.payload;
            }
          } else if (
            item.property.fourthArg !== '' &&
            item.property.fifthArg === ''
          ) {
            item.property.fourthArg = action.payload;
          } else if (
            item.property.fifthArg !== '' &&
            item.property.thirdOperator === ''
          ) {
            if (action.payload === item.property.firstArg) {
              item.property.fifthArg = action.payload;
            }
          } else {
            //but what are the values that goes in to the this array
            const forActionList = item.property.for_Action;
            forActionList[Action_last_idx].value = action.payload;
            forActionList[Action_last_idx].hasValue = true;
          }
        } else if (item.Argument === 'while') {
          const Action_last_idx = item.property.while_Action.length - 1;
          if (
            item.property.firstArg === '' &&
            item.property.firstOperator === ''
          ) {
            item.property.firstArg = action.payload;
          } else if (
            item.property.firstArg !== '' &&
            item.property.firstOperator === ''
          ) {
            item.property.firstArg = action.payload;
          } else if (
            item.property.secondArg === '' &&
            item.property.while_Action.length === 0 &&
            item.property.firstOperator !== ''
          ) {
            item.property.secondArg = action.payload;
          } else if (
            item.property.secondArg !== '' &&
            item.property.while_Action.length === 0 &&
            item.property.firstOperator !== ''
          ) {
            item.property.secondArg = action.payload;
          }
          //  else if (
          //   item.property.thirdArg === '' &&
          //   item.property.secondOperator !== '' &&
          //   item.property.while_Action.length !== 0
          // ) {
          //   if (
          //     action.payload === item.property.firstArg ||
          //     action.payload === item.property.secondArg
          //   ) {
          //     item.property.thirdArg = action.payload;
          //   }
          // }
          else if (
            item.property.firstOperator !== '' &&
            item.property.secondArg !== '' &&
            item.property.firstArg !== '' &&
            item.property.completeWhileBlock === ''
          ) {
            //but what are the values that goes in to the this array
            const whileActionList = item.property.while_Action;
            whileActionList[Action_last_idx].value = action.payload;
            whileActionList[Action_last_idx].hasValue = true;
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
      const item = inputArray[last_idx];

      const isThereVariable = inputArray.some(
        (inP) => inP.property.varName === action.payload
      );

      if (inputArray[last_idx] != undefined) {
        if (inputArray[last_idx].Argument === 'outSide') {
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
        if (isThereVariable) {
          //find the last valriable in the array
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
      } else if (inputArray[last_idx].Argument === 'if' && isThereVariable) {
        const item = inputArray[last_idx];
        if (!item.property.actionNameElse) {
          console.log('!item.property.actionNameElse');
          if (item.property.firstArg === '' && item.property.operator === '') {
            item.property.firstArg = action.payload;
          } else if (
            item.property.firstArg !== '' &&
            item.property.operator === ''
          ) {
            item.property.firstArg = action.payload;
          } else if (
            item.property.firstArg !== '' &&
            item.property.secondArg === '' &&
            item.property.operator !== ''
          ) {
            item.hasAction = true;
            item.property.secondArg = action.payload;
          } else if (
            item.property.secondArg !== '' &&
            item.property.if_Action.length === 0
          ) {
            item.hasAction = true;
            item.property.secondArg = action.payload;
          }
        }
      } else if (
        inputArray[last_idx].Argument === 'for' &&
        inputArray[last_idx].property.completeForBlock === ''
      ) {
        const item = inputArray[last_idx];
        if (
          item.property.firstArg === '' &&
          item.property.firstOperator === ''
        ) {
          item.property.firstArg = action.payload;
        } else if (
          item.property.secondArg === '' &&
          item.property.thirdArg === '' &&
          item.property.firstOperator !== ''
        ) {
          item.property.secondArg = action.payload;
        } else if (
          item.property.thirdArg === '' &&
          item.property.secondArg !== ''
        ) {
          if (action.payload === item.property.firstArg) {
            item.property.thirdArg = action.payload;
          }
        } else if (
          item.property.fourthArg === '' &&
          item.property.fifthArg === '' &&
          item.property.secondOperator !== ''
        ) {
          item.property.fourthArg = action.payload;
        } else if (
          item.property.fifthArg === '' &&
          item.property.thirdOperator === '' &&
          item.property.fourthArg !== ''
        ) {
          if (action.payload === item.property.firstArg) {
            item.property.fifthArg = action.payload;
          }
        } else if (
          item.property.firstArg !== '' &&
          item.property.firstOperator === ''
        ) {
          item.property.firstArg = action.payload;
        } else if (
          item.property.secondArg !== '' &&
          item.property.thirdArg === ''
        ) {
          item.property.secondArg = action.payload;
        } else if (
          item.property.thirdArg !== '' &&
          item.property.secondArg === ''
        ) {
          if (action.payload === item.property.firstArg) {
            item.property.thirdArg = action.payload;
          }
        } else if (
          item.property.fourthArg !== '' &&
          item.property.fifthArg === ''
        ) {
          item.property.fourthArg = action.payload;
        } else if (
          item.property.fifthArg !== '' &&
          item.property.thirdOperator === ''
        ) {
          if (action.payload === item.property.firstArg) {
            item.property.fifthArg = action.payload;
          }
        }
      } else if (
        inputArray[last_idx].Argument === 'for' &&
        inputArray[last_idx].property.thirdOperator !== '' &&
        inputArray[last_idx].property.completeForBlock !== ''
      ) {
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
        inputArray[last_idx].Argument === 'while' &&
        isThereVariable &&
        item.property.completeWhileBlock === ''
      ) {
        const item = inputArray[last_idx];
        if (
          item.property.firstArg === '' &&
          item.property.firstOperator === ''
        ) {
          item.property.firstArg = action.payload;
        } else if (
          item.property.firstArg !== '' &&
          item.property.firstOperator === ''
        ) {
          item.property.firstArg = action.payload;
        } else if (
          item.property.secondArg === '' &&
          item.property.while_Action.length == 0
        ) {
          item.property.secondArg = action.payload;
        } else if (
          item.property.secondArg !== '' &&
          item.property.while_Action.length == 0
        ) {
          item.property.secondArg = action.payload;
        } else if (
          item.property.thirdArg === '' &&
          item.property.secondArg !== ''
        ) {
          if (
            action.payload === item.property.firstArg ||
            action.payload === item.property.secondArg
          ) {
            item.property.thirdArg = action.payload;
          }
        } else if (
          item.property.thirdArg !== '' &&
          item.property.secondArg !== ''
        ) {
          if (
            action.payload === item.property.firstArg ||
            action.payload === item.property.secondArg
          ) {
            item.property.thirdArg = action.payload;
          }
        }
      } else if (
        item.Argument === 'while' &&
        item.property.secondOperator !== '' &&
        item.property.secondArg !== '' &&
        item.property.completeWhileBlock !== ''
      ) {
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
      // console.log('operator: ', inputArray[last_idx].property.operator !== '');

      if (
        inputArray[last_idx].Argument === 'if' &&
        inputArray[last_idx].property.operator !== ''
      ) {
        const action_Object = inputArray[last_idx].property;
        action_Object.operator = action.payload;
        console.log(action.payload);
        inputArray[last_idx].property = action_Object;
        state.EngineInput = inputArray;
      } else if (
        inputArray[last_idx].Argument === 'if' &&
        inputArray[last_idx].property.operator === ''
      ) {
        const action_Object = inputArray[last_idx].property;
        action_Object.operator = action.payload;
        console.log(action.payload);
        inputArray[last_idx].property = action_Object;
      } else if (
        inputArray[last_idx].Argument === 'for' &&
        inputArray[last_idx].property.firstOperator === '' &&
        inputArray[last_idx].property.firstArg !== ''
      ) {
        if (action.payload === '=') {
          const action_Object = inputArray[last_idx].property;
          action_Object.firstOperator = action.payload;
        }

        console.log('nested if =');
      } else if (
        inputArray[last_idx].Argument === 'for' &&
        inputArray[last_idx].property.firstOperator !== '' &&
        inputArray[last_idx].property.firstArg !== '' &&
        inputArray[last_idx].property.secondArg === ''
      ) {
        const action_Object = inputArray[last_idx].property;
        action_Object.firstOperator = action.payload;
      } else if (
        inputArray[last_idx].Argument === 'for' &&
        inputArray[last_idx].property.secondOperator === '' &&
        inputArray[last_idx].property.thirdArg !== ''
      ) {
        if (action.payload === '<' || action.payload === '>') {
          const action_Object = inputArray[last_idx].property;
          action_Object.secondOperator = action.payload;
        }
      } else if (
        inputArray[last_idx].Argument === 'for' &&
        inputArray[last_idx].property.secondOperator !== '' &&
        inputArray[last_idx].property.thirdArg !== '' &&
        inputArray[last_idx].property.fourthArg === ''
      ) {
        if (action.payload === '<' || action.payload === '>') {
          const action_Object = inputArray[last_idx].property;
          action_Object.secondOperator = action.payload;
        }
      } else if (
        inputArray[last_idx].Argument === 'for' &&
        inputArray[last_idx].property.thirdOperator === '' &&
        inputArray[last_idx].property.fifthArg !== ''
      ) {
        if (action.payload === '++' || action.payload === '--') {
          const action_Object = inputArray[last_idx].property;
          action_Object.thirdOperator = action.payload;
        }
      } else if (
        inputArray[last_idx].Argument === 'for' &&
        inputArray[last_idx].property.thirdOperator !== '' &&
        inputArray[last_idx].property.firstArg !== '' &&
        inputArray[last_idx].property.for_Action.length === 0
      ) {
        if (action.payload === '++' || action.payload === '--') {
          const action_Object = inputArray[last_idx].property;
          action_Object.thirdOperator = action.payload;
        }
      } else if (
        inputArray[last_idx].Argument === 'while' &&
        inputArray[last_idx].property.firstOperator === '' &&
        inputArray[last_idx].property.firstArg !== ''
      ) {
        if (action.payload === '<' || action.payload === '>') {
          const action_Object = inputArray[last_idx].property;
          action_Object.firstOperator = action.payload;
        }
      } else if (
        inputArray[last_idx].Argument === 'while' &&
        inputArray[last_idx].property.firstOperator !== '' &&
        inputArray[last_idx].property.firstArg !== '' &&
        inputArray[last_idx].property.secondArg === ''
      ) {
        if (action.payload === '<' || action.payload === '>') {
          const action_Object = inputArray[last_idx].property;
          action_Object.firstOperator = action.payload;
        }
      } else if (
        inputArray[last_idx].Argument === 'while' &&
        inputArray[last_idx].property.secondOperator === '' &&
        inputArray[last_idx].property.thirdArg !== ''
      ) {
        if (action.payload === '++' || action.payload === '--') {
          const action_Object = inputArray[last_idx].property;
          action_Object.secondOperator = action.payload;
        }
      } else if (
        inputArray[last_idx].Argument === 'while' &&
        inputArray[last_idx].property.secondOperator !== '' &&
        inputArray[last_idx].property.thirdArg !== ''
      ) {
        if (action.payload === '++' || action.payload === '--') {
          const action_Object = inputArray[last_idx].property;
          action_Object.secondOperator = action.payload;
        }
      }
    },
    loopAction: (state, action) => {
      const inputArray = state.EngineInput;
      const id = inputArray.length;
      const last_idx = inputArray.length - 1;

      if (id === 0 && action.payload === 'for') {
        const newArray = [
          {
            Argument: 'for',
            hasAction: false,
            property: {
              actionNameFor: 'for',
              firstArg: '',
              firstOperator: '',
              secondArg: '',
              thirdArg: '',
              secondOperator: '',
              fourthArg: '',
              fifthArg: '',
              thirdOperator: '',
              for_Action: [],
              completeForBlock: '',
            },
          },
        ];
        state.EngineInput = newArray;
      } else if (id === 0 && action.payload === 'while') {
        const newArray = [
          {
            Argument: 'while',
            hasAction: false,
            property: {
              actionNameWhile: 'while',
              firstArg: '',
              firstOperator: '',
              secondArg: '',
              while_Action: [],
              thirdArg: '',
              secondOperator: '',
              completeWhileBlock: '',
            },
          },
        ];
        state.EngineInput = newArray;
      } else if (
        inputArray[last_idx].Argument === 'variable' &&
        action.payload === 'for'
      ) {
        const newArray = [
          ...inputArray,
          {
            Argument: 'for',
            hasAction: false,
            property: {
              actionNameFor: 'for',
              firstArg: '',
              firstOperator: '',
              secondArg: '',
              thirdArg: '',
              secondOperator: '',
              fourthArg: '',
              fifthArg: '',
              thirdOperator: '',
              for_Action: [],
              completeForBlock: '',
            },
          },
        ];
        state.EngineInput = newArray;
      } else if (
        inputArray[last_idx].Argument === 'while' &&
        action.payload === 'for'
      ) {
        if (inputArray[last_idx].secondOperator !== '') {
          const newArray = [
            ...inputArray,
            {
              Argument: 'for',
              hasAction: false,
              property: {
                actionNameFor: 'for',
                firstArg: '',
                firstOperator: '',
                secondArg: '',
                thirdArg: '',
                secondOperator: '',
                fourthArg: '',
                fifthArg: '',
                thirdOperator: '',
                for_Action: [],
                completeForBlock: '',
              },
            },
          ];
          state.EngineInput = newArray;
        }
      } else if (
        inputArray[last_idx].Argument === 'variable' &&
        inputArray[last_idx].property.hasValue &&
        action.payload === 'while'
      ) {
        const newArray = [
          ...inputArray,
          {
            Argument: 'while',
            hasAction: false,
            property: {
              actionNameWhile: 'while',
              firstArg: '',
              firstOperator: '',
              secondArg: '',
              while_Action: [],
              thirdArg: '',
              secondOperator: '',
              completeWhileBlock: '',
            },
          },
        ];
        state.EngineInput = newArray;
      } else if (
        inputArray[last_idx].Argument === 'outSide' &&
        inputArray[last_idx].hasAction &&
        action.payload === 'while'
      ) {
        const action_Array = inputArray[last_idx].property.actions;
        const last_action_idx =
          inputArray[last_idx].property.actions.length - 1;
        if (action_Array[last_action_idx].hasValue == true) {
          const newArray = [
            ...inputArray,
            {
              Argument: 'while',
              hasAction: false,
              property: {
                actionNameWhile: 'while',
                firstArg: '',
                firstOperator: '',
                secondArg: '',
                while_Action: [],
                thirdArg: '',
                secondOperator: '',
                completeWhileBlock: '',
              },
            },
          ];
          state.EngineInput = newArray;
        }
      } else if (
        inputArray[last_idx].Argument === 'outSide' &&
        action.payload === 'for'
      ) {
        const action_Array = inputArray[last_idx].property.actions;
        const last_action_idx =
          inputArray[last_idx].property.actions.length - 1;
        if (action_Array[last_action_idx].hasValue == true) {
          const newArray = [
            ...inputArray,
            {
              Argument: 'for',
              hasAction: false,
              property: {
                actionNameFor: 'for',
                firstArg: '',
                firstOperator: '',
                secondArg: '',
                thirdArg: '',
                secondOperator: '',
                fourthArg: '',
                fifthArg: '',
                thirdOperator: '',
                for_Action: [],
                completeForBlock: '',
              },
            },
          ];
          state.EngineInput = newArray;
        }
      } else if (
        inputArray[last_idx].Argument === 'outSide' &&
        action.payload === 'while'
      ) {
        const action_Array = inputArray[last_idx].property.actions;
        const last_action_idx =
          inputArray[last_idx].property.actions.length - 1;
        if (action_Array[last_action_idx].hasValue == true) {
          const newArray = [
            ...inputArray,
            {
              Argument: 'while',
              hasAction: false,
              property: {
                actionNameWhile: 'while',
                firstArg: '',
                firstOperator: '',
                secondArg: '',
                while_Action: [],
                thirdArg: '',
                secondOperator: '',
                completeWhileBlock: '',
              },
            },
          ];
          state.EngineInput = newArray;
        }
      } else if (
        inputArray[last_idx].Argument === 'if' &&
        action.payload === 'for' &&
        inputArray[last_idx].property.else_Action.length !== 0
      ) {
        const newArray = [
          ...inputArray,
          {
            Argument: 'for',
            hasAction: false,
            property: {
              actionNameFor: 'for',
              firstArg: '',
              firstOperator: '',
              secondArg: '',
              thirdArg: '',
              secondOperator: '',
              fourthArg: '',
              fifthArg: '',
              thirdOperator: '',
              for_Action: [],
              completeForBlock: '',
            },
          },
        ];
        state.EngineInput = newArray;
      } else if (
        inputArray[last_idx].Argument === 'if' &&
        action.payload === 'while' &&
        inputArray[last_idx].property.else_Action.length !== 0
      ) {
        const newArray = [
          ...inputArray,
          {
            Argument: 'while',
            hasAction: false,
            property: {
              actionNameWhile: 'while',
              firstArg: '',
              firstOperator: '',
              secondArg: '',
              while_Action: [],
              thirdArg: '',
              secondOperator: '',
              completeWhileBlock: '',
            },
          },
        ];
        state.EngineInput = newArray;
      } else if (
        inputArray[last_idx].Argument === 'for' &&
        action.payload === 'for' &&
        inputArray[last_idx].property.completeForBlock !== ''
      ) {
        console.log('from for after for');
        const newArray = [
          ...inputArray,
          {
            Argument: 'for',
            hasAction: false,
            property: {
              actionNameFor: 'for',
              firstArg: '',
              firstOperator: '',
              secondArg: '',
              thirdArg: '',
              secondOperator: '',
              fourthArg: '',
              fifthArg: '',
              thirdOperator: '',
              for_Action: [],
              completeForBlock: '',
            },
          },
        ];
        state.EngineInput = newArray;
      } else if (
        inputArray[last_idx].Argument === 'while' &&
        action.payload == 'for' &&
        inputArray[last_idx].property.secondOperator != ''
      ) {
        const newArray = [
          ...inputArray,
          {
            Argument: 'for',
            hasAction: false,
            property: {
              actionNameFor: 'for',
              firstArg: '',
              firstOperator: '',
              secondArg: '',
              thirdArg: '',
              secondOperator: '',
              fourthArg: '',
              fifthArg: '',
              thirdOperator: '',
              for_Action: [],
              completeForBlock: '',
            },
          },
        ];
        state.EngineInput = newArray;
      } else if (
        inputArray[last_idx].Argument === 'for' &&
        action.payload == 'while' &&
        inputArray[last_idx].property.for_Action.length !== 0
      ) {
        const newArray = [
          ...inputArray,
          {
            Argument: 'while',
            hasAction: false,
            property: {
              actionNameWhile: 'while',
              firstArg: '',
              firstOperator: '',
              secondArg: '',
              while_Action: [],
              thirdArg: '',
              secondOperator: '',
              completeWhileBlock: '',
            },
          },
        ];
        state.EngineInput = newArray;
      } else if (
        inputArray[last_idx].Argument === 'while' &&
        action.payload == 'while' &&
        inputArray[last_idx].property.completeWhileBlock != ''
      ) {
        const newArray = [
          ...inputArray,
          {
            Argument: 'while',
            hasAction: false,
            property: {
              actionNameWhile: 'while',
              firstArg: '',
              firstOperator: '',
              secondArg: '',
              while_Action: [],
              thirdArg: '',
              secondOperator: '',
              completeWhileBlock: '',
            },
          },
        ];
        state.EngineInput = newArray;
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
              actionNameIf: 'if',
              firstArg: '',
              operator: '',
              secondArg: '',
              if_Action: [],
              actionNameElse: '',
              else_Action: [],
              IfblockComplete: '',
              ElseblockComplete: '',
            },
          },
        ];
        state.EngineInput = newArray;
      } else if (
        inputArray[last_idx].Argument === 'variable' &&
        inputArray[last_idx].property.hasValue &&
        action.payload === 'if'
      ) {
        const newArray = [
          ...inputArray,
          {
            Argument: 'if',
            hasAction: false,
            property: {
              actionNameIf: 'if',
              firstArg: '',
              operator: '',
              secondArg: '',
              if_Action: [],
              actionNameElse: '',
              else_Action: [],
              IfblockComplete: '',
              ElseblockComplete: '',
            },
          },
        ];
        state.EngineInput = newArray;
      } else if (
        inputArray[last_idx].Argument === 'outSide' &&
        action.payload === 'if'
      ) {
        const action_Array = inputArray[last_idx].property.actions;
        const last_action_idx =
          inputArray[last_idx].property.actions.length - 1;
        if (action_Array[last_action_idx].hasValue == true) {
          const newArray = [
            ...inputArray,
            {
              Argument: 'if',
              hasAction: false,
              property: {
                actionNameIf: 'if',
                firstArg: '',
                operator: '',
                secondArg: '',
                if_Action: [],
                actionNameElse: '',
                else_Action: [],
                IfblockComplete: '',
                ElseblockComplete: '',
              },
            },
          ];
          state.EngineInput = newArray;
        }
      } else if (
        action.payload === 'else' &&
        inputArray[last_idx].Argument === 'if' &&
        inputArray[last_idx].property.if_Action.length !== 0 &&
        inputArray[last_idx].property.IfblockComplete !== ''
      ) {
        const action_last_idx =
          inputArray[last_idx].property.if_Action.length - 1;

        if (inputArray[last_idx].property.if_Action[action_last_idx].hasValue) {
          if (
            inputArray[last_idx].property.firstArg != '' &&
            inputArray[last_idx].property.operator != '' &&
            inputArray[last_idx].property.secondArg != '' &&
            inputArray[last_idx].property.if_Action.length !== 0
          ) {
            inputArray[last_idx].property.actionNameElse = action.payload;
          }
        }
      } else if (
        inputArray[last_idx].Argument === 'if' &&
        inputArray[last_idx].property.if_Action.length !== 0 &&
        action.payload === 'if' &&
        inputArray[last_idx].property.IfblockComplete !== ''
      ) {
        console.log('from if after if ');

        const newArray = [
          ...inputArray,
          {
            Argument: 'if',
            hasAction: false,
            property: {
              actionNameIf: action.payload,
              firstArg: '',
              operator: '',
              secondArg: '',
              if_Action: [],
              actionNameElse: '',
              else_Action: [],
              IfblockComplete: '',
              ElseblockComplete: '',
            },
          },
        ];
        state.EngineInput = newArray;
      } else {
        return;
      }
    },

    closeBlockAction: (state, action) => {
      const inputArray = state.EngineInput;
      const last_idx = inputArray.length - 1;

      if (
        inputArray[last_idx].Argument === 'if' &&
        inputArray[last_idx].hasAction
      ) {
        if (
          inputArray[last_idx].property.actionNameIf.length !== 0 &&
          inputArray[last_idx].property.actionNameElse.length === 0
        ) {
          const last_Ifaction_idx =
            inputArray[last_idx].property.if_Action.length - 1;
          const lastIfAction =
            inputArray[last_idx].property.if_Action[last_Ifaction_idx];
          if (lastIfAction.hasValue) {
            inputArray[last_idx].property.IfblockComplete = action.payload;
          }
        } else if (
          inputArray[last_idx].property.actionNameIf.length !== 0 &&
          inputArray[last_idx].property.actionNameElse.length !== 0
        ) {
          const last_Elseaction_idx =
            inputArray[last_idx].property.else_Action.length - 1;
          const lastElseAction =
            inputArray[last_idx].property.else_Action[last_Elseaction_idx];
          if (lastElseAction.hasValue) {
            inputArray[last_idx].property.ElseblockComplete = action.payload;
          }
        }
      } else if (
        inputArray[last_idx].Argument === 'for' &&
        inputArray[last_idx].hasAction
      ) {
        if (inputArray[last_idx].property.for_Action.length !== 0) {
          console.log('from for close block');
          const last_Foraction_idx =
            inputArray[last_idx].property.for_Action.length - 1;
          const lastForAction =
            inputArray[last_idx].property.for_Action[last_Foraction_idx];
          if (lastForAction.hasValue) {
            inputArray[last_idx].property.completeForBlock = action.payload;
          }
        }
      } else if (
        inputArray[last_idx].Argument === 'while' &&
        inputArray[last_idx].hasAction
      ) {
        if (
          inputArray[last_idx].property.while_Action.length !== 0 &&
          inputArray[last_idx].property.secondOperator !== ''
        ) {
          console.log('from while close block');
          const last_Whileaction_idx =
            inputArray[last_idx].property.while_Action.length - 1;
          const lastWhileAction =
            inputArray[last_idx].property.while_Action[last_Whileaction_idx];
          if (lastWhileAction.hasValue) {
            inputArray[last_idx].property.completeWhileBlock = action.payload;
          }
        }
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
  loopAction,
  closeBlockAction,
  moveAction,
  turnAction,
  dropAction,
  numberAction,
  modalOn,
  modalOff,
  dispatchRedVar,
  dispatchIfVar,
} = actionSlice.actions;

export const selectEngineOutput = (state) => state.action.EngineOutput;
export const selectEngineInput = (state) => state.action.EngineInput;
export default actionSlice.reducer;
