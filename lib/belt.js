import Platform from './platform';

class Belt extends Platform {
  constructor(ctx, x, y) {
    super(ctx, x, y);
  }

  drawPlatform(){
    // super.drawPlatform();
    this.ctx.beginPath();
    this.ctx.fillRect(this.x, this.y, 260, 32);
    this.ctx.fillStyle = "#000000";
    this.ctx.fill();
    this.ctx.closePath();
    this.rightEdge = this.x + 260;

  }
}

export default Belt;