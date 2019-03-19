/*
Powerups:
1. Extra Time (10%)
2. Free space reveal (single, random space)
3. Lose Time (-10%)

*/

import { Board } from "./board.js";

let takenFirstStep = false;
let gameEnded = false;
const fiveMinutes = 60 * 5;
let cheatMode = false;

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
    document.getElementById("cheatButton").onclick = () => {toggleCheatMode(board)};

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
    board.unhideMines(false)
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
      drawBoard(board);
      setTimeout( function () {board.numSpacesLeft ? endScreen("lose") : endScreen("win")}, 100);
    } 
    drawBoard(board);
    }
  });

  $(".square").mousedown(function(e) {
    if(!gameEnded) {
    board.unhideMines(false)
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

function toggleCheatMode(board) {
  if (!takenFirstStep){
    alert("Please select a space before you bother cheating.");
  }
  else if (!gameEnded) {
    cheatMode = !cheatMode;
    board.toggleCheatMode(cheatMode);
    document.getElementById("cheatButton").innerHTML = (cheatMode) ? "Uncheat" : "Cheat";
    drawBoard(board);
  }
  else {
    alert("You cannot cheat. The game is over.");
  }
}

function endScreen(condition) {
  gameEnded = true;
  if (condition == "win") {
    alert("You Won!");
  } else if (condition == "time") {
    alert("You ran out of time. Game Over.");
  }
  else {
    alert("You dug up a mine. Game Over.");
  }

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
      endScreen("time");
      clearInterval(countdown);
    }
  }, 1000);
}

window.onload = function() {
  let display = document.querySelector("#time");
  startTimer(fiveMinutes, display);
};

function addTime() {
  timer = timer + 30;
}

function removeTime() {
  timer = (timer > 30) ? timer - 30 : 0;
}

function show(board) {
  $("#game").empty();
  if(gameEnded) {
    board.unhideMines();
  }
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

