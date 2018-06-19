import Board from './board';

class Game {
  constructor(ctx){
    this.ctx = ctx;
    this.board = new Board(this.ctx);
    this.started = false;
    // this.handlePaused = this.handlePaused.bind(this);
  }

  init(){
    this.board.populate();
    this.started = true;
    // this.board.star
  }

  play(){
    this.init();

    // while (!this.over) {
      // document.addEventListener("keydown", this.handlePaused, true)
      // document.addEventListener("keyup", (e)=> {
      //   if (e.key === " ") {
      //     console.log("key up!")
      //     document.removeEventListener("keydown", this.handlePaused, true)
      //   }
      // })
    // }
  }

  // handlePaused(e) {
  //   if (e.key === " ") {
  //     console.log("still here")
  //     if (this.board.pause) {
  //       this.board.start();
  //       this.board.pause = false;
  //     }
  //   }
  // }

}

export default Game;