# bumpSquare
[bumpSquare](https://www.bumpsquare.com "bumpSquare") is a HaKox-inspired 2D Canvas game in which keyboard controls are used to direct a ball toward successive goals.

![bump-readme-logo](https://user-images.githubusercontent.com/2721658/115602767-8aab1d80-a29c-11eb-94c2-edf5b5943250.png)

## Technologies Used

The game is written purely in JavaScript and rendered in HTML5 Canvas.

## Bump Squares and Shuttle Squares

The player can only control certain marked squares by pressing and releasing the A, S or D keys. The A and D squares can bump (or block) the player's ball, whereas the S square can transport it. Using a combination of these squares, the player must direct the ball to the green goal square in order to complete a stage.

![blocks](https://user-images.githubusercontent.com/2721658/115602595-5afc1580-a29c-11eb-909b-2298784a95a1.gif)

The bump functionality is achieved through `keydown` and `keyup` listener events that update the squares' positions on the board and, upon collision with the ball, bump the ball to a new position while also modifying its velocity vector:

```javascript
// Check for collision with ball
if (!this.pushBlockCollision([bumpedMan.tilePos[0] + (block.movement[0] * actionType), bumpedMan.tilePos[1] + (block.movement[1] * actionType)])) {
  // Update the ball's position
  bumpedMan.updatePos( 
    bumpedMan.pos.plus(new Coord(block.movement[0] * 80 * actionType, block.movement[1] * 80 * actionType))
  );

  if (!this.validPosition(bumpedMan.tilePos, false)) {
    // Remove the ball if it goes out of bounds
    bumpedMan.dead = true;
  } else {
    // Update the ball's velocity
    if (bumpedMan.dx === 0 && block.movement[0] !== 0) {
      bumpedMan.dx = block.movement[0] > 0 ? Man.DEFAULT_SPEED : -Man.DEFAULT_SPEED;
      bumpedMan.dy = 0;
    } else if (bumpedMan.dy === 0 && block.movement[1] !== 0) {
      bumpedMan.dx = 0;
      bumpedMan.dy = block.movement[1] > 0 ? Man.DEFAULT_SPEED : -Man.DEFAULT_SPEED;
    } 
  }
}
```
