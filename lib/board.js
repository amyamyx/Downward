import Platform from './platform';

class Board {
  constructor(ctx){
    this.ctx = ctx;
  }

  render() {
    const a = new Platform();
    a.drawPlatform(this.ctx);
  }
}

export default Board;