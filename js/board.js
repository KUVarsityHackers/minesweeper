import {BoardSpace} from './boardspace.js';
export class Board {
  constructor(rows, cols, mines, flags) {
    this.numRows = rows;
    this.numCols = cols;
    this.numMines = mines;
    this.numFlags = flags;
    this.numMinesFlagged = 0;
    this.m_board = new Array(this.numRows);
    for (let row = 0; row < this.numRows; row++) {
      this.m_board[row] = new Array(this.numCols);
      for (let col = 0; col < this.numCols; col++) {
        this.m_board[row][col] = new BoardSpace();
      }
    }
  }
  takeStep() {}
  firstStep() {}
  takeStep() {}

  toggleFlagSpace(row, col)
    {
      //see if the space is already flagged
      if (m_board[row][col].isFlagged)
      {
        m_board[row][col].isFlagged = false;

        //update number of mines correctly marked if this is a mine
        if (m_board[row][col].isMine)
        {
          this.numMinesFlagged--;
        }

      }
      //else if the space is not flagged, then remove
      else if (!m_board[row][col].isFlagged && this.numFlags>0)
      {
        m_board[row][col].isFlagged = true;
        this.numFlags--;

        //update number of mines correctly marked if this is a mine
        if (m_board[row][col].isMine)
        {
          this.numMinesFlagged++;
        }
      }
      //throw an exception if no flags remain
      else
      {
        throw "Out of flags";
      }
    }


  selectSpace(row, col)
  {
    //if mine
    if (m_board[row][col].isMine)
    {
      if (m_board[row][col].isFlagged)
      {
        return false;
      }
      if (m_board[row][col].isMine)
      {
        return true;
      }
    }
    else
    {
      recUnhide(row, col);
      return false;
    }
  }
  placeBombs() {}
  recUnhide() {}
}

