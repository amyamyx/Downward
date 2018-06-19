class Player {
  constructor(ctx) {
    this.ctx = ctx;
  }

  draw(){
    const img = new Image();
    img.src = "./match.svg"
    img.onload = () => {
      this.ctx.drawImage(img, 20, 10, 32, 65, 200, 460, 25, 50);
    }
  }
}

export default Player;