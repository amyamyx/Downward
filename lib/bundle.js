/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./lib/entry.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./lib/belt.js":
/*!*********************!*\
  !*** ./lib/belt.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _platform__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./platform */ "./lib/platform.js");


class Belt extends _platform__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(ctx, x, y) {
    super(ctx, x, y);
  }

  drawPlatform(){
    // super.drawPlatform();
    this.ctx.beginPath();
    this.ctx.fillRect(this.x, this.y, 260, 32);
    this.ctx.fillStyle = "#000000";
    this.ctx.fill();
    this.ctx.closePath();
    this.rightEdge = this.x + 260;

  }
}

/* harmony default export */ __webpack_exports__["default"] = (Belt);

/***/ }),

/***/ "./lib/board.js":
/*!**********************!*\
  !*** ./lib/board.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _platform__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./platform */ "./lib/platform.js");
/* harmony import */ var _turnable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./turnable */ "./lib/turnable.js");
/* harmony import */ var _spring__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./spring */ "./lib/spring.js");
/* harmony import */ var _spiky__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./spiky */ "./lib/spiky.js");
/* harmony import */ var _belt__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./belt */ "./lib/belt.js");






class Board {
  constructor(ctx){
    this.ctx = ctx;
    this.platforms = [];
    this.ceiling = new Image();
    this.ceiling.src = "./src/ceiling.png";

    this.platformHit = false;
    this.randomx = this.randomX.bind(this);
    this.drawCeiling = this.drawCeiling.bind(this);
    this.removeOutOfRange = this.removeOutOfRange.bind(this);
    this.generatePlatform = this.generatePlatform.bind(this);
  }

  populate(){
    const y = [ 210, 410, 810, 610, 1210]
    y.forEach(y => { this.generatePlatform(y) });
    
    this.ceiling.onload = () => {
      this.drawCeiling();
    }
    //the initial platform the player stands on
    const begin = new _platform__WEBPACK_IMPORTED_MODULE_0__["default"](this.ctx, 300, 1010);
    this.platforms.push(begin);

    this.platforms.forEach( p => {
      p.drawPlatform();
    })
  }

  drawCeiling() {
    this.ctx.drawImage(this.ceiling, 0, 0, 880, 35, 0, 0, 990, 50);
  }

  randomX() {
    return Math.floor(Math.random() * 45) * 18 - 130;
  }

  randomPlatform(y){
    const x = this.randomX();
    const args = [this.ctx, x, y]
    const options = [
      new _platform__WEBPACK_IMPORTED_MODULE_0__["default"](...args),
      new _turnable__WEBPACK_IMPORTED_MODULE_1__["default"](...args),
      new _spiky__WEBPACK_IMPORTED_MODULE_3__["default"](...args),
      new _spring__WEBPACK_IMPORTED_MODULE_2__["default"](...args),
      new _belt__WEBPACK_IMPORTED_MODULE_4__["default"](...args)
    ]

    return options[Math.floor(Math.random() * 5)]
  }

  generatePlatform(y = 1280){
    const p = this.randomPlatform(y);
    this.platforms.push(p);
    this.removeOutOfRange();
  }

  removeOutOfRange(){
    const length = this.platforms.length;
    if (length > 7 ) {
      this.platforms = this.platforms.slice(length - 7, length);
    }
  }

  startFeedPlatform() {
    this.checkHit();
    if (this.platformHit) {
      this.platformHit = false;
      this.generatePlatform();
    }
  }

  checkHit(){
    this.platforms.forEach(p => {
      if (p.y <= 10 && p.y > 0) {
        p.y -= 40;
        this.platformHit = true;
        return;
      }
    })
  }
}

/* harmony default export */ __webpack_exports__["default"] = (Board);

/***/ }),

/***/ "./lib/entry.js":
/*!**********************!*\
  !*** ./lib/entry.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game */ "./lib/game.js");


document.addEventListener('DOMContentLoaded', ()=> {
  const canvas = document.getElementById('myCanvas');
  const canvas2 = document.getElementById('myCanvas2')
  canvas.style.width = "440px";
  canvas.style.height = "610px";
  canvas2.style.width = "440px";
  canvas2.style.height = "40px";
  const ctx = canvas.getContext('2d');
  const ctx2 = canvas2.getContext('2d');

  const game = new _game__WEBPACK_IMPORTED_MODULE_0__["default"](ctx, ctx2);
  game.play();
})

/***/ }),

/***/ "./lib/game.js":
/*!*********************!*\
  !*** ./lib/game.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _board__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./board */ "./lib/board.js");
/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./player */ "./lib/player.js");



class Game {
  constructor(ctx, ctx2){
    this.ctx = ctx;
    this.ctx2 = ctx2;
    this.vy = 4;

    this.player = new _player__WEBPACK_IMPORTED_MODULE_1__["default"](this.ctx);
    this.board = new _board__WEBPACK_IMPORTED_MODULE_0__["default"](this.ctx);

    this.landedPF = null;
    this.started = false;
    this.pause = true;
    this.over = false;
    this.hitTop = false;
    this.first = true;

    this.button = new Image();
    this.button.src = "./src/buttons.png";

    this.overText = new Image();
    this.overText.src = "./src/over.png";

    this.bx = 0;
    this.by = 0;

    this.pauseFn = this.pauseFn.bind(this)
    this.init = this.init.bind(this)
    this.animate = this.animate.bind(this);
    this.checkX = this.checkX.bind(this);
    this.checkY = this.checkY.bind(this);
    this.loadImage = this.loadImage.bind(this);

    this.listenKey();
  }

