import Man from './man';
import Coord from './coord';

class Board {
  constructor(map) {
    this.map = map;

    this.startPos = new Coord(map.start[0] * 40, map.start[1] * 40);
    this.endPos = new Coord(map.end[0] * 40, map.end[1] * 40);

    this.men = [];
    this.men.push(new Man(this, "#00FF00"));
  }

  validPosition(coord) {
    const coord_string = JSON.stringify([Math.floor(coord.i / 40), Math.floor(coord.j / 40)]);

    if (JSON.stringify(this.map.start) === coord_string || JSON.stringify(this.map.end) === coord_string) {
      return true;
    }
    
    let contains = this.map.floor.some(tile => {
      return JSON.stringify(tile) === coord_string;
    });

    return contains;
  }
}

export default Board;