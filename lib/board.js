import Platform from './platform';

class Board {
  constructor(ctx){
    this.ctx = ctx;
    this.platforms = [];
    this.moveUp = this.moveUp.bind(this);
    this.generatePlatform = this.generatePlatform.bind(this);
  }

  randomX() {
    const pos = [-50, 0, 50, 100, 150, 200, 250, 300, 350, 400];
    return pos[Math.floor(Math.random() * pos.length)];
  }

  generatePlatform(){
    const x = this.randomX();
    const p = new Platform(this.ctx, x, 0.5);
    this.platforms.push(p);
  }
  // render() {
  //   const a = new Platform(this.ctx, 10, 20);
  //   setInterval(a.draw, 1000);
  // }

  moveUp(){
    this.ctx.clearRect(0, 0, 440, 640);
    this.platforms.forEach(p => {
      p.drawPlatform();
    })

    this.platforms.forEach(p => {
      p.y -= 0.5;
    })
  }

  removeOutOfRange(){
    if (this.platforms.lenght >= 10 ) {
      this.platforms.shift();
    }
  }

  roll(){
    setInterval(this.generatePlatform, 1000);
    const move = this.moveUp;
    setInterval(move, 0.1);
  }

}

export default Board;