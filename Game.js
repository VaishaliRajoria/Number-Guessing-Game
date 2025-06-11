
const guessInput = document.getElementById('guess-input');
const submitGuessBtn = document.getElementById('submit-guess-btn');
const playAgainBtn = document.getElementById('play-again-btn');
const messageEl = document.querySelector('.message');
const attemptsLeftEl = document.getElementById('attempts-left');

let randomNumber;
let attemptsLeft;
const MAX_ATTEMPTS = 10;


function initGame() {
    
    randomNumber = Math.floor(Math.random() * 100) + 1;
    attemptsLeft = MAX_ATTEMPTS;

    attemptsLeftEl.textContent = attemptsLeft;
    messageEl.textContent = '';
    messageEl.className = 'message'; 
    guessInput.value = '';
    guessInput.disabled = false;
    submitGuessBtn.disabled = false;
    playAgainBtn.classList.add('hidden');
    guessInput.focus();
}


function checkGuess() {
    const userGuess = parseInt(guessInput.value);


    if (isNaN(userGuess) || userGuess < 1 || userGuess > 100) {
        messageEl.textContent = 'Please enter a valid number between 1 and 100.';
        messageEl.className = 'message wrong';
        return;
    }


    attemptsLeft--;
    attemptsLeftEl.textContent = attemptsLeft;

    
    if (userGuess === randomNumber) {
        messageEl.textContent = `Congratulations! You guessed the number ${randomNumber} correctly!`;
        messageEl.className = 'message correct';
        endGame();
    } else if (userGuess < randomNumber) {
        messageEl.textContent = 'Too low! Try a higher number.';
        messageEl.className = 'message';
    } else {
        messageEl.textContent = 'Too high! Try a lower number.';
        messageEl.className = 'message';
    }

    
    if (attemptsLeft === 0 && userGuess !== randomNumber) {
        messageEl.textContent = `Game Over! The correct number was ${randomNumber}.`;
        messageEl.className = 'message wrong';
        endGame();
    }


    guessInput.value = '';
    guessInput.focus();
}


function endGame() {
    guessInput.disabled = true;
    submitGuessBtn.disabled = true;
    playAgainBtn.classList.remove('hidden');
}


submitGuessBtn.addEventListener('click', checkGuess);
playAgainBtn.addEventListener('click', initGame);


guessInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        checkGuess();
    }
});


initGame();