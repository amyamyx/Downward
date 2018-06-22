import Platform from './platform';
import Turnable from './turnable';
import Spring from './spring';
import Spiky from './spiky';
import Belt from './belt';

class Board {
  constructor(ctx){
    this.ctx = ctx;
    this.platforms = [];
    this.ceiling = new Image();
    this.ceiling.src = "./src/ceiling.png";

    this.platformHit = false;
    this.randomx = this.randomX.bind(this);
    this.drawCeiling = this.drawCeiling.bind(this);
    this.removeOutOfRange = this.removeOutOfRange.bind(this);
    this.generatePlatform = this.generatePlatform.bind(this);
  }

  populate(){
    const y = [ 210, 410, 810, 610, 1210]
    y.forEach(y => { this.generatePlatform(y) });
    
    this.ceiling.onload = () => {
      this.drawCeiling();
    }
    //the initial platform the player stands on
    const begin = new Platform(this.ctx, 300, 1010);
    this.platforms.push(begin);

    this.platforms.forEach( p => {
      p.drawPlatform();
    })
  }

  drawCeiling() {
    this.ctx.drawImage(this.ceiling, 0, 0, 880, 35, 0, 0, 990, 50);
  }

  randomX() {
    return Math.floor(Math.random() * 45) * 18 - 130;
  }

  randomPlatform(y){
    const x = this.randomX();
    const args = [this.ctx, x, y]
    const options = [
      new Platform(...args),
      new Turnable(...args),
      new Spiky(...args),
      new Spring(...args),
      new Belt(...args)
    ]

    return options[Math.floor(Math.random() * 5)]
  }

  generatePlatform(y = 1280){
    const p = this.randomPlatform(y);
    this.platforms.push(p);
    this.removeOutOfRange();
  }

  removeOutOfRange(){
    const length = this.platforms.length;
    if (length > 7 ) {
      this.platforms = this.platforms.slice(length - 7, length);
    }
  }

  startFeedPlatform() {
    this.checkHit();
    if (this.platformHit) {
      this.platformHit = false;
      this.generatePlatform();
    }
  }

  checkHit(){
    this.platforms.forEach(p => {
      if (p.y <= 10 && p.y > 0) {
        p.y -= 40;
        this.platformHit = true;
        return;
      }
    })
  }
}

export default Board;