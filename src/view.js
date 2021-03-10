class View {
  constructor(ctx, board) {
    this.ctx = ctx;
    this.board = board;
  }

  renderMapStartScreen() {
    this.drawGameArea();

    this.ctx.font = '48px sans-serif';
    this.ctx.textAlign = "center";
    this.ctx.fillStyle = "#00FFFF";
    this.ctx.fillText(this.board.map.title, 500, 200);

    this.ctx.font = '30px sans-serif';
    this.ctx.fillText(this.board.map.subtitle, 500, 250);

    this.ctx.font = '48px sans-serif';
    this.ctx.fillText("Hit Enter", 500, 500);
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

  renderMap() {
    // Draw game area
    this.drawGameArea();

    // Draw floor tiles
    this.drawTile(this.board.map.start, "#0000FF");
    this.drawTile(this.board.map.end, "#FFFF00");
    this.board.map.floor.forEach(tile => this.drawTile(tile, "#FF00FF"));
    this.board.map.walls.forEach(tile => this.drawTile(tile, "#FFFFFF", "A"));
    this.board.map.shuttles.forEach(tile => this.drawTile(tile, "#FF0000", "S"));
    this.board.map.bumpers.forEach(tile => this.drawTile(tile, "#00FF00", "D"));
  }

  drawGameArea() {
    this.ctx.beginPath();

    this.ctx.rect(0, 0, 1000, 800);
    this.ctx.fillStyle = "#000000";
    this.ctx.fill();

    this.ctx.closePath();
  }

  drawTile(tile, color, letter) {
    this.ctx.beginPath();

    this.ctx.rect(40 * tile[0], 40 * tile[1], 40, 40);
    this.ctx.fillStyle = color;         
    this.ctx.fill();

    if (letter) {
      this.ctx.fillStyle = "#000000";
      this.ctx.font = "bold 24px sans-serif";
      this.ctx.textBaseline = "middle";
      this.ctx.fillText(letter, (40 * tile[0]) + 20, (40 * tile[1]) + 21);
    }

    this.ctx.closePath();
  }
}

View.MAN_RADIUS = 5;

export default View;