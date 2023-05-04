const checkMode = (DropBox, ObjVar, modeName, value, mode) => {
  if (modeName === 'move') {
    switch (mode[ObjVar.mode]) {
      case 'straight':
        ObjVar.x += ObjVar.dx;
        break;
      case 'up':
        ObjVar.y -= ObjVar.dy;
        break;
      case 'down':
        ObjVar.y += ObjVar.dy;
        break;
      case 'back':
        ObjVar.x -= ObjVar.dx;
        break;
      default:
        break;
    }
  } else if (modeName === 'color') {
    ObjVar.color == value;
  } else if (modeName === 'turn') {
    if (ObjVar.mode === 3) {
      ObjVar.mode = 0;
    } else {
      ObjVar.mode++;
    }
  } else if (modeName === 'dropBox') {
    DropBox.push({ x: ObjVar.x, y: ObjVar.y });
  }
};

export default checkMode;
