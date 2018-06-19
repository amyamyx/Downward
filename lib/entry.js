document.addEventListener('DOMContentLoaded', ()=> {
  const canvas = document.getElementById('myCanvas');
  const ctx = canvas.getContext('2d');

  function draw() {
    ctx.beginPath();
    ctx.arc(50, 50, 10, 0, Math.PI * 2);
    ctx.fillStyle = "#ff0000";
    ctx.fill();
    ctx.closePath();
  }

  draw();
})