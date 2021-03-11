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
      this.getWalls().forEach(wall => {
        wall.pos[0] -= wall.movement[0];
        wall.pos[1] -= wall.movement[1];
      });
    } else {
      this.getWalls().forEach(wall => {
        wall.pos[0] += wall.movement[0];
        wall.pos[1] += wall.movement[1];
      });
    }

    this.wallsMoved = !this.wallsMoved;
  }

  moveBumpers() {
    if (this.bumpersMoved) {
      this.getBumpers().forEach(bumper => {
        bumper.pos[0] -= bumper.movement[0];
        bumper.pos[1] -= bumper.movement[1];

        this.men.filter(man => tilesMatch(man.tilePos, bumper.pos)).forEach(bumpedMan => {
          bumpedMan.pos = bumpedMan.pos.plus(new Coord(0, -80));
          if (bumpedMan.dy >= 0) {
            bumpedMan.dy = -Man.DEFAULT_SPEED;
          }
        })
      });
    } else {
      this.getBumpers().forEach(bumper => {
        bumper.pos[0] += bumper.movement[0];
        bumper.pos[1] += bumper.movement[1];

        this.men.filter(man => tilesMatch(man.tilePos, bumper.pos)).forEach(bumpedMan => {
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

export default Board;