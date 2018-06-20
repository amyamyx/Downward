import Board from './board';
import Player from './player';

class Game {
  constructor(ctx){
    this.ctx = ctx;
    this.vy = 1.5;

    this.player = new Player(this.ctx);
    this.board = new Board(this.ctx);

    this.landedPF = null;
    this.started = false;
    this.pause = true;

    this.animate = this.animate.bind(this);
    this.checkX = this.checkX.bind(this);
    this.checkY = this.checkY.bind(this);

    this.listenKey();
  }

  init(){
    this.board.populate();
    this.started = true;
    this.player.go();
  }

  play(){
    this.init();    
  }

  listenKey() {
    document.addEventListener("keydown", (e) => {
      if (e.key === " ") {
        if (this.pause) {
          this.continue();
        } else {
          this.pauseFn()
        }
      }
    })
  }

  animate() {
    this.rollInterval = requestAnimationFrame(this.animate);
    this.ctx.clearRect(0, 0, 440, 640);
    //draw the player and the platforms
    this.drawObjects();
    //move all the player and the platforms up
    this.moveUp();
    
    // console.log(!!this.landedPF, "move")

    if (this.landedPF) {
      this.checkFall();
    } else {
      this.getLandedPF();
    }
    this.player.drop();
  }

  drawObjects(){
    this.player.draw();
    this.board.platforms.forEach(p => {
      p.drawPlatform();
    })
  }

  moveUp() {
    this.player.dy -= this.vy;
    this.board.platforms.forEach(p => {
      p.y -= this.vy;
    })
  }
  
  // startRoll() {
  //   this.animate();
    // this.rollInterval = setInterval(this.moveUp, 0.1);
    // this.rollInterval = requestAnimationFrame(this.moveUp);
  // }

  continue() {
    this.board.startFeedPlatform();
    // this.startRoll();
    this.animate();
    this.pause = false;
  }

  pauseFn() {
    clearInterval(this.board.platInterval);
    cancelAnimationFrame(this.rollInterval);
    this.pause = true;
  }

  getLandedPF() {
    this.board.platforms.forEach( p => {
      if (this.checkY(p) && this.checkX(p)) { 
        this.landedPF = p;
        this.player.dy = this.landedPF.y - 54;
        this.player.dropping = false;
       }
    })
  }

  checkX(p) {
   return this.player.dx + 12 < p.rightEdge && this.player.dx + 25 > p.x;
  }
  
  checkY(p) {
    return this.player.dy + 54 >= p.y && this.player.dy + 54 < p.y + 16;
  }

  checkFall() {
    if (!this.checkX(this.landedPF)) {
      this.landedPF = null;
      this.player.dropping = true;
    };
  }
}

export default Game;