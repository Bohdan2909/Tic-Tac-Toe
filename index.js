const statusDispaly = document.querySelector('.game__status');

let gameActive = true;

let currentPlayer = "X";

let gameState = ["", "", "", "", "", "", "", "", ""];

const winnigConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

const winnigMessage = () => `Player ${currentPlayer} has won!`;

const drawMessage = () => `Game ended in a draw`;

const currentPlayerTurn = () => `It's ${currentPlayer} turn`;

statusDispaly.innerHTML = currentPlayerTurn();

function handleCellPLayed(clickedCell, clickedCellIndex) {
  gameState[clickedCellIndex] = currentPlayer;
  clickedCell.innerHTML = currentPlayer;
      if (currentPlayer == "X") {
        document.querySelectorAll('.cell')[clickedCellIndex].style.color = "blue";
      } else {
        document.querySelectorAll('.cell')[clickedCellIndex].style.color = "red";
      }
      
}

function handlePlayerChange() {
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  statusDispaly.innerHTML = currentPlayerTurn();
}

function handleResultValidation() {
  let roundWon = false;
  for (let i = 0; i <= 7; i++) {
    const winCondition = winnigConditions[i];
    let a = gameState[winCondition[0]];
    let b = gameState[winCondition[1]];
    let c = gameState[winCondition[2]];

    if (a === '' || b === '' || c === '') {
      continue;
    }
    if (a === b && b === c) {
      roundWon = true;
      break;
    }
  }
  if (roundWon) {
    statusDispaly.innerHTML = winnigMessage();
    gameActive = false;
    return;
  }
  let roundDraw = !gameState.includes('');
  if (roundDraw) {
    statusDispaly.innerHTML = drawMessage();
    gameActive = false;
    return;
  }
  handlePlayerChange();
}

function handleCellClick(cleckedCellEvent) {
  const clickedCell = cleckedCellEvent.target;

  const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

  if (gameState[clickedCellIndex] !== '' || !gameActive) {
    return;
  }
  handleCellPLayed(clickedCell, clickedCellIndex);
  handleResultValidation();
}

function handleRestartGame() {
  gameActive = true;
  currentPlayer = 'X';
  gameState = ["", "", "", "", "", "", "", "", ""];
  statusDispaly.innerHTML = currentPlayerTurn();
  document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = '');
}


document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));

document.querySelector('.game__restart').addEventListener('click', handleRestartGame);