import Platform from './platform';

class Board {
  constructor(ctx){
    this.ctx = ctx;
    this.platforms = [];
    this.roll = this.roll.bind(this);
    this.moveUp = this.moveUp.bind(this);
    this.randomx = this.randomX.bind(this);
    this.removeOutOfRange = this.removeOutOfRange.bind(this);
    this.generatePlatform = this.generatePlatform.bind(this);
  }

  populate(){
    const y = [10, 110, 210, 310, 410, 510, 610]
    y.forEach( y => {
      this.generatePlatform(y);
    })
    this.platforms.forEach( p => {
      p.drawPlatform();
    })
  }

  randomX() {
    return Math.floor(Math.random() * 20) * 20
    // const pos = [-50, 0, 50, 100, 150, 200, 250, 300, 350, 400];
    // return pos[Math.floor(Math.random() * pos.length)];
  }

  startY() {
    
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
    if (this.platforms.length >= 8 ) {
      this.platforms = this.platforms.slice(this.platforms.length - 7, this.platforms.length)
    }
  }

  roll(){
    this.generate = setInterval(this.generatePlatform, 800);
    setInterval(this.removeOutOfRange, 5000);
    const move = this.moveUp;
    this.rolling = setInterval(move, 0.1);
  }
  
  pause(){
   console.log("paused");
  }

}

export default Board;