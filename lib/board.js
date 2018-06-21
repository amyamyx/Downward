import Platform from './platform';
import Spiky from './spiky';

class Board {
  constructor(ctx){
    this.ctx = ctx;
    this.platforms = [];

    this.randomx = this.randomX.bind(this);
    this.removeOutOfRange = this.removeOutOfRange.bind(this);
    this.generatePlatform = this.generatePlatform.bind(this);
  }

  populate(){
    const y = [10, 210, 410, 810, 610, 1210]
    y.forEach( y => {this.generatePlatform(y)} );
    
    //the initial platform the player stands on
    const begin = new Platform(this.ctx, 300, 1010);
    // const begin = new Spiky(this.ctx, 300, 1010);
    this.platforms.push(begin);

    this.platforms.forEach( p => {
      p.drawPlatform();
    })
  }

  randomX() {
    return Math.floor(Math.random() * 50) * 16
  }

  generatePlatform(y = 1280){
    // this.platInterval = requestAnimationFrame(this.generatePlatform)
    const x = this.randomX();
    const p = new Spiky(this.ctx, x, y);
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