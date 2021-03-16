import Board from './board';
import View from './view';
import { MAPS } from './maps';

class Game {
  constructor(ctx) {
    this.ctx = ctx;
    this.board = new Board(MAPS[0])
    this.view = new View(ctx, this.board);

    this.stageIntervalId = null;
    this.playerIntervalId = null;
    this.mapIndex = 0;    

    $(window).on("keydown", this.handleKeyDownEvent.bind(this));
    $(window).on("keyup", this.handleKeyUpEvent.bind(this));
    this.aBlocksMoved = false;
    this.dBlocksMoved = false;
    this.shuttlesMoved = false;    
    this.levelStarted = false;

    this.view.renderMapStartScreen();
  }

  loadNextMap() {
    this.aBlocksMoved = false;
    this.dBlocksMoved = false;
    this.shuttlesMoved = false;    
    this.levelStarted = false;

    this.board = new Board(MAPS[++this.mapIndex]);
    this.view = new View(this.ctx, this.board);

    this.view.renderMapStartScreen();  
  }

  handleKeyDownEvent(event) {
    switch (event.code) {
      case "Enter":
        if (!this.levelStarted) {
          this.levelStarted = true;
          this.stageIntervalId = window.setInterval(
            this.step.bind(this),
            Game.STEP_MILLIS
          );
          this.playerIntervalId = window.setInterval(
            this.board.loadPlayer.bind(this.board),
            5000
          );
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

  async step() {
    this.board.men.forEach((man, idx) => {
      man.move();

      if (man.reachedFinish) {
        this.board.removeMan(idx);
        this.board.addGoal();
        this.view.renderGoalFlash();
      } else if (man.dead) {
        this.board.removeMan(idx);
      }
    });

    if (this.board.men.length === 0) {
      window.clearInterval(this.stageIntervalId);      
      await new Promise(r => setTimeout(r, 450));
      this.loadNextMap();
    } else {
      this.view.renderNextState();
    }    
  }
}

Game.STEP_MILLIS = 8;

export default Game;