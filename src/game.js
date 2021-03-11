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
    this.aBlocksMoved = false;
    this.dBlocksMoved = false;
    this.shuttlesMoved = false;    
    this.levelStarted = false;

    this.view.renderMapStartScreen();
  }

  loadNextMap() {
    this.aBlocksMoved = false;
    this.dBlocksMoved = false;
    this.shuttlesMoved = false;    
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
        if (!this.aBlocksMoved) {
          this.aBlocksMoved = true;
          this.board.moveABlocks();
        }        
        break;

      case "KeyS":
        if (!this.shuttlesMoved) {
          this.shuttlesMoved = true;
          this.board.moveShuttles();
        }        
        break;

      case "KeyD":
        if (!this.dBlocksMoved) {
          this.dBlocksMoved = true;
          this.board.moveDBlocks();
        }        
        break;

      default:
        break;
    }
  }

  handleKeyUpEvent(event) {
    switch (event.code) {
      case "KeyA":
        if (this.aBlocksMoved) {
          this.board.moveABlocks();
          this.aBlocksMoved = false;
        }        
        break;

      case "KeyS":
        if (this.shuttlesMoved) {
          this.board.moveShuttles();
          this.shuttlesMoved = false;
        }        
        break;
      
      case "KeyD":
        if (this.dBlocksMoved) {
          this.board.moveDBlocks();
          this.dBlocksMoved = false;
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
    subtitle: "Gettin' Yer Blocks Wet",
    start: [0, 10],
    floor: [[1, 10], [2, 10], [3, 10], [4, 10], [5, 10]],
    end: [6, 10],
    aBlocks: { 
      0: {
        pos: [4, 10],
        movement: [0, 1]
      }
    },
    dBlocks: {},
    shuttles: {}    
  },
  1: {
    title: "Stage 2",
    subtitle: "Up to the Bellybutton",
    start: [0, 10],
    floor: [[1, 10], [2, 10], [3, 10], [4, 10], [4, 12], [4, 13]],
    end: [4, 14],
    aBlocks: {},
    dBlocks: { 
      0: {
        pos: [4, 9],
        movement: [0, 1]
      }
    },
    shuttles: {}
  },
  2: {
    title: "Stage 3",
    subtitle: "Into the Deep End",
    start: [0, 10],
    floor: [[1, 10], [2, 10], [3, 10], [4, 10]],
    end: [10, 10],
    aBlocks: {},
    dBlocks: {},
    shuttles: { 
      0: {
        pos: [5, 10],
        movement: [4, 0]
      }
    }
  },  
  3: {
    title: "Stage 4",
    subtitle: "Putting It All Together",
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
    }
  }
}

Game.STEP_MILLIS = 15;

export default Game;