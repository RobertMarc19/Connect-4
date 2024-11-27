let buttonsIndex = 0;
let nrOfButtons = 1;

const numRows = 6;
const numCols = 7;
const winningLength = 4;

function playGround() {
  const buttonContainer = document.getElementById("playground");
  let rows = 1;
  for (let i = 0; i < numRows; ++i) {
    for (let j = 0; j < numCols; ++j) {
      const createButton = document.createElement("button");
      createButton.type = "button";
      createButton.id = nrOfButtons.toString();
      createButton.className = "btn btn-secondary";
      createButton.style.width = "100px";
      createButton.style.height = "50px";
      createButton.style.margin = "5px";
      buttonContainer.appendChild(createButton);
      ++nrOfButtons;
    }
    const lineBreak = document.createElement("br");
    buttonContainer.appendChild(lineBreak);
  }
}

function generateWinningCombinations() {
  const winningCombinations = [];
  for (let row = 0; row < numRows; ++row) {
    for (let col = 0; col <= numCols - winningLength; ++col) {
      const combination = [];
      for (let i = 0; i < winningLength; ++i) {
        combination.push(row * numCols + col + i + 1);
      }
      winningCombinations.push(combination);
    }
  }

  for (let col = 0; col < numCols; ++col) {
    for (let row = 0; row <= numRows - winningLength; ++row) {
      const combination = [];
      for (let i = 0; i < winningLength; ++i) {
        combination.push((row + i) * numCols + col + 1);
      }
      winningCombinations.push(combination);
    }
  }

  for (let row = 0; row <= numRows - winningLength; ++row) {
    for (let col = 0; col <= numCols - winningLength; ++col) {
      const combination = [];
      for (let i = 0; i < winningLength; ++i) {
        combination.push((row + i) * numCols + (col + i) + 1);
      }
      winningCombinations.push(combination);
    }
  }

  for (let row = 0; row <= numRows - winningLength; ++row) {
    for (let col = winningLength - 1; col < numCols; ++col) {
      const combination = [];
      for (let i = 0; i < winningLength; ++i) {
        combination.push((row + i) * numCols + (col - i) + 1);
      }
      winningCombinations.push(combination);
    }
  }
  return winningCombinations;
}

const positions = generateWinningCombinations();

function checkWinner() {
  for (let i = 0; i < positions.length; ++i) {
    let combination = positions[i];
    let buttonOne = document.getElementById(combination[0]).className;
    let buttonTwo = document.getElementById(combination[1]).className;
    let buttonThree = document.getElementById(combination[2]).className;
    let buttonFour = document.getElementById(combination[3]).className;

    if (
      buttonOne != "btn btn-secondary" &&
      buttonOne == buttonTwo &&
      buttonOne == buttonThree &&
      buttonOne == buttonFour
    ) {
      if (buttonOne == "btn btn-danger") {
        buttonOne = "Red";
      } else if (buttonOne == "btn btn-warning") {
        buttonOne = "Yellow";
      }
      return buttonOne;
    }
  }
}

function buttonInteraction() {
  document.querySelectorAll(".container button").forEach((button) => {
    button.addEventListener("click", function () {
      if (buttonsIndex % 2 == 0) {
        this.className = "btn btn-danger";
      } else {
        this.className = "btn btn-warning";
      }
      ++buttonsIndex;
      let winner = checkWinner();
      if (winner) {
        alert(winner + " won!");
      } else if (isDraw()) {
        alert("Draw!");
      }
    });
  });
}

function isDraw() {
  const buttons = document.querySelectorAll(".container button");
  for (let i = 0; i < buttons.length; ++i) {
    if (buttons[i].className == "btn btn-secondary") {
      return false;
    }
  }
  return true;
}

function startGame() {
  playGround();
  buttonInteraction();
}
