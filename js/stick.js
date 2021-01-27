import canvas, { ctx } from './canvas.js';

import Movable from './movable.js';

export default class Stick extends Movable {

  constructor(x) {
    super();
    const stickUpImage = new Image();
    stickUpImage.src = './assets/stick-up.png';
    const stickDownImage = new Image();
    stickDownImage.src = './assets/stick-down.png';
    this.image = { up: stickUpImage, down: stickDownImage };

    this.gap = 400;
    this.vx = -500;
    const { width, height } = canvas.getSize();

    const ratio = 5;
    this.width = {
      up: 26 * ratio, // 26 * 135
      down: 26 * ratio, // 26 * 121
    };
    this.height = {
      up: 135 * ratio,
      down: 121 * ratio,
    };
    this.x = x;
    this.y = height / 2 + (Math.random() * 400 - 200);
  }

  paint() {
    ctx.drawImage(this.image.up, this.x - this.width.up / 2, this.y - this.gap / 2 - this.height.up, this.width.up, this.height.up);
    ctx.drawImage(this.image.down, this.x - this.width.down / 2, this.y + this.gap / 2, this.width.down, this.height.down);
  }

  isOutOfScreen() {
    return this.x + this.width.up / 2 < 0 && this.x + this.width.down / 2 < 0;
  }

  isCollidedWidthBird(check) {
    return check(this.x, this.y - this.gap / 2, this.width.up, 'up') || check(this.x, this.y + this.gap / 2, this.width.down, 'down');
  }

}