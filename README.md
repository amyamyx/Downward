# NF-Shaft-clone

NF-Shaft-clone is a clone project of a platform game, NF-Shaft([NF-Shaft video demo](https://youtu.be/kR5l14rhfjo)). In the game, the player controls a figure with left and right keys and attempts to descend. There will be five different kinds of platforms. The player has step on one of these platforms before the spikes at the top of the window reaches the player figure.

There are 2 ways that a player loses the game:
 * Fail to step on a platform
 * Lose all 10 lives by touching the spikes on the spike platform or on the top of the window.
 
Five different types of platforms:
 * Solid platforms
 * Spiky platforms
 * Conveyer belts
 * Turnables
 * Springs
 
The proposed game view

![](https://image.ibb.co/f5JA2y/wireframe_JS.png)

### Architecture and Technologies

This projects will be implemented with the following technologies:
* Vanilla Javascript for the OOP structure and game logic
* `HTML5 Canvas` for DOM manipulation and rendering
* Webpack to bundle and serve up the scripts

Lib files: 
* `entry.js` - the file where all files join.
* `game.js` - handle the game logic including scoring, losing and regaining lives, ending games, pausing games, and starting games.
* `board.js` - generate new platforms in a set interval.
* `player.js` - handle the drawing and behaviors of the player figure. (Able to move left or right when stepping on a platform & fall downward when not)
* `platform.js` - a class to handle the drawing of the platforms where the player figure stands on. 

### Implementation Timeline

**Day 1**: 

* Complete proposal
* Setup project structures. (`index.html`, `entry.js` and the skeleton of other lib files)
* Setup webpack and have it generate `bundle.js`
* Get `board.js` and `platform.js` to render regular(solid) platforms on the board

**Day 2**:

* Get the player figure to render and move in three directions (left, right, fall).
* Have the player figure to stop falling when stepping on the platform.
* Get the board to update the position of all objects (platforms and player figure) upward in each frame

**Day 3**:

* Make sure the player figure moves down after touching the ceiling spikes.
* Create spiky platforms and conveyor belts and make sure the player figure behaves accordingly.
* Complete the `game.js` to have game logic work correctly
   * Obtain 1 point when stepping on platforms other than spiky ones
   * Lose 1 life after touching the ceiling spikes and spiky platforms
   * Regain 1 life after gaining 10 points
   * Game over if not stepping on any platform

**Day 4**:

* Add springs and turnable platforms and have the player figure hehaves accordingly.
* Polish the game view

**BONUS**:

* Add sound effects
