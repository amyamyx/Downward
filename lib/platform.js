class Platform {
  constructor(){
  }

  drawPlatform(ctx){
    ctx.beginPath();
    ctx.fillRect(50, 70, 100, 12);
    ctx.fillStyle = "#ff0000";
    ctx.fill();
    ctx.closePath();
  }
}

export default Platform;