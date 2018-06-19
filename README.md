# NF-Shaft-clone

NF-Shaft-clone is a clone project of a platform game, NF-Shaft([NF-Shaft video demo](https://youtu.be/kR5l14rhfjo)). In the game, the player controls a figure with left and right keys and attempts to descend in order to escape from the ceiling spikes. There will be five different kinds of platforms for the player figure to stand on:

 * Solid platforms - Regular platforms. Player earns a point when stepping on them
 * Spiky platforms - Harmful platforms. Player loses a life when stepping on them
 * Conveyer belts - If player moves along the suggested direction of the conveyer belt, the moving speed doubles. Otherwise, the moving speed lowers down. Player earns a point when stepping on them
 * Springs - When stepping on string platforms, the player figure bounces up and down
 * Turnables - The figure player will fall down automatically after stepping on one. Player earns a point

There are 2 ways that a player loses the game:
 * Fail to step on a platform before falling to the bottom of the window (frame)
 * Lose all 10 lives after touching the ceiling spikes or the spiky platforms
 


### Wireframe

The app will consist of a single screen with a canvas, nav link to the repo of this project, my linkedIn link, and the instructions of how to play the game.

![](https://image.ibb.co/f5JA2y/wireframe_JS.png)

### Architecture and Technologies

This projects will be implemented with the following technologies:
* Vanilla Javascript for the OOP structure and game logic
* `HTML5 Canvas` for DOM manipulation and rendering
* Webpack to bundle and serve up the scripts

Lib files: 
* `entry.js` - the file where all files join
* `game.js` - handle the game logic including scoring, losing and regaining lives, ending games, pausing games, and starting games
* `board.js` - generate new platforms in a set interval
* `player.js` - handle the drawing and behaviors of the player figure. (Able to move left or right when stepping on a platform & fall downward when not)
* `platform.js` - a class to handle the drawing of the platforms where the player figure stands on.
* `spiky.js` - extends from `Platform` class
* `conveyor.js` - extends from `Platform` class
* `spring.js` - extends from `Platform` class
* `turnable.js` - extends from `Platform` class

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

* Add springs and turnable platforms and have the player figure hehaves accordingly
* Add start, pause and continue keypress listeners
* Polish the game view

**BONUS**:

* Add sound effects
