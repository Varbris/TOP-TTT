function titatoBoard() {
  const rows = 3;
  const columns = 3;
  const board = [];

  for (var i = 0; i < rows; i++) {
    board[i] = [];
    for (var j = 0; j < columns; j++) {
      board[i].push(markedCell());
    }
  }

  const markCell = function (row, column, playerMark) {
    if (row > 2 || column > 2) {
      console.log("your input row or column is beyond 2");
      return false;
    }

    const isCellNotFilled =
      board[row][column].getCellValue() === " " ? true : false;

    if (isCellNotFilled) {
      board[row][column].changeCellValue(playerMark);
      return true;
    } else {
      console.log("cell is filled");
      return false;
    }
  };

  const getBoardValue = function () {
    const boardThatCellsValueIsGeneratedNotTheFunction = board.map(function (
      row
    ) {
      return row.map(function (cell) {
        return cell.getCellValue();
      });
    });
    return boardThatCellsValueIsGeneratedNotTheFunction;
  };

  return { getBoardValue: getBoardValue, markCell: markCell, board: board };
}

const checkBoardWinner = function (theBoard) {
  const rowWinX = ["X", "X", "X"];
  const rowWinO = ["O", "O", "O"];
  const winX = [true, true, true];
  const winO = [false, false, false];

  //rowCheck
  let checkforRow = function (boardData) {
    let result = boardData
      .map(function (perArray) {
        //check per row
        if (perArray.toString() === rowWinX.toString()) {
          return true;
        } else if (perArray.toString() === rowWinO.toString()) {
          return false;
        }
      })
      .find(function (item) {
        if (item === true || item === false) {
          return true;
        }
      });

    return result;
  };

  //check diagonal
  const checkDiagonal = function (boardData) {
    let reverseArray = boardData.slice().reverse();
    let unreverseArray = boardData;
    const checkDiagonal = function (data) {
      return data.map(function (row, rowIndex) {
        if (row[rowIndex] === "X") {
          return true;
        } else if (row[rowIndex] === "O") {
          return false;
        } else {
          return undefined;
        }
      });
    };
    let reverse = checkDiagonal(reverseArray);
    let unreverse = checkDiagonal(unreverseArray);

    if (
      reverse.toString() === winX.toString() ||
      unreverse.toString() === winX.toString()
    ) {
      return true;
    } else if (
      reverse.toString() === winO.toString() ||
      unreverse.toString() === winO.toString()
    ) {
      return false;
    } else {
      return undefined;
    }
  };

  //check col
  const checkCol = function (boardData) {
    let checktheCol = boardData
      .map(function (row, rowIndex, array) {
        let colResult = row.map(function (col, colIndex) {
          if (array[colIndex][rowIndex] === "X") {
            return true;
          } else if (array[colIndex][rowIndex] === "O") {
            return false;
          }
        });
        if (colResult.toString() === winX.toString()) {
          return true;
        } else if (colResult.toString() === winO.toString()) {
          return false;
        }
      })
      .find(function (item) {
        if (item === true || item === false) {
          return true;
        }
      });
    return checktheCol;
  };

  //check board emptyness
  const isBoardEmpty = function (boardData) {
    let result = boardData
      .map(function (item) {
        return item.map(function (item2) {
          if (item2 === " ") {
            return true;
          } else {
            return false;
          }
        });
      })
      .map(function (item) {
        if (item[0] === false && item[1] === false && item[2] === false) {
          return false;
        } else {
          return undefined;
        }
      });
    if (result[0] === false && result[1] === false && result[2] === false) {
      return false;
    } else {
      return true;
    }
  };

  //!refactor this code later
  //main function check all condition
  let funcArr = [checkforRow, checkDiagonal, checkCol];
  let resultArr = funcArr
    .map(function (item) {
      return item(theBoard);
    })
    .find(function (item) {
      if (item === true || item === false) {
        return true;
      } else {
        return undefined;
      }
    });
  if (resultArr === true || resultArr === false) {
    return resultArr;
  } else if (resultArr === undefined && isBoardEmpty(theBoard) === false) {
    return "tie";
  }
};

function markedCell() {
  let cells = " ";

  const changeCellValue = function (mark) {
    return (cells = mark);
  };

  const getCellValue = function () {
    return cells;
  };

  return {
    getCellValue: getCellValue,
    changeCellValue: changeCellValue,
  };
}

function gameStart() {
  const board = titatoBoard();
  const winChecker = checkBoardWinner;

  const players = [
    { player: "player1", mark: "X" },
    {
      player: "player2",
      mark: "O",
    },
  ];

  let currentPlayer = players[0];

  const getCurrentPlayer = function () {
    return currentPlayer;
  };

  const switchPlayer = function () {
    if (currentPlayer === players[0]) {
      currentPlayer = players[1];
    } else {
      currentPlayer = players[0];
    }
  };

  const printBoard = function () {
    const userWinCheck = winChecker(board.getBoardValue());
    console.log("userwincheck: ", userWinCheck);
    console.log(board.getBoardValue());
    if (userWinCheck === true) {
      console.log(
        "The Winner is the Mr. " + players[0].mark + " " + players[0].player
      );
      //!refactor this code later
      //countdown
      let time = 5;
      let endGame = setInterval(() => {
        console.log("Game Over!");
        console.log(time);
        time--;
        if (time < 0) {
          clearInterval(endGame);
          window.location.reload();
        }
      }, 1000);
    } else if (userWinCheck === false) {
      console.log(
        "The Winner is the Mr. " + players[1].mark + " " + players[1].player
      );
      //!refactor this code later
      //countdown
      let time = 5;
      let endGame = setInterval(() => {
        console.log("Game Over!");
        console.log(time);
        time--;
        if (time < 0) {
          clearInterval(endGame);
          window.location.reload();
        }
      }, 1000);
    } else if (userWinCheck === "tie") {
      console.log("Oops! its A tie everybody!");
      //!refactor this code later
      //countdown
      let time = 5;
      let endGame = setInterval(() => {
        console.log("Game Over!");
        console.log(time);
        time--;
        if (time < 0) {
          clearInterval(endGame);
          window.location.reload();
        }
      }, 1000);
    } else {
      console.log("now playing: ", getCurrentPlayer().player);
    }
  };

  const gameRound = function (row, column) {
    const markedCell = board.markCell(row, column, currentPlayer.mark);

    if (markedCell === true) {
      switchPlayer();
    }
    printBoard();
  };

  return {
    start: gameRound,
  };
}

const game = gameStart();
