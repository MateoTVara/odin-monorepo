const boardDiv = document.querySelector("#board");
const roundH2 = document.querySelector("#board h2");
const optionsDiv = document.querySelector("#options");
const humanChoiceDiv = document.querySelector("#human-choice");
const computerChoiceDiv = document.querySelector("#computer-choice");
const humanScoreSpan = document.querySelector("#p-human span");
const computerScoreSpan = document.querySelector("#p-computer span");
const overlayDiv = document.querySelector("#overlay");
const resultMessage = document.querySelector("#overlay p");

let humanScore = 0;
let computerScore = 0;
let round = 0;

function getComputerChoice() {
  let computerChoice = {"str": "", "icon": ""}
  const numericVal = Math.floor(Math.random() * 3);
  switch (numericVal) {
    case 0:
      computerChoice.str = "rock";
      computerChoice.icon = "✊";
      return computerChoice;
    case 1:
      computerChoice.str = "paper";
      computerChoice.icon = "✋";
      return computerChoice;
    case 2:
      computerChoice.str = "scissors";
      computerChoice.icon = "✌️";
      return computerChoice;
  };
};

function playRound(humanChoice, computerChoice) {
  if (humanChoice == computerChoice) {
    return "¡Draw!"
  } else if (humanChoice == "rock" && computerChoice == "scissors" ||
             humanChoice == "paper" && computerChoice == "rock" ||
             humanChoice == "scissors" && computerChoice == "paper"){
    humanScore += 1;
    humanScoreSpan.textContent = humanScore;
    return "You won!";
  } else {
    computerScore += 1;
    computerScoreSpan.textContent = computerScore;
    return "You lose.";
  }
};

function showResult() {
  overlayDiv.style.cssText = "display: flex";
  if (humanScore > computerScore) {
    resultMessage.textContent = "You win the game — well played!";
  } else if (humanScore < computerScore) {
    resultMessage.textContent = "Game over. Better luck next time!";
  } else {
    resultMessage.textContent = "A perfect balance — no winner this time.!";
  }
}

optionsDiv.addEventListener("click", (e) => {
  let target = e.target;
  let humanChoice = target.id;
  let computerChoice = getComputerChoice();
  let result;
  if (target.id !== "options"){
    computerChoiceDiv.textContent = computerChoice.icon;
  }
  switch(target.id) {
    case "rock":
      humanChoiceDiv.textContent = "✊";
      result = playRound(humanChoice, computerChoice.str);
      round += 1;
      roundH2.textContent = `Round ${round}: ${result}`;
      break;
    case "paper":
      humanChoiceDiv.textContent = "✋";
      result = playRound(humanChoice, computerChoice.str);
      round += 1;
      roundH2.textContent = `Round ${round}: ${result}`;
      break;
    case "scissors":
      humanChoiceDiv.textContent = "✌️";
      result = playRound(humanChoice, computerChoice.str);
      round += 1;
      roundH2.textContent = `Round ${round}: ${result}`;
      break;
  };
  if (round === 5) showResult();
});

overlayDiv.addEventListener("click", () => {
  round = 0;
  humanScore = 0;
  humanScoreSpan.textContent = humanScore;
  humanChoiceDiv.textContent = "👨‍🦲";
  computerScore = 0;
  computerScoreSpan.textContent = computerScore;
  computerChoiceDiv.textContent = "🖥️";
  overlayDiv.style.display = "none";
  roundH2.textContent = "MAKE YOUR MOVE!"
})