import Board from './board';
import Player from './player';

class Game {
  constructor(ctx, player){
    this.ctx = ctx;
    this.player = new Player(this.ctx);
    this.board = new Board(this.ctx);
    this.started = false;
  }

  init(){
    this.board.populate();
    // this.player.drawMan();
    this.player.go();
    this.started = true;
  }

  play(){
    this.init();
  }
}

export default Game;