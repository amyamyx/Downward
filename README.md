# Downward :running::arrow_lower_right:

[Start playing **Downward**!](https://amyamyx.github.io/Downward/)

**Downward** is a Web brower game inspired by a retro platform game, NF-Shaft([NF-Shaft video demo](https://youtu.be/kR5l14rhfjo)). In the game, you will control a character and try your best to escape from the fierce ceiling spikes. There will be two different kinds of platforms for the character to stand on:

 * `Solid` - Regular platforms. The player earns one point when stepping on them.
 * `Spiky` - Harmful platforms. Player loses life counts when landed on one of these. Keep away unless neccessary!

There are 2 ways to lose the game:
 * Fail to step on a platform and fall out of the canvas (gameview)
 * Lose all 10 lives after touching the ceiling spikes or the spiky platforms
 
### Functionality & MVPs

In Downward, users will be able to:
* Use left and right arrow keys to control the character's movements
* Press space key to pause and continue a started game
* Press space key to start a game
* When the game is over, press space key to replay
* Increased difficulty after scoring certain points

Key Features are: 
* **Start and Pause the game both by pressing the space key**: In order to render the correct text when paused, instead of listening on a single `keypress` event, I set up two separate listeners to detect `keydown` and `keyup` events. By doing so, it also prevents the game from keeping rolling when we actually want it to pause.
```JavaScript
// ./lib/game.js

class Game {
  constructor(...) {
    //...
    this.pause = false; //A boolean variable indicating whether the game is halted or not
    this.listenKey(); //Start listening upon initialization
  }
  
  listenKey() {
    const handleKeydown = (e) => {
      if (e.key === " ") {
        if (this.pause) {
          //Do something
        } else {
          //...
          this.pauseFn();
          this.loadImage();
        }
      }
    }

    const handleKeyUp = (e) => {
      if (e.key === " ") {
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
  }
}
```

* **Dynamically generate random platforms**: After starting the game, the `Board` object will feed platforms from the bottom of the canvas. My original approach was to create another `setInterval` function besides the main `requestAnimationFrame` function. However, this increased the complexity when I want to pause the game. Instead, I created a helper function that detects when the top platform moves out of the canvas.Then it triggers the generation of a new random platform.
```JavaScript
// ./lib/board.js

class Board {
  constructor(...){
    this.platformHit = false; //default to false;
  }
  //...
  checkHit() {
    if (SOME_CONDITIONS) {
      this.platformHit = true;
    }
  }
  
  generatePlatform(){
   //code to generate a random platform
  }
  
  startFeedPlatforms(){  //Will be invoked in the Game Object when the requestAnimationFrame is being called
    this.checkHit();
    if (this.platformHit) {
      this.platformHit = false; //Set back to detect the next platform
      this.generatePlatform();
    }
  }
}
```
* **Display and update the life counts bar and scored points in real-time**: 


### Wireframes & Outcome

The app will consist of a single screen with a canvas, nav links to the repo of this project, my linkedIn account, my Angelist account, and the instructions of how to play the game.

![](https://image.ibb.co/hf6AvT/Web_1920_1.png)
![](https://image.ibb.co/hAwAeo/screenshot.png)


### Architecture and Technologies

This projects will be implemented with the following technologies:
* `JavaScript` (ES6) for the OOP structure and game logic
* `HTML5 Canvas` for DOM manipulation and rendering animation
* `Webpack` to bundle and serve up the scripts
* `CSS Sprites`- multiple images in one single to reduce loading time
* Github Pages - host the application live

Lib files: 
* `entry.js` - the file where all files join
* `game.js` - handle the game logic including scoring, losing and regaining lives, ending games, pausing games, and starting games
* `board.js` - generate new platforms in a set interval
* `player.js` - handle the drawing and behaviors of the player figure. (Able to move left or right when stepping on a platform & fall downward when not)
* `platform.js` - a class to handle the drawing of the platforms where the player figure stands on.
* `spiky.js` - extends from `Platform` class

### Implementation Timeline

**Day 1**: 

* Complete proposal
* Setup project structures. (`index.html`, `entry.js` and the skeleton of other lib files)
* Setup webpack and have it generate `bundle.js`
* Get `board.js` and `platform.js` to render regular(solid) platforms on the board

**Day 2**:

* Get the player figure to render and move in three directions (left, right, fall)
* Have the player figure to stop falling when stepping on the platform
* Get the board to update the position of all objects (platforms and player figure) upward in each frame

**Day 3**:

* Make sure the player figure moves down after touching the ceiling spikes
* Create spiky platforms and conveyor belts and make sure the player figure behaves accordingly
* Complete the `game.js` to have game logic work correctly
   * Obtain 1 point when stepping on platforms other than spiky ones and springs
   * Lose 1 life after touching the ceiling spikes and spiky platforms
   * Regain 1 life after gaining 10 points
   * Game over if not stepping on any platform

**Day 4**:

* Add start, pause and continue keypress listeners
* Polish the game view

**Future Adjustments**:

* Add sound effects with HTML5 `<audio>` tag
* Use SQLite3 to store highest score records
* Create other variation of platforms: 
  * `Belt` - Conveyor-belt-like platforms. If you move along with the suggested direction of the conveyer belt, the moving speed doubles. If you move the opposite way, you'll stay on them longer. You earn one point when landing on them. Whoo whoo!
  * `Spring` - When stepping on string platforms, the character bounces up and down.
  * `Turnable` - The character will fall down automatically after stepping on one. Player earns a point.

