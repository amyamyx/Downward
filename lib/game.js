import Board from './board';

class Game {
  constructor(ctx){
    this.ctx = ctx;
    this.board = new Board(this.ctx);
    this.pause = false;
  }

  init(){
    this.board.populate();
    document.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        this.board.roll();
        // this.listenPause()

      }
    })
  }

  listenPause() {
    document.addEventListener('keydown', (e) => {
      if (e.key === "Enter") {
        if (this.pause) {
          this.board.roll();
          this.pause = false;
        } else {
          this.board.pause();
          this.pause = true;
        }
      }
    })
  }

}

export default Game;