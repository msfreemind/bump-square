import Man from './man';
import Coord from './coord';

class Board {
  constructor(map) {
    this.map = map;
    this.startPos = new Coord(map.start[0] * 40, map.start[1] * 40);

    this.wallsMoved = false;
    this.shuttlesMoved = false;

    this.men = [];
    this.men.push(new Man(this, "#00FF00"));
  }

  absolutePosToMapPos(coord) {
    return [Math.floor(coord.i / 40), Math.floor(coord.j / 40)];
  }

  validPosition(coord) {
    const coord_string = JSON.stringify(this.absolutePosToMapPos(coord));

    if (JSON.stringify(this.map.start) === coord_string || JSON.stringify(this.map.end) === coord_string) {
      return true;
    } else {
      let hitWall = this.map.walls.some(tile => {
        return JSON.stringify(tile) === coord_string;
      });
  
      if (hitWall) {
        return false;
      } else {
        let onFloor = this.map.floor.concat(this.map.shuttles).some(tile => {
          return JSON.stringify(tile) === coord_string;
        });
    
        return onFloor;
      }  
    }  
  }

  atFinish(coord) {
    const coord_string = JSON.stringify(this.absolutePosToMapPos(coord));

    if (JSON.stringify(this.map.end) === coord_string) {
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

  moveShuttles() {
    if (this.shuttlesMoved) {
      this.map.shuttles.forEach(shuttle => {
        this.men.filter(man => JSON.stringify(man.tilePos) === JSON.stringify(shuttle)).forEach(shuttleMan => {
          shuttleMan.pos = shuttleMan.pos.plus(new Coord(-160, 0));
        })

        shuttle[0] -= 4;
      });
    } else {
      this.map.shuttles.forEach(shuttle => {
        this.men.filter(man => JSON.stringify(man.tilePos) === JSON.stringify(shuttle)).forEach(shuttleMan => {
          shuttleMan.pos = shuttleMan.pos.plus(new Coord(160, 0));
        })

        shuttle[0] += 4
      });
    }

    this.shuttlesMoved = !this.shuttlesMoved;
  }
}

export default Board;