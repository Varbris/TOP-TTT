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
