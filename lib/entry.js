import Game from './game';
import Player from './player';
import Platform from './platform';
import Spiky from './spiky';
import Belt from './belt';

document.addEventListener('DOMContentLoaded', ()=> {
  const canvas = document.getElementById('myCanvas');
  canvas.style.width = "440px";
  canvas.style.height = "640px";
  const ctx = canvas.getContext('2d');

  const game = new Game(ctx);
  game.play();
})