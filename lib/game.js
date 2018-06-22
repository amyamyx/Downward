import Board from './board';
import Player from './player';

class Game {
  constructor(ctx, ctx2, over){
    this.ctx = ctx;
    this.ctx2 = ctx2;
    this.vy = 4;

    this.player = new Player(this.ctx);
    this.board = new Board(this.ctx);

    this.landedPF = null;
    this.started = false;
    this.pause = true;
    this.over = over;
    this.hitTop = false;

    this.button = new Image();
    this.button.src = "./src/buttons.png";

    this.overText = new Image();
    this.overText.src = "./src/over.png";

    this.bx = 0;
    this.by = 0;

    this.pauseFn = this.pauseFn.bind(this)
    this.init = this.init.bind(this)
    this.reset = this.reset.bind(this);
    this.animate = this.animate.bind(this);
    this.checkX = this.checkX.bind(this);
    this.checkY = this.checkY.bind(this);
    this.loadImage = this.loadImage.bind(this);
    this.renderOver = this.renderOver.bind(this);

    this.listenKey();
  }
  reset () {
    this.player.life = 10;
    this.board.platfroms = new Array();
    this.ctx.clearRect(0,0,880, 1280);
  }

  init(){
    this.board.populate();
    this.ctx2.font = "50px Monospace";
    this.ctx2.fillText("life:", 10, 52);
    this.renderLife();

    this.button.onload = () => {
      this.ctx.drawImage(this.button, this.bx, this.by, 490, 141, 180, 490, 490, 141)
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
    this.ctx.drawImage(this.button, this.bx, this.by, 490, 141, 180, 490, 490, 141)
  }

  listenKey() {
    const handleKeydown = (e) => {
      if (e.key === " ") {
        if (this.pause) {
          if (!this.started) {
            this.started = true
            if (this.over) {
              window.location.reload();
              this.over = false
              this.reset();
              this.init();
              this.pause = false;
            }
            this.by = 187;
          }
        } else {
          this.pauseFn();
          // this.pause = true;
          this.loadImage();
        }

      }
    }

    const handleKeyUp = (e) => {
      if (e.key === " ") {
        if (this.pause) {
          this.pause = false;
          this.continue();
        } else {
          this.pause = true;
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
    this.checkOver();

    if (this.over) {
      console.log("over")
      this.started = false;
      this.pauseFn();
      this.pause = true;
      this.ctx.drawImage(this.overText, 200, 510);
      this.by = 374;
      setTimeout(this.loadImage, 1000);
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
    this.animate();
  }

  pauseFn() {
    cancelAnimationFrame(this.rollInterval);
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
    if (this.player.dy > 1280){
    // return this.player.dy > 1280;
      this.over = true;
    }
  }
}

export default Game;