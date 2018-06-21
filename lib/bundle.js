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
    super.drawPlatform();
    this.ctx.beginPath();
    this.ctx.fillRect(this.x, this.y, 260, 32);
    this.ctx.fillStyle = "purple";
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
    this.ceiling.src = "./ceiling.png";

    this.randomx = this.randomX.bind(this);
    this.drawCeiling = this.drawCeiling.bind(this);
    this.removeOutOfRange = this.removeOutOfRange.bind(this);
    this.generatePlatform = this.generatePlatform.bind(this);
  }

  populate(){
    const y = [10, 210, 410, 810, 610, 1210]
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
    this.ctx.drawImage(this.ceiling, 0, 0, 880, 35, 0, 0, 880, 35);
  }

  randomX() {
    return Math.floor(Math.random() * 50) * 16
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
    // this.platInterval = requestAnimationFrame(this.generatePlatform)
    // const x = this.randomX();
    // const p = new Spiky(this.ctx, x, y);
    const p = this.randomPlatform(y);
    this.platforms.push(p);
    this.removeOutOfRange();
  }

  removeOutOfRange(){
    const length = this.platforms.length;
    if (length > 7 ) {
      this.platforms = this.platforms.slice(length - 7, length);
      console.log(this.platforms.map( p => p.constructor));
    }
  }

  startFeedPlatform() {
    this.platInterval = setInterval(this.generatePlatform, 1000);
    // this.platInterval = requestAnimationFrame(this.generatePlatform)
    // this.generatePlatform();
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
/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./player */ "./lib/player.js");
/* harmony import */ var _platform__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./platform */ "./lib/platform.js");
/* harmony import */ var _spiky__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./spiky */ "./lib/spiky.js");
/* harmony import */ var _belt__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./belt */ "./lib/belt.js");






document.addEventListener('DOMContentLoaded', ()=> {
  const canvas = document.getElementById('myCanvas');
  canvas.style.width = "440px";
  canvas.style.height = "640px";
  const ctx = canvas.getContext('2d');

  const game = new _game__WEBPACK_IMPORTED_MODULE_0__["default"](ctx);
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
  constructor(ctx){
    this.ctx = ctx;
    this.vy = 4;

    this.player = new _player__WEBPACK_IMPORTED_MODULE_1__["default"](this.ctx);
    this.board = new _board__WEBPACK_IMPORTED_MODULE_0__["default"](this.ctx);

    this.landedPF = null;
    this.started = false;
    this.pause = true;
    this.hitTop = false;

    this.animate = this.animate.bind(this);
    this.checkX = this.checkX.bind(this);
    this.checkY = this.checkY.bind(this);

    this.listenKey();
  }

  init(){
    this.board.populate();
    this.started = true;
    this.player.go();
  }

  play(){
    this.init();    
  }

  listenKey() {
    document.addEventListener("keydown", (e) => {
      if (e.key === " ") {
        if (this.pause) {
          this.continue();
        } else {
          this.pauseFn()
        }
      }
    })
  }

  animate() {
    this.rollInterval = requestAnimationFrame(this.animate);
    this.ctx.clearRect(0, 0, 880, 1280);
    this.drawObjects();
    this.moveUp();
    this.checkHittingTop();
    this.checkLanding();
    this.player.drop();
  }

  checkLanding() {
    if (this.landedPF) {
      this.checkFall();
    } else {
      this.getLandedPF();
    }
  }

  drawObjects(){
    this.player.draw();
    this.board.platforms.forEach(p => {
      p.drawPlatform();
    })
    this.board.drawCeiling();
  }

  moveUp() {
    this.player.dy -= this.vy;
    this.board.platforms.forEach(p => {
      p.y -= this.vy;
    })
  }
  
  // startRoll() {
  //   this.animate();
    // this.rollInterval = setInterval(this.moveUp, 0.1);
    // this.rollInterval = requestAnimationFrame(this.moveUp);
  // }

  continue() {
    this.board.startFeedPlatform();
    // this.startRoll();
    this.animate();
    this.pause = false;
  }

  pauseFn() {
    clearInterval(this.board.platInterval);
    cancelAnimationFrame(this.rollInterval);
    this.pause = true;
  }

  getLandedPF() {
    this.board.platforms.forEach( p => {
      if (this.checkY(p) && this.checkX(p)) { 
        this.landedPF = p;
        this.player.dy = this.landedPF.y - 108;
        this.player.dropping = false;
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
      this.player.dy += 32
    } else {
      this.hitTop = false;
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
    this.ctx.fillStyle = "#000000";
    this.ctx.fill();
    this.ctx.closePath();
    this.rightEdge = this.x + 260;
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
    this.ctx.fillStyle = "white";
    this.ctx.fill();
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
    super.drawPlatform();
    this.ctx.beginPath();
    this.ctx.fillRect(this.x, this.y, 260, 32);
    this.ctx.fillStyle = "blue";
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
    super.drawPlatform();
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