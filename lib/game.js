import Board from './board';
import Player from './player';

class Game {
  constructor(ctx){
    this.ctx = ctx;
    this.vy = 4;

    this.player = new Player(this.ctx);
    this.board = new Board(this.ctx);

    this.landedPF = null;
    // "Not Started", "Started" , "Paused", "Over"
    // this.status = "Not Started";
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
    // this.keyDownSrc = this.keyDownSrc.bind(this);

    this.listenKey();
  }

  // restart() {
  //   // this.landedPF = null;
  //   this.board.platforms = [];
  //   this.ctx.clearRect(0,0,880, 1280);
  //   this.init();
  // }
  reset () {
    this.board.platfroms = new Array();
    this.ctx.clearRect(0,0,880, 1280);
  }

  init(){
    this.board.populate();

    // if (this.status === "Not Started") {
    //   this.button.src = "./src/start1.png";
    // } else {
    //   this.button.src = "./src/replay1.png"
    // }

    if (!this.started && !this.over) {
      this.button.src = "./src/start2.png"
    } else {
      this.button.src = "./src/replay1.png"
    }

    this.button.onload = () => {
      this.ctx.drawImage(this.button, 150, 460)
    }
    this.player.go();
  }

  play(){
    this.init();
  }

  listenKey() {
    const handleKeyUp = (e) => {
      // if (e.key === " ") { this.renderButton() }
      if (e.key === " ") {
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
            this.over = false;
            // this.started = true;
            this.pause = false;
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

  // renderButton(){
  //   if (this.started) {
  //     this.button.src = this.pause ? "./src/continue2.png" : "./src/continue1.png"
  //     // this.button.src = "./src/continue1.png"
  //   } else {
  //     this.button.src = this.pause ? "./src/start2.png" : "./src/start1.png";
  //     // this.button.src = "./src/start1.png"
  //   }
  // }

  // keyDownSrc(){
  //   switch (this.status) {
  //     case "Not Started":
  //       return "start";
  //     case "Paused":
  //       return "continue";
  //     case "Over":
  //       return "replay";
  //   }
  // }

  // start() {
  //   this.animate();
  // }

  

  // drawText(){
  //   this.ctx.font = "50px Arial";
  //   this.ctx.fillText(this.pauseText, 320, 660);
  // }



  animate() {
    this.rollInterval = requestAnimationFrame(this.animate);
    this.ctx.clearRect(0, 0, 880, 1280);
    this.board.startFeedPlatform();
    this.drawObjects();
    this.moveUp();
    this.checkHittingTop();
    this.checkLanding();
    this.player.drop();

    if (this.overFn()) {
      this.over = true;
      this.pauseFn();
      this.started = false;
      this.pause = true;
      
      this.button.src = "./src/replay1.png";
      // this.ctx.drawImage(this.button, 150, 460)
      // this.status = "Over";
      // @Todo
      // this.renderOverText();
      // removeEventListener (key down key up)
      // this.board.button.src = "playagain file"
      // this.replay()
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
  
  // startRoll() {
  //   this.animate();
    // this.rollInterval = setInterval(this.moveUp, 0.1);
    // this.rollInterval = requestAnimationFrame(this.moveUp);
  // }

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

  overFn() {
    return this.player.dy > 1280;
  }
}

export default Game;