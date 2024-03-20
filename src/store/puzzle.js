import { create } from "zustand";

const puzzlesStore = (set) => ({
  puzzles: {
    tutorial: {
      1: {
        title: "Bamboo",
        size: [2, 5, 1],
        answers: {
          "000": true,
          "010": true,
          "020": true,
          "030": true,
          "040": true,
        },
        showingNumbers: {
          layerX: [],
          layerY: [
            [0, 0],
            [1, 0],
          ],
          layerZ: [],
        },
      },
      2: {
        title: "Donut",
        size: [3, 2, 3],
        answers: {
          "000": true,
          100: true,
          200: true,

          "010": true,
          110: true,
          210: true,

          "001": true,
          201: true,

          "011": true,
          211: true,

          "002": true,
          102: true,
          202: true,

          "012": true,
          112: true,
          212: true,
        },
        showingNumbers: {
          layerX: [
            [0, 1],
            [0, 2],
            [1, 1],
            [1, 2],
          ],
          layerY: [
            [0, 0],
            [1, 0],
            [2, 0],
          ],
          layerZ: [
            [1, 0],
            [1, 1],
          ],
        },
      },
      3: {
        title: "Bambodo",
        size: [2, 5, 1],
        answers: {
          "000": true,
          "010": true,
          "020": true,
          "030": true,
          "040": true,
        },
        showingNumbers: {
          layerX: [],
          layerY: [
            [0, 0],
            [1, 0],
          ],
          layerZ: [],
        },
      },
      4: {
        title: "Bambo",
        size: [2, 5, 1],
        answers: {
          "000": true,
          "010": true,
          "020": true,
          "030": true,
          "040": true,
        },
        showingNumbers: {
          layerX: [],
          layerY: [
            [0, 0],
            [1, 0],
          ],
          layerZ: [],
        },
      },
      5: {
        title: "Bamoo",
        size: [2, 5, 1],
        answers: {
          "000": true,
          "010": true,
          "020": true,
          "030": true,
          "040": true,
        },
        showingNumbers: {
          layerX: [],
          layerY: [
            [0, 0],
            [1, 0],
          ],
          layerZ: [],
        },
      },
      6: {
        title: "Bmboo",
        size: [2, 5, 1],
        answers: {
          "000": true,
          "010": true,
          "020": true,
          "030": true,
          "040": true,
        },
        showingNumbers: {
          layerX: [],
          layerY: [
            [0, 0],
            [1, 0],
          ],
          layerZ: [],
        },
      },
    },
    easy: {
      1: {
        title: "Table",
        size: [3, 2, 3],
        answers: {
          "000": true,
          200: true,

          "002": true,
          202: true,

          "010": true,
          110: true,
          210: true,

          "011": true,
          111: true,
          211: true,

          "012": true,
          112: true,
          212: true,
        },
        showingNumbers: {
          layerX: [
            [1, 0],
            [1, 1],
            [1, 2],
          ],
          layerY: [
            [0, 0],
            [2, 0],
          ],
          layerZ: [
            [0, 0],
            [1, 0],
            [2, 0],
          ],
        },
      },
      2: {
        title: "Apple",
        size: [3, 4, 3],
        answers: {
          "000": true,
          100: true,
          200: true,
          "001": true,
          101: true,
          201: true,
          "002": true,
          102: true,
          202: true,

          "010": true,
          110: true,
          210: true,
          "011": true,
          111: true,
          211: true,
          "012": true,
          112: true,
          212: true,

          "020": true,
          120: true,
          220: true,
          "021": true,
          121: true,
          221: true,
          "022": true,
          122: true,
          222: true,

          130: true,
          131: true,
          231: true,
        },
        showingNumbers: {
          layerX: [
            [3, 0],
            [3, 1],
          ],
          layerY: [
            [0, 0],
            [2, 0],
            [0, 2],
            [2, 2],
          ],
          layerZ: [
            [0, 0],
            [1, 0],
            [2, 0],

            [1, 3],
            [2, 3],
          ],
        },
      },
      3: {
        title: "Hanger",
        size: [9, 8, 1],
        answers: {
          "000": true,
          800: true,
          110: true,
          710: true,
          220: true,
          620: true,
          330: true,
          530: true,
          440: true,
          550: true,
          560: true,
          360: true,
          470: true,
        },
        showingNumbers: {
          layerX: [
            [0, 0],
            [1, 0],
            [2, 0],
            [3, 0],
            [4, 0],
            [5, 0],
            [6, 0],
            [7, 0],
          ],
          layerY: [
            [0, 0],
            [1, 0],
            [2, 0],
            [3, 0],
            [4, 0],
            [5, 0],
            [6, 0],
            [7, 0],
            [8, 0],
          ],
          layerZ: [[0, 0]],
        },
      },
    },
    normal: {
      1: {
        title: "Dumbbell",
        size: [5, 3, 3],
        answers: {
          "000": true,
          "010": true,
          "020": true,
          "001": true,
          "011": true,
          "021": true,
          "002": true,
          "012": true,
          "022": true,

          400: true,
          410: true,
          420: true,
          401: true,
          411: true,
          421: true,
          402: true,
          412: true,
          422: true,

          111: true,
          211: true,
          311: true,
        },
        showingNumbers: {
          layerX: [
            [0, 0],
            [0, 1],
            [0, 2],

            [1, 1],

            [2, 0],
            [2, 1],
            [2, 2],
          ],
          layerY: [
            [4, 0],
            [4, 1],
            [4, 2],
          ],
          layerZ: [
            [0, 0],
            [0, 1],
            [0, 2],
            [1, 1],
            [2, 1],
            [3, 1],
            [4, 1],
          ],
        },
      },
      2: {
        title: "Chair",
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
      3: {
        title: "Duck",
        size: [5, 5, 5],
        answers: {
          110: true,
          210: true,
          310: true,

          220: true,

          101: true,
          201: true,
          301: true,
          102: true,
          202: true,
          302: true,
          103: true,
          203: true,
          303: true,

          "011": true,
          111: true,
          211: true,
          311: true,
          411: true,
          "012": true,
          112: true,
          212: true,
          312: true,
          412: true,
          "013": true,
          113: true,
          213: true,
          313: true,
          413: true,

          122: true,
          222: true,
          322: true,

          123: true,
          223: true,
          323: true,

          132: true,
          232: true,
          332: true,

          133: true,
          233: true,
          333: true,

          142: true,
          242: true,
          342: true,

          143: true,
          243: true,
          343: true,

          234: true,
        },
        showingNumbers: {
          layerX: [
            [0, 0],
            [1, 0],
            [2, 0],
            [3, 0],
            [4, 0],

            [0, 1],
            [0, 2],

            [1, 1],

            [4, 1],
            [3, 1],

            [4, 2],
            [4, 3],

            [0, 3],
            [0, 4],
            [1, 4],
          ],
          layerY: [
            [1, 2],
            [2, 2],
            [3, 2],

            [3, 0],
            [2, 0],
            [1, 0],

            [1, 3],
            [2, 3],
            [3, 3],
          ],
          layerZ: [
            [0, 4],
            [0, 3],
            [0, 2],
            [0, 1],
            [0, 0],

            [4, 4],
            [4, 3],
            [4, 2],
            [4, 1],
            [4, 0],

            [1, 4],
            [2, 4],
            [3, 4],

            [1, 3],
            [2, 3],
            [3, 3],

            [1, 2],
            [2, 2],
            [3, 2],
          ],
        },
      },
    },
    hard: {
      1: {
        title: "Pyramid",
        size: [7, 4, 7],
        answers: {
          "000": true,
          100: true,
          200: true,
          300: true,
          400: true,
          500: true,
          600: true,

          "001": true,
          101: true,
          201: true,
          301: true,
          401: true,
          501: true,
          601: true,

          "002": true,
          102: true,
          202: true,
          302: true,
          402: true,
          502: true,
          602: true,

          "003": true,
          103: true,
          203: true,
          303: true,
          403: true,
          503: true,
          603: true,

          "004": true,
          104: true,
          204: true,
          304: true,
          404: true,
          504: true,
          604: true,

          "005": true,
          105: true,
          205: true,
          305: true,
          405: true,
          505: true,
          605: true,

          "006": true,
          106: true,
          206: true,
          306: true,
          406: true,
          506: true,
          606: true,

          110: true,
          210: true,
          310: true,
          410: true,
          510: true,

          111: true,
          211: true,
          311: true,
          411: true,
          511: true,

          112: true,
          212: true,
          312: true,
          412: true,
          512: true,

          113: true,
          213: true,
          313: true,
          413: true,
          513: true,

          114: true,
          214: true,
          314: true,
          414: true,
          514: true,

          115: true,
          215: true,
          315: true,
          415: true,
          515: true,

          222: true,
          322: true,
          422: true,

          223: true,
          323: true,
          423: true,

          224: true,
          324: true,
          424: true,

          333: true,
        },
        showingNumbers: {
          layerX: [
            [0, 3],
            [1, 3],
            [2, 3],
            [3, 3],
            [0, 4],
            [0, 5],
            [0, 6],
          ],
          layerY: [
            [3, 3],
            [4, 4],
            [5, 5],
            [6, 6],

            [0, 6],
            [0, 5],
            [0, 4],
            [1, 6],
            [1, 5],
            [1, 4],
            [2, 6],
            [2, 5],
            [2, 4],
          ],
          layerZ: [
            [0, 0],
            [1, 0],
            [2, 0],
          ],
        },
      },
      2: {
        title: "Fox",
        size: [5, 7, 9],
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
    },
  },
  setPuzzles: (puzzles) => set({ puzzles }),
});

const usePuzzlesStore = create(puzzlesStore);

export default usePuzzlesStore;
