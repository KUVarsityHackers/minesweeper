var dt = require("./boardspace.js");

class Board {
  constructor(xsize, ysize, nummine, flags) {
    this.numRows = xsize;
    this.numCols = ysize;
    this.numMines = nummine;
    this.numFlags = flags;
    this.numMinesFlagged = 0;
    this.m_board = new Array(xsize);
    for (let x = 0; x < xsize; x++) {
      this.m_board[x] = new Array(ysize);
      for (let y = 0; y < ysize; y++) {
        this.m_board[x][y] = new BoardSpace();
      }
    }
  }
  takeStep() {}
  firstStep() {}
  takeStep() {}
  placeBombs() {}
  recUnhide() {}
}
