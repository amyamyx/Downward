import Game from './game';
import Player from './player';
import Platform from './platform';

document.addEventListener('DOMContentLoaded', ()=> {
  const canvas = document.getElementById('myCanvas');
  const ctx = canvas.getContext('2d');

  const game = new Game(ctx);
  game.play();

  // const img = new Image();
  // img.src = './match.svg';

  // img.onload = (x = 175, y = 460, dx = 0, dy = 0) => {
  //   ctx.drawImage(img, 20, 10, 32, 65, x + dx, y + dy, 25, 50);
  //   document.addEventListener("keydown", handleKeydown, true)
  //   let dx;
  //   function handleKeydown(e) {
  //     if (e.key === "ArrowRight") {
  //       dx = 1;
  //     } else if (e.key === "ArrowLeft") {
  //       dx = -1;
  //     }
  //   }
  // }
  
})