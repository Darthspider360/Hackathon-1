// **RANDOM MODAL GENERATOR AND HANGMAN GAME**

const modals = document.querySelectorAll(".minigame");
const showModalBtn = document.getElementById("show-minigame-btn");

function showRandomModal() {
    // Hide all modals
    modals.forEach(modal => {
        modal.style.display = "none"; // Hide each modal
    });

    // Randomly select a minigame
    const randomModalIndex = Math.floor(Math.random() * modals.length);
    const randomMinigame = modals[randomModalIndex];

    // Check if the selected modal contains the Hangman game
    if (randomMinigame.classList.contains("hangman")) {
        initialiseHangmanGame(randomMinigame); // Initialize Hangman game if it's the Hangman modal
    }

    // Show the selected modal
    randomMinigame.style.display = "block";

    const closeBtn = randomMinigame.querySelector(".close-btn");
    if (closeBtn) {
        closeBtn.onclick = () => {
            randomMinigame.style.display = "none"; // Close the modal
        };
    }
}

if (showModalBtn) {
    showModalBtn.addEventListener("click", showRandomModal);
}

// **HANGMAN GAME LOGIC**

function initialiseHangmanGame(hangmanModal) {
    // Hangman game variables
    const maxGuesses = 6;
    let correctLetters = [];
    let wrongGuessCount = 0;
    let currentWord = "";

    // Hangman modal elements
    const wordDisplay = hangmanModal.querySelector(".hangman-word-display");
    const guessesText = hangmanModal.querySelector(".hangman-guesses-text b");
    const keyboardDiv = hangmanModal.querySelector(".hangman-keyboard");
    const hangmanImage = hangmanModal.querySelector(".hangman-box img");
    const playAgainBtn = hangmanModal.querySelector(".hangman-play-again");

    // Word list for Hangman
    const wordList = [
        { word: "guitar", hint: "A musical instrument with strings." },
        { word: "oxygen", hint: "A colorless, odorless gas essential for life." },
        { word: "mountain", hint: "A large natural elevation of the Earth's surface." },
        { word: "painting", hint: "An art form using colors on a surface to create images or expression." },
    ];

    // Function to select a new random word and reset the game
    function setNewWord() {
        const randomIndex = Math.floor(Math.random() * wordList.length);
        const { word, hint } = wordList[randomIndex];
        currentWord = word;

        // Update the hint text
        hangmanModal.querySelector(".hint-text b").innerText = hint;

        // Reset game variables
        correctLetters = [];
        wrongGuessCount = 0;

        // Reset the word display with underscores
        wordDisplay.innerHTML = currentWord
            .split("")
            .map(() => `<li class="letter"></li>`)
            .join("");

        // Enable all keyboard buttons
        const buttons = keyboardDiv.querySelectorAll("button");
        buttons.forEach(button => {
            button.disabled = false;
        });

        // Reset hangman image
        hangmanImage.src = "images/hangman-0.svg";

        // Reset guesses text
        guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;

        // Ensure the "Game Over" message is hidden
        hangmanModal.querySelector(".game-over-message").innerHTML = "";
        hangmanModal.classList.remove("show");
    }

    // Function to handle guesses
    function handleGuess(button, clickedLetter) {
        if (currentWord.includes(clickedLetter)) {
            // Correct guess: show all occurrences of the letter
            [...currentWord].forEach((letter, index) => {
                if (letter === clickedLetter) {
                    correctLetters.push(letter);
                    const letterElements = wordDisplay.querySelectorAll("li");
                    letterElements[index].innerText = letter;
                    letterElements[index].classList.add("guessed");
                }
            });
        } else {
            // Incorrect guess: increment wrongGuessCount and update UI
            wrongGuessCount++;
            hangmanImage.src = `images/hangman-${wrongGuessCount}.svg`;
        }

        // Disable the clicked button
        button.disabled = true;

        // Update guesses text
        guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;

        // Check for game over or victory
        if (wrongGuessCount === maxGuesses) {
            gameOver(false); // Game Over (loss)
        } else if (correctLetters.length === currentWord.length) {
            gameOver(true); // Game Over (win)
        }
    }

    // Function to handle game over
    function gameOver(isVictory) {
        const modalText = isVictory
            ? `You found the word: <b>${currentWord}</b>`
            : `The correct word was: <b>${currentWord}</b>`;
        hangmanModal.querySelector(".game-over-message").innerHTML = modalText;
        hangmanModal.classList.add("show");
    }

    // Create keyboard buttons dynamically if not already created
    if (keyboardDiv.children.length === 0) {
        for (let i = 97; i <= 122; i++) {
            const button = document.createElement("button");
            button.innerText = String.fromCharCode(i);
            button.addEventListener("click", function (e) {
                handleGuess(button, e.target.innerText);
            });
            keyboardDiv.appendChild(button);
        }
    }

    // Play Again button functionality
    playAgainBtn.addEventListener("click", function () {
        setNewWord(); // Reset the game when "Play Again" is clicked
    });

    // Initialize the game with a new word
    setNewWord();
}

