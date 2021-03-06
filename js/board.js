import { BoardSpace } from "./boardspace.js";

export class Board {
  /**
   * @constructor
   * @param {number} rows - Number of rows
   * @param {number} cols - Number of columns
   * @param {number} mines - Number of mines
   * @param {number} flags - Deprecated parameter
   */
  constructor(rows, cols, mines, flags) {
    this.numRows = rows;
    this.numCols = cols;
    this.numMines = mines;
    this.numFlags = flags;
    this.numSpacesLeft = rows * cols - mines;
    this.m_board = [];
    this.priorBoard = [];
    for (let i = 0; i < rows; i++) {
      this.m_board.push([]);
      for (let j = 0; j < cols; j++) {
        this.m_board[i].push(new BoardSpace());
      }
    }
  }

  /**
   * Currently only returns the result of calling selectSpace for the user's click coordinates
   * @param {number} row - The row of the user's click
   * @param {number} col - The column of the user's click
   * @returns {bool} - The game is over
   */
  takeStep(row, col) {
    return this.selectSpace(row, col);
  }

  /**
   * Takes the first step, initializing the board based on click location
   * @param {number} row - The row of the user's click
   * @param {number} col - The column of the user's click
   * @returns {bool} - The game is over
   */
  firstStep(row, col) {
    this.placeBombs(row, col);
    this.calculateAround();
    return this.selectSpace(row, col);
  }

  /**
   * Places bombs randomly in spaces that were not selected by user when initializing board
   * @param {number} row - The row of the user's click
   * @param {number} col - The column of the user's click
   */
  placeBombs(row, col) {
    let maxIndex = this.numRows * this.numCols;
    let mineIndex = new Array(maxIndex - 1).fill(false);

    //initializes certain number of bombs
    for (let i = 0; i < this.numMines; i++) {
      mineIndex[i] = true;
    }

    //shuffle array
    let swap;
    for (let i = mineIndex.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      swap = mineIndex[i];
      mineIndex[i] = mineIndex[j];
      mineIndex[j] = swap;
    }

    //populate board with bombs
    let collison = 0;
    for (let i = 0; i < this.numRows; i++) {
      for (let j = 0; j < this.numCols; j++) {
        if (i == row && j == col) {
          collison = 1;
        } else if (mineIndex[j + i * this.numCols - collison]) {
          this.m_board[i][j].isMine = true;
        }
      }
    }
  }
  /**
   * Recursively unhide spaces until there are no more contiguous spaces not touching mines
   * @param {number} row - The row of the space to be unhidden
   * @param {number} col - The column of the space to be unhidden
   */
  recUnhide(row, col) {
    this.m_board[row][col].isHidden = false;
    if (
      this.m_board[row][col].numMines == 0 &&
      !this.m_board[row][col].isMine &&
      !this.m_board[row][col].isFlagged
    ) {
      for (
        let curRow = Math.max(row - 1, 0);
        curRow < Math.min(row + 2, this.numRows);
        curRow++
      ) {
        for (
          let curCol = Math.max(col - 1, 0);
          curCol < Math.min(col + 2, this.numCols);
          curCol++
        ) {
          if (
            this.m_board[curRow][curCol].isHidden &&
            !this.m_board[curRow][curCol].isMine &&
            !this.m_board[curRow][curCol].isFlagged
          ) {
            if (this.m_board[curRow][curCol].numMines == 0) {
              this.recUnhide(curRow, curCol);
              this.numSpacesLeft--;
            } else {
              this.m_board[curRow][curCol].isHidden = false;
              this.numSpacesLeft--;
            }
          }
        }
      }
    }
  }

  /**
   * If cheatMode has been chosen, reveals bombs on board,and if the button is toggled back then it reverts to prior board
   * @param {boolean} cheatMode - Is the game being put in cheat mode
   */
  toggleCheatMode(cheatMode) {
    if (cheatMode) {
      this.priorBoard = [];
      for (let i in this.m_board) {
        this.priorBoard.push([]);
        for (let j in this.m_board[i]) {
          this.priorBoard[i].push(this.m_board[i][j].isHidden);
          this.m_board[i][j].isHidden = false;
        }
      }
    } else {
      for (let i in this.priorBoard) {
        for (let j in this.priorBoard[i]) {
          this.m_board[i][j].isHidden = this.priorBoard[i][j];
        }
      }
    }
  }

