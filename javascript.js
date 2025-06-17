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
      userWinCheck(board);
      return true;
    } else {
      console.log("cell is filled");
      return false;
    }
  };

  const userWinCheck = function (board) {
    const rowWinX = ["X", "X", "X"];
    const rowWinO = ["O", "O", "O"];
    const colWinX = [["0X"], ["0X"], ["0X"]];
    let winner = "";
    printBoard();
    //loop for checking is the array contain X, and if the X exist return the col index
    //basically is returning the value only
    let checkX = board.map(function (row, rowIndex) {
      return row.map(function (col, colIndex) {
        if (col.getCellValue() === "X") {
          return "X";
        } else if (col.getCellValue() === "O") {
          return "O";
        } else {
          return " ";
        }
      });
    });

    //loop for, after check X is exist, and return col index in new array from above
    // check if any row contain same data with win condition
    const checkWinner = function (checkX) {
      //rowCheck
      let checkforRow = checkX
        .map(function (perArray, indexrow) {
          //check per row
          if (perArray.toString() === rowWinX.toString()) {
            winner = "x";
            return true;
          } else if (perArray.toString() === rowWinO.toString()) {
            winner = "o";
            return false;
          }
        })
        .find(function (item) {
          if (item === true || item === false) {
            return true;
          }
        });

      //check diagonal
      // const checkDiagonalX = function (checkX) {
      //   const xWinFormat = [true, true, true];
      //   const oWinFormat = [false, false, false];
      //   let reverseArray = checkX.slice().reverse();
      //   let unreverseArray = checkX;
      //   const checkDiagonal = function (data) {
      //     return data.map(function (row, rowIndex) {
      //       if (row[rowIndex] === "X") {
      //         return true;
      //       } else {
      //         return false;
      //       }
      //     });
      //   };
      //   let reverse = checkDiagonal(reverseArray);
      //   let unreverse = checkDiagonal(unreverseArray);
      //   console.log("hasil: ", reverse, unreverse);

      //   if (
      //     reverse.toString() === xWinFormat.toString() ||
      //     unreverse.toString() === xWinFormat.toString()
      //   ) {
      //     return true;
      //   }
      // };

      //check col
      // const checkCol = function (checkX) {
      //   const winX = [true, true, true];
      //   const winO = [false, false, false];
      //   let checktheCol = checkX
      //     .map(function (row, rowIndex, array) {
      //       let colResult = row.map(function (col, colIndex) {
      //         if (array[colIndex][rowIndex] === "X") {
      //           return true;
      //         } else if (array[colIndex][rowIndex] === "O") {
      //           return false;
      //         }
      //       });
      //       if (colResult.toString() === winX.toString()) {
      //         return true;
      //       } else if (colResult.toString() === winO.toString()) {
      //         return false;
      //       }
      //     })
      //     .find(function (item) {
      //       if (item === true || item === false) {
      //         return true;
      //       }
      //     });

      //   return checktheCol;
      // };
      console.log("cek row", checkforRow);
    };
    console.log("checkWinner: ", checkWinner(checkX));
  };

  const printBoard = function () {
    const boardThatCellsValueIsGeneratedNotTheFunction = board.map(function (
      row
    ) {
      return row.map(function (cell) {
        return cell.getCellValue();
      });
    });
    console.log(boardThatCellsValueIsGeneratedNotTheFunction);
  };

  return { printBoard: printBoard, markCell: markCell };
}

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
    console.log("now playing: ", getCurrentPlayer().player);
    board.printBoard();
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
