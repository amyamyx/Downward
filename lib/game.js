import Board from './board';

class Game {
  constructor(ctx){
    this.ctx = ctx;  
    this.board = new Board(this.ctx); 
  }

  init(){
    // this.board = new Board(ctx);
    this.board.render();
  }
}

export default Game;