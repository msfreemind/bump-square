import Coord from './coord';
import { absolutePosToMapPos } from './utils';

class Man {
  constructor(board, color) {
    this.color = color;
    this.reachedFinish = false;
    this.dead = false;
    this.levelTickRate = board.map.tickRate;

    this.board = board;
    this.pos = board.startPos;
    this.tilePos = absolutePosToMapPos(this.pos);
    
    this.dx = Man.DEFAULT_SPEED;
    this.dy = 0;
  }

  async move() {
    if (this.dx !== 0) {
      if ( !this.board.validPosition( this.pos.plus(new Coord((20 * this.dx), 0)), true) ) {
        this.reorient();
      }
    } else {
      if ( !this.board.validPosition( this.pos.plus(new Coord(0, (20 * this.dy))), true) ) {
        this.reorient();
      }
    }   

    this.pos = this.pos.plus(new Coord(this.dx, this.dy));
    this.tilePos = absolutePosToMapPos(this.pos);

    if (this.board.atFinish(this.tilePos)) {
      await new Promise(r => setTimeout(r, this.levelTickRate * 19));
      this.reachedFinish = true;
    } else if (this.board.onDeathSquare(this.tilePos)) {
      await new Promise(r => setTimeout(r, this.levelTickRate * 19));
      this.dead = true;
    }
  }

  moveDelta(initialDelta) {
    if (initialDelta > 0) {
      return initialDelta + 2; 
    } else {
      return initialDelta - 3;
    }
  }

  reorient() {
    if (this.dx !== 0) {
      if (this.board.validPosition([this.tilePos[0], this.tilePos[1] + this.dx], false)) {
        this.dy = this.dx;
        this.dx = 0;
      } else if (this.board.validPosition([this.tilePos[0], this.tilePos[1] - this.dx], false)) {
        this.dy = -this.dx;
        this.dx = 0;
      } else {
        this.dx = -this.dx;
      }
    } else {
      if (this.board.validPosition([this.tilePos[0] + this.dy, this.tilePos[1]], false)) {
        this.dx = this.dy;
        this.dy = 0;
      } else if (this.board.validPosition([this.tilePos[0] - this.dy, this.tilePos[1]], false)) {
        this.dx = -this.dy;
        this.dy = 0;
      } else {
        this.dy = -this.dy;
      }
    }
  }
}

Man.DEFAULT_SPEED = 1;

export default Man;