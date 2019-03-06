class BoardSpace {
  constructor(numberMines) {
    this.isMine = false;
    this.isFlagged = false;
    this.isHidden = false;
    this.numMines = numberMines;
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
}
