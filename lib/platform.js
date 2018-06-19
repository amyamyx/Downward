class Platform {
  constructor(ctx, x, y, speed){
    this.ctx = ctx;
    this.speed = speed;
    this.x = x;
    this.y = y;
    this.drawPlatform = this.drawPlatform.bind(this);
  }

  drawPlatform(){
    this.ctx.beginPath();
    this.ctx.fillRect(this.x, this.y, 130, 16);
    this.ctx.fillStyle = "#000000";
    this.ctx.fill();
    this.ctx.closePath();
  }
}

export default Platform;