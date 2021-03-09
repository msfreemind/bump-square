import Man from './man';
import Coord from './coord';

class Board {
  constructor(map) {
    this.map = map;

    this.startPos = new Coord(map[0][0] * 40, map[0][1] * 40);
    this.endPos = new Coord(map[map.length - 1][0] * 40, map[map.length - 1][1] * 40);

    this.men = [];
    this.men.push(new Man(this, "#00FF00"));
  }

  validPosition(coord) {
    const coord_string = JSON.stringify([Math.floor(coord.i / 40), Math.floor(coord.j / 40)]);
    
    let contains = this.map.some(tile => {
      return JSON.stringify(tile) === coord_string;
    });

    return contains;
  }
}

export default Board;