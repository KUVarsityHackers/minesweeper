export class BoardSpace {
  constructor() {
    this.isMine = false;
    this.isFlagged = false;
    this.isHidden = false;
    this.numMines = 0;
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
      return false;
    } else if (!this.isMine) {
      return this.numMines;
    } else if (this.isHidden) {
      return "_";
    } else {
      return "b";
    }
  }
};
