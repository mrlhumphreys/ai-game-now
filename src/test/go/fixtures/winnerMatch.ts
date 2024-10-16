import type Match from '$lib/go/interfaces/Match';
import deepClone from '$lib/utils/deepClone';

let match = {
  id: 0,
  gameState: {
    currentPlayerNumber: 1,
    points: [
      { id: 1, x: 0, y: 0, stone: null, territoryId: null },
      { id: 2, x: 1, y: 0, stone: null, territoryId: null },
      { id: 3, x: 2, y: 0, stone: null, territoryId: null },
      { id: 4, x: 3, y: 0, stone: null, territoryId: null },
      { id: 5, x: 4, y: 0, stone: null, territoryId: null },
      { id: 6, x: 5, y: 0, stone: null, territoryId: null },
      { id: 7, x: 6, y: 0, stone: null, territoryId: null },
      { id: 8, x: 7, y: 0, stone: null, territoryId: null },
      { id: 9, x: 8, y: 0, stone: null, territoryId: null },
      { id: 10, x: 9, y: 0, stone: null, territoryId: null },
      { id: 11, x: 10, y: 0, stone: null, territoryId: null },
      { id: 12, x: 11, y: 0, stone: null, territoryId: null },
      { id: 13, x: 12, y: 0, stone: null, territoryId: null },
      { id: 14, x: 13, y: 0, stone: null, territoryId: null },
      { id: 15, x: 14, y: 0, stone: null, territoryId: null },
      { id: 16, x: 15, y: 0, stone: null, territoryId: null },
      { id: 17, x: 16, y: 0, stone: null, territoryId: null },
      { id: 18, x: 17, y: 0, stone: null, territoryId: null },
      { id: 19, x: 18, y: 0, stone: null, territoryId: null },

      { id: 20, x: 0, y: 1, stone: null, territoryId: null },
      { id: 21, x: 1, y: 1, stone: null, territoryId: null },
      { id: 22, x: 2, y: 1, stone: null, territoryId: null },
      { id: 23, x: 3, y: 1, stone: null, territoryId: null },
      { id: 24, x: 4, y: 1, stone: null, territoryId: null },
      { id: 25, x: 5, y: 1, stone: null, territoryId: null },
      { id: 26, x: 6, y: 1, stone: null, territoryId: null },
      { id: 27, x: 7, y: 1, stone: null, territoryId: null },
      { id: 28, x: 8, y: 1, stone: null, territoryId: null },
      { id: 29, x: 9, y: 1, stone: null, territoryId: null },
      { id: 30, x: 10, y: 1, stone: null, territoryId: null },
      { id: 31, x: 11, y: 1, stone: null, territoryId: null },
      { id: 32, x: 12, y: 1, stone: null, territoryId: null },
      { id: 33, x: 13, y: 1, stone: null, territoryId: null },
      { id: 34, x: 14, y: 1, stone: null, territoryId: null },
      { id: 35, x: 15, y: 1, stone: null, territoryId: null },
      { id: 36, x: 16, y: 1, stone: null, territoryId: null },
      { id: 37, x: 17, y: 1, stone: null, territoryId: null },
      { id: 38, x: 18, y: 1, stone: null, territoryId: null },

      { id: 39, x: 0, y: 2, stone: null, territoryId: null },
      { id: 40, x: 1, y: 2, stone: null, territoryId: null },
      { id: 41, x: 2, y: 2, stone: null, territoryId: null },
      { id: 42, x: 3, y: 2, stone: null, territoryId: null },
      { id: 43, x: 4, y: 2, stone: null, territoryId: null },
      { id: 44, x: 5, y: 2, stone: null, territoryId: null },
      { id: 45, x: 6, y: 2, stone: null, territoryId: null },
      { id: 46, x: 7, y: 2, stone: null, territoryId: null },
      { id: 47, x: 8, y: 2, stone: null, territoryId: null },
      { id: 48, x: 9, y: 2, stone: null, territoryId: null },
      { id: 49, x: 10, y: 2, stone: null, territoryId: null },
      { id: 50, x: 11, y: 2, stone: null, territoryId: null },
      { id: 51, x: 12, y: 2, stone: null, territoryId: null },
      { id: 52, x: 13, y: 2, stone: null, territoryId: null },
      { id: 53, x: 14, y: 2, stone: null, territoryId: null },
      { id: 54, x: 15, y: 2, stone: null, territoryId: null },
      { id: 55, x: 16, y: 2, stone: null, territoryId: null },
      { id: 56, x: 17, y: 2, stone: null, territoryId: null },
      { id: 57, x: 18, y: 2, stone: null, territoryId: null },

      { id: 58, x: 0, y: 3, stone: null, territoryId: null },
      { id: 59, x: 1, y: 3, stone: null, territoryId: null },
      { id: 60, x: 2, y: 3, stone: null, territoryId: null },
      { id: 61, x: 3, y: 3, stone: null, territoryId: null },
      { id: 62, x: 4, y: 3, stone: null, territoryId: null },
      { id: 63, x: 5, y: 3, stone: null, territoryId: null },
      { id: 64, x: 6, y: 3, stone: null, territoryId: null },
      { id: 65, x: 7, y: 3, stone: null, territoryId: null },
      { id: 66, x: 8, y: 3, stone: null, territoryId: null },
      { id: 67, x: 9, y: 3, stone: null, territoryId: null },
      { id: 68, x: 10, y: 3, stone: null, territoryId: null },
      { id: 69, x: 11, y: 3, stone: null, territoryId: null },
      { id: 70, x: 12, y: 3, stone: null, territoryId: null },
      { id: 71, x: 13, y: 3, stone: null, territoryId: null },
      { id: 72, x: 14, y: 3, stone: null, territoryId: null },
      { id: 73, x: 15, y: 3, stone: null, territoryId: null },
      { id: 74, x: 16, y: 3, stone: null, territoryId: null },
      { id: 75, x: 17, y: 3, stone: null, territoryId: null },
      { id: 76, x: 18, y: 3, stone: null, territoryId: null },

      { id: 77, x: 0, y: 4, stone: null, territoryId: null },
      { id: 78, x: 1, y: 4, stone: null, territoryId: null },
      { id: 79, x: 2, y: 4, stone: null, territoryId: null },
      { id: 80, x: 3, y: 4, stone: null, territoryId: null },
      { id: 81, x: 4, y: 4, stone: null, territoryId: null },
      { id: 82, x: 5, y: 4, stone: null, territoryId: null },
      { id: 83, x: 6, y: 4, stone: null, territoryId: null },
      { id: 84, x: 7, y: 4, stone: null, territoryId: null },
      { id: 85, x: 8, y: 4, stone: null, territoryId: null },
      { id: 86, x: 9, y: 4, stone: null, territoryId: null },
      { id: 87, x: 10, y: 4, stone: null, territoryId: null },
      { id: 88, x: 11, y: 4, stone: null, territoryId: null },
      { id: 89, x: 12, y: 4, stone: null, territoryId: null },
      { id: 90, x: 13, y: 4, stone: null, territoryId: null },
      { id: 91, x: 14, y: 4, stone: null, territoryId: null },
      { id: 92, x: 15, y: 4, stone: null, territoryId: null },
      { id: 93, x: 16, y: 4, stone: null, territoryId: null },
      { id: 94, x: 17, y: 4, stone: null, territoryId: null },
      { id: 95, x: 18, y: 4, stone: null, territoryId: null },

      { id: 96, x: 0, y: 5, stone: null, territoryId: null },
      { id: 97, x: 1, y: 5, stone: null, territoryId: null },
      { id: 98, x: 2, y: 5, stone: null, territoryId: null },
      { id: 99, x: 3, y: 5, stone: null, territoryId: null },
      { id: 100, x: 4, y: 5, stone: null, territoryId: null },
      { id: 101, x: 5, y: 5, stone: null, territoryId: null },
      { id: 102, x: 6, y: 5, stone: null, territoryId: null },
      { id: 103, x: 7, y: 5, stone: null, territoryId: null },
      { id: 104, x: 8, y: 5, stone: null, territoryId: null },
      { id: 105, x: 9, y: 5, stone: null, territoryId: null },
      { id: 106, x: 10, y: 5, stone: null, territoryId: null },
      { id: 107, x: 11, y: 5, stone: null, territoryId: null },
      { id: 108, x: 12, y: 5, stone: null, territoryId: null },
      { id: 109, x: 13, y: 5, stone: null, territoryId: null },
      { id: 110, x: 14, y: 5, stone: null, territoryId: null },
      { id: 111, x: 15, y: 5, stone: null, territoryId: null },
      { id: 112, x: 16, y: 5, stone: null, territoryId: null },
      { id: 113, x: 17, y: 5, stone: null, territoryId: null },
      { id: 114, x: 18, y: 5, stone: null, territoryId: null },

      { id: 115, x: 0, y: 6, stone: null, territoryId: null },
      { id: 116, x: 1, y: 6, stone: null, territoryId: null },
      { id: 117, x: 2, y: 6, stone: null, territoryId: null },
      { id: 118, x: 3, y: 6, stone: null, territoryId: null },
      { id: 119, x: 4, y: 6, stone: null, territoryId: null },
      { id: 120, x: 5, y: 6, stone: null, territoryId: null },
      { id: 121, x: 6, y: 6, stone: null, territoryId: null },
      { id: 122, x: 7, y: 6, stone: null, territoryId: null },
      { id: 123, x: 8, y: 6, stone: null, territoryId: null },
      { id: 124, x: 9, y: 6, stone: null, territoryId: null },
      { id: 125, x: 10, y: 6, stone: null, territoryId: null },
      { id: 126, x: 11, y: 6, stone: null, territoryId: null },
      { id: 127, x: 12, y: 6, stone: null, territoryId: null },
      { id: 128, x: 13, y: 6, stone: null, territoryId: null },
      { id: 129, x: 14, y: 6, stone: null, territoryId: null },
      { id: 130, x: 15, y: 6, stone: null, territoryId: null },
      { id: 131, x: 16, y: 6, stone: null, territoryId: null },
      { id: 132, x: 17, y: 6, stone: null, territoryId: null },
      { id: 133, x: 18, y: 6, stone: null, territoryId: null },

      { id: 134, x: 0, y: 7, stone: null, territoryId: null },
      { id: 135, x: 1, y: 7, stone: null, territoryId: null },
      { id: 136, x: 2, y: 7, stone: null, territoryId: null },
      { id: 137, x: 3, y: 7, stone: null, territoryId: null },
      { id: 138, x: 4, y: 7, stone: null, territoryId: null },
      { id: 139, x: 5, y: 7, stone: null, territoryId: null },
      { id: 140, x: 6, y: 7, stone: null, territoryId: null },
      { id: 141, x: 7, y: 7, stone: null, territoryId: null },
      { id: 142, x: 8, y: 7, stone: null, territoryId: null },
      { id: 143, x: 9, y: 7, stone: null, territoryId: null },
      { id: 144, x: 10, y: 7, stone: null, territoryId: null },
      { id: 145, x: 11, y: 7, stone: null, territoryId: null },
      { id: 146, x: 12, y: 7, stone: null, territoryId: null },
      { id: 147, x: 13, y: 7, stone: null, territoryId: null },
      { id: 148, x: 14, y: 7, stone: null, territoryId: null },
      { id: 149, x: 15, y: 7, stone: null, territoryId: null },
      { id: 150, x: 16, y: 7, stone: null, territoryId: null },
      { id: 151, x: 17, y: 7, stone: null, territoryId: null },
      { id: 152, x: 18, y: 7, stone: null, territoryId: null },

      { id: 153, x: 0, y: 8, stone: null, territoryId: null },
      { id: 154, x: 1, y: 8, stone: null, territoryId: null },
      { id: 155, x: 2, y: 8, stone: null, territoryId: null },
      { id: 156, x: 3, y: 8, stone: null, territoryId: null },
      { id: 157, x: 4, y: 8, stone: null, territoryId: null },
      { id: 158, x: 5, y: 8, stone: null, territoryId: null },
      { id: 159, x: 6, y: 8, stone: null, territoryId: null },
      { id: 160, x: 7, y: 8, stone: null, territoryId: null },
      { id: 161, x: 8, y: 8, stone: null, territoryId: null },
      { id: 162, x: 9, y: 8, stone: null, territoryId: null },
      { id: 163, x: 10, y: 8, stone: null, territoryId: null },
      { id: 164, x: 11, y: 8, stone: null, territoryId: null },
      { id: 165, x: 12, y: 8, stone: null, territoryId: null },
      { id: 166, x: 13, y: 8, stone: null, territoryId: null },
      { id: 167, x: 14, y: 8, stone: null, territoryId: null },
      { id: 168, x: 15, y: 8, stone: null, territoryId: null },
      { id: 169, x: 16, y: 8, stone: null, territoryId: null },
      { id: 170, x: 17, y: 8, stone: null, territoryId: null },
      { id: 171, x: 18, y: 8, stone: null, territoryId: null },

      { id: 172, x: 0, y: 9, stone: null, territoryId: null },
      { id: 173, x: 1, y: 9, stone: null, territoryId: null },
      { id: 174, x: 2, y: 9, stone: null, territoryId: null },
      { id: 175, x: 3, y: 9, stone: null, territoryId: null },
      { id: 176, x: 4, y: 9, stone: null, territoryId: null },
      { id: 177, x: 5, y: 9, stone: null, territoryId: null },
      { id: 178, x: 6, y: 9, stone: null, territoryId: null },
      { id: 179, x: 7, y: 9, stone: null, territoryId: null },
      { id: 180, x: 8, y: 9, stone: null, territoryId: null },
      { id: 181, x: 9, y: 9, stone: null, territoryId: null },
      { id: 182, x: 10, y: 9, stone: null, territoryId: null },
      { id: 183, x: 11, y: 9, stone: null, territoryId: null },
      { id: 184, x: 12, y: 9, stone: null, territoryId: null },
      { id: 185, x: 13, y: 9, stone: null, territoryId: null },
      { id: 186, x: 14, y: 9, stone: null, territoryId: null },
      { id: 187, x: 15, y: 9, stone: null, territoryId: null },
      { id: 188, x: 16, y: 9, stone: null, territoryId: null },
      { id: 189, x: 17, y: 9, stone: null, territoryId: null },
      { id: 190, x: 18, y: 9, stone: null, territoryId: null },

      { id: 191, x: 0, y: 10, stone: null, territoryId: null },
      { id: 192, x: 1, y: 10, stone: null, territoryId: null },
      { id: 193, x: 2, y: 10, stone: null, territoryId: null },
      { id: 194, x: 3, y: 10, stone: null, territoryId: null },
      { id: 195, x: 4, y: 10, stone: null, territoryId: null },
      { id: 196, x: 5, y: 10, stone: null, territoryId: null },
      { id: 197, x: 6, y: 10, stone: null, territoryId: null },
      { id: 198, x: 7, y: 10, stone: null, territoryId: null },
      { id: 199, x: 8, y: 10, stone: null, territoryId: null },
      { id: 200, x: 9, y: 10, stone: null, territoryId: null },
      { id: 201, x: 10, y: 10, stone: null, territoryId: null },
      { id: 202, x: 11, y: 10, stone: null, territoryId: null },
      { id: 203, x: 12, y: 10, stone: null, territoryId: null },
      { id: 204, x: 13, y: 10, stone: null, territoryId: null },
      { id: 205, x: 14, y: 10, stone: null, territoryId: null },
      { id: 206, x: 15, y: 10, stone: null, territoryId: null },
      { id: 207, x: 16, y: 10, stone: null, territoryId: null },
      { id: 208, x: 17, y: 10, stone: null, territoryId: null },
      { id: 209, x: 18, y: 10, stone: null, territoryId: null },

      { id: 210, x: 0, y: 11, stone: null, territoryId: null },
      { id: 211, x: 1, y: 11, stone: null, territoryId: null },
      { id: 212, x: 2, y: 11, stone: null, territoryId: null },
      { id: 213, x: 3, y: 11, stone: null, territoryId: null },
      { id: 214, x: 4, y: 11, stone: null, territoryId: null },
      { id: 215, x: 5, y: 11, stone: null, territoryId: null },
      { id: 216, x: 6, y: 11, stone: null, territoryId: null },
      { id: 217, x: 7, y: 11, stone: null, territoryId: null },
      { id: 218, x: 8, y: 11, stone: null, territoryId: null },
      { id: 219, x: 9, y: 11, stone: null, territoryId: null },
      { id: 220, x: 10, y: 11, stone: null, territoryId: null },
      { id: 221, x: 11, y: 11, stone: null, territoryId: null },
      { id: 222, x: 12, y: 11, stone: null, territoryId: null },
      { id: 223, x: 13, y: 11, stone: null, territoryId: null },
      { id: 224, x: 14, y: 11, stone: null, territoryId: null },
      { id: 225, x: 15, y: 11, stone: null, territoryId: null },
      { id: 226, x: 16, y: 11, stone: null, territoryId: null },
      { id: 227, x: 17, y: 11, stone: null, territoryId: null },
      { id: 228, x: 18, y: 11, stone: null, territoryId: null },

      { id: 229, x: 0, y: 12, stone: null, territoryId: null },
      { id: 230, x: 1, y: 12, stone: null, territoryId: null },
      { id: 231, x: 2, y: 12, stone: null, territoryId: null },
      { id: 232, x: 3, y: 12, stone: null, territoryId: null },
      { id: 233, x: 4, y: 12, stone: null, territoryId: null },
      { id: 234, x: 5, y: 12, stone: null, territoryId: null },
      { id: 235, x: 6, y: 12, stone: null, territoryId: null },
      { id: 236, x: 7, y: 12, stone: null, territoryId: null },
      { id: 237, x: 8, y: 12, stone: null, territoryId: null },
      { id: 238, x: 9, y: 12, stone: null, territoryId: null },
      { id: 239, x: 10, y: 12, stone: null, territoryId: null },
      { id: 240, x: 11, y: 12, stone: null, territoryId: null },
      { id: 241, x: 12, y: 12, stone: null, territoryId: null },
      { id: 242, x: 13, y: 12, stone: null, territoryId: null },
      { id: 243, x: 14, y: 12, stone: null, territoryId: null },
      { id: 244, x: 15, y: 12, stone: null, territoryId: null },
      { id: 245, x: 16, y: 12, stone: null, territoryId: null },
      { id: 246, x: 17, y: 12, stone: null, territoryId: null },
      { id: 247, x: 18, y: 12, stone: null, territoryId: null },

      { id: 248, x: 0, y: 13, stone: null, territoryId: null },
      { id: 249, x: 1, y: 13, stone: null, territoryId: null },
      { id: 250, x: 2, y: 13, stone: null, territoryId: null },
      { id: 251, x: 3, y: 13, stone: null, territoryId: null },
      { id: 252, x: 4, y: 13, stone: null, territoryId: null },
      { id: 253, x: 5, y: 13, stone: null, territoryId: null },
      { id: 254, x: 6, y: 13, stone: null, territoryId: null },
      { id: 255, x: 7, y: 13, stone: null, territoryId: null },
      { id: 256, x: 8, y: 13, stone: null, territoryId: null },
      { id: 257, x: 9, y: 13, stone: null, territoryId: null },
      { id: 258, x: 10, y: 13, stone: null, territoryId: null },
      { id: 259, x: 11, y: 13, stone: null, territoryId: null },
      { id: 260, x: 12, y: 13, stone: null, territoryId: null },
      { id: 261, x: 13, y: 13, stone: null, territoryId: null },
      { id: 262, x: 14, y: 13, stone: null, territoryId: null },
      { id: 263, x: 15, y: 13, stone: null, territoryId: null },
      { id: 264, x: 16, y: 13, stone: null, territoryId: null },
      { id: 265, x: 17, y: 13, stone: null, territoryId: null },
      { id: 266, x: 18, y: 13, stone: null, territoryId: null },

      { id: 267, x: 0, y: 14, stone: null, territoryId: null },
      { id: 268, x: 1, y: 14, stone: null, territoryId: null },
      { id: 269, x: 2, y: 14, stone: null, territoryId: null },
      { id: 270, x: 3, y: 14, stone: null, territoryId: null },
      { id: 271, x: 4, y: 14, stone: null, territoryId: null },
      { id: 272, x: 5, y: 14, stone: null, territoryId: null },
      { id: 273, x: 6, y: 14, stone: null, territoryId: null },
      { id: 274, x: 7, y: 14, stone: null, territoryId: null },
      { id: 275, x: 8, y: 14, stone: null, territoryId: null },
      { id: 276, x: 9, y: 14, stone: null, territoryId: null },
      { id: 277, x: 10, y: 14, stone: null, territoryId: null },
      { id: 278, x: 11, y: 14, stone: null, territoryId: null },
      { id: 279, x: 12, y: 14, stone: null, territoryId: null },
      { id: 280, x: 13, y: 14, stone: null, territoryId: null },
      { id: 281, x: 14, y: 14, stone: null, territoryId: null },
      { id: 282, x: 15, y: 14, stone: null, territoryId: null },
      { id: 283, x: 16, y: 14, stone: null, territoryId: null },
      { id: 284, x: 17, y: 14, stone: null, territoryId: null },
      { id: 285, x: 18, y: 14, stone: null, territoryId: null },

      { id: 286, x: 0, y: 15, stone: null, territoryId: null },
      { id: 287, x: 1, y: 15, stone: null, territoryId: null },
      { id: 288, x: 2, y: 15, stone: null, territoryId: null },
      { id: 289, x: 3, y: 15, stone: null, territoryId: null },
      { id: 290, x: 4, y: 15, stone: null, territoryId: null },
      { id: 291, x: 5, y: 15, stone: null, territoryId: null },
      { id: 292, x: 6, y: 15, stone: null, territoryId: null },
      { id: 293, x: 7, y: 15, stone: null, territoryId: null },
      { id: 294, x: 8, y: 15, stone: null, territoryId: null },
      { id: 295, x: 9, y: 15, stone: null, territoryId: null },
      { id: 296, x: 10, y: 15, stone: null, territoryId: null },
      { id: 297, x: 11, y: 15, stone: null, territoryId: null },
      { id: 298, x: 12, y: 15, stone: null, territoryId: null },
      { id: 299, x: 13, y: 15, stone: null, territoryId: null },
      { id: 300, x: 14, y: 15, stone: null, territoryId: null },
      { id: 301, x: 15, y: 15, stone: null, territoryId: null },
      { id: 302, x: 16, y: 15, stone: null, territoryId: null },
      { id: 303, x: 17, y: 15, stone: null, territoryId: null },
      { id: 304, x: 18, y: 15, stone: null, territoryId: null },

      { id: 305, x: 0, y: 16, stone: null, territoryId: null },
      { id: 306, x: 1, y: 16, stone: null, territoryId: null },
      { id: 307, x: 2, y: 16, stone: null, territoryId: null },
      { id: 308, x: 3, y: 16, stone: null, territoryId: null },
      { id: 309, x: 4, y: 16, stone: null, territoryId: null },
      { id: 310, x: 5, y: 16, stone: null, territoryId: null },
      { id: 311, x: 6, y: 16, stone: null, territoryId: null },
      { id: 312, x: 7, y: 16, stone: null, territoryId: null },
      { id: 313, x: 8, y: 16, stone: null, territoryId: null },
      { id: 314, x: 9, y: 16, stone: null, territoryId: null },
      { id: 315, x: 10, y: 16, stone: null, territoryId: null },
      { id: 316, x: 11, y: 16, stone: null, territoryId: null },
      { id: 317, x: 12, y: 16, stone: null, territoryId: null },
      { id: 318, x: 13, y: 16, stone: null, territoryId: null },
      { id: 319, x: 14, y: 16, stone: null, territoryId: null },
      { id: 320, x: 15, y: 16, stone: null, territoryId: null },
      { id: 321, x: 16, y: 16, stone: null, territoryId: null },
      { id: 322, x: 17, y: 16, stone: null, territoryId: null },
      { id: 323, x: 18, y: 16, stone: null, territoryId: null },

      { id: 324, x: 0, y: 17, stone: null, territoryId: null },
      { id: 325, x: 1, y: 17, stone: null, territoryId: null },
      { id: 326, x: 2, y: 17, stone: null, territoryId: null },
      { id: 327, x: 3, y: 17, stone: null, territoryId: null },
      { id: 328, x: 4, y: 17, stone: null, territoryId: null },
      { id: 329, x: 5, y: 17, stone: null, territoryId: null },
      { id: 330, x: 6, y: 17, stone: null, territoryId: null },
      { id: 331, x: 7, y: 17, stone: null, territoryId: null },
      { id: 332, x: 8, y: 17, stone: null, territoryId: null },
      { id: 333, x: 9, y: 17, stone: null, territoryId: null },
      { id: 334, x: 10, y: 17, stone: null, territoryId: null },
      { id: 335, x: 11, y: 17, stone: null, territoryId: null },
      { id: 336, x: 12, y: 17, stone: null, territoryId: null },
      { id: 337, x: 13, y: 17, stone: null, territoryId: null },
      { id: 338, x: 14, y: 17, stone: null, territoryId: null },
      { id: 339, x: 15, y: 17, stone: null, territoryId: null },
      { id: 340, x: 16, y: 17, stone: null, territoryId: null },
      { id: 341, x: 17, y: 17, stone: null, territoryId: null },
      { id: 342, x: 18, y: 17, stone: null, territoryId: null },

      { id: 343, x: 0, y: 18, stone: null, territoryId: null },
      { id: 344, x: 1, y: 18, stone: null, territoryId: null },
      { id: 345, x: 2, y: 18, stone: null, territoryId: null },
      { id: 346, x: 3, y: 18, stone: null, territoryId: null },
      { id: 347, x: 4, y: 18, stone: null, territoryId: null },
      { id: 348, x: 5, y: 18, stone: null, territoryId: null },
      { id: 349, x: 6, y: 18, stone: null, territoryId: null },
      { id: 350, x: 7, y: 18, stone: null, territoryId: null },
      { id: 351, x: 8, y: 18, stone: null, territoryId: null },
      { id: 352, x: 9, y: 18, stone: null, territoryId: null },
      { id: 353, x: 10, y: 18, stone: null, territoryId: null },
      { id: 354, x: 11, y: 18, stone: null, territoryId: null },
      { id: 355, x: 12, y: 18, stone: null, territoryId: null },
      { id: 356, x: 13, y: 18, stone: null, territoryId: null },
      { id: 357, x: 14, y: 18, stone: null, territoryId: null },
      { id: 358, x: 15, y: 18, stone: null, territoryId: null },
      { id: 359, x: 16, y: 18, stone: null, territoryId: null },
      { id: 360, x: 17, y: 18, stone: null, territoryId: null },
      { id: 361, x: 18, y: 18, stone: null, territoryId: null }
    ],
    playerStats: [
      { playerNumber: 1, prisonerCount: 0, passed: true },
      { playerNumber: 2, prisonerCount: 3, passed: true }
    ],
    previousState: ''
  },
  players: [
    { playerNumber: 1, name: 'Player', resigned: false },
    { playerNumber: 2, name: 'Computer', resigned: false }
  ],
  lastAction: null,
  notification: 'Player to move'
};

const generateMatch = function(): Match {
  return deepClone(match);
};

export default generateMatch;
