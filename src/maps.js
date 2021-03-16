export const MAPS = {
  0: { 
    title: "Stage 1",
    subtitle: "Gettin' Yer Blocks Wet",
    menQuota: 1,
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
    shuttles: {},
    deathSquares: {}    
  },
  1: {
    title: "Stage 2",
    subtitle: "Up to the Belly Button",
    menQuota: 1,
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
    shuttles: {},
    deathSquares: {} 
  },
  2: {
    title: "Stage 3",
    subtitle: "Into the Deep End",
    menQuota: 1,
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
    },
    deathSquares: {} 
  },  
  3: {
    title: "Stage 4",
    subtitle: "Putting It All Together",
    menQuota: 1,
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
    },
    deathSquares: {} 
  },
  4: {
    title: "Stage 5",
    subtitle: "Getting Serious Now",
    menQuota: 1,
    start: [1, 9],
    floor: [[2, 9], [3, 9], [4, 9], [5, 9], [6, 9], [6, 8], [6, 7], [9, 2], [10, 2], [11, 2], [12, 2],
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
    },
    deathSquares: {
      0: [7, 9],
      1: [22, 2],
      2: [17, 12],
      3: [6, 6],
      4: [13, 2],
      5: [20, 6]
    }
  },
  5: {
    title: "Stage 6",
    subtitle: "Death Spiral",
    menQuota: 2,
    start: [1, 18],
    floor: [[1, 17], [1, 16], [1, 15], [1, 14], [1, 9], [1, 8], [1, 7], [1, 6],
            [2, 2], [3, 2], [4, 2], [5, 2], [10, 2], [11, 2], [12, 2], [13, 2], [18, 2], [19, 2],
            [20, 2], [21, 2], [21, 7], [21, 8], [21, 9], [21, 10], [21, 15], [20, 15], [19, 15],
            [18, 15], [13, 15], [12, 15], [11, 15], [10, 15], [5, 15], [5, 14], [5, 13], [5, 12],
            [5, 7], [5, 6], [6, 6], [7, 6], [12, 6], [13, 6], [14, 6], [17, 7], [17, 8], [17, 9],
            [14, 10], [13, 10]],
    end: [12, 10],
    aBlocks: { 
      0: {
        pos: [1, 16],
        movement: [1, 0]
      }
    },
    dBlocks: {},
    shuttles: { 
      0: {
        pos: [1, 10],
        movement: [0, 3]
      },
      1: {
        pos: [1, 2],
        movement: [0, 3]
      },
      2: {
        pos: [9, 2],
        movement: [-3, 0]
      },
      3: {
        pos: [17, 2],
        movement: [-3, 0]
      },
      4: {
        pos: [21, 6],
        movement: [0, -3]
      },
      5: {
        pos: [21, 14],
        movement: [0, -3]
      },
      6: {
        pos: [14, 15],
        movement: [3, 0]
      },
      7: {
        pos: [6, 15],
        movement: [3, 0]
      },
      8: {
        pos: [5, 8],
        movement: [0, 3]
      },
      9: {
        pos: [11, 6],
        movement: [-3, 0]
      },
      10: {
        pos: [17, 6],
        movement: [-2, 0]
      },
      11: {
        pos: [15, 10],
        movement: [2, 0]
      }
    },
    deathSquares: {}
  },
  6: {
    title: "Stage 7",
    menQuota: 2,
    subtitle: "",
    start: [2, 2],
    floor: [[3, 2], [4, 2], [5, 2], [6, 2], [7, 2], [8, 6], [9, 6], [10, 6], [11, 6], [12, 6],
            [13, 10], [12, 10], [11, 10], [10, 10], [9, 10], [8, 10], [8, 12], [8, 13], [8, 14],
            [9, 14], [10, 14]],
    end: [19, 12],
    aBlocks: { 
      0: {
        pos: [8, 14],
        movement: [-1, 0]
      },
      1: {
        pos: [19, 13],
        movement: [1, 0]
      }
    },
    dBlocks: {
      0: {
        pos: [8, 9],
        movement: [0, 1]
      },
      1: {
        pos: [19, 15],
        movement: [0, -1]
      }
    },
    shuttles: { 
      0: {
        pos: [8, 2],
        movement: [0, 3]
      },
      1: {
        pos: [13, 6],
        movement: [0, 3]
      },
      2: {
        pos: [11, 14],
        movement: [8, 0]
      }
    },
    deathSquares: {}
  },
  7: {
    title: "Stage 8",
    subtitle: "Bump Fest",
    menQuota: 2,
    start: [12, 1],
    floor: [[12, 3], [12, 4], [12, 5], [14, 5], [14, 6], [16, 6], [16, 7], [16, 8], [14, 8], [14, 9],
            [12, 9], [12, 10], [12, 11], [10, 11], [10, 12], [8, 12], [8, 13], [8, 14], [10, 14],
            [10, 15], [12, 15], [12, 16], [12, 17]],
    end: [12, 18],
    aBlocks: {},
    dBlocks: {
      0: {
        pos: [12, 0],
        movement: [0, 1]
      },
      1: {
        pos: [11, 5],
        movement: [1, 0]
      },
      2: {
        pos: [13, 6],
        movement: [1, 0]
      },
      3: {
        pos: [17, 8],
        movement: [-1, 0]
      },
      4: {
        pos: [15, 9],
        movement: [-1, 0]
      },
      5: {
        pos: [13, 11],
        movement: [-1, 0]
      },
      6: {
        pos: [11, 12],
        movement: [-1, 0]
      },
      7: {
        pos: [7, 14],
        movement: [1, 0]
      },
      8: {
        pos: [9, 15],
        movement: [1, 0]
      },
    },
    shuttles: {},
    deathSquares: {}
  },
  8: {
    title: "Stage 9",
    subtitle: "Mirror Blox",
    menQuota: 1,
    start: [11, 9],
    floor: [[6, 9], [5, 9], [4, 9], [3, 9], [3, 7], [3, 6], [4, 6], [5, 6], [5, 4], [5, 3], [6, 3],
            [7, 3], [9, 3], [10, 3], [11, 3], [13, 3], [14, 3], [15, 3], [17, 3], [18, 3], [19, 3],
            [19, 4], [19, 6], [20, 6], [21, 6], [21, 7], [21, 9], [20, 9], [19, 9], [18, 9]],
    end: [13, 9],
    aBlocks: {},
    dBlocks: {},
    shuttles: {
      0: {
        pos: [10, 9],
        movement: [-3, 0]
      },
      1: {
        pos: [3, 8],
        movement: [-1, 0]
      },
      2: {
        pos: [6, 5],
        movement: [-1, 0]
      },
      3: {
        pos: [8, 3],
        movement: [0, -1]
      },
      4: {
        pos: [12, 2],
        movement: [0, 1]
      },
      5: {
        pos: [16, 3],
        movement: [0, -1]
      },
      6: {
        pos: [18, 5],
        movement: [1, 0]
      },
      7: {
        pos: [21, 8],
        movement: [1, 0]
      },
      8: {
        pos: [14, 9],
        movement: [3, 0]
      },
    },
    deathSquares: {}
  },
  9: {
    title: "Stage 10",
    subtitle: "Key Jumble",
    menQuota: 1,
    start: [3, 9],
    floor: [[4, 9], [5, 9], [6, 9], [8, 12], [9, 12], [10, 12], [11, 6], [10, 6], [9, 6], [9, 5],
            [9, 4], [9, 3], [11, 3], [12, 3], [13, 3], [14, 3], [19, 3], [19, 4], [19, 5], [18,5],
            [17, 5], [17, 6], [17, 7], [17, 8], [17, 9], [18, 9], [19, 9], [20, 9]],
    end: [21, 9],
    aBlocks: {
      0: {
        pos: [7, 12],
        movement: [0, 1]
      },
      1: {
        pos: [11, 10],
        movement: [-1, 0]
      },
      2: {
        pos: [13, 7],
        movement: [1, 0]
      },
      3: {
        pos: [17, 6],
        movement: [1, 0]
      }
    },
    dBlocks: {
      0: {
        pos: [5, 12],
        movement: [1, 0]
      },
      1: {
        pos: [10, 9],
        movement: [1, 0]
      },
      2: {
        pos: [14, 6],
        movement: [-1, 0]
      },
      3: {
        pos: [8, 3],
        movement: [1, 0]
      }
    },
    shuttles: {
      0: {
        pos: [6, 12],
        movement: [0, -2]
      },
      1: {
        pos: [11, 9],
        movement: [0, 3]
      },
      2: {
        pos: [13, 6],
        movement: [0, 3]
      },
      3: {
        pos: [15, 3],
        movement: [3, 0]
      }
    },
    deathSquares: {}
  }
}