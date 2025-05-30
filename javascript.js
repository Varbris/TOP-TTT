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

  return { printBoard: printBoard };
}

function markedCell() {
  const cells = "";

  const getCellValue = function () {
    return cells;
  };

  return {
    getCellValue: getCellValue,
  };
}

function gameStart() {
  var test = titatoBoard();
  test.printBoard();
}

const game = gameStart();
