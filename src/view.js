class View {
  constructor(ctx, board) {
    this.ctx = ctx;
    this.board = board;
  }

  renderMap() {
    // Draw game area
    this.ctx.beginPath();

    this.ctx.rect(0, 0, 1000, 800);
    this.ctx.fillStyle = "#000000";
    this.ctx.fill();

    this.ctx.closePath();

    // Draw floor tiles
    this.drawTile(this.board.map.start, "#0000FF");
    this.drawTile(this.board.map.end, "#FFFF00");
    this.board.map.floor.forEach(tile => this.drawTile(tile, "#FF00FF"));
  }

  drawTile(tile, color) {
    this.ctx.beginPath();

    this.ctx.rect(40 * tile[0], 40 * tile[1], 40, 40);
    this.ctx.fillStyle = color;         
    this.ctx.fill();

    this.ctx.closePath();
  }

  renderNextState() {
    this.renderMap();

    this.board.men.forEach(man => {
      this.ctx.beginPath();

      this.ctx.arc(man.pos.i, man.pos.j, View.MAN_RADIUS, 0, Math.PI * 2);
      this.ctx.fillStyle = man.color;
      this.ctx.fill();

      this.ctx.closePath();
    });
  }
}

View.MAN_RADIUS = 5;

export default View;