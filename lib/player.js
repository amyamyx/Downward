class Player {
  constructor(ctx) {
    this.ctx = ctx;
    this.img = new Image();
    this.img.src = "./match.png";

    this.rightPressed = false;
    this.leftPressed = false;

    this.sx = 0;
    this.sy = 0;

    this.dx = 200;
    this.dy = 456;

    this.draw = this.draw.bind(this);
  }

  // 55
  drawMan(){
    this.ctx.drawImage(this.img, this.sx, this.sy, 39, 54, this.dx, this.dy, 39, 54);
  }

  draw() {
    // this.ctx.clearRect(this.dx - 10, this.dy, 60, 54);
    this.drawMan();
    if (this.rightPressed) {
      this.sx = 220;
      if (this.dx < 400) { this.dx += 1 }
    } else if (this.leftPressed) {
      this.sx = 110;
      if (this.dx >= 0) { this.dx -= 1 }
    } else {
      this.sx = 0;
    }

  }

  go(){
    this.img.onload = () => {
      return this.drawMan();
    }
    
    const handleKeydown = (e) => {
      if (e.key === "ArrowRight") {
        this.rightPressed = true;
      } else if (e.key === "ArrowLeft") {
        this.leftPressed = true;
      }
    }

    const handleKeyup = (e) => {
      if (e.key === "ArrowRight") {
        console.log("right");
        this.rightPressed = false;
      } else if (e.key === "ArrowLeft") {
        console.log("left");
        this.leftPressed = false;
      }
    }

    document.addEventListener("keydown", handleKeydown, true);
    document.addEventListener("keyup", handleKeyup, true);
    
    // setInterval(this.draw, 0.1);
  }
}

export default Player;