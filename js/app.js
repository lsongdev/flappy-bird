import GameManager from './game-manager.js';

let gm = new GameManager();

const processError = () => {
  const button = document.createElement('button');
  button.innerHTML = 'Restart';
  document.body.appendChild(button);
  button.addEventListener('click', () => {
    document.body.removeChild(button);
    gm = new GameManager();
    gm.on('game-over', processError);
    gm.start();
  });
};

gm.on('game-over', processError);
gm.start();