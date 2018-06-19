import Game from './game';
import Player from './player';
import Platform from './platform';

document.addEventListener('DOMContentLoaded', ()=> {
  const canvas = document.getElementById('myCanvas');
  const ctx = canvas.getContext('2d');

  const game = new Game(ctx);
  game.init();
  // const a = new Platform(ctx, 10, 0.5);
  // function draw() {
  //   ctx.clearRect(0,0,440, 640);
  //   a.drawPlatform();
  //   a.y -= a.speed;
  // }
  // setInterval(draw, 0.1);
})