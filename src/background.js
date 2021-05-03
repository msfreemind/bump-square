class Background {
  constructor(view) {
    this.canvas = document.getElementById("myCanvas");
    this.view = view;
    this.ctx = this.view.ctx; 

    this.tickRate = this.view.origMap.tickRate;
    this.bgType = this.view.origMap.bgType;
    this.multicolor = this.view.origMap.multicolor;
    this.numBalls = this.view.origMap.numBalls;
    this.startTime = null;

    this.beatCount = 0;
    this.colorCount = 0;

    this.bgIntervalId = null;

    this.colors = ["crimson", "orange", "yellow", "lime", "cyan", "orchid"];
    this.ballColor = this.view.origMap.startColor;

    this.bgColorValue = 0;
    this.bgColor = null;

    this.blockColorValues = { a: 120, d: 240, s: 360 };
    this.aColor = null;
    this.dColor = null;
    this.sColor = null;

    this.rainDrops = [];

    this.BG_FNCS = {
      0: { draw: this.drawRain, stateChange: this.loadRainDrops, stateFreq: 2 },
      1: { draw: this.drawSquiggly, stateChange: this.loadSquiggly, stateFreq: 2 },
      2: { draw: this.drawRatchet, stateChange: this.loadSidewaysBalls, stateFreq: 2 },
      3: { draw: this.drawStars, stateChange: this.loadSidewaysBalls, stateFreq: 2 },
      4: { draw: this.drawSideToSide, stateChange: this.loadSidewaysBalls, stateFreq: 2 },
      5: { draw: this.drawBackgroundFade, stateChange: () => {}, stateFreq: 0 },
      6: { draw: this.drawBlockColorSwap, stateChange: () => {}, stateFreq: 0 }
    };
  }

  start() {
    window.requestAnimationFrame(this.stateChange.bind(this));
  }
  
  stop() {
    window.clearInterval(this.bgIntervalId);
  }

  draw() {
    this.BG_FNCS[this.bgType].draw.call(this);
  }

  stateChange(timestamp) {
    if (!this.startTime) this.startTime = timestamp;

    if (timestamp - this.startTime >= 150.02125) {
      this.startTime = timestamp;

      const bgFnc = this.BG_FNCS[this.bgType];

      if (this.beatCount % 2 === 0 && this.multicolor) {
        this.ballColor = this.colors[this.colorCount];

        if (this.colorCount >= 5) this.colorCount = 0;
        else this.colorCount++;
      }

      if ((this.beatCount % bgFnc.stateFreq) === 0 || this.beatCount === 0) bgFnc.stateChange.call(this);

      if (this.beatCount >= 15) this.beatCount = 0;
      else this.beatCount++;
    }    

    window.requestAnimationFrame(this.stateChange.bind(this));
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
    if (this.rainDrops.length >= this.numBalls) this.rainDrops.shift();

    while (this.rainDrops.length < this.numBalls) {
      let ball = { j: this.getRandomIntInclusive(this.canvas.height * 0.3, this.canvas.height * 0.7) };

      if (this.coinTossSign() > 0) ball.i = this.getRandomIntInclusive(this.canvas.width * 0.25, this.canvas.width * 0.35);
      else ball.i = this.getRandomIntInclusive(this.canvas.width * 0.65, this.canvas.width * 0.75);
      
      ball.beat = this.getRandomIntInclusive(0, 1);
      ball.swapped = false;
      ball.vector = [0.5, this.getRandomIntInclusive(2, 4)];

      if (ball.i > (this.canvas.width / 2)) ball.vector[0] *= -1;
      if (ball.j > (this.canvas.height / 2)) ball.vector[1] *= -1;

      this.rainDrops.push(ball);
    }
  }

  drawSquiggly() {
    this.rainDrops.forEach(drop => {
      this.view.drawBall(drop, this.ballColor, 20, true);
      
      drop.i += drop.vector[0] + (1.25 * Math.random() * this.coinTossSign());
      drop.j += drop.vector[1] + (1.25 * Math.random() * this.coinTossSign());
      
      if (this.beatCount % 2 === drop.beat) {
        if (!drop.swapped) {
          drop.swapped = true;
          if (drop.vector[1] <= 0) drop.vector[1] = this.getRandomIntInclusive(2, 4);
          else drop.vector[1] = -1 * this.getRandomIntInclusive(2, 4);
        }        
      } else {
        drop.swapped = false;
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
    if (this.rainDrops.length >= this.numBalls) this.rainDrops.shift();

    while (this.rainDrops.length < this.numBalls) {
      let ball = { 
        iStart: this.getRandomIntInclusive(this.canvas.width * 0.2, this.canvas.width * 0.8), 
        jStart: this.getRandomIntInclusive(this.canvas.height * 0.2, this.canvas.height * 0.8),
        ratchetCount: 0,
        size: 20
      };

      ball.i = ball.iStart;
      ball.j = ball.jStart;

      this.rainDrops.push(ball);
    }    
  }

  drawRatchet() {
    this.rainDrops.forEach(drop => {
      this.view.drawBall(drop, this.ballColor, 20, true);
      
      if (this.beatCount % 4 === 0) {
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
      this.view.drawBall(drop, this.ballColor, 20, true);
      
      if (this.beatCount % 4 === 0) drop.i = drop.iStart + 50;
      else if (this.beatCount % 4 === 2) drop.i = drop.iStart - 50;
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
      
      if (this.beatCount >= 8) drop.size += 0.1;
      else drop.size -= 0.1;
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