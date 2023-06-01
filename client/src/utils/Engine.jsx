const Engine = (data) => {
  const outArr = [];
  const varObj = [];

  data.map((item) => {
    if (item.Argument === 'variable') {
      if (varObj.length === 0) {
        const obj = {
          varName: item.property.varName,
          varValue: item.property.varValue,
        };
        varObj.push(obj);
      } else {
        const objExists = varObj.some(
          (obj) => obj.varName === item.property.varName
        );
        if (objExists) {
          let objToModify = varObj.find(
            (obj) => obj.varName === item.property.varName
          );
          objToModify.varValue = item.property.varValue;
        } else {
          const obj = {
            varName: item.property.varName,
            varValue: item.property.varValue,
          };
          varObj.push(obj);
        }
      }
    } else if (item.Argument === 'if') {
      if (item.property.operator === '==') {
        if (item.property.firstArg == item.property.secondArg) {
          item.property.if_Action.map((i) => {
            if (i.functionName === 'color') {
              let objExists = varObj.some((obj) => obj.varName === i.value);
              if (objExists) {
                let objToModify = varObj.find((obj) => obj.varName === i.value);
                outArr.push({ name: 'color', value: objToModify.varValue });
              } else {
                outArr.push({ name: 'color', value: i.value });
              }
            } else if (i.functionName === 'move') {
              outArr.push({ name: 'move', value: 'move' });
            } else if (i.functionName === 'turn') {
              outArr.push({ name: 'turn', value: 'turn' });
            } else if (i.functionName === 'dropBox') {
              outArr.push({ name: 'dropBox', value: 'dropbox' });
            } else {
              console.log('error');
            }
          });
        } else {
          item.property.else_Action.map((i) => {
            if (i.functionName === 'color') {
              let objExists = varObj.some((obj) => obj.varName === i.value);
              if (objExists) {
                let objToModify = varObj.find((obj) => obj.varName === i.value);
                outArr.push({ name: 'color', value: objToModify.varValue });
              } else {
                outArr.push({ name: 'color', value: i.value });
              }
            } else if (i.functionName === 'move') {
              outArr.push({ name: 'move', value: 'move' });
            } else if (i.functionName === 'turn') {
              outArr.push({ name: 'turn', value: 'turn' });
            } else if (i.functionName === 'dropBox') {
              outArr.push({ name: 'dropBox', value: 'dropbox' });
            } else {
              console.log('error');
            }
          });
        }
      } else if (item.property.operator === '!=') {
        if (item.property.firstArg != item.property.secondArg) {
          item.property.if_Action.map((i) => {
            if (i.functionName === 'color') {
              let objExists = varObj.some((obj) => obj.varName === i.value);
              if (objExists) {
                let objToModify = varObj.find((obj) => obj.varName === i.value);
                outArr.push({ name: 'color', value: objToModify.varValue });
              } else {
                outArr.push({ name: 'color', value: i.value });
              }
            } else if (i.functionName === 'move') {
              outArr.push({ name: 'move', value: 'move' });
            } else if (i.functionName === 'turn') {
              outArr.push({ name: 'turn', value: 'turn' });
            } else if (i.functionName === 'dropBox') {
              outArr.push({ name: 'dropBox', value: 'dropbox' });
            } else {
              console.log('error');
            }
          });
        } else {
          item.property.else_Action.map((i) => {
            if (i.functionName === 'color') {
              let objExists = varObj.some((obj) => obj.varName === i.value);
              if (objExists) {
                let objToModify = varObj.find((obj) => obj.varName === i.value);
                outArr.push({ name: 'color', value: objToModify.varValue });
              } else {
                outArr.push({ name: 'color', value: i.value });
              }
            } else if (i.functionName === 'move') {
              outArr.push({ name: 'move', value: 'move' });
            } else if (i.functionName === 'turn') {
              outArr.push({ name: 'turn', value: 'turn' });
            } else if (i.functionName === 'dropBox') {
              outArr.push({ name: 'dropBox', value: 'dropbox' });
            } else {
              console.log('error');
            }
          });
        }
      }
    } else if (item.Argument === 'for') {
      if (
        item.property.firstOperator === '=' &&
        item.property.secondOperator === '>' &&
        item.property.thirdOperator === '++'
      ) {
        let objToModify = varObj.find(
          (obj) => obj.varName === item.property.fourthArg
        );
        let x;
        let value = varObj.some(
          (obj) => obj.varName === item.property.fourthArg
        )
          ? parseInt(objToModify.varValue)
          : parseInt(item.property.fourthArg);
        for (x = item.property.secondArg; x > value; x++) {
          item.property.for_Action.map((i) => {
            if (i.functionName === 'color') {
              let objExists = varObj.some((obj) => obj.varName === i.value);
              if (objExists) {
                let objToModify = varObj.find((obj) => obj.varName === i.value);
                outArr.push({ name: 'color', value: objToModify.varValue });
              } else {
                outArr.push({ name: 'color', value: i.value });
              }
            } else if (i.functionName === 'move') {
              outArr.push({ name: 'move', value: 'move' });
            } else if (i.functionName === 'turn') {
              outArr.push({ name: 'turn', value: 'turn' });
            } else if (i.functionName === 'dropBox') {
              outArr.push({ name: 'dropBox', value: 'dropbox' });
            } else {
              console.log('error');
            }
          });
        }
      } else if (
        item.property.firstOperator === '=' &&
        item.property.secondOperator === '<' &&
        item.property.thirdOperator === '++'
      ) {
        let objToModify = varObj.find(
          (obj) => obj.varName === item.property.fourthArg
        );
        let x;
        let value = varObj.some(
          (obj) => obj.varName === item.property.fourthArg
        )
          ? parseInt(objToModify.varValue)
          : parseInt(item.property.fourthArg);
        for (x = item.property.secondArg; x < value; x++) {
          item.property.for_Action.map((i) => {
            if (i.functionName === 'color') {
              let objExists = varObj.some((obj) => obj.varName === i.value);
              if (objExists) {
                let objToModify = varObj.find((obj) => obj.varName === i.value);
                outArr.push({ name: 'color', value: objToModify.varValue });
              } else {
                outArr.push({ name: 'color', value: i.value });
              }
            } else if (i.functionName === 'move') {
              outArr.push({ name: 'move', value: 'move' });
            } else if (i.functionName === 'turn') {
              outArr.push({ name: 'turn', value: 'turn' });
            } else if (i.functionName === 'dropBox') {
              outArr.push({ name: 'dropBox', value: 'dropbox' });
            } else {
              console.log('error');
            }
          });
        }
      } else if (
        item.property.firstOperator === '=' &&
        item.property.secondOperator === '>' &&
        item.property.thirdOperator === '--'
      ) {
        let objToModify = varObj.find(
          (obj) => obj.varName === item.property.fourthArg
        );
        let x;
        let value = varObj.some(
          (obj) => obj.varName === item.property.fourthArg
        )
          ? parseInt(objToModify.varValue)
          : parseInt(item.property.fourthArg);
        for (x = item.property.secondArg; x > value; x--) {
          item.property.for_Action.map((i) => {
            if (i.functionName === 'color') {
              let objExists = varObj.some((obj) => obj.varName === i.value);
              if (objExists) {
                let objToModify = varObj.find((obj) => obj.varName === i.value);
                outArr.push({ name: 'color', value: objToModify.varValue });
              } else {
                outArr.push({ name: 'color', value: i.value });
              }
            } else if (i.functionName === 'move') {
              outArr.push({ name: 'move', value: 'move' });
            } else if (i.functionName === 'turn') {
              outArr.push({ name: 'turn', value: 'turn' });
            } else if (i.functionName === 'dropBox') {
              outArr.push({ name: 'dropBox', value: 'dropbox' });
            } else {
              console.log('error');
            }
          });
        }
      } else if (
        item.property.firstOperator === '=' &&
        item.property.secondOperator === '<' &&
        item.property.thirdOperator === '--'
      ) {
        let objToModify = varObj.find(
          (obj) => obj.varName === item.property.fourthArg
        );
        let x;
        let value = varObj.some(
          (obj) => obj.varName === item.property.fourthArg
        )
          ? parseInt(objToModify.varValue)
          : parseInt(item.property.fourthArg);
        for (x = item.property.secondArg; x < value; x--) {
          item.property.for_Action.map((i) => {
            if (i.functionName === 'color') {
              let objExists = varObj.some((obj) => obj.varName === i.value);
              if (objExists) {
                let objToModify = varObj.find((obj) => obj.varName === i.value);
                outArr.push({ name: 'color', value: objToModify.varValue });
              } else {
                outArr.push({ name: 'color', value: i.value });
              }
            } else if (i.functionName === 'move') {
              outArr.push({ name: 'move', value: 'move' });
            } else if (i.functionName === 'turn') {
              outArr.push({ name: 'turn', value: 'turn' });
            } else if (i.functionName === 'dropBox') {
              outArr.push({ name: 'dropBox', value: 'dropbox' });
            } else {
              console.log('error');
            }
          });
        }
      }
    } else if (item.Argument === 'while') {
      if (
        item.property.firstOperator === '>' &&
        item.property.secondOperator === '++'
      ) {
        let objToModify = varObj.find(
          (obj) => obj.varName === item.property.secondArg
        );
        let x;
        let value = varObj.some(
          (obj) => obj.varName === item.property.secondArg
        )
          ? parseInt(objToModify.varValue)
          : parseInt(item.property.secondArg);
        while (x > value) {
          item.property.while_Action.map((i) => {
            if (i.functionName === 'color') {
              let objExists = varObj.some((obj) => obj.varName === i.value);
              if (objExists) {
                let objToModify = varObj.find((obj) => obj.varName === i.value);
                outArr.push({ name: 'color', value: objToModify.varValue });
              } else {
                outArr.push({ name: 'color', value: i.value });
              }
            } else if (i.functionName === 'move') {
              outArr.push({ name: 'move', value: 'move' });
            } else if (i.functionName === 'turn') {
              outArr.push({ name: 'turn', value: 'turn' });
            } else if (i.functionName === 'dropBox') {
              outArr.push({ name: 'dropBox', value: 'dropbox' });
            } else {
              console.log('error');
            }
          });
          x++;
        }
      } else if (
        item.property.firstOperator === '<' &&
        item.property.secondOperator === '++'
      ) {
        let objToModify = varObj.find(
          (obj) => obj.varName === item.property.secondArg
        );
        let x;
        let value = varObj.some(
          (obj) => obj.varName === item.property.secondArg
        )
          ? parseInt(objToModify.varValue)
          : parseInt(item.property.secondArg);
        while (x < value) {
          item.property.while_Action.map((i) => {
            if (i.functionName === 'color') {
              let objExists = varObj.some((obj) => obj.varName === i.value);
              if (objExists) {
                let objToModify = varObj.find((obj) => obj.varName === i.value);
                outArr.push({ name: 'color', value: objToModify.varValue });
              } else {
                outArr.push({ name: 'color', value: i.value });
              }
            } else if (i.functionName === 'move') {
              outArr.push({ name: 'move', value: 'move' });
            } else if (i.functionName === 'turn') {
              outArr.push({ name: 'turn', value: 'turn' });
            } else if (i.functionName === 'dropBox') {
              outArr.push({ name: 'dropBox', value: 'dropbox' });
            } else {
              console.log('error');
            }
          });
          x++;
        }
      } else if (
        item.property.firstOperator === '>' &&
        item.property.secondOperator === '--'
      ) {
        let objToModify = varObj.find(
          (obj) => obj.varName === item.property.secondArg
        );
        let x;
        let value = varObj.some(
          (obj) => obj.varName === item.property.secondArg
        )
          ? parseInt(objToModify.varValue)
          : parseInt(item.property.secondArg);
        while (x > value) {
          item.property.while_Action.map((i) => {
            if (i.functionName === 'color') {
              let objExists = varObj.some((obj) => obj.varName === i.value);
              if (objExists) {
                let objToModify = varObj.find((obj) => obj.varName === i.value);
                outArr.push({ name: 'color', value: objToModify.varValue });
              } else {
                outArr.push({ name: 'color', value: i.value });
              }
            } else if (i.functionName === 'move') {
              outArr.push({ name: 'move', value: 'move' });
            } else if (i.functionName === 'turn') {
              outArr.push({ name: 'turn', value: 'turn' });
            } else if (i.functionName === 'dropBox') {
              outArr.push({ name: 'dropBox', value: 'dropbox' });
            } else {
              console.log('error');
            }
          });
          x--;
        }
      } else if (
        item.property.firstOperator === '<' &&
        item.property.secondOperator === '--'
      ) {
        let objToModify = varObj.find(
          (obj) => obj.varName === item.property.secondArg
        );
        let x;
        let value = varObj.some(
          (obj) => obj.varName === item.property.secondArg
        )
          ? parseInt(objToModify.varValue)
          : parseInt(item.property.secondArg);
        while (x < value) {
          item.property.while_Action.map((i) => {
            if (i.functionName === 'color') {
              let objExists = varObj.some((obj) => obj.varName === i.value);
              if (objExists) {
                let objToModify = varObj.find((obj) => obj.varName === i.value);
                outArr.push({ name: 'color', value: objToModify.varValue });
              } else {
                outArr.push({ name: 'color', value: i.value });
              }
            } else if (i.functionName === 'move') {
              outArr.push({ name: 'move', value: 'move' });
            } else if (i.functionName === 'turn') {
              outArr.push({ name: 'turn', value: 'turn' });
            } else if (i.functionName === 'dropBox') {
              outArr.push({ name: 'dropBox', value: 'dropbox' });
            } else {
              console.log('error');
            }
          });
          x--;
        }
      }
    }
  });
  return outArr;
};

export default Engine;
