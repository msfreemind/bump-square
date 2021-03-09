import Board from './board';
import View from './view';

class Game {
  constructor(ctx) {
    this.board = new Board(Game.MAPS[0])
    this.view = new View(ctx, this.board);

    this.intervalId = window.setInterval(
      this.step.bind(this),
      Game.STEP_MILLIS
    );
  }

  step() {
    this.board.men.forEach(man => man.move());
    this.view.renderNextState();
  }
}

Game.MAPS = {
  0: { 
    start: [0, 10],
    floor: [[1, 10], [2, 10], [3, 10], [4, 10]],
    end: [5, 10]
  }
}

Game.STEP_MILLIS = 80;

export default Game;