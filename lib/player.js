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
    this.drawMan = this.drawMan.bind(this);
  }

  // 55
  drawMan(){
    this.ctx.drawImage(this.img, this.sx, this.sy, 39, 54, this.dx, this.dy, 39, 54);
  }

  draw() {
    this.ctx.clearRect(200, 456, 39, 54);
    this.drawMan();
    if (this.rightPressed) {
      this.sx = 220;
      
    } else if (this.leftPressed) {
      this.sx = 110;
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
    
    setInterval(this.draw, 10);
  }

  
}

export default Player;