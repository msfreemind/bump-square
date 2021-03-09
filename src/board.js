import Man from './man';
import Coord from './coord';

class Board {
  constructor(map) {
    this.map = map;
    this.startPos = new Coord(map.start[0] * 40, map.start[1] * 40);

    this.wallsMoved = false;

    this.men = [];
    this.men.push(new Man(this, "#00FF00"));
  }

  validPosition(coord) {
    const coord_string = JSON.stringify( [Math.floor(coord.i / 40), Math.floor(coord.j / 40)] );

    if (JSON.stringify(this.map.start) === coord_string || JSON.stringify(this.map.end) === coord_string) {
      return true;
    }

    let hitWall = this.map.walls.some(tile => {
      return JSON.stringify(tile) === coord_string;
    });

    if (hitWall) {
      return false;
    }
    
    let onFloor = this.map.floor.some(tile => {
      return JSON.stringify(tile) === coord_string;
    });

    return onFloor;
  }

  atFinish(coord) {
    const coord_string = JSON.stringify( [Math.floor(coord.i / 40), Math.floor(coord.j / 40)] );

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
}

export default Board;