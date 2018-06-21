class Platform {
  constructor(ctx, x, y){
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    // this.drawPlatform = this.drawPlatform.bind(this);
  }

  drawPlatform(){
    this.ctx.beginPath();
    this.ctx.fillRect(this.x, this.y, 260, 32);
    this.ctx.fillStyle = "#000000";
    this.ctx.fill();
    this.ctx.closePath();
    this.rightEdge = this.x + 260;
  }
  
}

export default Platform;