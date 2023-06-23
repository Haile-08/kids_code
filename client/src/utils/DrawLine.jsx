class Line {
  constructor(x, y, mode, name) {
    this.x = x;
    this.y = y;
    this.mode = mode;
    this.name = name;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.fillStyle = 'blue';
    if (this.name !== 'turn') {
      if (this.mode === 1) {
        ctx.fillRect(this.x + 35.7, this.y + 35, 2, 75);
      } else if (this.mode === 3) {
        ctx.fillRect(this.x + 35.7, this.y - 40, 2, 75);
      } else if (this.mode === 0) {
        ctx.fillRect(this.x - 40, this.y + 35.5, 75, 2);
      } else if (this.mode === 2) {
        ctx.fillRect(this.x + 40, this.y + 35.5, 75, 2);
      }
    }

    ctx.strokeStyle = 'blue';
    ctx.fill();
    ctx.stroke();
  }
}

function DrawLine(ctx, x, y, mode, name) {
  const data = new Line(x, y, mode, name);
  data.draw(ctx);
}

export default DrawLine;
