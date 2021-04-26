import Board from './board';
import View from './view';
import { MAPS } from './maps';

class Game {
  constructor(ctx) {
    this.ctx = ctx;
    this.board = new Board(MAPS[0])
    this.view = new View(ctx, this.board);
    this.deadMen = [];

    this.stageIntervalId = null;
    this.playerIntervalId = null;
    this.mapIndex = 0;    

    $(window).on("keydown", this.handleKeyDownEvent.bind(this));
    $(window).on("keyup", this.handleKeyUpEvent.bind(this));
    $('body').on("touchstart", this.startLevel.bind(this));

    this.aBlocksMoved = false;
    this.dBlocksMoved = false;
    this.shuttlesMoved = false;    
    this.levelStarted = false;

    this.goalSound = new Audio("./audio/goal.wav");
    this.deadSound = new Audio("./audio/dead.wav");
    this.goalSound.volume = 0.5;
    this.deadSound.volume = 0.65;

    this.music = new Howl({
      src: ['./audio/music.mp3'],
      loop: true,
      volume: 0.25
    });
    this.musicStarted = false;

    this.timeRemaining = MAPS[0].timeLimit;
    this.tickRate = MAPS[0].tickRate;

    this.view.renderMapStartScreen();
  }

  loadNextMap(restart) {
    if (Object.values(MAPS).length > this.mapIndex + 1) {    
      this.aBlocksMoved = false;
      this.dBlocksMoved = false;
      this.shuttlesMoved = false;    
      this.levelStarted = false;

      this.board = new Board(MAPS[++this.mapIndex]);
      this.view = new View(this.ctx, this.board);
      this.timeRemaining = MAPS[this.mapIndex].timeLimit;
      this.tickRate = MAPS[this.mapIndex].tickRate;

      if (restart) this.startLevel();
      else this.view.renderMapStartScreen();
    } else {
      this.view.printWinScreen(this.goalSound);
    }
  }

  handleKeyDownEvent(event) {
    switch (event.code) {
      case "Enter":
        this.startLevel();        
        break;

      case "KeyR":
        if (this.levelStarted) {
          this.mapIndex -= 1;
          window.clearInterval(this.playerIntervalId);
          window.clearInterval(this.stageIntervalId);
          this.loadNextMap(true);
        }
        break;

      case "KeyA":
        if (!this.aBlocksMoved) {
          this.aBlocksMoved = true;
          this.board.moveABlocks();
        }        
        break;

      case "KeyS":
        if (!this.shuttlesMoved) {
          this.shuttlesMoved = true;
          this.board.moveShuttles();
        }        
        break;

      case "KeyD":
        if (!this.dBlocksMoved) {
          this.dBlocksMoved = true;
          this.board.moveDBlocks();
        }        
        break;

      case "KeyM":
        if (this.music.volume > 0) this.music.volume = 0;       
        else this.music.volume = 0.25;       
        break;

      default:
        break;
    }
  }

  handleKeyUpEvent(event) {
    switch (event.code) {
      case "KeyA":
        if (this.aBlocksMoved) {
          this.board.moveABlocks();
          this.aBlocksMoved = false;
        }        
        break;

      case "KeyS":
        if (this.shuttlesMoved) {
          this.board.moveShuttles();
          this.shuttlesMoved = false;
        }        
        break;
      
      case "KeyD":
        if (this.dBlocksMoved) {
          this.board.moveDBlocks();
          this.dBlocksMoved = false;
        }        
        break;

      default:
        break;
    }
  }

  startLevel() {
    if (!this.levelStarted) {
      if (!this.musicStarted) {
        this.music.play();
        this.musicStarted = true;
      } 

      this.levelStarted = true;
      this.stageIntervalId = window.setInterval(
        this.step.bind(this),
        this.tickRate
      );
      this.playerIntervalId = window.setInterval(
        this.board.loadPlayer.bind(this.board),
        5000
      );
    }
  }

  async step() {
    this.board.men.forEach((man, idx) => {
      man.move();

      if (man.reachedFinish) {
        this.board.removeMan(idx);
        this.board.addGoal();
        this.goalSound.play();
        this.view.renderGoalFlash();
      } else if (man.dead) {
        window.clearInterval(this.playerIntervalId);
        this.deadSound.cloneNode().play();

        this.deadMen.push(man);

        setTimeout(() => {
          this.deadMen.pop();
          this.playerIntervalId = window.setInterval(
            this.board.loadPlayer.bind(this.board),
            5000
          );
        }, 1000);

        this.board.removeMan(idx);
      }
    });

    if ((this.board.men.length === 0 || (this.timeRemaining === 0 && MAPS[this.mapIndex].timeLimit > 0)) && this.deadMen.length === 0) {
      window.clearInterval(this.playerIntervalId);
      window.clearInterval(this.stageIntervalId);

      if (this.board.goalCount === this.board.menQuota) {            
        await new Promise(r => setTimeout(r, 450));
      } else {
        this.mapIndex -= 1;
      }

      this.loadNextMap();
    } else {
      this.view.renderNextState();
      this.deadMen.forEach(man => this.view.drawBall(man.pos, "red"));

      if (MAPS[this.mapIndex].timeLimit > 0) {
        this.timeRemaining -= this.tickRate;
        this.view.printTime(this.timeRemaining);
      }
    }    
  }
}

export default Game;