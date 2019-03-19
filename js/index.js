/*
Powerups:
1. Extra Time (10%)
2. Free space reveal (single, random space)
3. Lose Time (-10%)

*/

import { Board } from "./board.js";

let takenFirstStep = false;
let gameEnded = false;
const fiveMinutes = 5 * 60;

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

    const board = new Board(boardHeight, boardWidth, numOfMines, numOfMines);
    drawBoard(board);

    document.getElementById("slot").style.display = "block";
    document.getElementById("resetButton").style.display = "block";
    document.getElementById("cheatMode").style.display = "block";

    let slot = document.getElementById("slotButton");

    let count = 8;
    let one = Math.floor((Math.random()*9%4)+1);
    let two = Math.floor((Math.random()*9%4)+1);
    let three = Math.floor((Math.random()*9%4)+1);
      
    slot.onclick  = function(){

    if (count > 0)    
      {
          one = Math.floor((Math.random()*9%3)+1);
          two = Math.floor((Math.random()*9%3)+1);
          three = Math.floor((Math.random()*9%3)+1);
          count--;

          slot.value = "Spins: " + count;

          document.getElementById("num1").innerHTML = one;
          document.getElementById("num2").innerHTML = two;
          document.getElementById("num3").innerHTML = three;

          if(count == 0){
            slot.style.display = "none";
          }
         // board.freeSpaceReveal();
      }
      //win condition here
      if (one == two && one == three && one != null)    
      {
          //board.freeSpaceReveal();
      }
      else if(one == two || two == three || three == one){
          addTime();
      }
      else if(one != two && two != three && one != three){
          removeTime();
      }
}
  }
};

function drawBoard(board) {
  show(board);
  $(".square").on("click", function(e) {
    if(!gameEnded) {
    let xPos = Number($(this).attr("data-x-coordinate"));
    let yPos = Number($(this).attr("data-y-coordinate"));
    console.log("run:" + yPos, xPos);
    if (!takenFirstStep) {
      gameEnded = board.firstStep(yPos, xPos);
      takenFirstStep = true;
    } else {
      gameEnded = board.takeStep(yPos, xPos);
    }
    if (gameEnded) {
      board.unhideMines(); 
      board.numSpacesLeft? endScreen("lose") : endScreen("win");
    } 
    drawBoard(board);
    }
  });

  $(".square").mousedown(function(e) {
    if(!gameEnded) {
    const elementClicked = $(this);
    const xPos = elementClicked.attr("data-x-coordinate");
    const yPos = elementClicked.attr("data-y-coordinate");
    if (e.which == 3 && gameEnded == false) {
      board.toggleFlagSpace(yPos, xPos);
      drawBoard(board);
    }
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
    alert("Game Over. You lose.");
  }
  gameEnded = true;
}

//Handle countdown
//Taken from https://stackoverflow.com/questions/20618355/the-simplest-possible-javascript-countdown-timer
let timer = 0;
function startTimer(duration, display) {
  timer = duration;
  let minutes, seconds;
  var countdown = setInterval(function() {
    minutes = parseInt(timer / 60, 10);
    seconds = parseInt(timer % 60, 10);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    display.textContent = minutes + ":" + seconds;

    if (--timer < 0) {
      endScreen("lose");
      clearInterval(countdown);
    }
  }, 1000);
}

window.onload = function() {
  let display = document.querySelector("#time");
  startTimer(fiveMinutes, display);
};

function addTime() {
  let display = document.querySelector("#time");
  startTimer(timer + 30, display);
}

function removeTime() {
  console.log("func run");
  let display = document.querySelector("#time");
  if (timer > 30) {
    startTimer(timer - 30, display);
  } else {
    startTimer(0, display);
  }
}

function show(board) {
  $("#game").empty();
  for (let row = 0; row < board.numRows; row++) {
    let rowElement = $("<div>");
    rowElement.addClass("row");

    for (let col = 0; col < board.numCols; col++) {
      let squareElement = $("<div>");
      let square = board.m_board[row][col];
      if (!square.isHidden) {
        if (square.isMine) {
          squareElement.addClass("exploded-square");
        } else {
          squareElement.addClass("empty-square");
          if (square.numMines != 0) {
            squareElement.html(square.numMines);
          }
        }
      } else {
        squareElement.addClass("square");
        if (square.isFlagged) {
          squareElement.addClass("flagged-square");
        }
      }
      squareElement.attr("data-x-coordinate", col);
      squareElement.attr("data-y-coordinate", row);
      rowElement.append(squareElement);
    }
    $("#game").append(rowElement);
  }
}

/*
    Slot machine heavily adapted from 
    https://codereview.stackexchange.com/questions/51532/html-js-slot-machine-simulator    
*/

