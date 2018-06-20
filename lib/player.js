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
    let sprite;
    if (this.rightPressed) {
      sprite = [220, 275]
      this.sx = sprite[Math.floor(Math.random() * 2)];
      if (this.dx < 400) { this.dx += 4 }
    } else if (this.leftPressed) {
      sprite = [110, 165]
      this.sx = sprite[Math.floor(Math.random() * 2)];
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
      this.dy += this.vy;
      this.vy += 0.4 ;
    } else {
      this.vy = 0.4;
    }
  }
}

export default Player;