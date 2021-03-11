import Man from './man';
import Coord from './coord';
import { tilesMatch, absolutePosToMapPos } from './utils';

class Board {
  constructor(map) {
    this.map = map;
    this.startPos = new Coord((map.start[0] * 40) + 20, (map.start[1] * 40) + 20);

    this.wallsMoved = false;
    this.shuttlesMoved = false;
    this.bumpersMoved = false;

    this.men = [];
    this.men.push(new Man(this, "lime"));
  }

  getWalls() {
    return Object.values(this.map.walls);
  }

  getBumpers() {
    return Object.values(this.map.bumpers);
  }

  getShuttles() {
    return Object.values(this.map.shuttles);
  }

  hitWalls(tileCoord) {
    return this.getWalls().concat(this.getBumpers()).some(tile => {
      return tilesMatch(tile.pos, tileCoord);
    });
  }

  onFloor(tileCoord) {
    let floor = this.map.floor.some(tile => {
      return tilesMatch(tile, tileCoord);
    });

    if (floor) {
      return true;
    } else {
      return this.getShuttles().some(tile => {
        return tilesMatch(tile.pos, tileCoord);
      });
    }
  }

  validPosition(coord) {
    const tileCoord = absolutePosToMapPos(coord);

    if (tilesMatch(this.map.start, tileCoord) || tilesMatch(this.map.end, tileCoord)) {
      return true;
    } else if (this.hitWalls(tileCoord)) {
      return false;
    } else {
      return this.onFloor(tileCoord);
    }
  }

  atFinish(coord) {
    const tileCoord = absolutePosToMapPos(coord);

    if (tilesMatch(this.map.end, tileCoord)) {
      return true;
    } else {
      return false;
    }
  }

  removeMan(idx) {
    this.men.splice(idx, 1);
  }

  moveWalls() {
    if (this.wallsMoved) {
      this.getWalls().forEach(wall => this.pushBlock(wall, Board.DISENGAGE));
    } else {
      this.getWalls().forEach(wall => this.pushBlock(wall, Board.ENGAGE));
    }

    this.wallsMoved = !this.wallsMoved;
  }

  moveBumpers() {
    if (this.bumpersMoved) {
      this.getBumpers().forEach(bumper => this.pushBlock(bumper, Board.DISENGAGE));
    } else {
      this.getBumpers().forEach(bumper => this.pushBlock(bumper, Board.ENGAGE));
    }

    this.bumpersMoved = !this.bumpersMoved;
  }

  pushBlock(block, actionType) {
    block.pos[0] += block.movement[0] * actionType;
    block.pos[1] += block.movement[1] * actionType;

    this.men.filter(man => tilesMatch(man.tilePos, block.pos)).forEach(bumpedMan => {
      bumpedMan.pos = bumpedMan.pos.plus(
        new Coord(block.movement[0] * 80 * actionType, block.movement[1] * 80 * actionType)
      );

      if (bumpedMan.dx === 0 && block.movement[0] !== 0) {
        bumpedMan.dx = block.movement[0] > 0 ? Man.DEFAULT_SPEED : -Man.DEFAULT_SPEED;
      } else if (bumpedMan.dy === 0 && block.movement[1] !== 0) {
        bumpedMan.dy = block.movement[1] > 0 ? Man.DEFAULT_SPEED : -Man.DEFAULT_SPEED;
      } 
    });
  }

  moveShuttles() {
    if (this.shuttlesMoved) {
      this.getShuttles().forEach(shuttle => {
        this.men.filter(man => tilesMatch(man.tilePos, shuttle.pos)).forEach(shuttledMan => {
          shuttledMan.pos = shuttledMan.pos.plus(new Coord(-160, 0));
        })

        shuttle.pos[0] -= shuttle.movement[0];
        shuttle.pos[1] -= shuttle.movement[1];
      });
    } else {
      this.getShuttles().forEach(shuttle => {
        this.men.filter(man => tilesMatch(man.tilePos, shuttle.pos)).forEach(shuttledMan => {
          shuttledMan.pos = shuttledMan.pos.plus(new Coord(160, 0));
        })

        shuttle.pos[0] += shuttle.movement[0];
        shuttle.pos[1] += shuttle.movement[1];
      });
    }

    this.shuttlesMoved = !this.shuttlesMoved;
  }
}

Board.ENGAGE = 1;
Board.DISENGAGE = -1;

export default Board;