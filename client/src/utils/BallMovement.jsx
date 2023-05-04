import imgGreen from '../assets/green.png';
import imgRed from '../assets/red.png';

class Ball {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    const image = new Image();

    image.src = imgGreen;
    ctx.drawImage(image, this.x, this.y, 100, 100);
    if (this.color === 'blue') {
      image.src = imgGreen;
      ctx.drawImage(image, this.x, this.y, 100, 100);
    } else if (this.color === 'red') {
      image.src = imgRed;
      ctx.drawImage(image, this.x, this.y, 100, 100);
    } else {
      image.src = imgGreen;
      ctx.drawImage(image, this.x, this.y, 100, 100);
    }
    ctx.strokeStyle = 'black';
    ctx.strokeWidth = 4;
    ctx.fill();
    ctx.stroke();
  }
}

function BallMovement(ctx, x, y, color) {
  const data = new Ball(x, y, color);
  data.draw(ctx);
}

export default BallMovement;
