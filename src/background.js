class Background {
  constructor(view) {
    this.canvas = document.getElementById("myCanvas");
    this.view = view;
    this.ctx = this.view.ctx; 

    this.tickRate = this.view.origMap.tickRate;
    this.bgType = this.view.origMap.bgType;

    this.beatCount = 0;
    this.colorCount = 0;

    this.bgIntervalId = null;

    this.colors = ["crimson", "orange", "blue", "lime", "cyan", "orchid"];
    this.ballColor = "lime";

    this.bgColorValue = 0;
    this.bgColor = null;

    this.blockColorValues = { a: 120, d: 240, s: 360 };
    this.aColor = null;
    this.dColor = null;
    this.sColor = null;

    this.rainDrops = [];

    this.BG_FNCS = {
      0: { draw: this.drawRain, stateChange: this.loadRainDrops, stateFreq: 2 },
      1: { draw: this.drawSquiggly, stateChange: this.loadSquiggly, stateFreq: 4 },
      2: { draw: this.drawRatchet, stateChange: this.loadSidewaysBalls, stateFreq: 4 },
      3: { draw: this.drawStars, stateChange: this.loadSidewaysBalls, stateFreq: 4 },
      4: { draw: this.drawSideToSide, stateChange: this.loadSidewaysBalls, stateFreq: 2 },
      5: { draw: this.drawBackgroundFade, stateChange: () => {}, stateFreq: 0 },
      6: { draw: this.drawBlockColorSwap, stateChange: () => {}, stateFreq: 0 }
    };
  }

  start() {
    this.bgIntervalId = window.setInterval(
      this.stateChange.bind(this),
      323
    );
  }
  
  stop() {
    window.clearInterval(this.bgIntervalId);
  }

  draw() {
    this.BG_FNCS[this.bgType].draw.call(this);
  }

  stateChange() {
    // this.ballColor = this.colors[this.colorCount];

    const bgFnc = this.BG_FNCS[this.bgType];

    if ((this.beatCount % bgFnc.stateFreq) === 0 || this.beatCount === 0) bgFnc.stateChange.call(this);

    if (this.beatCount >= 7) this.beatCount = 0;
    else this.beatCount++;

    if (this.colorCount >= 5) this.colorCount = 0;
    else this.colorCount++;
  }

  loadRainDrops() {
    let yPos = 0;
    let rainArray = []

    for (let xPos = this.canvas.width; xPos > 0; xPos -= 50) {
      rainArray.push({ i: xPos, j: yPos });
      yPos -= 50;
    }

    this.rainDrops.push(rainArray);
  }

  drawRain() {
    this.rainDrops.forEach((dropArr, idx1) => {
      dropArr.forEach((drop, idx2) => {
        this.view.drawBall(drop, this.ballColor, 5, true);
        if (drop.j > this.canvas.height) dropArr.splice(idx2, 1);
        
        if (this.tickRate === 4) drop.j += 2;
        else drop.j += 4;
      })

      if (dropArr.length === 0) this.rainDrops.splice(idx1, 1);
    });
  }

  loadSquiggly() {
    if (this.rainDrops.length >= 5) this.rainDrops.shift();

    while (this.rainDrops.length < 5) {
      let ball = { j: this.getRandomIntInclusive(this.canvas.height * 0.3, this.canvas.height * 0.7) };

      if (this.coinTossSign() > 0) ball.i = this.getRandomIntInclusive(this.canvas.width * 0.2, this.canvas.width * 0.35);
      else ball.i = this.getRandomIntInclusive(this.canvas.width * 0.65, this.canvas.width * 0.8);
      
      ball.beat = this.getRandomIntInclusive(4, 7);
      ball.vector = [0.44, 0.44 / (Math.random() + 0.5) ];

      if (ball.i > (this.canvas.width / 2)) ball.vector[0] *= -1;
      if (ball.j > (this.canvas.height / 2)) ball.vector[1] *= -1;

      this.rainDrops.push(ball);
    }
  }

  drawSquiggly() {
    this.rainDrops.forEach(drop => {
      this.view.drawBall(drop, this.ballColor, 5, true);
      
      drop.i += drop.vector[0];
      drop.j += drop.vector[1];
      
      if (this.beatCount === drop.beat || this.beatCount == (drop.beat - 4)) {
        drop.vector[1] = 1 * Math.random() * this.coinTossSign();
      } else {
        drop.i += drop.vector[0] * 0.75 * this.coinTossSign();
        drop.j += drop.vector[1] * 1 * this.coinTossSign();
      }

      drop.i = drop.i > 0 && drop.i < this.canvas.width ? drop.i : drop.i < 0 ? drop.i += this.canvas.width : drop.i -= this.canvas.width;
      drop.j = drop.j > 0 && drop.j < this.canvas.height ? drop.j : drop.j < 0 ? drop.j += this.canvas.height : drop.j -= this.canvas.height;
    });
  }

  drawBackgroundFade() {
    this.bgColorValue = this.incrementColor(this.bgColorValue);
    this.bgColor = `hsl(${this.bgColorValue}, 100%, 50%)`;
  }

  loadSidewaysBalls() {
    if (this.rainDrops.length >= 8) this.rainDrops.shift();

    while (this.rainDrops.length < 8) {
      let ball = { 
        iStart: this.getRandomIntInclusive(this.canvas.width * 0.2, this.canvas.width * 0.8), 
        jStart: this.getRandomIntInclusive(this.canvas.height * 0.2, this.canvas.height * 0.8),
        ratchetCount: 0,
        size: 5
      };
      ball.i = ball.iStart;
      ball.j = ball.jStart;
      this.rainDrops.push(ball);
    }    
  }

  drawRatchet() {
    this.rainDrops.forEach(drop => {
      this.view.drawBall(drop, this.ballColor, 5, true);

      console.log([drop.i, drop.j]);
      console.log([drop.iStart, drop.jStart]);
      console.log(drop.ratchetCount);
      
      if (this.beatCount % 2 === 0) {
        if (drop.i === drop.iStart) {
          drop.ratchetCount++;

          drop.i = (this.getRandomIntInclusive(25, 35) * this.coinTossSign()) + drop.iStart;
          drop.j = (this.getRandomIntInclusive(25, 35) * this.coinTossSign()) + drop.jStart;
        }        
      } else if (drop.ratchetCount >= 2) {
        drop.ratchetCount = 0;
        drop.iStart = drop.i;
        drop.jStart = drop.j;
      } else {
        drop.i = drop.iStart;
        drop.j = drop.jStart;
      }      
    });
  }

  drawSideToSide() {
    this.rainDrops.forEach(drop => {
      this.view.drawBall(drop, this.ballColor, 5, true);
      
      if (this.beatCount % 2 === 0) drop.i = drop.iStart + 50;
      else drop.i = drop.iStart - 50;
    });
  }

  drawBlockColorSwap() {
    this.blockColorValues.a = this.incrementColor(this.blockColorValues.a);
    this.blockColorValues.d = this.incrementColor(this.blockColorValues.d);
    this.blockColorValues.s = this.incrementColor(this.blockColorValues.s);
    
    this.aColor = `hsl(${this.blockColorValues.a}, 100%, 50%)`;
    this.dColor = `hsl(${this.blockColorValues.d}, 100%, 50%)`;
    this.sColor = `hsl(${this.blockColorValues.s}, 100%, 50%)`;
  }
  
  drawStars() {
    this.rainDrops.forEach(drop => {
      this.view.drawBall(drop, this.ballColor, drop.size, true);
      
      if (this.beatCount >= 4) drop.size += 0.025;
      else drop.size -= 0.025;
    });
  }

  incrementColor(colorVal) {
    if (colorVal < 360) return colorVal += 0.25;
    return 0;
  }

  getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
  }

  coinTossSign() {
    return Math.random() < 0.5 ? 1 : -1;
  }
}

export const RAIN = 0;
export const SQUIGGLE = 1;
export const RATCHET = 2;
export const STARS = 3;
export const SIDEWAYS = 4;
export const FADE = 5;
export const SQUARE_COLOR = 6;

export default Background;