import Board from './board';

class Game {
  constructor(ctx){
    this.ctx = ctx;
    this.board = new Board(this.ctx);
    this.started = false;
  }

  init(){
    this.board.populate();
    this.started = true;
  }

  play(){
    this.init();
  }
}

export default Game;