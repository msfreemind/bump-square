import Coord from './coord';
import { absolutePosToMapPos } from './utils';

class Man {
  constructor(board, color) {
    this.color = color;
    this.reachedFinish = false;
    this.bumpedWall = false;

    this.board = board;
    this.pos = board.startPos;
    this.tilePos = absolutePosToMapPos(this.pos);
    
    this.dx = Man.DEFAULT_SPEED;
    this.dy = 0;
  }

  async move() {
    if (this.dx !== 0) {
      if ( !this.board.validPosition( this.pos.plus(new Coord(this.moveDelta(this.dx), 0)), true) ) {
        this.dx = -this.dx;
        this.bumpedWall = true;
      } else {
        this.bumpedWall = false;
      }
    } else if (this.dy !== 0) {
      if ( !this.board.validPosition( this.pos.plus(new Coord(0, this.moveDelta(this.dy))), true) ) {
        this.dy = -this.dy;
        this.bumpedWall = true;
      } else {
        this.bumpedWall = false;
      }
    }   

    this.pos = this.pos.plus(new Coord(this.dx, this.dy));
    this.tilePos = absolutePosToMapPos(this.pos);

    if (this.board.atFinish(this.pos)) {
      await new Promise(r => setTimeout(r, 75));
      this.reachedFinish = true;
    } else if (this.bumpedWall) {
      await new Promise(r => setTimeout(r, 75));
      this.reorient();
    }
  }

  moveDelta(initialDelta) {
    if (initialDelta > 0) {
      return initialDelta + 2; 
    } else {
      return initialDelta - 3;
    }
  }

  async reorient() {
    if (this.dx !== 0) {
      if (this.board.validPosition([this.tilePos[0], this.tilePos[1] + this.dx], false)) {
        const oldDx = this.dx;
        this.dx = 0;

        await new Promise(r => setTimeout(r, 75));

        this.dy = oldDx;
      } else if (this.board.validPosition([this.tilePos[0], this.tilePos[1] - this.dx], false)) {
        const oldDx = this.dx;
        this.dx = 0;

        await new Promise(r => setTimeout(r, 75));

        this.dy = -oldDx;
      }
    } else {
      if (this.board.validPosition([this.tilePos[0] + this.dy, this.tilePos[1]], false)) {
        const oldDy = this.dy;
        this.dy = 0;

        await new Promise(r => setTimeout(r, 75));

        this.dx = oldDy;
      } else if (this.board.validPosition([this.tilePos[0] - this.dy, this.tilePos[1]], false)) {
        const oldDy = this.dy;
        this.dy = 0;

        await new Promise(r => setTimeout(r, 75));

        this.dx = -oldDy;
      }
    }
  }
}

Man.DEFAULT_SPEED = 1;

export default Man;