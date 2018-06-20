import Platform from './platform';

class Board {
  constructor(ctx){
    this.ctx = ctx;
    this.platforms = [];

    this.randomx = this.randomX.bind(this);
    this.removeOutOfRange = this.removeOutOfRange.bind(this);
    this.generatePlatform = this.generatePlatform.bind(this);
  }

  populate(){
    const y = [10, 110, 210, 310, 410, 610]
    y.forEach( y => {this.generatePlatform(y)} );
    
    //the initial platform the player stands on
    const begin = new Platform(this.ctx, 150, 510);
    this.platforms.push(begin);

    this.platforms.forEach( p => {
      p.drawPlatform();
    })
  }

  randomX() {
    return Math.floor(Math.random() * 25) * 16
  }

  generatePlatform(y = 624){
    // this.platInterval = requestAnimationFrame(this.generatePlatform)
    const x = this.randomX();
    const p = new Platform(this.ctx, x, y);
    this.platforms.push(p);
    this.removeOutOfRange();
  }

  removeOutOfRange(){
    const length = this.platforms.length;
    if (length > 7 ) {
      this.platforms = this.platforms.slice(length - 7, length)
    }
  }

  startFeedPlatform() {
    this.platInterval = setInterval(this.generatePlatform, 1000);
    // this.platInterval = requestAnimationFrame(this.generatePlatform)
    // this.generatePlatform();
  }
}

export default Board;