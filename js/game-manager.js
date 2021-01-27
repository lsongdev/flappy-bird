import canvas from './canvas.js';
import Bird from './bird.js';
import Input from './input.js';
import Background from './background.js';
import StickManager from './stick-manager.js';
import EventEmitter from 'https://unpkg.com/event-based-framework/class/event-emitter.js';

class GameManager extends EventEmitter {
  constructor() {
    super();
    this.bird = new Bird();
    this.input = new Input();
    this.sticks = new StickManager();
    this.background = new Background();
    this.input.on('touch', () => {
      this.bird.moveUp();
    });
  }

  paint() {
    // 每次重绘整个画布。先清空画布的所有东西，再移动背景，最后画背景
    canvas.clear();
    this.background.move();
    this.background.paint();
    this.sticks.move();
    this.sticks.paint();
    this.bird.move();
    this.bird.paint();
  }

  checkGameOver() {
    const isCollided = this.sticks.getSticks().some((stick) => {
      return stick.isCollidedWidthBird(this.bird.isCollidedWithRect.bind(this.bird));
    });
    const isOutOfScreen = this.bird.isOutOfScreen();
    return isCollided || isOutOfScreen;
  }

  loop() {
    this.paint();
    if (this.checkGameOver()) {
      this.emit('game-over');
      return this;
    }
    requestAnimationFrame(() => {
      this.loop();
    });
  }

  start() {
    this.loop();
  }

}

export default GameManager;