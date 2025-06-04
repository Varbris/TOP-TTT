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
    const rowWinX = ["0X", "1X", "2X"];
    const rowWinO = ["0O", "1O", "2O"];
    let winner = "";
    printBoard();
    //loop for checking is the array contain X, and if the X exist return the col index
    let checkX = board.map(function (row, rowIndex) {
      return row.map(function (col, colIndex) {
        if (col.getCellValue() === "X") {
          return colIndex + "X";
        } else if (col.getCellValue() === "O") {
          return colIndex + "O";
        }
      });
    });

    //loop for, after check X is exist, and return col index in new array from above
    // check if any row contain same data with win condition
    const checkWinner = function (checkX) {
      console.log(checkX);
      let checkforX = checkX
        .map(function (perArray) {
          if (perArray.toString() === rowWinX.toString()) {
            winner = "x";
            return true;
          } else if (perArray.toString() === rowWinO.toString()) {
            winner = "o";
            return true;
          } else {
            return false;
          }
        })
        .filter(function (item) {
          return item === true;
        });

      return checkforX;
    };
    console.log("awerikaower", checkWinner(checkX), winner);
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
    gameStart: gameRound,
  };
}

const game = gameStart();
