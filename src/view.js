class View {
  constructor(ctx, board) {
    this.ctx = ctx;
    this.board = board;
  }

  renderMapStartScreen() {
    this.drawGameArea();

    this.ctx.font = "48px Roboto";
    this.ctx.textAlign = "center";
    this.ctx.fillStyle = "black";
    this.ctx.fillText(this.board.map.title, 500, 200);

    this.ctx.font = '30px Roboto';
    this.ctx.fillText(this.board.map.subtitle, 500, 250);

    this.ctx.font = '48px Roboto';
    this.ctx.fillText("SPACE to release ball", 500, 500);

    // this.renderMap();
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
    this.drawTile(this.board.map.start, "gainsboro");
    this.drawTile(this.board.map.end, "lime");
    this.board.map.floor.forEach(tile => this.drawTile(tile, "#787878"));
    this.board.map.walls.forEach(tile => this.drawTile(tile, "crimson", "A")); //orchid also works
    this.board.map.shuttles.forEach(tile => this.drawTile(tile, "dodgerblue", "S"));
    this.board.map.bumpers.forEach(tile => this.drawTile(tile, "#FFAF00", "D")); // FFC700 also works
  }

  drawGameArea() {
    this.ctx.fillStyle = "white";
    this.ctx.fillRect(0, 0, 1000, 800);
  }

  drawTile(tile, color, letter) {
    this.ctx.fillStyle = color; 
    this.ctx.fillRect(40 * tile[0], 40 * tile[1], 40, 40);

    if (letter) {
      this.ctx.fillStyle = "white";
      this.ctx.font = "bold 26px Roboto";
      this.ctx.textAlign = "center";
      this.ctx.textBaseline = "middle";
      this.ctx.fillText(letter, (40 * tile[0]) + 20, (40 * tile[1]) + 22);
    }
  }
}

View.MAN_RADIUS = 5;

export default View;