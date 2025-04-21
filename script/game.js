import { Player } from './Player.js';
import { Ball } from './Ball.js';
import { AI } from './AI.js';

const gameEl = document.getElementById('game');
const playerEl = document.getElementById('player');
const opponentEl = document.getElementById('opponent');
const ballEl = document.getElementById('ball');
const playButton = document.getElementById('play-button'); // Select the "Play" button

const player = new Player(playerEl, 'left');
const opponent = new Player(opponentEl, 'right');
const ball = new Ball(gameEl, ballEl);
const ai = new AI(opponent, ball, gameEl);

let lastTime = performance.now();
let autoPossession = true;
let score = [0, 0];

function update(deltaTime) {
  player.update(deltaTime);
  opponent.update(deltaTime);
  ai.update(deltaTime);
  ball.update(deltaTime);

  if (ball.x <= 0) {
    score[1]++;
    resetRound(player);
  } else if (ball.x + ball.size >= gameEl.clientWidth) {
    score[0]++;
    resetRound(opponent);
  }

  document.getElementById('score').textContent = `${score[0]} - ${score[1]}`;
}

function resetRound(owner) {
  ball.reset(autoPossession ? owner : null);
}

function loop(currentTime) {
  const deltaTime = currentTime - lastTime;
  lastTime = currentTime;
  update(deltaTime);
  requestAnimationFrame(loop);
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowUp') player.move(-player.speed);
  if (e.key === 'ArrowDown') player.move(player.speed);
});

document.addEventListener('keyup', () => {
  player.move(0);
});

window.toggleAutoPossession = function () {
  autoPossession = !autoPossession;
};

// Function to start the game
function startGame() {
  ball.reset(player);
  requestAnimationFrame(loop);
}

// Add event listener to the "Play" button
playButton.addEventListener('click', startGame);

// Export startGame if needed
window.startGame = startGame;
