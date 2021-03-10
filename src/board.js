import Man from './man';
import Coord from './coord';
import { tilesMatch } from './utils';

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

  absolutePosToMapPos(coord) {
    return [Math.floor(coord.i / 40), Math.floor(coord.j / 40)];
  }

  validPosition(coord) {
    const tileCoord = this.absolutePosToMapPos(coord);

    if (tilesMatch(this.map.start, tileCoord) || tilesMatch(this.map.end, tileCoord)) {
      return true;
    } else {
      let hitWall = this.map.walls.concat(this.map.bumpers).some(tile => {
        return tilesMatch(tile, tileCoord);
      });
  
      if (hitWall) {
        return false;
      } else {
        let onFloor = this.map.floor.concat(this.map.shuttles).some(tile => {
          return tilesMatch(tile, tileCoord);
        });
    
        return onFloor;
      }  
    }  
  }

  atFinish(coord) {
    const tileCoord = this.absolutePosToMapPos(coord);

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
      this.map.walls.forEach(wall => wall[1] -= 1);
    } else {
      this.map.walls.forEach(wall => wall[1] += 1);
    }

    this.wallsMoved = !this.wallsMoved;
  }

  moveBumpers() {
    if (this.bumpersMoved) {
      this.map.bumpers.forEach(bumper => {
        bumper[1] -= 1

        this.men.filter(man => tilesMatch(man.tilePos, bumper)).forEach(bumpedMan => {
          bumpedMan.pos = bumpedMan.pos.plus(new Coord(0, -80));
          if (bumpedMan.dy >= 0) {
            bumpedMan.dy = -Man.DEFAULT_SPEED;
          }
        })
      });
    } else {
      this.map.bumpers.forEach(bumper => {
        bumper[1] += 1

        this.men.filter(man => tilesMatch(man.tilePos, bumper)).forEach(bumpedMan => {
          bumpedMan.pos = bumpedMan.pos.plus(new Coord(0, 80));
          if (bumpedMan.dy <= 0) {
            bumpedMan.dy = Man.DEFAULT_SPEED;
          }
        })
      });
    }

    this.bumpersMoved = !this.bumpersMoved;
  }

  moveShuttles() {
    if (this.shuttlesMoved) {
      this.map.shuttles.forEach(shuttle => {
        this.men.filter(man => tilesMatch(man.tilePos, shuttle)).forEach(shuttledMan => {
          shuttledMan.pos = shuttledMan.pos.plus(new Coord(-160, 0));
        })

        shuttle[0] -= 4;
      });
    } else {
      this.map.shuttles.forEach(shuttle => {
        this.men.filter(man => tilesMatch(man.tilePos, shuttle)).forEach(shuttledMan => {
          shuttledMan.pos = shuttledMan.pos.plus(new Coord(160, 0));
        })

        shuttle[0] += 4
      });
    }

    this.shuttlesMoved = !this.shuttlesMoved;
  }
}

export default Board;