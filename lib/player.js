class Player {
  constructor(ctx) {
    this.ctx = ctx;
    this.img = new Image();
    this.img.src = "./match.png";

    this.rightPressed = false;
    this.leftPressed = false;

    this.dropping = false;

    //sprite dimension
    this.sx = 4;
    this.sy = 2;

    //canvas dimension
    this.dx = 400;
    this.dy = 903;
    // this.dy = 0;


    ///unchanged
    this.vy = 10;
    /// 
    
    this.draw = this.draw.bind(this);
  }

  // 55
  drawMan(){
    this.ctx.drawImage(this.img, this.sx, this.sy, 195, 270, this.dx, this.dy, 78, 108);
  }

  draw() {
    this.drawMan();
    let sprite;
    if (this.rightPressed) {
      sprite = [1192, 1475]
      this.sx = sprite[Math.floor(Math.random() * 2)];
      if (this.dx < 815) { this.dx += 9 }
    } else if (this.leftPressed) {
      sprite = [596, 894]
      this.sx = sprite[Math.floor(Math.random() * 2)];
      if (this.dx >= 0) { this.dx -= 9 }
    } else {
      this.sx = 4;
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
      this.sx = 298;
      this.dy += this.vy;
      this.vy += 1 ;
    } else {
      this.vy = 10;
    }
  }
}

export default Player;