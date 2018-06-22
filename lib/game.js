import Board from './board';
import Player from './player';

class Game {
  constructor(ctx, ctx2){
    this.ctx = ctx;
    this.ctx2 = ctx2;
    this.vy = 4;

    this.player = new Player(this.ctx);
    this.board = new Board(this.ctx);

    this.landedPF = null;
    this.started = false;
    this.pause = true;
    this.over = false;
    this.hitTop = false;

    this.button = new Image();
    this.pauseFn = this.pauseFn.bind(this)
    this.init = this.init.bind(this)
    this.reset = this.reset.bind(this);
    this.animate = this.animate.bind(this);
    this.checkX = this.checkX.bind(this);
    this.checkY = this.checkY.bind(this);
    this.loadImage = this.loadImage.bind(this);

    this.listenKey();
  }
  reset () {
    this.board.platfroms = new Array();
    this.ctx.clearRect(0,0,880, 1280);
  }

  init(){
    this.board.populate();
    this.ctx2.font = "50px Monospace";
    this.ctx2.fillText("life:", 10, 52);
    this.renderLife();
    if (!this.started && !this.over) {
      this.button.src = "./src/start1.png"
    } else {
      this.button.src = "./src/replay1.png"
    }


    this.loadImage();
    this.button.addEventListener("load", this.loadImage, true)
    this.button.onload = () => {
      this.ctx.drawImage(this.button, 150, 460)
    }
    this.player.go();
  }

  play(){
    this.init();
  }

  renderLife() {
    let life = "";
    for (let i = 0; i < 10; i ++) {
      if (i < this.player.life ) {
        life += "O";
      } else {
        life += "-"
      }
    }
    this.ctx2.fillText(life, 175, 54);

  }

  loadImage() {
    console.log("loaded")
    this.ctx.drawImage(this.button, 150, 460);
  }

  listenKey() {
    const handleKeyUp = (e) => {
      // if (e.key === " ") { this.renderButton() }
      if (e.key === " ") {
        // debugger;
        if (this.over) {
          if (this.pause && !this.started) {
            this.reset();
            this.init();
            this.over = false;
            this.pause = false;
            this.started = true;
            this.continue();
          }
        } else { 
          if (this.pause && !this.started) {
            this.continue();
            this.pause = false;
            this.started = true;
          } else if (!this.pause && this.started) {
            this.button.src = "./src/continue1.png";
            this.pauseFn();
            this.pause = true;
          } else if (this.pause && this.started) {
            this.continue();
            this.pause = false;
          }
        }
      }
    }
    
    const handleKeydown = (e) => {
      if (e.key === " ") {
        console.log("here")
        if (this.pause) {
          if (this.over) {
            this.button.src = "./src/replay2.png";
          } else {
            this.button.src = this.started ? "./src/continue2.png" : "./src/start2.png";
          }
        }
      }
    }

    document.addEventListener("keydown", handleKeydown, false);
    document.addEventListener("keyup", handleKeyUp, false);
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

    if (this.checkOver()) {
      console.log("over")
      this.over = true;
      this.started = false;
      this.pause = true;
      
      this.pauseFn();
      this.button.src = "./src/replay1.png";
    }
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

  continue() {
    console.log("continue")
    // this.board.startFeedPlatform();
    // this.startRoll();
    this.animate();
    // this.pause = false;
  }

  pauseFn() {
    // clearInterval(this.board.platInterval);
    console.log("pause")
    cancelAnimationFrame(this.rollInterval);
    // this.pause = true;
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

  checkOver() {
    return this.player.dy > 1280;
  }
}

export default Game;