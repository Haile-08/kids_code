export default function checkMode(varObj, dropBox, modeName, value, mode) {
  console.log(`function value: ${value}`);
  console.log(`modename: ${modeName}`);
  if (modeName === 'move') {
    switch (mode[varObj.mode]) {
      case 'straight':
        varObj.x += varObj.dx;
        break;
      case 'up':
        varObj.y -= varObj.dy;
        break;
      case 'down':
        varObj.y += varObj.dy;
        break;
      case 'back':
        varObj.x -= varObj.dx;
        break;
      default:
        break;
    }
  } else if (modeName === 'color') {
    varObj.color == value;
  } else if (modeName === 'turn') {
    if (varObj.mode === 3) {
      varObj.mode = 0;
    } else {
      varObj.mode++;
    }
  } else if (modeName === 'dropBox') {
    dropBox.push({ x: varObj.x, y: varObj.y });
  } else {
    console.log('hi');
  }
}
