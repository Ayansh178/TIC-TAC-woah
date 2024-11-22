const board = document.getElementById("board");
const cells = document.querySelectorAll("[data-cell]");
const winnerMessage = document.getElementById("winnerMessage");
const restartButton = document.getElementById("restartButton");

let currentPlayer = "X";
let isGameActive = true;
const boardState = Array(9).fill(null);

// Winning combinations
const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// Event listener for cells
cells.forEach((cell, index) => {
  cell.addEventListener("click", () => handleClick(cell, index), { once: true });
});

// Handle cell clicks
function handleClick(cell, index) {
  if (!isGameActive) return;

  boardState[index] = currentPlayer;
  cell.textContent = currentPlayer;
  cell.classList.add("taken");

  if (checkWin()) {
    if (currentPlayer === "X") {
      winnerMessage.textContent = "Congratulations Player X! You Win!";
    } else {
      winnerMessage.textContent = "Player O Wins! Well Played!";
    }
    isGameActive = false;
  } else if (boardState.every((cell) => cell)) {
    winnerMessage.textContent = "It's a Draw! Nobody Wins!";
    isGameActive = false;
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
  }
}

// Check for a win
function checkWin() {
  return winningCombinations.some((combination) =>
    combination.every((index) => boardState[index] === currentPlayer)
  );
}

// Restart game
restartButton.addEventListener("click", () => {
  boardState.fill(null);
  isGameActive = true;
  currentPlayer = "X";
  winnerMessage.textContent = "";
  cells.forEach((cell) => {
    cell.textContent = "";
    cell.classList.remove("taken");
    cell.addEventListener("click", () => handleClick(cell, cell.dataset.index), {
      once: true,
    });
  });
});
