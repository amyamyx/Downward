import Board from './board';
import Player from './player';

class Game {
  constructor(ctx, player){
    this.ctx = ctx;
    this.vy = 1.5;
    this.player = new Player(this.ctx);
    this.board = new Board(this.ctx);
    this.started = false;
    this.pause = true;

    this.landedPF = null;

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

    console.log(this.landedPF);
    this.getLandedPF();
    console.log(this.landedPF);
    console.log(this.landedPF.rightEdge);
    
  }


  moveUp() {
    this.rollInterval = requestAnimationFrame(this.moveUp);
    this.ctx.clearRect(0, 0, 440, 640);
    this.player.draw();
    this.board.platforms.forEach(p => {
      p.drawPlatform();
    })

    this.board.platforms.forEach(p => {
      p.y -= this.vy;
    })

    this.player.dy -= this.vy;
    this.checkDrop();
  }

  startRoll() {
    this.moveUp();
    // this.rollInterval = setInterval(this.moveUp, 0.1);
    // this.rollInterval = requestAnimationFrame(this.moveUp);
  }

  continue() {
    this.board.startFeedPlatform();
    this.startRoll();
    this.pause = false;
  }

  pauseFn() {
    clearInterval(this.board.platInterval);
    cancelAnimationFrame(this.rollInterval);
    this.pause = true;
  }

  getLandedPF() {
    this.board.platforms.forEach( p => {
      if (this.player.dy + 54 === p.y) { 
        this.landedPF = p;
       }
    })
  }

}

export default Game;