// **MATCHING CARDS MINIGAME**

const selectors = {
    boardContainer: document.querySelector('.matching-cards-board-container'),
    board: document.querySelector('..matching-cards-board'),
    moves: document.querySelector('..matching-cards-moves'),
    timer: document.querySelector('..matching-cards-timer'),
    start: document.querySelector('..matching-cards-btn'),
    win: document.querySelector('..matching-cards-win')
}

const state = {
    gameStarted: false,
    flippedCards: 0,
    totalFlips: 0,
    totalTime: 0,
    loop: null
}

const shuffle = array => {
    const clonedArray = [...array]

    for (let index = clonedArray.length - 1; index > 0; index--) {
        const randomIndex = Math.floor(Math.random() * (index + 1))
        const original = clonedArray[index]

        clonedArray[index] = clonedArray[randomIndex]
        clonedArray[randomIndex] = original
    }

    return clonedArray
}

const pickRandom = (array, items) => {
    const clonedArray = [...array]
    const randomPicks = []

    for (let index = 0; index < items; index++) {
        const randomIndex = Math.floor(Math.random() * clonedArray.length)
        
        randomPicks.push(clonedArray[randomIndex])
        clonedArray.splice(randomIndex, 1)
    }

    return randomPicks
}

const generateGame = () => {
    const dimensions = selectors.board.getAttribute('data-dimension')

    if (dimensions % 2 !== 0) {
        throw new Error("The dimension of the board must be an even number.")
    }

    const emojis = ['🥔', '🍒', '🥑', '🌽', '🥕', '🍇', '🍉', '🍌', '🥭', '🍍']
    const picks = pickRandom(emojis, (dimensions * dimensions) / 2) 
    const items = shuffle([...picks, ...picks])
    const cards = `
        <div class="board" style="grid-template-columns: repeat(${dimensions}, auto)">
            ${items.map(item => `
                <div class="card">
                    <div class="card-front"></div>
                    <div class="card-back">${item}</div>
                </div>
            `).join('')}
        </div>
    `
    
    const parser = new DOMParser().parseFromString(cards, 'text/html')

    selectors.board.replaceWith(parser.querySelector('.board'))
}

const startGame = () => {
    state.gameStarted = true
    selectors.start.classList.add('disabled')

    state.loop = setInterval(() => {
        state.totalTime++

        selectors.moves.innerText = `${state.totalFlips} moves`
        selectors.timer.innerText = `time: ${state.totalTime} sec`
    }, 1000)
}

const flipBackCards = () => {
    document.querySelectorAll('.card:not(.matched)').forEach(card => {
        card.classList.remove('flipped')
    })

    state.flippedCards = 0
}

const flipCard = card => {
    state.flippedCards++
    state.totalFlips++

    if (!state.gameStarted) {
        startGame()
    }

    if (state.flippedCards <= 2) {
        card.classList.add('flipped')
    }

    if (state.flippedCards === 2) {
        const flippedCards = document.querySelectorAll('.flipped:not(.matched)')

        if (flippedCards[0].innerText === flippedCards[1].innerText) {
            flippedCards[0].classList.add('matched')
            flippedCards[1].classList.add('matched')
        }

        setTimeout(() => {
            flipBackCards()
        }, 1000)
    }

    // If there are no more cards that we can flip, we won the game
    if (!document.querySelectorAll('.card:not(.flipped)').length) {
        setTimeout(() => {
            selectors.boardContainer.classList.add('flipped')
            selectors.win.innerHTML = `
                <span class="win-text">
                    You won!<br />
                    with <span class="highlight">${state.totalFlips}</span> moves<br />
                    under <span class="highlight">${state.totalTime}</span> seconds
                </span>
            `

            clearInterval(state.loop)
        }, 1000)
    }
}

const attachEventListeners = () => {
    document.addEventListener('click', event => {
        const eventTarget = event.target
        const eventParent = eventTarget.parentElement

        if (eventTarget.className.includes('card') && !eventParent.className.includes('flipped')) {
            flipCard(eventParent)
        } else if (eventTarget.nodeName === 'BUTTON' && !eventTarget.className.includes('disabled')) {
            startGame()
        }
    })
}

generateGame()
attachEventListeners()