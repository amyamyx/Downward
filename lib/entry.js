import Game from './game';
import Player from './player';
import Platform from './platform';

document.addEventListener('DOMContentLoaded', ()=> {
  const canvas = document.getElementById('myCanvas');
  const ctx = canvas.getContext('2d');

  const game = new Game(ctx);
  game.play();
})