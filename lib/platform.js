class Platform {
  constructor(ctx, x, speed){
    this.ctx = ctx;
    this.speed = speed;
    this.x = x;
    this.y = 624;
    this.drawPlatform = this.drawPlatform.bind(this);
  }

  drawPlatform(){
    this.ctx.beginPath();
    this.ctx.fillRect(this.x, this.y, 130, 16);
    this.ctx.fillStyle = "#ff0000";
    this.ctx.fill();
    this.ctx.closePath();
  }
}

export default Platform;