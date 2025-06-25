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

  console.log(board);

  const markCell = function (row, column, playerMark) {
    if (row > 2 || column > 2) {
      console.log("your input row or column is beyond 2");
      return false;
    }

    const isCellNotFilled =
      board[row][column].getCellValue() === " " ? true : false;

    if (isCellNotFilled) {
      board[row][column].changeCellValue(playerMark);
      board[row][column].changeColStatus();
      return true;
    } else {
      console.log("cell is filled");
      return false;
    }
  };

  const getBoardVar = function () {
    return board;
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

  return {
    getBoardValue: getBoardValue,
    markCell: markCell,
    getBoardVar: getBoardVar,
  };
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
  let isCellFilled = false;

  const getColStatus = function () {
    return isCellFilled;
  };

  const changeColStatus = function () {
    isCellFilled = true;
  };

  const changeCellValue = function (mark) {
    return (cells = mark);
  };

  const getCellValue = function () {
    return cells;
  };

  return {
    getCellValue: getCellValue,
    changeCellValue: changeCellValue,
    getColStatus,
    changeColStatus,
  };
}

function gameTTT() {
  const board = titatoBoard();
  const winChecker = checkBoardWinner;

  const players = [
    { player: "player1", mark: "X" },
    {
      player: "player2",
      mark: "O",
    },
  ];

  const changePlayerName = function (player1 = "player1", player2 = "player2") {
    return players.map(function (item, index) {
      if (index === 0) {
        item.player = player1;
      } else if (index === 1) {
        item.player = player2;
      }
    });
  };

  let currentPlayer = players[0];

  const getPlayerObj = function (mark) {
    return players.find(function (item) {
      if (item.mark === mark) {
        return true;
      }
    });
  };
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

  const checkWinner = function () {
    const userWinCheck = winChecker(board.getBoardValue());
    console.log("userwincheck: ", userWinCheck);
    console.log(board.getBoardValue());
    if (userWinCheck === true) {
      console.log(
        "The Winner is the Mr. " + players[0].mark + " " + players[0].player
      );
    } else if (userWinCheck === false) {
      console.log(
        "The Winner is the Mr. " + players[1].mark + " " + players[1].player
      );
    } else if (userWinCheck === "tie") {
      console.log("Oops! its A tie everybody!");
    } else {
      console.log("now playing: ", getCurrentPlayer().player);
    }
    return userWinCheck;
  };

  const gameRound = function (row, column) {
    const markedCell = board.markCell(row, column, currentPlayer.mark);

    if (markedCell === true) {
      switchPlayer();
    }
    checkWinner();
  };

  return {
    start: gameRound,
    getBoardVar: board.getBoardVar(),
    getCurrentPlayer: getCurrentPlayer,
    checkWinner,
    changePlayerName,
    getPlayerObj,
  };
}

function screenController() {
  const board = gameTTT();
  const uiGameBoard = document.getElementById("gameBoard");
  const article = document.getElementById("mainArticle");
  const currentPlayer = document.createElement("h1");
  const mainMenu = document.getElementById("mainMenuModal");
  let isPlayClicked = false;
  let isColFilled = false;

  const updateScreen = function () {
    const getWinner = board.checkWinner();

    uiGameBoard.textContent = "";
    currentPlayer.textContent = "";
    currentPlayer.textContent =
      "Current player: " + board.getCurrentPlayer().player;
    article.prepend(currentPlayer);

    if (getWinner === true || getWinner === false || getWinner === "tie") {
      displayWinnerModal(getWinner);
      showCurrentBoard();
    } else {
      showCurrentBoard();
    }
  };

  const showCurrentBoard = function () {
    const boardArr = board.getBoardVar;
    boardArr.forEach(function (row, rowIndex) {
      row.forEach(function (col, colIndex) {
        const button = document.createElement("button");
        button.dataset.colIndex = colIndex;
        button.dataset.rowIndex = rowIndex;
        button.dataset.isFilled = col.getColStatus();
        button.classList.add("cell");
        if (col.getCellValue() === "X" || col.getCellValue() === "O") {
          button.textContent = col.getCellValue();
        } else {
          button.textContent = "⠀";
        }
        uiGameBoard.appendChild(button);
      });
    });
  };
  const displayWinnerModal = function (winner) {
    const modal = document.getElementById("winnerModal");
    const paragraph = document.createElement("p");

    if (winner === "tie") {
      paragraph.textContent = "It's a Tie Everybody!!!!!";
      modal.prepend(paragraph);
    } else if (winner === true) {
      paragraph.textContent =
        "The winner is Mr. " +
        board.getPlayerObj("X").mark +
        ", " +
        board.getPlayerObj("X").player;
      modal.prepend(paragraph);
    } else if (winner === false) {
      paragraph.textContent =
        "The winner is Mr. " +
        board.getPlayerObj("O").mark +
        ", " +
        board.getPlayerObj("O").player;
      modal.prepend(paragraph);
    }
    restartButton.addEventListener("click", function () {
      window.location.reload();
    });

    modal.showModal();
  };

  const displayMenuModal = function (isPlayClicked) {
    if (isPlayClicked) {
      updateScreen();
    } else {
      mainMenu.showModal();
    }
  };

  const displayWarningModal = function () {
    const modal = document.getElementById("warningModal");
    modal.textContent = "";
    const paragraph = document.createElement("p");
    paragraph.textContent = "The Cell is Already Filled!";
    modal.append(paragraph);
    modal.showModal();
    setTimeout(function () {
      modal.close();
    }, 2000);
  };

  uiGameBoard.addEventListener("click", function (event) {
    let target = event.target;
    if (target.tagName !== "BUTTON") return;
    const rowIndex = target.dataset.rowIndex;
    const colIndex = target.dataset.colIndex;
    board.start(rowIndex, colIndex);
    updateScreen();
    //check if user click the same col again
    if (target.dataset.isFilled === "true") {
      displayWarningModal();
    }
  });

  const playerForm = document.getElementById("playerForm");
  playerForm.addEventListener("submit", function (e) {
    e.preventDefault();
    mainMenu.close();
    isPlayClicked = true;
    const player1Name = document.getElementById("player1").value;
    const player2Name = document.getElementById("player2").value;
    board.changePlayerName(player1Name, player2Name);
    displayMenuModal(isPlayClicked);
  });
  displayMenuModal(isPlayClicked);
}

screenController();
