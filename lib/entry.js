import Game from './game';
import Player from './player';
import Platform from './platform';
import Spiky from './spiky';
import Belt from './belt';

document.addEventListener('DOMContentLoaded', ()=> {
  const canvas = document.getElementById('myCanvas');
  const canvas2 = document.getElementById('myCanvas2')
  canvas.style.width = "440px";
  canvas.style.height = "610px";
  canvas2.style.width = "440px";
  canvas2.style.height = "40px";
  const ctx = canvas.getContext('2d');
  const ctx2 = canvas2.getContext('2d');

  // ctx2.beginPath();
  // ctx2.fillRect(30, 30, 200, 20);
  // ctx2.fillStyle = "black";
  // ctx2.fill();
  // ctx.closePath();

  const game = new Game(ctx, ctx2);
  game.play();
})