  /**
   * Toggles the flag on a space
   * @param {number} row - The row of the space to be flagged
   * @param {number} col - The column of the space to be flagged
   */
  toggleFlagSpace(row, col) {
    //see if the space is already flagged
    if (this.m_board[row][col].isFlagged) {
      this.m_board[row][col].isFlagged = false;
      this.numFlags++;
    }
    //else if the space is not flagged, then remove
    else if (!this.m_board[row][col].isFlagged) {
      this.m_board[row][col].isFlagged = true;
      this.numFlags--;
    }
    //throw an exception if no flags remain
    else {
      throw "Out of flags";
    }
  }

  /**
   * Either blows up the mine, unhides the space, or recursively unhides the area
   * @param {number} row - The row of the space the user clicked
   * @param {number} col - The column of the space the user clicked
   * @returns {boolean} - The game is over
   */
  selectSpace(row, col) {
    //if mine
    if (this.m_board[row][col].isMine) {
      if (this.m_board[row][col].isFlagged) {
        return false;
      }
      return true;
    } else if (!this.m_board[row][col].isFlagged) {
      this.m_board[row][col].isHidden = false;
      this.numSpacesLeft--;
      if (this.m_board[row][col].numMines <= 0) {
        this.recUnhide(row, col);
      }
    }
    if (!this.numSpacesLeft) {
      return true;
    }
    return false;
  }

  /**
   * Checks if the user has won the game
   * @returns {boolean} - The user has won
   */
  userWin() {
    //check to see if numMines is equal to unhidden spaces
    unHidden = 0;
    for (let r = 0; r < numRols; r++) {
      for (let c = 0; c < numCols; c++) {
        if (!this.m_board[r][c].isHidden) {
          unHidden++;
        }
      }
    }

    if (unHidden == this.numMines) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * Sets the number of mines around each square to be a calculated value
   */
  calculateAround() {
    for (let y = 0; y < this.numRows; y++) {
      for (let x = 0; x < this.numCols; x++) {
        this.m_board[y][x].numMines = this.calculateNearby(y, x);
      }
    }
  }

  /**
   * Determines the number of mines surrounding a board space
   * @param {number} row - Row of the square to be calculated
   * @param {number} col - Column of the square to be calculated
   * @returns {number} - The number of mines surrounding the square
   */
  calculateNearby(row, col) {
    if (this.m_board[row][col].isMine) {
      return 0;
    }
    let count = 0;
    for (
      let i = Math.max(row - 1, 0);
      i < Math.min(row + 2, this.numRows);
      i++
    ) {
      for (
        let j = Math.max(col - 1, 0);
        j < Math.min(col + 2, this.numCols);
        j++
      ) {
        if (this.m_board[i][j].isMine) {
          count++;
        }
      }
    }
    return count;
  }

  /**
   * Reveals a random space that is not a bomb for the power-up
   */
  freeSpaceReveal() {
    let randRow;
    let randCol;
    do {
      randRow = Math.floor(Math.random() * this.numRows);
      randCol = Math.floor(Math.random() * this.numCols);
    } while (
      !this.m_board[randRow][randCol].isHidden ||
      this.m_board[randRow][randCol].isMine ||
      this.m_board[randRow][randCol].isFlagged
    );
    this.recUnhide(randRow, randCol);
  }

  /**
   * Toggles whether the mines can be seen by the user
   * @param {boolean} hidden - Whether it should unhide or hide the mines
   */
  unhideMines(hidden = true) {
    for (let x = 0; x < this.numRows; x++) {
      for (let y = 0; y < this.numCols; y++) {
        if (this.m_board[x][y].isMine == true) {
          this.m_board[x][y].isHidden = !hidden;
        }
      }
    }
  }
}
