class Line {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.fillStyle = 'blue';
    ctx.fillRect(this.x, this.y + 50, 50, 5);
    ctx.strokeStyle = 'blue';
    ctx.strokeWidth = 4;
    ctx.fill();
    ctx.stroke();
  }
}

function DrawLine(ctx, x, y) {
  const data = new Line(x, y);
  data.draw(ctx);
}

export default DrawLine;
