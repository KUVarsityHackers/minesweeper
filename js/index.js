/*
Powerups:
1. Extra Time (10%)
2. Free space reveal (single, random space)
3. Lose Time (-10%)

*/
import { Board } from "./board.js";
let board;
let gameEnded;

window.startGame = function startGame() {
  const boardHeight = Number(document.getElementById("boardHeight").value);
  const boardWidth = Number(document.getElementById("boardWidth").value);
  const numOfMines = Number(document.getElementById("mineAmount").value);

  const validBoardWidth = boardWidth >= 2 && boardWidth <= 50;
  const validBoardHeight = boardHeight >= 2 && boardHeight <= 50;
  const validNumOfMines =
    numOfMines >= 1 && numOfMines < boardHeight * boardWidth;

  const validGrid = validBoardWidth && validBoardHeight && validNumOfMines;

  if (!validGrid) {
    if (!validBoardHeight) {
      document.getElementById("boardHeight").classList.add("invalid");
    }
    if (!validBoardWidth) {
      document.getElementById("boardWidth").classList.add("invalid");
    }
    if (!validNumOfMines) {
      document.getElementById("mineAmount").classList.add("invalid");
    }
  } else {
    document.getElementById("setup").style.display = "none";
    document.getElementById("title").className = "playTitle";
    document.getElementById("resetButton").style.display = "block";

    board = new Board(boardHeight, boardWidth, numOfMines, numOfMines);
    drawBoard(board);
    gameEnded = 0;
  }
};

function drawBoard(board) {
  $("#game").empty();
  for (let row = 0; row < board.numRows; row++) {
    let rowElement = $("<div>");
    rowElement.addClass("row");
    for (let col = 0; col < board.numCols; col++) {
      let id = col + " " + row;
      let squareElement = $('<div id = "' + id + '">"');
      squareElement.addClass("square");
      // squareElement.append(arr[column][row].numNeighborMines);
      squareElement.attr("data-x-coordinate", col);
      squareElement.attr("data-y-coordinate", row);
      rowElement.append(squareElement);
    }
    $("#game").append(rowElement);
  }

  let takenFirstStep = false;
  $(".square").on("click", function() {
    $(this).addClass("empty-square");
    let xPos = $(this).attr("data-x-coordinate");
    let yPos = $(this).attr("data-y-coordinate");
    if (!takenFirstStep) {
      gameEnded = board.firstStep(xPos, yPos);
      document.getElementById("wheel").setAttribute("class", "");
      document.getElementById("clickToSpin").setAttribute("class", "");
      takenFirstStep = true;
    } else {
      gameEnded = board.takeStep(xPos, yPos);
    }
    if (!gameEnded) {
      show();
    } else {
      failShowMines();
    }
  });

  $(".square").mousedown(function(e) {
    const elementClicked = $(this);
    const xPos = elementClicked.attr("data-x-coordinate");
    const yPos = elementClicked.attr("data-y-coordinate");

    if (e.which == 3 && gameEnded == 0) {
      // if right-click
      /*if (arr[xPos][yPos].isFlagged == 1) {
        arr[xPos][yPos].isFlagged = 0;
        let elemID = xPos + " " + yPos;
        document.getElementById(elemID).className = "square";
        numSquaresFlaggedByUser--;
        if (arr[xPos][yPos].isBomb == 1) {
          numSquaresCorrectlyFlaggedByUser--;
        }
      } else if (
        arr[xPos][yPos].isFlagged == 0 &&
        arr[xPos][yPos].isClicked == 0
      ) {
        arr[xPos][yPos].isFlagged = 1;
        let elemID = xPos + " " + yPos;
        document.getElementById(elemID).className = "flagged-square";
  
        numSquaresFlaggedByUser++;
        if (arr[xPos][yPos].isBomb == 1) {
          numSquaresCorrectlyFlaggedByUser++;
        }
        if (
          numSquaresCorrectlyFlaggedByUser == userNumOfMines &&
          numSquaresFlaggedByUser == userNumOfMines
        ) {
          endScreen("win"); //end screen
        }
      }*/
      board.toggleFlagSpace(xPos, yPos);
    }
  });
}

