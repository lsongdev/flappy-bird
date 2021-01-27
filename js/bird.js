import canvas, { ctx } from './canvas.js';
import Movable from './Movable.js';

import {
  upImage,
  downImage,
  forwardImage,
} from './resource.js';

export default class Bird extends Movable {
  constructor() {
    // 调用父类的构造函数，初始化基础的位置和速度属性
    super();
    const { width, height } = canvas.getSize();
    // 圆心，我们把 `Bird` 固定在这个位置，移动背景来让玩家觉得鸟在向前飞行
    this.x = 200;
    // 初始的高度位置在屏幕中心
    this.y = height / 2;
    // 图片素材和真实展示的像素的比例
    const ratio = 5;
    // 鸟的模型
    // 椭圆的横轴长度
    this.rx = 17 * ratio; // 17 * 12
    // 椭圆的纵轴长度
    this.ry = 12 * ratio;
    // 初始的纵向速度，会在每次 `move` 时叠加差值
    this.vy = 100;
    // 重力加速度，不变
    this.g = 2000;

    // 加载图像素材
    const forward = new Image();
    forward.src = forwardImage;
    const up = new Image();
    up.src = upImage;
    const down = new Image();
    down.src = downImage;
    this.image = { forward, up, down };
  }

  move() {
    // 调用父类的移动函数，并且拿到时间差，用来计算新的纵向速度
    const { diff } = super.move();
    this.vy = this.vy + (this.g * diff / 1000);
  }

  moveUp() {
    // 当用户点击屏幕时，将鸟的纵向速度设置成向上飞的一个速度
    this.vy = -500;
  }

  getYState() {
    // 根据纵向速度，判断这时需要使用什么图片
    if (this.vy > 0) {
      return 'up';
    }
    if (this.vy < 0) {
      return 'down';
    }
    return 'forward';
  }

  getImage() {
    // 获取展示的图片
    const state = this.getYState();
    return this.image[state];
  }

  paint() {
    // 画个鸟，鸟的坐标 x 和 y 表示的是中心点
    ctx.drawImage(this.getImage(), this.x - (this.rx / 2), this.y - (this.ry / 2), this.rx, this.ry);
  }

  isCollidedWithRect(x, y, width, position) {
    /**
     *    rx
     *   │  │  │  │
     *   │  │  │  │
     *   │  │  │  │
     *   │  └──┘  │
     *   └────────┘  ry
     * if ellipse center is in outer box, then collide
     */
    if (position === 'up') {
      const minX = x - width / 2 - this.rx / 2;
      const maxX = x + width / 2 + this.rx / 2;
      const maxY = y + this.ry / 2;
      if (this.x > minX && this.x < maxX && this.y < maxY) {
        return true;
      }
    }
    if (position === 'down') {
      const minX = x - width / 2 - this.rx / 2;
      const maxX = x + width / 2 + this.rx / 2;
      const minY = y - this.ry / 2;
      if (this.x > minX && this.x < maxX && this.y > minY) {
        return true;
      }
    }
    return false;
  }

  isOutOfScreen() {
    if (this.y - this.ry / 2 < 0) {
      return true;
    }
    const { width, height } = canvas.getSize();
    return this.y + this.ry / 2 >= height;
  }
}