import Man from './man';
import Coord from './coord';
import { tilesMatch, absolutePosToMapPos } from './utils';

class Board {
  constructor(map) {
    this.map = JSON.parse(JSON.stringify(map)); // Make a deep copy of map object
    this.startPos = new Coord((map.start[0] * 40) + 20, (map.start[1] * 40) + 20);

    this.aBlocksMoved = false;
    this.dBlocksMoved = false;
    this.shuttlesMoved = false;    

    this.men = [];
    this.menQuota = map.menQuota;
    this.goalCount = 0;
    this.loadPlayer();
  }

  loadPlayer() {
    if (this.men.length < (this.menQuota - this.goalCount)) {
      this.men.push(new Man(this, "lime"));
    }    
  }

  addGoal() {
    this.goalCount++;
  }

  getABlocks() {
    return Object.values(this.map.aBlocks);
  }

  getDBlocks() {
    return Object.values(this.map.dBlocks);
  }

  getShuttles() {
    return Object.values(this.map.shuttles);
  }

  getDeathSquares() {
    return Object.values(this.map.deathSquares);
  }

  pushBlockCollision(tileCoord) {
    return this.getABlocks().concat(this.getDBlocks()).some(tile => {
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

  validPosition(coord, doConversion) {
    let tileCoord = [];

    if (doConversion) {
      tileCoord = absolutePosToMapPos(coord);
    } else {
      tileCoord = coord;
    }    

    if (tilesMatch(this.map.start, tileCoord) || tilesMatch(this.map.end, tileCoord)) {
      return true;
    } else if (this.pushBlockCollision(tileCoord)) {
      return false;
    } else if (this.onDeathSquare(tileCoord)) {
      return true;
    } else {
      return this.onFloor(tileCoord);
    }
  }

  atFinish(tileCoord) {
    if (tilesMatch(this.map.end, tileCoord)) {
      return true;
    } else {
      return false;
    }
  }

  onDeathSquare(tileCoord) {
    const death = this.getDeathSquares().some(tile => {
      return tilesMatch(tile, tileCoord);
    });

    return death && !this.onFloor(tileCoord);
  }

  removeMan(idx) {
    this.men.splice(idx, 1);
  }

  moveABlocks() {
    if (this.aBlocksMoved) {
      this.getABlocks().forEach(aBlock => this.movePushBlock(aBlock, Board.DISENGAGE));
    } else {
      this.getABlocks().forEach(aBlock => this.movePushBlock(aBlock, Board.ENGAGE));
    }

    this.aBlocksMoved = !this.aBlocksMoved;
  }

  moveDBlocks() {
    if (this.dBlocksMoved) {
      this.getDBlocks().forEach(dBlock => this.movePushBlock(dBlock, Board.DISENGAGE));
    } else {
      this.getDBlocks().forEach(dBlock => this.movePushBlock(dBlock, Board.ENGAGE));
    }

    this.dBlocksMoved = !this.dBlocksMoved;
  }

  movePushBlock(block, actionType) {
    block.pos[0] += block.movement[0] * actionType;
    block.pos[1] += block.movement[1] * actionType;

    // Filter for the men that are on tiles about to be occupied by push blocks
    this.men.filter(man => tilesMatch(man.tilePos, block.pos)).forEach(bumpedMan => {
      bumpedMan.pos = bumpedMan.pos.plus(
        new Coord(block.movement[0] * 80 * actionType, block.movement[1] * 80 * actionType)
      );

      if (bumpedMan.dx === 0 && block.movement[0] !== 0) {
        bumpedMan.dx = block.movement[0] > 0 ? Man.DEFAULT_SPEED : -Man.DEFAULT_SPEED;
        bumpedMan.dy = 0;
      } else if (bumpedMan.dy === 0 && block.movement[1] !== 0) {
        bumpedMan.dx = 0;
        bumpedMan.dy = block.movement[1] > 0 ? Man.DEFAULT_SPEED : -Man.DEFAULT_SPEED;
      } 
    });
  }

  moveShuttles() {
    if (this.shuttlesMoved) {
      this.getShuttles().forEach(shuttle => {
        // Filter for the men that are on shuttle tiles
        this.men.filter(man => tilesMatch(man.tilePos, shuttle.pos)).forEach(shuttledMan => {
          shuttledMan.pos = shuttledMan.pos.plus(
            new Coord(-40 * shuttle.movement[0], -40 * shuttle.movement[1])
          );
        })       

        shuttle.pos[0] -= shuttle.movement[0];
        shuttle.pos[1] -= shuttle.movement[1];
      });
    } else {
      this.getShuttles().forEach(shuttle => {
        // Filter for the men that are on shuttle tiles
        this.men.filter(man => tilesMatch(man.tilePos, shuttle.pos)).forEach(shuttledMan => {
          shuttledMan.pos = shuttledMan.pos.plus(
            new Coord(40 * shuttle.movement[0], 40 * shuttle.movement[1])
          );
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