const inputElement = document.getElementById("inputField");
const wordCountElement = document.getElementById("wordCount");
const correctWordsElement = document.getElementById("correctWords");
const incorrectWordsElement = document.getElementById("incorrectWords");
const timerElement = document.getElementById("timer");
const restartButton = document.getElementById("restartButton");
const textToTypeElement = document.getElementById("textToType");

let wordCount = 0;
let correctWordCount = 0;
let incorrectWordCount = 0;
let secondsLeft = 60;
let startedTyping = false;
let countdown;

const textToType = textToTypeElement.textContent
  .toLowerCase()
  .trim()
  .split(/\s+/)
  .filter((word) => word !== "");
console.log(textToType);

inputElement.addEventListener("keydown", function (event) {
  if (!startedTyping) {
    startedTyping = true;
    startTimer();
  }

  if (event.keyCode === 32 && startedTyping) {
    event.preventDefault();
    const typedWords = inputElement.value
      .toLowerCase()
      .trim()
      .split(/\s+/)
      .filter((word) => word !== "");
    const currentWord = typedWords[typedWords.length - 1];

    if (wordCount < textToType.length) {
      wordCountElement.textContent = `Word count: ${wordCount + 1}`;

      if (currentWord === textToType[wordCount]) {
        correctWordCount++;
        correctWordsElement.textContent = `Correct Word Count: ${correctWordCount}`;
      } else {
        incorrectWordCount++;
        incorrectWordsElement.textContent = `Incorrect Word Count: ${incorrectWordCount}`;
      }

      wordCount++;
    }

    inputElement.value = "";

    if (wordCount === textToType.length) {
      clearInterval(countdown);
      timerElement.textContent = "Countdown finished!";
    }
  }
});

function startTimer() {
  clearInterval(countdown);
  secondsLeft = 60;
  countdown = setInterval(function () {
    secondsLeft--;
    if (secondsLeft >= 0) {
      timerElement.textContent = `Countdown: ${secondsLeft} seconds`;
    } else {
      clearInterval(countdown);
      timerElement.textContent = "Countdown finished!";
    }
  }, 1000);
}

restartButton.addEventListener("click", function () {
  clearInterval(countdown);
  wordCount = 0;
  correctWordCount = 0;
  incorrectWordCount = 0;
  secondsLeft = 60;
  startedTyping = false;
  inputElement.value = "";
  wordCountElement.textContent = "Word count: 0";
  correctWordsElement.textContent = "Correct Word Count: 0";
  incorrectWordsElement.textContent = "Incorrect Word Count: 0";
  timerElement.textContent = "Countdown: 60 seconds";
});
