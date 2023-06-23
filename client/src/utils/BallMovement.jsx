// green color
import greendown from '../assets/greendown.png';
import greenleft from '../assets/greenleft.png';
import greenright from '../assets/greenright.png';
import greenup from '../assets/greenup.png';

// red color
import reddown from '../assets/reddown.png';
import redleft from '../assets/redleft.png';
import redright from '../assets/redright.png';
import redup from '../assets/redup.png';

// yellow color

import yellowdown from '../assets/yellowdown.png';
import yellowleft from '../assets/yellowleft.png';
import yellowright from '../assets/yellowright.png';
import yellowup from '../assets/yellowup.png';

class Ball {
  constructor(x, y, color, mode) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.mode = mode;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    const image = new Image();

    ctx.drawImage(image, this.x, this.y, 75, 80);
    if (this.color === 'green' && this.mode === 0) {
      image.src = greenleft;
      ctx.drawImage(image, this.x, this.y, 75, 80);
    } else if (this.color === 'green' && this.mode === 1) {
      image.src = greenup;
      ctx.drawImage(image, this.x, this.y, 75, 80);
    } else if (this.color === 'green' && this.mode === 2) {
      image.src = greenright;
      ctx.drawImage(image, this.x, this.y, 75, 80);
    } else if (this.color === 'green' && this.mode === 3) {
      image.src = greendown;
      ctx.drawImage(image, this.x, this.y, 75, 80);
    } else if (this.color === 'red' && this.mode === 0) {
      image.src = redleft;
      ctx.drawImage(image, this.x, this.y, 75, 80);
    } else if (this.color === 'red' && this.mode === 1) {
      image.src = redup;
      ctx.drawImage(image, this.x, this.y, 75, 80);
    } else if (this.color === 'red' && this.mode === 2) {
      image.src = redright;
      ctx.drawImage(image, this.x, this.y, 75, 80);
    } else if (this.color === 'red' && this.mode === 3) {
      image.src = reddown;
      ctx.drawImage(image, this.x, this.y, 75, 80);
    } else if (this.color === 'yellow' && this.mode === 0) {
      image.src = yellowleft;
      ctx.drawImage(image, this.x, this.y, 75, 80);
    } else if (this.color === 'yellow' && this.mode === 1) {
      image.src = yellowup;
      ctx.drawImage(image, this.x, this.y, 75, 80);
    } else if (this.color === 'yellow' && this.mode === 2) {
      image.src = yellowright;
      ctx.drawImage(image, this.x, this.y, 75, 80);
    } else if (this.color === 'yellow' && this.mode === 3) {
      image.src = yellowdown;
      ctx.drawImage(image, this.x, this.y, 75, 80);
    } else {
      image.src = greenleft;
      ctx.drawImage(image, this.x, this.y, 75, 80);
    }

    ctx.strokeStyle = 'black';
    ctx.strokeWidth = 4;
    ctx.fill();
    ctx.stroke();
  }
}

function BallMovement(ctx, x, y, color, mode) {
  const data = new Ball(x, y, color, mode);
  data.draw(ctx);
}

export default BallMovement;
