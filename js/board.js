import {BoardSpace} from './boardspace.js';

export class Board {
  constructor(rows, cols, mines, flags) {
    this.numRows = rows;
    this.numCols = cols;
    this.numMines = mines;
    this.numFlags = flags;
    //this is likely not imortant anymore
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
  
  
  firstStep(row, col) 
  {
    placeBombs(row,col);
    calculateNearby();
    selectSpace(row,col);
  }

  placeBombs() {}

  recUnhide() {}

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

  userWin()
  {
    //check to see if numMines is equal to unhidden spaces
    unHidden = 0;
    for (let r = 0; r< numRols; r++)
    {
      for (let c = 0; c < numCols; c++)
      {
        if (!m_board[r][c].isHidden)
        {
          unHidden++;
        }
      }
    }

    if (unHidden == this.numMines)
    {
      return true;
    }
    else
    {
      return false;
    }
  }
}