  init(){
    this.board.populate();
    this.ctx2.font = "50px Monospace";
    this.ctx2.fillText("life:", 10, 52);
    this.renderLife();
    this.button.onload = () => {
      this.ctx.drawImage(this.button, this.bx, this.by, 490, 141, 180, 490, 490, 141)
    }
    this.player.go();
  }

  play(){
    this.init();
  }

  renderLife() {
    let score = "";
    let nd = this.getNumOfDigits(this.player.score);
    for (let i = 0; i < 6 - nd; i++) {
      score += "0";
    }
    score += this.player.score;
    
    this.ctx2.clearRect(160, 0, 880, 80);
    this.ctx2.lineWidth = 3;
    this.ctx2.strokeRect(175, 20, 305, 35);
    for (let i = 0; i < this.player.life;i ++) {
      this.ctx2.fillRect(180 + 30 * i, 25, 25, 25)
    }
    this.ctx2.fillText("score: ", 500, 52)
    this.ctx2.fillText(score, 690, 55);

  }
  
  getNumOfDigits(num) {
    let dnum = num;
    let digits = 0;
    while (dnum / 10 >= 1) {
      dnum /= 10;
      digits += 1;
    }
    return digits + 1;
  }

  loadImage() {
    this.ctx.drawImage(this.button, this.bx, this.by, 490, 141, 180, 490, 490, 141)
  }

  listenKey() {
    const handleKeydown = (e) => {
      if (e.key === " " || e.button === 0) {
        if (this.pause) {
          this.by = 187;
          if (!this.started) {
            this.started = true
            if (this.over) {
              this.over = false
              window.location.reload();
              this.pause = false;
            }
          }
        } else {
          this.by = 187;
          this.pauseFn();
          this.loadImage();
        }

      }
    }

    const handleKeyUp = (e) => {
      if (e.key === " " || e.button === 0) {
        if (this.pause) {
          this.pause = false;
          this.continue();
        } else {
          this.pause = true;
        }
      }
    }
    document.addEventListener("keydown", handleKeydown, false);
    document.addEventListener("keyup", handleKeyUp, false);
    document.addEventListener("mousedown", handleKeydown, false);
    document.addEventListener("mouseup", handleKeyUp, false);

  }

  animate() {
    this.rollInterval = requestAnimationFrame(this.animate);
    this.ctx.clearRect(0, 0, 880, 1280);
    this.ctx2.clearRect(160,0,880, 80);
    this.board.startFeedPlatform();
    this.drawObjects();
    if (this.player.score >= 10 && this.player.score % 10 === 0) {
      this.vy += 0.01
    }

    this.moveUp();
    this.checkHittingTop();
    this.renderLife();
    this.checkLanding();
    this.player.hurtFn();
    this.player.drop();
    this.checkOver();
    if (this.over) {
      this.started = false;
      this.pauseFn();
      this.pause = true;
      this.ctx.drawImage(this.overText, 200, 510);
      this.by = 374;
      setTimeout(this.loadImage, 2000);
    }
  }


  checkLanding() {
    if (this.landedPF) {
      this.checkFall();
    } else {
      this.getLandedPF();
    }
  }

  drawObjects(){
    this.board.platforms.forEach(p => {
      p.drawPlatform();
    })
    this.board.drawCeiling();
    this.player.draw();
  }

  moveUp() {
    this.player.dy -= this.vy;
    this.board.platforms.forEach(p => {
      p.y -= this.vy;
    })
  }

  continue() {
    this.animate();
  }

  pauseFn() {
    cancelAnimationFrame(this.rollInterval);
  }

  getLandedPF() {
    this.board.platforms.forEach( p => {
      if (this.checkY(p) && this.checkX(p)) { 
        this.landedPF = p;
        this.player.dy = this.landedPF.y - 108;
        this.player.dropping = false;
        this.landedPF.land(this.player);
        if (this.first) {
          this.player.score -=1;
          this.first = false;
        }
        this.renderLife();
       }
    })
  }

  checkX(p) {
   return this.player.dx + 20 < p.rightEdge && this.player.dx + 57 > p.x;
  }
  
  checkY(p) {
    return this.player.dy + 108 >= p.y && this.player.dy + 108 < p.y + 32;
  }

  checkFall() {
    if (!this.checkX(this.landedPF) || this.hitTop) {
      this.landedPF = null;
      this.player.dropping = true;
    }
  }

  checkHittingTop(){
    if (this.player.dy < 20) {
      this.hitTop = true;
      this.player.hurt = true;
      this.player.dy += 32
      this.player.life -= 5;
    } else {
      this.hitTop = false;
    }
  }