// /**
//  * Going square by square, check all neighboring mines one by one.
//  * If bomb found, itterate numMinesFound up by one. Set final value to arr[x][y]
//  */
//
// /**
//  * on user clicking on a grid square. **Just For testing: should display (x, y) coordinates on grid click, plus number of times a spesific square has been clicked on
//  * @param {Number} x - x coordinate
//  * @param {Number} y - y coordinate
//  */
// function onClicked(x, y) {
//   if (gameEnded == 0) {
//     recHelperFunction(x, y);
//     //If the total number of squares minus the number of clicked squares equals the number of bombs, only bombs must be left and should auto-win
//     //Also check for if coordinate (x,y) is a bomb, caused issues of both fail and win messages popping up
//     if (
//       gridSize * gridSize - numOfClickedOnSquares == userNumOfMines &&
//       arr[x][y].isBomb == 0
//     ) {
//       allNonMinesFound();
//       return;
//     }
//   } else {
//     return;
//   }
// }

// function userClick(x, y) {
//   arr[x][y].isClicked = 1;
//   numOfClickedOnSquares = numOfClickedOnSquares + 1;
//   let elemID = x + " " + y;
//   document.getElementById(elemID).className = "empty-square";
//   document.getElementById(elemID).innerHTML = arr[x][y].numNeighborMines;
//   if (arr[x][y].numNeighborMines == "0") {
//     document.getElementById(elemID).className += " zero";
//   }
//   return;
// }

// /**
//  * fail-state, displays all mines in red
//  */
// function failShowMines() {
//   for (let x = 0; x < gridSize; x++) {
//     for (let y = 0; y < gridSize; y++) {
//       if (arr[x][y].isBomb == 1) {
//         //If it's a bomb, show it as 'exploded'
//         let elemID = x + " " + y;
//         document.getElementById(elemID).className = "exploded-square";
//       }

//       if (arr[x][y].isBomb == 0 && arr[x][y].isClicked == 0) {
//         //If not a bomb, show it as 'clicked'
//         userClick(x, y);
//         arr[x][y].isClicked = 0; //'unclick', since user didn't actually click, just for show on end game
//       }
//     }
//   }
// }

// function allNonMinesFound() {
//   for (let x = 0; x < gridSize; x++) {
//     for (let y = 0; y < gridSize; y++) {
//       if (arr[x][y].isBomb == 1) {
//         //if bomb, show it as 'flagged'
//         let elemID = x + " " + y;
//         document.getElementById(elemID).className = "flagged-square";
//       }
//     }
//   }
//   endScreen("win"); //end screen
// }

function endScreen(condition) {
  if (condition == "win") {
    alert("You Won!");
  } else {
    alert("Game Over. Try again?");
  }
  gameEnded = 1;
}

//Handle countdown
//Taken from https://stackoverflow.com/questions/20618355/the-simplest-possible-javascript-countdown-timer
let timer = 0;
function startTimer(duration, display) {
  (timer = duration), minutes, seconds;
  setInterval(function() {
    minutes = parseInt(timer / 60, 10);
    seconds = parseInt(timer % 60, 10);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    display.textContent = minutes + ":" + seconds;

    if (--timer < 0) {
      timer = duration;
    }
  }, 1000);
}

window.onload = function() {
  var fiveMinutes = 60 * 5,
    display = document.querySelector("#time");
  startTimer(fiveMinutes, display);
};

function addTime() {
  startTimer(timer + 30, display);
}

console.log("above func call");
removeTime();

function removeTime() {
  console.log("func run");
  if (timer > 30) {
    startTimer(timer - 30, display);
  } else {
    startTimer(0, display);
  }
}

function show() {
  let printer = [];
  for (let x = 0; x < board.numRows; x++) {
    for (let y = 0; y < board.numCols; y++) {
      printer.push(board.m_board[x][y].getSpace());
    }
    console.log(printer);
    printer = [];
  }
  for (let x = 0; x < board.numRows; x++) {
    for (let y = 0; y < board.numCols; y++) {
      if (typeof board.m_board[x][y].getSpace() == "number") {
        let elemID = x + " " + y;
        document.getElementById(elemID).className = "empty-square";
        if (board.m_board[x][y].getSpace() != 0) {
          document.getElementById(elemID).innerHTML = board.m_board[x][
            y
          ].getSpace();
        }
      } else if (board.m_board[x][y].getSpace() == "f") {
        let elemID = x + " " + y;
        document.getElementById(elemID).className = "flagged-square";
      }
    }
  }
}
function failShowMines() {
  for (let x = 0; x < board.numRows; x++) {
    for (let y = 0; y < board.numCols; y++) {
      if (board.m_board[x][y].isMine == true) {
        //If it's a bomb, show it as 'exploded'
        let elemID = x + " " + y;
        document.getElementById(elemID).className = "exploded-square";
      }
    }
  }
}
