export default function WallCollision(objVar, mode) {
  if (objVar.y + 100 >= 400 && mode === 'right') {
    // eslint-disable-next-line no-param-reassign
    objVar.dy = 0;
  }
  if (objVar.y + 100 >= 400 && mode === 'up') {
    // eslint-disable-next-line no-param-reassign
    objVar.dy = 75;
  }
  if (objVar.y <= 0 && mode === 'up') {
    // eslint-disable-next-line no-param-reassign
    objVar.dy = 0;
  }
  if (objVar.y + 100 >= 400 && mode === 'down') {
    // eslint-disable-next-line no-param-reassign
    objVar.dy = 0;
  }
  if (objVar.y <= 0 && mode === 'down') {
    // eslint-disable-next-line no-param-reassign
    objVar.dy = 75;
  }
  if (objVar.x + 100 >= 600 && mode === 'straight') {
    // eslint-disable-next-line no-param-reassign
    objVar.dx = 0;
  }
  if (objVar.x + 100 >= 600 && mode === 'back') {
    // eslint-disable-next-line no-param-reassign
    objVar.dx = 75;
  }
  if (objVar.x <= 0 && mode === 'back') {
    // eslint-disable-next-line no-param-reassign
    objVar.dx = 0;
  }
  if (objVar.x <= 0 && mode === 'straight') {
    // eslint-disable-next-line no-param-reassign
    objVar.dx = 75;
  }
}
