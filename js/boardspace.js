export class BoardSpace {
  constructor() {
    this.isMine = false;
    this.isFlagged = false;
    this.isHidden = true;
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
