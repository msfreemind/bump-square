import Coord from './coord';
import { absolutePosToMapPos } from './utils';

class Man {
  constructor(board, color) {
    this.color = color;
    this.reachedFinish = false;
    this.onShuttle = false;

    this.board = board;
    this.pos = board.startPos;
    this.tilePos = absolutePosToMapPos(this.pos);
    
    this.dy = 0;
    this.dx = Man.DEFAULT_SPEED;
  }

  move() {
    if(!this.board.validPosition( this.pos.plus(new Coord(this.moveDelta(this.dx), 0))) ) {
        this.dx = -this.dx;
    }

    if(!this.board.validPosition( this.pos.plus(new Coord(0, this.moveDelta(this.dy)))) ) {
        this.dy = -this.dy;
    }
    
    this.pos = this.pos.plus(new Coord(this.dx, this.dy));
    this.tilePos = absolutePosToMapPos(this.pos);

    this.reachedFinish = this.board.atFinish(this.pos);
  }

  moveDelta(initialDelta) {
    if (initialDelta > 0) {
      return initialDelta + 4; 
    } else {
      return initialDelta - 3;
    }
  }
}

Man.DEFAULT_SPEED = 2;

export default Man;