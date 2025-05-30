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
    board[row][column].changeCellValue(playerMark);
    printBoard();
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
  var test = titatoBoard();
  test.printBoard();

  const gameRound = function (row, column, player) {
    test.markCell(row, column, player);
  };

  return {
    gameStart: gameRound,
  };
}

const game = gameStart();
