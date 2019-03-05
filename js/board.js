class Board {
  constructor(xsize, ysize, nummine, flags) {
    this.numRows = xsize;
    this.numCols = ysize;
    this.numMines = nummine;
    this.numFlags = flags;
    this.numMinesFlagged = 0;
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
}

