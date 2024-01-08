const inputElement = document.getElementById('inputField');
const wordCountElement = document.getElementById('wordCount');
const timerElement = document.getElementById('timer');
const restartButton = document.getElementById('restartButton');

let wordCount = 0;
let secondsLeft = 60;
let startedTyping = false;
let countdown;

inputElement.addEventListener('keydown', function(event) {
    if (!startedTyping) {
        startedTyping = true;
        startTimer();
    }
    if (event.keyCode === 32 && startedTyping) {
        wordCount++;
        inputElement.value = '';
        wordCountElement.textContent = `Word count: ${wordCount}`;
    }
});

function startTimer() {
    clearInterval(countdown);
    secondsLeft = 60;
    countdown = setInterval(function() {
        secondsLeft--;
        if (secondsLeft >= 0) {
            timerElement.textContent = `Countdown: ${secondsLeft} `;
        } else {
            clearInterval(countdown);
            timerElement.textContent = 'Countdown finished!';
        }
    }, 1000);
}

restartButton.addEventListener('click', function() {
    clearInterval(countdown);
    wordCount = 0;
    secondsLeft = 60;
    startedTyping = false;
    inputElement.value = '';
    wordCountElement.textContent = 'Word count: 0';
    timerElement.textContent = 'Countdown: 60 seconds';
});







