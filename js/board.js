import { BoardSpace } from "./boardspace.js";

export class Board {
  constructor(rows, cols, mines, flags) {
    this.numRows = rows;
    this.numCols = cols;
    this.numMines = mines;
    this.numFlags = flags;
    //this is likely not imortant anymore
    this.numMinesFlagged = 0;
    this.m_board = [];
    for (let i = 0; i < rows; i++) {
      this.m_board.push([]);
      for (let j = 0; j < cols; j++) {
        this.m_board[i].push(new BoardSpace());
      }
    }
  }
  takeStep(row, col) {
    return this.selectSpace(row, col);
  }

  firstStep(row, col) {
    this.placeBombs(row, col);
    this.calculateAround();
    this.selectSpace(row, col);
  }

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

  recUnhide(row, col) {
    /*
        Recursively unhide spaces until there are mines surrounding it
        Pre: 
            valid x and y coordinates
        Post: 
            Boardspaces are unhidden until there are nearby mines
        Args: 
            int row, int col
        Returns: 
            No return
    */
    this.m_board[row][col].isHidden = false;
    if (this.m_board[row][col].numMines == 0 && (!this.m_board[row][col].isMine) && (!this.m_board[row][col].isFlagged)) {
      for (let curRow = Math.max(row - 1, 0); curRow < Math.min(row + 2, this.numRows); curRow++) {
        for (let curCol = Math.max(col - 1, 0); curCol < Math.min(col + 2, this.numCols); curCol++) {
          if(this.m_board[curRow][curCol].isHidden && (!this.m_board[curRow][curCol].isMine) && (!this.m_board[curRow][curCol].isFlagged))
          {
            if(this.m_board[curRow][curCol].numMines == 0) {
              console.log("Rec unhide: " + curRow + ", " + curCol + " from " + row + ", " + col);
              this.recUnhide(curRow, curCol);
            }
            else {
              console.log("Type: " + String(typeof col));
              console.log("Normal unhide: " + curRow + ", " + curCol + " from " + row + ", " + col + "Max: " + Math.min(row + 2, this.numRows) + ", " + Math.min(col + 2, this.numCols));
              this.m_board[curRow][curCol].isHidden = false;
            }
          }
       }
     }
    }
  }

  toggleFlagSpace(row, col) {
    //see if the space is already flagged
    if (this.m_board[row][col].isFlagged) {
      this.m_board[row][col].isFlagged = false;
      this.numFlags++
      //update number of mines correctly marked if this is a mine
      if (this.m_board[row][col].isMine) {
        this.numMinesFlagged--;
      }
    }
    //else if the space is not flagged, then remove
    else if (!this.m_board[row][col].isFlagged && this.numFlags > 0) {
      this.m_board[row][col].isFlagged = true;
      this.numFlags--;

      //update number of mines correctly marked if this is a mine
      if (this.m_board[row][col].isMine) {
        this.numMinesFlagged++;
      }
    }
    //throw an exception if no flags remain
    else {
      throw "Out of flags";
    }
  }

  selectSpace(row, col) {
    //if mine
    if (this.m_board[row][col].isMine) {
      if (this.m_board[row][col].isFlagged) {
        return false;
      }
      return true;
    } else if (!this.m_board[row][col].isFlagged) {
      this.m_board[row][col].isHidden = false;
      if(this.m_board[row][col].numMines == 0) {
       this.recUnhide(row, col);
      }
    }
    return false;
  }

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
  calculateAround() {
    for (let y = 0; y < this.numRows; y++) {
      for (let x = 0; x < this.numCols; x++) {
        this.m_board[y][x].numMines = this.calculateNearby(y, x);
      }
    }
  }

  calculateNearby(row, col) {
    /*
        Determines nearby quantity of mines for a single board space
        Pre: 
            valid x and y coordinates
        Post: 
            individual boardspace knows how many mines surround it
        Args: 
            int row, int col
        Returns: 
            integer representing nearby mine count
    */
    if(this.m_board[row][col].isMine) {
      return 0;
    }
    let count = 0;
    for (let i = Math.max(row - 1, 0); i < Math.min(row + 2, this.numRows); i++) {
      for (let j = Math.max(col - 1, 0); j < Math.min(col + 2, this.numCols); j++) {
        if (this.m_board[i][j].isMine)  {
          count++;
        }
      }
    }
    return count;
  }

  freeSpaceReveal() {
    /*



  */
    //generate random number less modulo rows and cols
    //check if this space is unhidden and if it's a mine - never click on a mine
    let randRow = -1;
    let randCol = -1;

    while (
      randRow < -1 ||
      randCol < -1 ||
      randRow >= this.numRows ||
      randCol >= this.numCols ||
      !(this.m_board[randRow][randCol].isHidden &&
        !this.m_board[randRow][randCol].isMine)
    ) {
      randRow = Math.floor(Math.random() * 1000 + 1) % this.numRows;
      randCol = Math.floor(Math.random() * 1000 + 1) % this.numCols;
    }

    this.m_board[randRow][randCol].isHidden = false;
  }
}
