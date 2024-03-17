import { create } from "zustand";

const puzzlesStore = (set) => ({
  puzzles: {
    tutorial: {
      1: {
        title: "bamboo",
        size: [2, 5, 1],
        answers: {
          "000": true,
          "010": true,
          "020": true,
          "030": true,
          "040": true,
        },
        showingNumbers: {
          layerX: [[0, 0]],
          layerY: [
            [0, 0],
            [1, 0],
          ],
          layerZ: [[0, 0]],
        },
      },
      2: {
        title: "One",
        size: [3, 4, 1],
        answers: {
          "000": true,
          100: true,
          200: true,

          110: true,

          "020": true,
          120: true,

          130: true,
        },
        showingNumbers: {
          layerX: [
            [0, 0],
            [3, 0],
          ],
          layerY: [
            [0, 0],
            [1, 0],
            [2, 0],
          ],
          layerZ: [[0, 0]],
        },
      },
    },
    easy: {
      1: {
        title: "bamboo",
        size: [2, 5, 7],
        answers: {
          "000": true,
          "010": true,
          "020": true,
          "030": true,
          "040": true,
        },
        showingNumbers: {
          layerX: [[0, 0]],
          layerY: [
            [0, 0],
            [1, 0],
          ],
          layerZ: [[0, 0]],
        },
      },
      2: {
        title: "laptop",
        size: [5, 4, 4],
        answers: { "000": true, "001": true },
        showingNumbers: {
          layerX: [[0, 0]],
          layerY: [[0, 0]],
          layerZ: [[0, 0]],
        },
      },
      3: {
        title: "chair",
        size: [3, 6, 3],
        answers: {
          "050": true,
          150: true,
          250: true,
          "040": true,
          140: true,
          240: true,

          "030": true,
          130: true,
          230: true,

          "020": true,
          120: true,
          220: true,
          "021": true,
          121: true,
          221: true,
          "022": true,
          122: true,
          222: true,

          "010": true,
          210: true,
          "012": true,
          212: true,

          "000": true,
          200: true,
          "002": true,
          202: true,
        },
        showingNumbers: {
          layerX: [
            [0, 0],
            [0, 1],
            [0, 2],

            [1, 1],

            [4, 1],
            [3, 1],

            [5, 0],
          ],
          layerY: [
            [0, 0],
            [1, 0],
            [2, 0],

            [0, 1],

            [0, 2],
            [1, 2],
            [2, 2],
          ],
          layerZ: [
            [0, 2],
            [1, 2],
            [2, 2],

            [1, 5],
            [2, 5],
          ],
        },
      },
    },
    normal: {
      1: {
        title: "boat",
        size: [6, 6, 6],
        answers: [
          [0, 0, 0],
          [0, 1, 0],
          [0, 2, 0],
          [0, 3, 0],
          [0, 4, 0],
        ],
        showingNumbers: {
          layerX: [[0, 0]],
          layerY: [
            [0, 0],
            [1, 0],
          ],
          layerZ: [[0, 0]],
        },
      },
      2: {
        title: "eight",
        size: [8, 8, 8],
        answers: [
          [0, 0, 0],
          [0, 1, 0],
          [0, 2, 0],
          [0, 3, 0],
          [0, 4, 0],
        ],
        showingNumbers: {
          layerX: [[0, 0]],
          layerY: [
            [0, 0],
            [1, 0],
          ],
          layerZ: [[0, 0]],
        },
      },
    },
    hard: {
      1: {
        title: "Jordan",
        size: [10, 10, 10],
        answers: [
          [0, 0, 0],
          [0, 1, 0],
          [0, 2, 0],
          [0, 3, 0],
          [0, 4, 0],
        ],
        showingNumbers: {
          layerX: [[0, 0]],
          layerY: [
            [0, 0],
            [1, 0],
          ],
          layerZ: [[0, 0]],
        },
      },
      2: {
        title: "apple",
        size: [12, 12, 12],
        answers: [
          [0, 0, 0],
          [0, 1, 0],
          [0, 2, 0],
          [0, 3, 0],
          [0, 4, 0],
        ],
        showingNumbers: {
          layerX: [[0, 0]],
          layerY: [
            [0, 0],
            [1, 0],
          ],
          layerZ: [[0, 0]],
        },
      },
    },
  },
  setPuzzles: (puzzles) => set({ puzzles }),
});

const usePuzzlesStore = create(puzzlesStore);

export default usePuzzlesStore;
