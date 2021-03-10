import Board from './board';
import View from './view';

class Game {
  constructor(ctx) {
    this.board = new Board(Game.MAPS[0])
    this.view = new View(ctx, this.board);
    this.intervalId = null;
    this.mapIndex = 0;
    this.levelStarted = false;

    $(window).on("keydown", this.handleKeyDownEvent.bind(this));
    $(window).on("keyup", this.handleKeyUpEvent.bind(this));
    this.wallsMoved = false;
    this.shuttlesMoved = false;
    this.bumpersMoved = false;

    this.view.renderMapStartScreen();
  }

  loadNextMap() {
    this.wallsMoved = false;
    this.shuttlesMoved = false;
    this.bumpersMoved = false;
    this.levelStarted = false;

    this.board = new Board(Game.MAPS[++this.mapIndex]);
    this.view.board = this.board;
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
    start: [0, 10],
    floor: [[1, 10], [2, 10], [3, 10], [4, 10], [5, 10]],
    end: [6, 10],
    walls: [[4, 10]],
    shuttles: [],
    bumpers: []
  },
  1: {
    start: [0, 10],
    floor: [[1, 10], [2, 10], [3, 10], [4, 10]],
    end: [10, 10],
    walls: [],
    shuttles: [[5, 10]],
    bumpers: []
  },
  2: {
    start: [0, 10],
    floor: [[1, 10], [2, 10], [3, 10], [4, 10], [4, 12], [4, 13]],
    end: [4, 14],
    walls: [],
    shuttles: [],
    bumpers: [[4, 9]]
  },
  3: {
    start: [0, 10],
    floor: [[1, 10], [2, 10], [3, 10], [4, 10], [4, 12], [4, 13], [9, 14], [10, 14], [11, 14], [12, 14]],
    end: [13, 14],
    walls: [[11, 14]],
    shuttles: [[4, 14]],
    bumpers: [[4, 9]]
  }
}

Game.STEP_MILLIS = 15;

export default Game;