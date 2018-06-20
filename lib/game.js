import Board from './board';
import Player from './player';

class Game {
  constructor(ctx, player){
    this.ctx = ctx;
    this.player = new Player(this.ctx);
    this.board = new Board(this.ctx);
    this.started = false;
    this.pause = true;

    this.moveUp = this.moveUp.bind(this);

    document.addEventListener("keydown", (e) => {
      if (e.key === " ") {
        if (this.pause) {
          console.log("continued")
          this.continue();
        } else {
          console.log("paused")
          this.pauseFn()
        }
      }
    })
  }

  init(){
    this.board.populate();
    this.started = true;
    this.player.go();
  }

  play(){
    this.init();
  }


  moveUp() {
    this.ctx.clearRect(0, 0, 440, 640);
    this.player.draw();
    this.board.platforms.forEach(p => {
      p.drawPlatform();
    })

    this.board.platforms.forEach(p => {
      p.y -= 0.5;
    })

    this.player.dy -= 0.5;
  }

  startRoll() {
    this.rollInterval = setInterval(this.moveUp, 0.1)
  }

  continue() {
    this.board.startFeedPlatform();
    this.startRoll();
    this.pause = false;
  }

  pauseFn() {
    clearInterval(this.board.platInterval);
    clearInterval(this.rollInterval);
    this.pause = true;
  }
}

export default Game;