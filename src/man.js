import Coord from './coord';

class Man {
  constructor(board, color) {
    this.color = color;
    this.board = board;

    this.pos = board.startPos;
    this.dy = 1;
    this.dx = 1;
  }

  move() {
    if(!this.board.validPosition( this.pos.plus(new Coord(this.moveDelta(this.dx), 0))) ) {
        this.dx = -this.dx;
    }

    if(!this.board.validPosition( this.pos.plus(new Coord(0, this.moveDelta(this.dy)))) ) {
        this.dy = -this.dy;
    }
    
    this.pos = this.pos.plus(new Coord(this.dx, this.dy));
  }

  moveDelta(initialDelta) {
    if (initialDelta > 0) {
      return initialDelta + 4; 
    } else {
      return initialDelta - 5;
    }
  }
}

export default Man;