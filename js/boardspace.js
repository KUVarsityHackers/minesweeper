export class BoardSpace {
  /**
   * @constructor
   */
  constructor() {
    this.isMine = false;
    this.isFlagged = false;
    this.isHidden = true;
    this.numMines = 0;
  }
}
