const Engine = (data) => {
  const outArr = [];
  const varObj = []; //var1 = red

  data.map((item) => {
    if (item.Argument === 'variable') {
      console.log(`var num = ${item.property.varValue}`);
      if (varObj.length === 0) {
        const obj = {
          varName: item.property.varName,
          varValue: /\d/.test(item.property.varValue)
            ? parseInt(item.property.varValue)
            : item.property.varValue,
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
          objToModify.varValue = /\d/.test(item.property.varValue)
            ? parseInt(item.property.varValue)
            : item.property.varValue;
        } else {
          const obj = {
            varName: item.property.varName,
            varValue: /\d/.test(item.property.varValue)
              ? parseInt(item.property.varValue)
              : item.property.varValue,
          };
          varObj.push(obj);
        }
      }
    } else if (item.Argument === 'if') {
      if (item.property.operator === '==') {
        let firstArg = item.property.firstArg; //var1
        let secondArg = item.property.secondArg; //red
        let firstArgCheck = varObj.some((obj) => obj.varName === firstArg);
        let secondArgCheck = varObj.some((obj) => obj.varName === secondArg);
        if (firstArgCheck) {
          let firstobjToModify = varObj.find((obj) => obj.varName === firstArg);
          firstArg = firstobjToModify.varValue;
        }
        if (secondArgCheck) {
          let secondobjToModify = varObj.find(
            (obj) => obj.varName === secondArg
          );
          secondArg = secondobjToModify.varValue;
        }
        if (firstArg == secondArg) {
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
        let firstArg = item.property.firstArg; //var1
        let secondArg = item.property.secondArg; //red
        let firstArgCheck = varObj.some((obj) => obj.varName === firstArg);
        let secondArgCheck = varObj.some((obj) => obj.varName === secondArg);
        if (firstArgCheck) {
          let firstobjToModify = varObj.find((obj) => obj.varName === firstArg);
          firstArg = firstobjToModify.varValue;
        }
        if (secondArgCheck) {
          let secondobjToModify = varObj.find(
            (obj) => obj.varName === secondArg
          );
          secondArg = secondobjToModify.varValue;
        }
        if (firstArg != secondArg) {
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
          (obj) => obj.varName === item.property.firstArg
        );
        let value = varObj.some((obj) => obj.varName === item.property.firstArg)
          ? parseInt(objToModify.varValue)
          : parseInt(item.property.secondArg);
        let x = value;
        while (x > parseInt(item.property.secondArg)) {
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
          (obj) => obj.varName === item.property.firstArg
        );
        let value = varObj.some((obj) => obj.varName === item.property.firstArg)
          ? parseInt(objToModify.varValue)
          : parseInt(item.property.secondArg);
        let x = value;
        while (x < parseInt(item.property.secondArg)) {
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
          (obj) => obj.varName === item.property.firstArg
        );
        let value = varObj.some((obj) => obj.varName === item.property.firstArg)
          ? parseInt(objToModify.varValue)
          : parseInt(item.property.secondArg);
        let x = value;
        while (x > parseInt(item.property.secondArg)) {
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
          (obj) => obj.varName === item.property.firstArg
        );
        let value = varObj.some((obj) => obj.varName === item.property.firstArg)
          ? parseInt(objToModify.varValue)
          : parseInt(item.property.secondArg);
        let x = value;
        while (x < parseInt(item.property.secondArg)) {
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
    } else if (item.Argument === 'outSide') {
      item.property.actions.map((i) => {
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
  });
  return outArr;
};

export default Engine;
