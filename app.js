/** @type {HTMLCanvasElement} */

import Firework from './Firework.js';

const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const FPS = 60;
let lastTime = 0;

const gravity = { x: 0, y: 0.2 };
const fireworks = [];

fireworks.push(new Firework(gravity));

const loop = (timestamp) => {
  const secSinceLastRender = (timestamp - lastTime) / 1000;
  requestAnimationFrame(loop);
  if (secSinceLastRender < 1 / FPS) return;
  lastTime = timestamp;

  if (Math.random() < 0.05)
    fireworks.push(new Firework(gravity));

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  fireworks.forEach((firework, idx) => {
    firework.update(canvas.height);
    firework.show(ctx);

    firework.done() && fireworks.splice(idx, 1);
    })
  console.log('length:', fireworks.length);
}

loop(0);