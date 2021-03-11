export const tilesMatch = (array1, array2) => {
  return JSON.stringify(array1) === JSON.stringify(array2);
};

export const absolutePosToMapPos = (coord) => {
  return [Math.floor(coord.i / 40), Math.floor(coord.j / 40)];
}