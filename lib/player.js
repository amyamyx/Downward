class Player {
  constructor(ctx) {
    this.ctx = ctx;
    this.img = new Image();
    this.img.src = "./match.png";

    this.rightPressed = false;
    this.leftPressed = false;

    this.dropping = false;

    //sprite dimension
    this.sx = 0;
    this.sy = 0;

    //canvas dimension
    this.dx = 200;
    this.dy = 456;
    // this.dy = 0;

    this.vy = 10;

    this.draw = this.draw.bind(this);
  }

  // 55
  drawMan(){
    this.ctx.drawImage(this.img, this.sx, this.sy, 39, 54, this.dx, this.dy, 39, 54);
  }

  draw() {
    this.drawMan();

    if (this.rightPressed) {
      this.sx = 220;
      if (this.dx < 400) { this.dx += 4 }
    } else if (this.leftPressed) {
      this.sx = 110;
      if (this.dx >= 0) { this.dx -= 4 }
    } else {
      this.sx = 0;
    }
  }

  go(){
    this.img.onload = () => this.drawMan();
    
    const handleKeydown = (e) => {
      if (e.key === "ArrowRight") {
        this.rightPressed = true;
      } else if (e.key === "ArrowLeft") {
        this.leftPressed = true;
      }
    }

    const handleKeyup = (e) => {
      if (e.key === "ArrowRight") {
        this.rightPressed = false;
      } else if (e.key === "ArrowLeft") {
        this.leftPressed = false;
      }
    }

    document.addEventListener("keydown", handleKeydown, true);
    document.addEventListener("keyup", handleKeyup, true);
  }

  drop(){
    if (this.dropping) {
      this.sx = 55;
      console.log("dropped")
      this.dy += this.vy;
      this.vy += 0.4 ;
    } else {
      this.vy = 0.4;
    }
  }
}

export default Player;