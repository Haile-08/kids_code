import box from '../assets/box.png';
class Box {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    const image = new Image();
    image.src = box;
    ctx.drawImage(image, this.x, this.y, 60, 60);
    ctx.fill();
    ctx.stroke();
  }
}

function DropBox(ctx, x, y) {
  const data = new Box(x, y);
  data.draw(ctx);
}

export default DropBox;
