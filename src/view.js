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
    this.ctx.fillText("Map #1", 500, 200);

    this.ctx.font = '30px sans-serif';
    this.ctx.fillText("Getting Your Blocks Wet", 500, 250);

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
    this.board.map.walls.forEach(tile => this.drawTile(tile, "#FFFFFF"));
    this.board.map.shuttles.forEach(tile => this.drawTile(tile, "#FF0000"));
    this.board.map.bumpers.forEach(tile => this.drawTile(tile, "#00FF00"));
  }

  drawGameArea() {
    this.ctx.beginPath();

    this.ctx.rect(0, 0, 1000, 800);
    this.ctx.fillStyle = "#000000";
    this.ctx.fill();

    this.ctx.closePath();
  }

  drawTile(tile, color) {
    this.ctx.beginPath();

    this.ctx.rect(40 * tile[0], 40 * tile[1], 40, 40);
    this.ctx.fillStyle = color;         
    this.ctx.fill();

    this.ctx.closePath();
  }
}

View.MAN_RADIUS = 5;

export default View;