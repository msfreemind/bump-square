import Board from './board';
import View from './view';

class Game {
  constructor(ctx) {
    this.board = new Board(Game.MAPS[0])
    this.view = new View(ctx, this.board);
    this.intervalId = null;
    this.mapIndex = 0;

    $(window).on("keydown", this.handleKeyEvent.bind(this));
    this.view.renderMapStartScreen();
  }

  loadNextMap() {
    this.board = new Board(Game.MAPS[++this.mapIndex]);
    this.view.board = this.board;
    this.view.renderMapStartScreen();  
  }

  handleKeyEvent(event) {
    switch (event.code) {
      case "Enter":
        this.intervalId = window.setInterval(
          this.step.bind(this),
          Game.STEP_MILLIS
        );
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
    floor: [[1, 10], [2, 10], [3, 10], [4, 10]],
    end: [5, 10]
  },
  1: {
    start: [0, 9],
    floor: [[1, 10], [2, 10], [3, 10], [4, 10]],
    end: [5, 11]
  }
}

Game.STEP_MILLIS = 40;

export default Game;