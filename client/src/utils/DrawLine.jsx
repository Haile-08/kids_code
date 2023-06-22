class Line {
  constructor(x, y, mode) {
    this.x = x;
    this.y = y;
    this.mode = mode;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.fillStyle = 'blue';
    if (this.mode === 1 || this.mode === 3) {
      ctx.fillRect(this.x + 50, this.y, 5, 50);
    } else if (this.mode === 0 || this.mode === 2) {
      ctx.fillRect(this.x, this.y + 50, 50, 5);
    }

    ctx.strokeStyle = 'blue';
    ctx.fill();
    ctx.stroke();
  }
}

function DrawLine(ctx, x, y, mode) {
  const data = new Line(x, y, mode);
  data.draw(ctx);
}

export default DrawLine;
