import Platform from './platform';

class Turnable extends Platform {
  constructor(ctx, x, y) {
    super(ctx, x, y)
  }

  drawPlatform() {
    // super.drawPlatform();
    this.ctx.beginPath();
    this.ctx.fillRect(this.x, this.y, 260, 32);
    this.ctx.fillStyle = "pink";
    this.ctx.fill();
    this.ctx.closePath();
    this.rightEdge = this.x + 260;
  }

}

export default Turnable;