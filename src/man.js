import Coord from './coord';

class Man {
  constructor(board, color) {
    this.color = color;
    this.reachedFinish = false;

    this.board = board;
    this.pos = board.startPos;   
    
    this.dy = 2;
    this.dx = 2;
  }

  move() {
    if(!this.board.validPosition( this.pos.plus(new Coord(this.moveDelta(this.dx), 0))) ) {
        this.dx = -this.dx;
    }

    if(!this.board.validPosition( this.pos.plus(new Coord(0, this.moveDelta(this.dy)))) ) {
        this.dy = -this.dy;
    }
    
    this.pos = this.pos.plus(new Coord(this.dx, this.dy));
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

export default Man;