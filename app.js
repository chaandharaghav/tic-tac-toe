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

  return { getValue, setValue };
})();

const displayController = (function () {
  const cells = document.querySelectorAll(".board > *");
  for (const cell of cells) {
    cell.addEventListener("click", function name() {
      const row = this.dataset.row;
      const col = this.dataset.col;
      updateGameBoard(row, col);
      updateDisplay(this, row, col);
    });
  }

  let currentValue = "x";

  const updateGameBoard = function (row, col) {
    if (gameBoard.getValue(row, col) === "") {
      gameBoard.setValue(row, col, currentValue);
      currentValue = currentValue === "x" ? "o" : "x";
    }
  };

  const updateDisplay = function (cell, row, col) {
    cell.innerText = gameBoard.getValue(row, col);
  };
})();
