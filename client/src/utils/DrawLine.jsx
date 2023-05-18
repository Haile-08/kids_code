class Line {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x - 50, this.y, 60, 80);
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
