// 定义基础类
export default class Movable {

  constructor() {
    // 构造函数中保存这个元素的横向坐标和纵向坐标 x 和 y，和横向移动速度和纵向移动速度 vx 和 vy。
    // 这里都设置成 `0`，也就是默认不移动
    this.x = 0;
    this.y = 0;
    this.vx = 0;
    this.vy = 0;
  }

  move() {
    const diff = 10;
    this.x += this.vx * diff / 1000;
    this.y += this.vy * diff / 1000;
    return { diff };
  }
}