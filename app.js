const gameBoard = (function () {
  const board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];

  const getValue = function (row, col) {
    return board[row][col];
  };
  const setValue = function (row, col, value) {
    board[row][col] = value;
  };

  const getBoard = function () {
    // creating a deep copy of board and returning
    return JSON.parse(JSON.stringify(board));
  };

  return { getValue, setValue, getBoard };
})();

const displayController = (function () {
  const cells = document.querySelectorAll(".board > *");
  for (const cell of cells) {
    cell.addEventListener("click", function name() {
      // early return if game is over
      if (checkGameStatus()) {
        return;
      }
      const row = this.dataset.row;
      const col = this.dataset.col;
      updateGameBoard(row, col);
      updateDisplay(this, row, col);
      checkGameStatus();
    });
  }

  let currentValue = "X";

  const updateGameBoard = function (row, col) {
    if (gameBoard.getValue(row, col) === "") {
      gameBoard.setValue(row, col, currentValue);
      currentValue = currentValue === "X" ? "O" : "X";
    }
  };

  const updateDisplay = function (cell, row, col) {
    cell.innerText = gameBoard.getValue(row, col);
  };

  const checkGameStatus = function () {
    const gameOver = game.isGameOver();
    const gameOutcome = document.querySelector(".gameOutcome");
    if (gameOver) {
      gameOutcome.innerText = `Player ${gameOver.toUpperCase()} wins`;
      gameOutcome.classList.add("winner");
      return gameOver;
    } else if (game.allCellsFilled()) {
      gameOutcome.innerText = `It is a draw`;
      gameOutcome.classList.add("draw");
    }
  };

  // controls for taking game details input
  const gameDetails = document.querySelector(".gameDetails");
  const playerDetailsForm = document.querySelector("#playerDetails");
  const vsComputer = document.querySelector("#vsComputer");

  const playWithComputer = function () {
    return vsComputer.checked;
  };

  vsComputer.addEventListener("change", function () {
    const p2NameInput = document.querySelector("#p2Name");
    const p2Div = p2NameInput.parentElement;
    if (playWithComputer()) {
      p2Div.classList.add("hide");
      p2NameInput.required = false;
    } else {
      p2Div.classList.remove("hide");
    }
  });

  playerDetailsForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const p1Name = document.querySelector("#p1Name").value;
    const p2Name = document.querySelector("#p2Name").value;

    player.makePlayer(p1Name, "X");

    if (playWithComputer()) {
      player.makePlayer("Computer", "O");
    } else {
      player.makePlayer(p2Name, "O");
    }

    // hide gameDetails and show playArea
    const playArea = document.querySelector(".playArea");
    playArea.classList.toggle("hide");
    gameDetails.classList.toggle("hide");
  });
})();

const game = (function () {
  let board = gameBoard.getBoard();

  const cloneBoard = function () {
    board = gameBoard.getBoard();
  };

  const isRowSame = function () {
    for (let row of board) {
      if (row[0] === row[1] && row[1] === row[2]) {
        return row[0];
      }
    }
    return false;
  };
  const isColSame = function () {
    for (let col = 0; col < 3; col++) {
      if (board[0][col] === board[1][col] && board[1][col] === board[2][col]) {
        return board[0][col];
      }
    }
    return false;
  };

  const isDiagonalSame = function () {
    if (board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
      return board[0][0];
    } else if (board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
      return board[0][2];
    } else {
      return false;
    }
  };

  const allCellsFilled = function () {
    const board = gameBoard.getBoard();
    for (let row of board) {
      for (let elem of row) {
        if (elem === "") {
          return false;
        }
      }
    }
    return true;
  };

  const isGameOver = function () {
    cloneBoard();
    return isRowSame() || isColSame() || isDiagonalSame();
  };

  return { isGameOver, allCellsFilled };
})();

const player = (function () {
  players = [];
  const logPlayers = function () {
    return players;
  };

  const makePlayer = function (name, symbol) {
    players.push({ name, symbol });
  };

  return { logPlayers, makePlayer };
})();
