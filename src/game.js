import Board from './board';
import View from './view';

class Game {
  constructor(ctx) {
    this.board = new Board(Game.MAPS[0])
    this.view = new View(ctx, this.board);
    this.intervalId = null;
    this.mapIndex = 0;

    $(window).on("keydown", this.handleKeyDownEvent.bind(this));
    $(window).on("keyup", this.handleKeyUpEvent.bind(this));
    this.wallsMoved = false;

    this.view.renderMapStartScreen();
  }

  loadNextMap() {
    this.board = new Board(Game.MAPS[++this.mapIndex]);
    this.view.board = this.board;
    this.view.renderMapStartScreen();  
  }

  handleKeyDownEvent(event) {
    switch (event.code) {
      case "Enter":
        this.intervalId = window.setInterval(
          this.step.bind(this),
          Game.STEP_MILLIS
        );
        break;

      case "KeyA":
        if (!this.wallsMoved) {
          this.wallsMoved = true;
          this.board.moveWalls();
        }        
        break;

      default:
        break;
    }
  }

  handleKeyUpEvent(event) {
    switch (event.code) {
      case "KeyA":
        this.board.moveWalls();
        this.wallsMoved = false;
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
    walls: [[4, 10]]
  },
  1: {
    start: [0, 9],
    floor: [[1, 10], [2, 10], [3, 10], [4, 10]],
    end: [5, 11]
  }
}

Game.STEP_MILLIS = 15;

export default Game;