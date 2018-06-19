import Platform from './platform';

class Board {
  constructor(ctx){
    this.ctx = ctx;
    this.platforms = [];
    this.pause = true;
    
    this.moveUp = this.moveUp.bind(this);
    this.randomx = this.randomX.bind(this);
    this.removeOutOfRange = this.removeOutOfRange.bind(this);
    this.generatePlatform = this.generatePlatform.bind(this);

    document.addEventListener("keydown", (e) => {
      if (e.key === " ") {
        if (this.pause) {
          this.start();
        } else {
          this.pauseFn()
        }
      }
    })

  }

  populate(){
    //the initial platform the player stands on
    const begin = new Platform(this.ctx, 150, 510, 0.5);
    this.platforms.push(begin);
    
    const y = [10, 110, 210, 310, 410, 610]
    y.forEach( y => {
      this.generatePlatform(y);
    })

    this.platforms.forEach( p => {
      p.drawPlatform();
    })
  }

  randomX() {
    return Math.floor(Math.random() * 20) * 20
  }

  generatePlatform(y = 624){
    const x = this.randomX();
    const p = new Platform(this.ctx, x, y, 0.5);
    this.platforms.push(p);
  }

  moveUp(){
    this.ctx.clearRect(0, 0, 440, 640);
    this.platforms.forEach(p => {
      p.drawPlatform();
    })

    this.platforms.forEach(p => {
      p.y -= p.speed;
    })
  }

  removeOutOfRange(){
    const length = this.platforms.length;
    if (length >= 8 ) {
      this.platforms = this.platforms.slice(length - 7, length)
    }
  }

  startFeedPlatform() {
    this.platInterval = setInterval(this.generatePlatform, 800);
  }

  startRoll() {
    this.rollInterval = setInterval(this.moveUp, 0.1)
  }

  start(){
    this.startFeedPlatform();
    this.startRoll();
    this.pause = false;
  }
  
  pauseFn(){
    clearInterval(this.platInterval);
    clearInterval(this.rollInterval);
    this.pause = true;
  }

}

export default Board;