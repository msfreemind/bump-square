import Background from './background';

class View {
  constructor(ctx, board) {
    this.canvas = document.getElementById("myCanvas");
    this.ctx = ctx;
    this.board = board;
    this.origMap = JSON.parse(JSON.stringify(this.board.map)); // Make a deep copy of map object
    this.background = new Background(this);
    
    this.deathSquareImg = new Image();
    this.deathSquareImg.src = "./death-square.svg";

    this.loop = this.loop.bind(this);
  }

  widthConvert(width) {
    if (this.canvas.width > 1000) return width + 440;
    else return width;
  }

  async renderMapStartScreen() {
    this.drawGameArea();

    // Render map preview
    this.ctx.globalAlpha = 0.15;
    this.renderMap(false);
    this.ctx.globalAlpha = 1.0;

    if (!fontsLoaded) await new Promise(r => setTimeout(r, 250));

    // Draw stage info
    this.ctx.font = "700 48px Roboto";
    this.ctx.textAlign = "center";
    this.ctx.textBaseline = "alphabetic";
    this.ctx.fillStyle = "black";
    this.ctx.fillText(this.board.map.title, this.widthConvert(500), 300);

    this.ctx.beginPath();
    this.ctx.moveTo((this.canvas.width / 2) - 225, 320);
    this.ctx.lineTo((this.canvas.width / 2) + 225, 320);
    this.ctx.lineWidth = 2;
    this.ctx.strokeStyle = "black";
    this.ctx.stroke();

    this.ctx.font = '400 26px Roboto';
    this.ctx.fillText(this.board.map.subtitle, this.widthConvert(500), 355);

    this.ctx.font = '700 30px Roboto';
    this.ctx.fillStyle = "crimson";
    this.ctx.fillText("Touch or Hit Enter", this.widthConvert(500), 665);
  }

  renderNextState() {
    this.renderMap(true);
    this.board.men.forEach(man => this.drawBall(man.pos, man.color));
  }

  drawBall(pos, color, radius, skipAdjustment) {
    this.ctx.beginPath();

    if (this.canvas.width > 1000 && !skipAdjustment) this.ctx.arc(pos.i + 440, pos.j, radius || View.MAN_RADIUS, 0, Math.PI * 2);
    else this.ctx.arc(pos.i, pos.j, radius || View.MAN_RADIUS, 0, Math.PI * 2);
    this.ctx.fillStyle = color;
    this.ctx.fill();

    this.ctx.closePath();
  }

  renderMap(drawGameArea) {
    // Draw game area
    if (drawGameArea) {
      this.drawGameArea(); 
    }

    this.background.draw();

    // Draw floor tiles
    this.drawTile(this.board.map.start, "gainsboro");
    this.drawTile(this.board.map.end, "lime");
    this.board.map.floor.forEach(tile => this.drawTile(tile, "#787878"));

    // Draw guides
    this.drawShuttleLines();
    this.drawBlockSlots();

    // Draw death squares
    this.board.getDeathSquares().forEach(deathSquare => this.drawDeathSquare(deathSquare, "black"));

    // Draw controllable blocks
    this.board.getABlocks().forEach(aBlock => this.drawTile(aBlock.pos, this.background.aColor || "crimson", "A")); //orchid also works
    this.board.getShuttles().forEach(shuttle => this.drawTile(shuttle.pos, this.background.sColor || "dodgerblue", "S"));
    this.board.getDBlocks().forEach(dBlock => this.drawTile(dBlock.pos, this.background.dColor || "#FFAF00", "D")); // FFC700 also works
  }

