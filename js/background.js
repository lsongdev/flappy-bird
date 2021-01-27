import Movable from './movable.js';
import canvas, { ctx } from './canvas.js';
import { bgImage } from './resource.js';

class Background extends Movable {

  constructor() {
    super();
    this.image = new Image();
    this.image.src = bgImage;
    const { width, height } = canvas.getSize();
    this.width = width;
    this.height = height;
    this.vx = -100;
  }

  move() {
    super.move();
    if (this.x < -this.width) {
      this.x += this.width;
    }
  }

  paint() {
    ctx.drawImage(this.image, this.x, 0, this.width, this.height);
    ctx.drawImage(this.image, this.x + this.width, 0, this.width, this.height);
  }
}

export default Background;