import Board from './board';
import Player from './player';

class Game {
  constructor(ctx){
    this.ctx = ctx;
    this.vy = 4;

    this.player = new Player(this.ctx);
    this.board = new Board(this.ctx);

    this.landedPF = null;
    this.started = false;
    this.pause = true;
    this.hitTop = false;

    this.button = new Image();

    this.animate = this.animate.bind(this);
    this.checkX = this.checkX.bind(this);
    this.checkY = this.checkY.bind(this);

    this.listenKey();
  }

  init(){
    this.board.populate();
    this.button.src = "./src/start1.png";
    this.button.onload = () => {
      this.ctx.drawImage(this.button, 175, 460)
    }
    // this.started = true;
    this.player.go();
  }

  play(){
    this.init();    
  }

  listenKey() {
    const handleKeydown = (e) => {
      if (e.key === " ") { this.renderButton() }
        // this.renderButton();
      // }
    }
    
    const handleKeyUp = (e) => {
      if (e.key === " ") {
        if (this.pause) {
          if (!this.started) { this.started = true }
          this.continue();
        } else {
          this.renderButton();
          this.pauseFn();
        }
      }
    }

    document.addEventListener("keydown", handleKeydown, false);
    document.addEventListener("keyup", handleKeyUp, false);
  }

  renderButton(){
    if (this.started) {
      this.button.src = this.pause ? "./src/continue2.png" : "./src/continue1.png"
      // this.button.src = "./src/continue1.png"
    } else {
      this.button.src = this.pause ? "./src/start2.png" : "./src/start1.png";
      // this.button.src = "./src/start1.png"
    }
  }

  drawText(){
    this.ctx.font = "50px Arial";
    this.ctx.fillText(this.pauseText, 320, 660);
  }

  animate() {
    this.rollInterval = requestAnimationFrame(this.animate);
    this.ctx.clearRect(0, 0, 880, 1280);
    this.board.startFeedPlatform();
    this.drawObjects();
    this.moveUp();
    this.checkHittingTop();
    this.checkLanding();
    this.player.drop();
  }

  checkLanding() {
    if (this.landedPF) {
      this.checkFall();
    } else {
      this.getLandedPF();
    }
  }

  drawObjects(){
    this.board.platforms.forEach(p => {
      p.drawPlatform();
    })
    this.board.drawCeiling();
    this.player.draw();
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
    // this.board.startFeedPlatform();
    // this.startRoll();
    this.animate();
    this.pause = false;
  }

  pauseFn() {
    // clearInterval(this.board.platInterval);
    cancelAnimationFrame(this.rollInterval);
    this.pause = true;
  }

  getLandedPF() {
    this.board.platforms.forEach( p => {
      if (this.checkY(p) && this.checkX(p)) { 
        this.landedPF = p;
        this.player.dy = this.landedPF.y - 108;
        this.player.dropping = false;
       }
    })
  }

  checkX(p) {
   return this.player.dx + 20 < p.rightEdge && this.player.dx + 57 > p.x;
  }
  
  checkY(p) {
    return this.player.dy + 108 >= p.y && this.player.dy + 108 < p.y + 32;
  }

  checkFall() {
    if (!this.checkX(this.landedPF) || this.hitTop) {
      this.landedPF = null;
      this.player.dropping = true;
    }
  }

  checkHittingTop(){
    if (this.player.dy < 20) {
      this.hitTop = true;
      this.player.dy += 32
    } else {
      this.hitTop = false;
    }
  }
}

export default Game;