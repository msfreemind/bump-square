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
movePushBlock(block, actionType) {
  // Update the push block's position
  block.pos[0] += block.movement[0] * actionType;
  block.pos[1] += block.movement[1] * actionType;

  // Filter for the balls that are on tiles about to be occupied by push blocks
  this.men.filter(man => tilesMatch(man.tilePos, block.pos)).forEach(bumpedMan => {
    // Check that another push block isn't blocking the bump path
    if (!this.pushBlockCollision([bumpedMan.tilePos[0] + (block.movement[0] * actionType), bumpedMan.tilePos[1] + (block.movement[1] * actionType)])) {
      // Update the ball's position
      bumpedMan.updatePos( 
        bumpedMan.pos.plus(new Coord(block.movement[0] * 80 * actionType, block.movement[1] * 80 * actionType))
      );

      if (!this.validPosition(bumpedMan.tilePos, false)) {
        // Remove the ball if its new position is out-of-bounds
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
  });
}
```

## Game Rendering

The ball and game tiles are rendered to the Canvas every 4 or 8 milliseconds, depending on the level. 

```javascript
drawBall(pos, color, radius) {
  this.ctx.beginPath();

  this.ctx.arc(pos.i, pos.j, radius || View.MAN_RADIUS, 0, Math.PI * 2);
  this.ctx.fillStyle = color;
  this.ctx.fill();

  this.ctx.closePath();
}

...

// Draw controllable blocks
this.board.getABlocks().forEach(aBlock => this.drawTile(aBlock.pos, "crimson", "A"));
this.board.getShuttles().forEach(shuttle => this.drawTile(shuttle.pos, "dodgerblue", "S"));
this.board.getDBlocks().forEach(dBlock => this.drawTile(dBlock.pos, "#FFAF00", "D"));
    
...

drawTile(tile, color, letter) {
  this.ctx.fillStyle = color; 
  this.ctx.fillRect(40 * tile[0], 40 * tile[1], 40, 40);

  if (letter) {
    this.ctx.fillStyle = "white";
    this.ctx.font = "bold 26px Roboto";
    this.ctx.textAlign = "center";
    this.ctx.textBaseline = "middle";
    this.ctx.fillText(letter, (40 * tile[0]) + 20, (40 * tile[1]) + 22);
  }
}
```

The data for each game level—including the level title, level speed, time limit (if any) and tile positions—are stored as key-value pairs and used by the rendering logic to draw each level's elements.

```javascript
3: {
  title: "Stage 4",
  subtitle: "Putting It All Together",
  menQuota: 1,
  timeLimit: 0,
  timerPos: [0, 0],
  tickRate: 8,
  start: [0, 10],
  floor: [[1, 10], [2, 10], [3, 10], [4, 10], [4, 12], [4, 13], [9, 14], [10, 14], [11, 14], [12, 14]],
  end: [13, 14],
  aBlocks: { 
    0: {
      pos: [11, 14],
      movement: [0, 1]
    }
  },
  dBlocks: { 
    0: {
      pos: [4, 9],
      movement: [0, 1]
    }
  },
  shuttles: { 
    0: {
      pos: [4, 14],
      movement: [4, 0]
    }
  },
  deathSquares: {} 
}
```
