class View {
  constructor(ctx, board) {
    this.ctx = ctx;
    this.board = board;
    this.origMap = JSON.parse(JSON.stringify(this.board.map));
  }

  renderMapStartScreen() {
    this.drawGameArea();

    this.ctx.font = "700 48px Roboto";
    this.ctx.textAlign = "center";
    this.ctx.textBaseline = "alphabetic";
    this.ctx.fillStyle = "black";
    this.ctx.fillText(this.board.map.title, 500, 300);

    this.ctx.beginPath();
    this.ctx.moveTo(275, 320);
    this.ctx.lineTo(725, 320);
    this.ctx.lineWidth = 2;
    this.ctx.strokeStyle = "black";
    this.ctx.stroke();

    this.ctx.font = '400 26px Roboto';
    this.ctx.fillText(this.board.map.subtitle, 500, 355);

    this.ctx.font = '700 30px Roboto';
    this.ctx.fillStyle = "crimson";
    this.ctx.fillText("Hit Enter", 500, 665);

    this.ctx.globalAlpha = 0.4;
    this.renderMap(false);
    this.ctx.globalAlpha = 1.0;
  }

  renderNextState() {
    this.renderMap(true);

    this.board.men.forEach(man => {
      this.ctx.beginPath();

      this.ctx.arc(man.pos.i, man.pos.j, View.MAN_RADIUS, 0, Math.PI * 2);
      this.ctx.fillStyle = man.color;
      this.ctx.fill();

      this.ctx.closePath();
    });
  }

  renderMap(drawGameArea) {
    // Draw game area
    if (drawGameArea) {
      this.drawGameArea();
    }    

    // Draw floor tiles
    this.drawTile(this.board.map.start, "gainsboro");
    this.drawTile(this.board.map.end, "lime");
    this.board.map.floor.forEach(tile => this.drawTile(tile, "#787878"));

    // Draw guides
    this.drawShuttleLines();
    this.drawBlockSlots();

    // Draw controllable blocks
    this.board.getABlocks().forEach(aBlock => this.drawTile(aBlock.pos, "crimson", "A")); //orchid also works
    this.board.getShuttles().forEach(shuttle => this.drawTile(shuttle.pos, "dodgerblue", "S"));
    this.board.getDBlocks().forEach(dBlock => this.drawTile(dBlock.pos, "#FFAF00", "D")); // FFC700 also works
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

  drawBlockSlots() {
    Object.values(this.origMap.aBlocks).forEach(aBlock => {
      this.ctx.fillStyle = "crimson"; 
      this.ctx.fillRect((40 * aBlock.pos[0]) + 17, (40 * aBlock.pos[1]) + 17, 6, 6);
      this.ctx.fillRect((40 * aBlock.pos[0]) + 17, (40 * (aBlock.pos[1] + 1)) + 17, 6, 6);
    });

    Object.values(this.origMap.dBlocks).forEach(dBlock => {
      this.ctx.fillStyle = "#FFAF00"; 
      this.ctx.fillRect((40 * dBlock.pos[0]) + 17, (40 * dBlock.pos[1]) + 17, 6, 6);
      this.ctx.fillRect((40 * dBlock.pos[0]) + 17, (40 * (dBlock.pos[1] + 1)) + 17, 6, 6);
    });
  }

  drawShuttleLines() {
    const currGlobalAlpha = this.ctx.globalAlpha;

    Object.values(this.origMap.shuttles).forEach(shuttle => {
      this.ctx.globalAlpha = 0.2;
      this.ctx.fillStyle = "dodgerblue"; 

      for (let i = 0; i <= 4; i++) {
        this.ctx.fillRect(40 * (shuttle.pos[0] + i), 40 * shuttle.pos[1], 40, 40);
      }
    });

    this.ctx.globalAlpha = currGlobalAlpha;
  }

  async renderGoalFlash() {
    for (let i = 0; i < 3; i++) {
      this.drawTile(this.board.map.end, "magenta");
      await new Promise(r => setTimeout(r, 60));
      this.drawTile(this.board.map.end, "black");
      await new Promise(r => setTimeout(r, 60));
    }
  }
}

View.MAN_RADIUS = 5;

export default View;