export class BoardSpace {
  constructor() {
    this.isMine = false;
    this.isFlagged = false;
    this.isHidden = true;
    this.numMines = 0;
  }

  BoardSpace(boardSpace) {
    this.isMine = boardSpace.isMine;
    this.isFlagged = boardSpace.isFlagged;
    this.isHidden = boardSpace.isHidden;
    this.numMines = boardSpace.numMines;
  }

  showSpace() {
    if (!this.isMine) {
      return this.numMines;
    } else {
      return "b";
    }
  }

  getSpace() {
    if (this.isFlagged) {
      return "f";
    } else if (this.isHidden) {
      return "_";
    } else if (!this.isMine) {
      return this.numMines;
    } else {
      return "b";
    }
  }
}
