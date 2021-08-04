const gameBoard = (function () {
  const board = [
    ["x", "o", "x"],
    ["o", "", "x"],
    ["x", "o", "x"],
  ];

  const getValue = function (row, col) {
    return board[row][col];
  };

  return { getValue };
})();

const displayController = (function () {
  const cells = document.querySelectorAll(".board > *");
  for (const cell of cells) {
    cell.innerText = gameBoard.getValue(cell.dataset.row, cell.dataset.col);
  }
})();
