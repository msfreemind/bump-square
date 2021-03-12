export const MAPS = {
  0: { 
    title: "Stage 1",
    subtitle: "Gettin' Yer Blocks Wet",
    start: [0, 10],
    floor: [[1, 10], [2, 10], [3, 10], [4, 10], [5, 10]],
    end: [6, 10],
    aBlocks: { 
      0: {
        pos: [4, 10],
        movement: [0, 1]
      }
    },
    dBlocks: {},
    shuttles: {}    
  },
  1: {
    title: "Stage 2",
    subtitle: "Up to the Belly Button",
    start: [0, 10],
    floor: [[1, 10], [2, 10], [3, 10], [4, 10], [4, 12], [4, 13]],
    end: [4, 14],
    aBlocks: {},
    dBlocks: { 
      0: {
        pos: [4, 9],
        movement: [0, 1]
      }
    },
    shuttles: {}
  },
  2: {
    title: "Stage 3",
    subtitle: "Into the Deep End",
    start: [0, 10],
    floor: [[1, 10], [2, 10], [3, 10], [4, 10]],
    end: [10, 10],
    aBlocks: {},
    dBlocks: {},
    shuttles: { 
      0: {
        pos: [5, 10],
        movement: [4, 0]
      }
    }
  },  
  3: {
    title: "Stage 4",
    subtitle: "Putting It All Together",
    start: [0, 10],
    floor: [[1, 10], [2, 10], [3, 10], [4, 10], [4, 12], [4, 13], [9, 14], [10, 14], [11, 14], [12, 14]],
    end: [13, 14],
    aBlocks: { 
      0: {
        pos: [11, 14],
        movement: [0, 1]
      }
    },
    dBlocks: { 
      0: {
        pos: [4, 9],
        movement: [0, 1]
      }
    },
    shuttles: { 
      0: {
        pos: [4, 14],
        movement: [4, 0]
      }
    }
  },
  4: {
    title: "Stage 5",
    subtitle: "Getting Serious Now",
    start: [1, 9],
    floor: [[2, 9], [3, 9], [4, 9], [5, 9], [6, 9], [6, 8], [6, 7], [6, 2], [7, 2], [8, 2], [9, 2], [10, 2], [11, 2], [12, 2],
            [17, 2], [18, 2], [19, 2], [20, 2], [21, 2], [20, 3], [20, 4], [20, 5], [17, 8], [17, 9], [17, 10], [17, 11],
            [18, 11], [19, 11], [20, 11], [21, 11]],
    end: [22, 11],
    aBlocks: { 
      0: {
        pos: [21, 1],
        movement: [0, 1]
      }
    },
    dBlocks: { 
      0: {
        pos: [6, 10],
        movement: [0, -1]
      },
      1: {
        pos: [17, 5],
        movement: [0, 1]
      },
      2: {
        pos: [16, 11],
        movement: [1, 0]
      }
    },
    shuttles: { 
      0: {
        pos: [6, 6],
        movement: [0, -3]
      },
      1: {
        pos: [7, 6],
        movement: [0, -3]
      },
      2: {
        pos: [8, 6],
        movement: [0, -3]
      },
      3: {
        pos: [9, 6],
        movement: [0, -3]
      },
      4: {
        pos: [13, 2],
        movement: [3, 0]
      },
      5: {
        pos: [20, 6],
        movement: [-3, 0]
      }
    }
  }
}