  checkOver() {
    if (this.player.dy > 1280 || this.player.life <= 0){
      this.over = true;
    }
  }
}

/* harmony default export */ __webpack_exports__["default"] = (Game);

/***/ }),

/***/ "./lib/platform.js":
/*!*************************!*\
  !*** ./lib/platform.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
class Platform {
  constructor(ctx, x, y){
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    // this.drawPlatform = this.drawPlatform.bind(this);
  }

  drawPlatform(){
    this.ctx.beginPath();
    this.ctx.fillRect(this.x, this.y, 260, 32);
    this.ctx.fillStyle = "#3393C6";
    this.ctx.fill();
    this.ctx.closePath();
    this.rightEdge = this.x + 260;
  }
  
  land(player) {
    player.score += 1;
    if (player.life !== 10) {
      player.life += 1;
    }
  }
}

/* harmony default export */ __webpack_exports__["default"] = (Platform);

/***/ }),

/***/ "./lib/player.js":
/*!***********************!*\
  !*** ./lib/player.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
class Player {
  constructor(ctx) {
    this.ctx = ctx;
    this.img = new Image();
    this.img.src = "./src/match.png";

    this.rightPressed = false;
    this.leftPressed = false;

    this.dropping = false;
    this.hurt = false;
    this.hurtFlash = null;

    //sprite dimension
    this.sx = 4;
    this.sy = 2;

    //canvas dimension
    this.dx = 400;
    this.dy = 903;
    // this.dy = 0;

    this.vy = 10;
    this.life = 10;
    this.score = 0;
    this.flashTime = 0;
    this.draw = this.draw.bind(this);
    this.flash = this.flash.bind(this);
    this.stopFlash = this.stopFlash.bind(this);
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

  hurtFn() {
    if (this.hurt) {
      this.flashTime += 8;
      if (!this.hurtFlash) {
        this.hurtFlash = setInterval(this.flash, 250)
        if (this.flashTime === 0 ) {
          this.stopFlash();
        }
      }
      this.hurt = false;
    }
  }

  flash() {
    if (this.flashTime > 0) {
      this.flashTime % 2 === 1 ? this.sy = 2 : this.sy = 375;
      this.flashTime -= 1
    }
  }

  stopFlash(){
    clearInterval(this.hurtFlash)
    this.sy = 2;
  }
}

/* harmony default export */ __webpack_exports__["default"] = (Player);

/***/ }),

/***/ "./lib/spiky.js":
/*!**********************!*\
  !*** ./lib/spiky.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _platform__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./platform */ "./lib/platform.js");


class Spiky extends _platform__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(ctx, x, y){
    super(ctx, x, y);
    this.type = "spiky";
  }

  drawPlatform() {
    super.drawPlatform();
    this.ctx.save();
    this.ctx.translate(this.x, this.y);
    this.ctx.fillRect(0, 0, 260, 32);
    this.ctx.beginPath();
    this.ctx.moveTo(0, 0)
    this.ctx.lineWidth = 2;
    this.drawSpikes();
    this.ctx.closePath();
    this.ctx.fillStyle = "#aaaaaa";
    this.ctx.fill();
    this.ctx.strokeStyle = "#aaaaaa";
    this.ctx.stroke();
    this.ctx.restore();
  }

  drawSpikes() {
    const right = 260;
    const bottom = 0;
    const spikeHeight = 30;
    const spikeWidth = 10;
    for (let x = 0; x < right;) {
      this.ctx.lineTo(x += spikeWidth, -spikeHeight);
      this.ctx.lineTo(Math.min(x += spikeWidth, right), bottom);
    }
  }

  land(player) {
    player.life -= 3;
    player.score += 0;
    player.hurt = true;
  }
}

/* harmony default export */ __webpack_exports__["default"] = (Spiky);

/***/ }),

/***/ "./lib/spring.js":
/*!***********************!*\
  !*** ./lib/spring.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _platform__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./platform */ "./lib/platform.js");


class Spring extends _platform__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(ctx, x, y) {
    super(ctx, x, y)
  }

  drawPlatform() {
    // super.drawPlatform();
    this.ctx.beginPath();
    this.ctx.fillRect(this.x, this.y, 260, 32);
    this.ctx.fillStyle = "lightseagreen";
    this.ctx.fill();
    this.ctx.closePath();
    this.rightEdge = this.x + 260;
  }

}

/* harmony default export */ __webpack_exports__["default"] = (Spring);

/***/ }),

/***/ "./lib/turnable.js":
/*!*************************!*\
  !*** ./lib/turnable.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _platform__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./platform */ "./lib/platform.js");


class Turnable extends _platform__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(ctx, x, y) {
    super(ctx, x, y)
  }

  drawPlatform() {
    // super.drawPlatform();
    this.ctx.beginPath();
    this.ctx.fillRect(this.x, this.y, 260, 32);
    this.ctx.fillStyle = "pink";
    this.ctx.fill();
    this.ctx.closePath();
    this.rightEdge = this.x + 260;
  }

}

/* harmony default export */ __webpack_exports__["default"] = (Turnable);

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map