  drawGameArea() {
    this.ctx.fillStyle = this.background.bgColor || "white";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  printTime(time) {
    const { timerPos } = this.origMap;

    this.ctx.font = '700 26px Roboto';
    this.ctx.fillStyle = "red";
    this.ctx.fillText("Timer: " + Math.floor(time/1000), this.widthConvert(timerPos[0]), timerPos[1]);
  }

  drawTile(tile, color, letter) {
    this.ctx.fillStyle = color;
    
    if (this.canvas.width > 1000) this.ctx.fillRect(40 * (tile[0] + 11), 40 * tile[1], 40, 40);
    else this.ctx.fillRect(40 * tile[0], 40 * tile[1], 40, 40);

    if (letter) {
      this.ctx.fillStyle = "white";
      this.ctx.font = "bold 26px Roboto";
      this.ctx.textAlign = "center";
      this.ctx.textBaseline = "middle";
      if (this.canvas.width > 1000) this.ctx.fillText(letter, (40 * (tile[0] + 11)) + 20, (40 * tile[1]) + 22);
      else this.ctx.fillText(letter, (40 * tile[0]) + 20, (40 * tile[1]) + 22);
    }
  }

  drawBlockSlots() {
    Object.values(this.origMap.aBlocks).forEach(aBlock => {
      this.ctx.fillStyle = "crimson";
      if (this.canvas.width > 1000) {
        this.ctx.fillRect((40 * (aBlock.pos[0] + 11)) + 17, (40 * aBlock.pos[1]) + 17, 6, 6);
        this.ctx.fillRect((40 * (aBlock.pos[0] + aBlock.movement[0] + 11)) + 17, (40 * (aBlock.pos[1] + aBlock.movement[1])) + 17, 6, 6);
      } else {
        this.ctx.fillRect((40 * aBlock.pos[0]) + 17, (40 * aBlock.pos[1]) + 17, 6, 6);
        this.ctx.fillRect((40 * (aBlock.pos[0] + aBlock.movement[0])) + 17, (40 * (aBlock.pos[1] + aBlock.movement[1])) + 17, 6, 6);
      }    
    });

    Object.values(this.origMap.dBlocks).forEach(dBlock => {
      this.ctx.fillStyle = "#FFAF00";
      if (this.canvas.width > 1000) {
        this.ctx.fillRect((40 *  (dBlock.pos[0] + 11)) + 17, (40 * dBlock.pos[1]) + 17, 6, 6);
        this.ctx.fillRect((40 * (dBlock.pos[0] + dBlock.movement[0] + 11)) + 17, (40 * (dBlock.pos[1] + dBlock.movement[1])) + 17, 6, 6);
      } else {
        this.ctx.fillRect((40 * dBlock.pos[0]) + 17, (40 * dBlock.pos[1]) + 17, 6, 6);
        this.ctx.fillRect((40 * (dBlock.pos[0] + dBlock.movement[0])) + 17, (40 * (dBlock.pos[1] + dBlock.movement[1])) + 17, 6, 6);
      }  
    });
  }

  drawShuttleLines() {
    const currGlobalAlpha = this.ctx.globalAlpha;

    Object.values(this.origMap.shuttles).forEach(shuttle => {
      this.ctx.globalAlpha = 0.2;

      if (shuttle.movement[0] !== 0) { // If the movement is along the x-axis
        const dirVal = shuttle.movement[0] > 0 ? 1 : -1;

        for (let i = 0; i <= Math.abs(shuttle.movement[0]); i++) {
          this.drawTile([shuttle.pos[0] + (i * dirVal), shuttle.pos[1]], "dodgerblue")
        }
      } else { // Else: the movement is along the y-axis
        const dirVal = shuttle.movement[1] > 0 ? 1 : -1;

        for (let i = 0; i <= Math.abs(shuttle.movement[1]); i++) {
          this.drawTile([shuttle.pos[0], shuttle.pos[1] + (i * dirVal)], "dodgerblue")
        }
      }      
    });

    this.ctx.globalAlpha = currGlobalAlpha;
  }

  drawDeathSquare(deathSquare) {
    if (this.canvas.width > 1000) this.ctx.drawImage(this.deathSquareImg, 40 * (deathSquare[0] + 11), 40 * deathSquare[1], 40, 40);
    else this.ctx.drawImage(this.deathSquareImg, 40 * deathSquare[0], 40 * deathSquare[1], 40, 40);
  }

  async renderGoalFlash() {
    for (let i = 0; i < 3; i++) {
      this.drawTile(this.board.map.end, "magenta");
      await new Promise(r => setTimeout(r, 48));
      this.drawTile(this.board.map.end, "black");
      await new Promise(r => setTimeout(r, 48));
    }
  }

  async printWinScreen(goalSound) {
    await new Promise(r => setTimeout(r, 100));  
      
    goalSound.cloneNode().play();
    this.ctx.fillStyle = "magenta"; 
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    await new Promise(r => setTimeout(r, 400));
    goalSound.cloneNode().play();
    this.ctx.fillStyle = "black"; 
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    await new Promise(r => setTimeout(r, 400));
    goalSound.cloneNode().play();
    this.ctx.fillStyle = "magenta"; 
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    await new Promise(r => setTimeout(r, 400));

    this.loop();
  }

  printText(size, color, x, y) {
    this.ctx.font = `700 ${size}px Roboto`;
    this.ctx.textAlign = "center";
    this.ctx.textBaseline = "middle";
    this.ctx.fillStyle = color;
    this.ctx.fillText("You Win!!", x, y);
  }

  textYConversion(yPos) {
    return (this.canvas.height / 2) + yPos;
  }

  drawWinText() {
    this.printText(50, "magenta", this.widthConvert(500), this.textYConversion(-135));
    this.printText(50, "magenta", this.widthConvert(685), this.textYConversion(-240));
    this.printText(50, "magenta", this.widthConvert(870), this.textYConversion(-345));
    this.printText(50, "magenta", this.widthConvert(315), this.textYConversion(-240));
    this.printText(50, "magenta", this.widthConvert(130), this.textYConversion(-345));
    this.printText(50, "magenta", this.widthConvert(870), this.textYConversion(-135));
    this.printText(50, "magenta", this.widthConvert(130), this.textYConversion(-135));
    this.printText(50, "magenta", this.widthConvert(500), this.textYConversion(-345));

    this.printText(50, "magenta", this.widthConvert(500), this.textYConversion(130));
    this.printText(50, "magenta", this.widthConvert(685), this.textYConversion(235));
    this.printText(50, "magenta", this.widthConvert(870), this.textYConversion(340));
    this.printText(50, "magenta", this.widthConvert(315), this.textYConversion(235));
    this.printText(50, "magenta", this.widthConvert(130), this.textYConversion(340));
    this.printText(50, "magenta", this.widthConvert(130), this.textYConversion(130));
    this.printText(50, "magenta", this.widthConvert(870), this.textYConversion(130));
    this.printText(50, "magenta", this.widthConvert(500), this.textYConversion(340));

    this.ctx.globalAlpha = 1 - this.ctx.globalAlpha;

    this.drawBall({ i: 685, j: this.textYConversion(-140) }, "lime", 8);
    this.drawBall({ i: 315, j: this.textYConversion(-140) }, "lime", 8);
    this.drawBall({ i: 870, j: this.textYConversion(-245) }, "lime", 8);
    this.drawBall({ i: 500, j: this.textYConversion(-245) }, "lime", 8);
    this.drawBall({ i: 135, j: this.textYConversion(-245) }, "lime", 8);
    this.drawBall({ i: 315, j: this.textYConversion(-350) }, "lime", 8);
    this.drawBall({ i: 685, j: this.textYConversion(-350) }, "lime", 8);

    this.drawBall({ i: 685, j: this.textYConversion(125) }, "lime", 8);
    this.drawBall({ i: 315, j: this.textYConversion(125) }, "lime", 8);
    this.drawBall({ i: 870, j: this.textYConversion(230) }, "lime", 8);
    this.drawBall({ i: 500, j: this.textYConversion(230) }, "lime", 8);
    this.drawBall({ i: 135, j: this.textYConversion(230) }, "lime", 8);
    this.drawBall({ i: 315, j: this.textYConversion(335) }, "lime", 8);
    this.drawBall({ i: 685, j: this.textYConversion(335) }, "lime", 8);
  }

  loop() {
    let alpha = 0;   /// current alpha value
    let delta = 0.05; /// delta = speed

    setInterval(() => {
      alpha += delta;
      if (alpha <= 0 || alpha >= 1) delta = -delta;
      if (alpha < 0) alpha = 0;

      this.ctx.fillStyle = "black"; 
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
      this.printText(150, "white", this.canvas.width / 2, this.canvas.height / 2);

      this.ctx.globalAlpha = alpha;
      this.drawWinText();
      this.ctx.globalAlpha = 1.0;
    }, 90);
  }
}

View.MAN_RADIUS = 5;

export default View;