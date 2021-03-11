import Board from './board';
import View from './view';

class Game {
  constructor(ctx) {
    this.ctx = ctx;
    this.board = new Board(Game.MAPS[0])
    this.view = new View(ctx, this.board);

    this.intervalId = null;
    this.mapIndex = 0;    

    $(window).on("keydown", this.handleKeyDownEvent.bind(this));
    $(window).on("keyup", this.handleKeyUpEvent.bind(this));
    this.wallsMoved = false;
    this.shuttlesMoved = false;
    this.bumpersMoved = false;
    this.levelStarted = false;

    this.view.renderMapStartScreen();
  }

  loadNextMap() {
    this.wallsMoved = false;
    this.shuttlesMoved = false;
    this.bumpersMoved = false;
    this.levelStarted = false;

    this.board = new Board(Game.MAPS[++this.mapIndex]);
    this.view = new View(this.ctx, this.board);

    this.view.renderMapStartScreen();  
  }

  handleKeyDownEvent(event) {
    switch (event.code) {
      case "Enter":
        if (!this.levelStarted) {
          this.levelStarted = true;
          this.intervalId = window.setInterval(
            this.step.bind(this),
            Game.STEP_MILLIS
          );
        }
        
        break;

      case "KeyA":
        if (!this.wallsMoved) {
          this.wallsMoved = true;
          this.board.moveWalls();
        }        
        break;

      case "KeyS":
        if (!this.shuttlesMoved) {
          this.shuttlesMoved = true;
          this.board.moveShuttles();
        }        
        break;

      case "KeyD":
        if (!this.bumpersMoved) {
          this.bumpersMoved = true;
          this.board.moveBumpers();
        }        
        break;

      default:
        break;
    }
  }

  handleKeyUpEvent(event) {
    switch (event.code) {
      case "KeyA":
        if (this.wallsMoved) {
          this.board.moveWalls();
          this.wallsMoved = false;
        }        
        break;

      case "KeyS":
        if (this.shuttlesMoved) {
          this.board.moveShuttles();
          this.shuttlesMoved = false;
        }        
        break;
      
      case "KeyD":
        if (this.bumpersMoved) {
          this.board.moveBumpers();
          this.bumpersMoved = false;
        }        
        break;

      default:
        break;
    }
  }

  step() {
    this.board.men.forEach((man, idx) => {
      man.move();

      if (man.reachedFinish) {
        this.board.removeMan(idx);
      }
    });

    if (this.board.men.length === 0) {
      window.clearInterval(this.intervalId);
      this.loadNextMap();
    } else {
      this.view.renderNextState();
    }    
  }
}

Game.MAPS = {
  0: { 
    title: "Stage 1",
    subtitle: "Getting Your Blocks Wet",
    start: [0, 10],
    floor: [[1, 10], [2, 10], [3, 10], [4, 10], [5, 10]],
    end: [6, 10],
    walls: { 
      0: {
        pos: [4, 10],
        movement: [0, 1]
      }
    },
    shuttles: {},
    bumpers: {}
  },
  1: {
    title: "Stage 2",
    subtitle: "Up to Your Bellybutton",
    start: [0, 10],
    floor: [[1, 10], [2, 10], [3, 10], [4, 10], [4, 12], [4, 13]],
    end: [4, 14],
    walls: {},
    shuttles: {},
    bumpers: { 
      0: {
        pos: [4, 9],
        movement: [0, 1]
      }
    }
  },
  2: {
    title: "Stage 3",
    subtitle: "Into the Deep End",
    start: [0, 10],
    floor: [[1, 10], [2, 10], [3, 10], [4, 10]],
    end: [10, 10],
    walls: {},
    shuttles: { 
      0: {
        pos: [5, 10],
        movement: [4, 0]
      }
    },
    bumpers: {}
  },  
  3: {
    title: "Stage 4",
    subtitle: "Putting It All Together",
    start: [0, 10],
    floor: [[1, 10], [2, 10], [3, 10], [4, 10], [4, 12], [4, 13], [9, 14], [10, 14], [11, 14], [12, 14]],
    end: [13, 14],
    walls: { 
      0: {
        pos: [11, 14],
        movement: [0, 1]
      }
    },
    shuttles: { 
      0: {
        pos: [4, 14],
        movement: [4, 0]
      }
    },
    bumpers: { 
      0: {
        pos: [4, 9],
        movement: [0, 1]
      }
    }
  }
}

Game.STEP_MILLIS = 15;

export default Game;