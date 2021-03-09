import Board from './board';

class View {
  constructor(ctx) {
    this.ctx = ctx;

    this.board = new Board(View.MAPS[0]);
    this.renderMap();

    this.intervalId = window.setInterval(
      this.step.bind(this),
      View.STEP_MILLIS
    );
  }

  renderMap() {
    // Draw game area
    this.ctx.beginPath();

    this.ctx.rect(0, 0, 1000, 800);
    this.ctx.fillStyle = "#000000";
    this.ctx.fill();

    this.ctx.closePath();

    // Draw floor tiles
    this.board.map.forEach(tile => {
      this.ctx.beginPath();

      this.ctx.rect(40 * tile[0], 40 * tile[1], 40, 40);
      this.ctx.fillStyle = "#FF00FF";
      this.ctx.fill();

      this.ctx.closePath();
    })
  }

  renderNext() {
    this.renderMap();

    this.board.men.forEach(man => {
      this.ctx.beginPath();

      this.ctx.arc(
        man.pos.i, 
        man.pos.j, 
        View.MAN_RADIUS, 
        0, 
        Math.PI*2
      );
      this.ctx.fillStyle = man.color;
      this.ctx.fill();

      this.ctx.closePath();
    });
  }

  step() {
    this.board.men.forEach(man => man.move());
    this.renderNext();
  }
}

View.MAPS = {
  0: [[0, 10], [1, 10], [2, 10], [3, 10], [4, 10], [5, 10]]
}

View.MAN_RADIUS = 5;

View.STEP_MILLIS = 100;

export default View;