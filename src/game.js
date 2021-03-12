import Board from './board';
import View from './view';
import { MAPS } from './maps';

class Game {
  constructor(ctx) {
    this.ctx = ctx;
    this.board = new Board(MAPS[0])
    this.view = new View(ctx, this.board);

    this.intervalId = null;
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
          this.intervalId = window.setInterval(
            this.step.bind(this),
            Game.STEP_MILLIS
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
        this.view.renderGoalFlash();
      }
    });

    if (this.board.men.length === 0) {
      window.clearInterval(this.intervalId);      
      await new Promise(r => setTimeout(r, 610));
      this.loadNextMap();
    } else {
      this.view.renderNextState();
    }    
  }
}

Game.STEP_MILLIS = 5;

export default Game;