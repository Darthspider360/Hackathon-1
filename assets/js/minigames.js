// **RANDOM MODAL GENERATOR AND HANGMAN GAME**

const modals = document.querySelectorAll(".minigame");
const showModalBtn = document.querySelectorAll(".show-minigame-btn");

function showRandomModal() {
    // Hide the combat modal to avoid conflicts
    combatModal.style.display = "none";

    // Hide all minigame modals initially
    modals.forEach((modal) => {
        modal.style.display = "none";
    });

    // Randomly select one of the minigame modals
    const randomModalIndex = Math.floor(Math.random() * modals.length);
    const randomMinigame = modals[randomModalIndex];

    // Show the selected minigame modal
    randomMinigame.style.display = "block";

    // Attach a close button functionality to close the modal
    const closeBtn = randomMinigame.querySelector(".close-btn");
    if (closeBtn) {
        closeBtn.onclick = () => {
            randomMinigame.style.display = "none";
        };
    }
}


// Attach event listeners to all buttons
showModalBtn.forEach(button => {
    button.addEventListener("click", showRandomModal);
});

// **Number Guesser GAME LOGIC**

// Initialize DOM elements
const input = document.querySelector(".guess-input"),
    guess = document.querySelector(".guess"),
    checkButton = document.querySelector(".guess-btn"),
    remainChances = document.querySelector(".guess-chances");

// Set initial focus on the input field
input.focus();

// Function to reset the game
const resetGame = () => {
    randomNum = Math.floor(Math.random() * 100); // Generate a new random number
    chance = 10; // Reset chances
    input.disabled = false; // Enable input field
    remainChances.textContent = chance; // Update chances display
    guess.textContent = ""; // Clear guess display
    guess.style.color = "#333"; // Reset guess text color
    input.value = ""; // Clear input field
    checkButton.textContent = "Check"; // Reset button text
};

// Generate a random number between 0 and 99
let randomNum = Math.floor(Math.random() * 100);
let chance = 10;

// Add click event listener to the check button
checkButton.addEventListener("click", () => {
    if (input.disabled) {
        // If the input is disabled, reset the game
        resetGame();
        return;
    }

    chance--; // Decrease chance by 1 on each click
    let inputValue = input.value; // Get the value from the input field

    if (inputValue == randomNum) { // Correct guess
        [guess.textContent, input.disabled] = ["Contgrats! You found the number.", true];
        [checkButton.textContent, guess.style.color] = ["Replay", "#27ae60"];
    } else if (inputValue > randomNum && inputValue < 100) { // Guess is too high
        [guess.textContent, remainChances.textContent] = ["Your guess is high", chance];
        guess.style.color = "#333";
    } else if (inputValue < randomNum && inputValue > 0) { // Guess is too low
        [guess.textContent, remainChances.textContent] = ["Your guess is low", chance];
        guess.style.color = "#333";
    } else { // Invalid input (not in the range 1-99)
        [guess.textContent, remainChances.textContent] = ["Your number is invalid", chance];
        guess.style.color = "#e74c3c";
    }

    if (chance == 0) { // No chances left, game over
        [checkButton.textContent, input.disabled, inputValue] = ["Replay", true, ""];
        [guess.textContent, guess.style.color] = ["You lost the game", "#e74c3c"];
    }
});

// **ROCK PAPER SCISSORS LOGIC**

// Get  to DOM elements
const gameContainer = document.querySelector(".rps-container"),
    userResult = document.querySelector(".rps-user_result img"),
    cpuResult = document.querySelector(".rps-cpu_result img"),
    result = document.querySelector(".rps-result"),
    optionImages = document.querySelectorAll(".rps-option_image");

// Loop through each option image element
optionImages.forEach((image, index) => {
    image.addEventListener("click", (e) => {
        image.classList.add("active");

        userResult.src = cpuResult.src = "assets/minigame-images/rps-images/rock.png";
        result.textContent = "Wait...";

        // Loop through each option image again
        optionImages.forEach((image2, index2) => {
            // If the current index doesn't match the clicked index
            // Remove the "active" class from the other option images
            index !== index2 && image2.classList.remove("active");
        });

        gameContainer.classList.add("start");

        // Set a timeout to delay the result calculation
        let time = setTimeout(() => {
            gameContainer.classList.remove("start");

            // Get the source of the clicked option image
            let imageSrc = e.target.querySelector("img").src;
            // Set the user image to the clicked option image
            userResult.src = imageSrc;

            // Generate a random number between 0 and 2
            let randomNumber = Math.floor(Math.random() * 3);
            // Create an array of CPU image options
            let cpuImages = ["assets/minigame-images/rps-images/rock.png", "assets/minigame-images/rps-images/paper.png", "assets/minigame-images/rps-images/scissors.png"];
            // Set the CPU image to a random option from the array
            cpuResult.src = cpuImages[randomNumber];

            // Assign a letter value to the CPU option (R for rock, P for paper, S for scissors)
            let cpuValue = ["R", "P", "S"][randomNumber];
            // Assign a letter value to the clicked option (based on index)
            let userValue = ["R", "P", "S"][index];

            // Create an object with all possible outcomes
            let outcomes = {
                RR: "Draw",
                RP: "You",
                RS: "You",
                PP: "Draw",
                PR: "You",
                PS: "Cpu",
                SS: "Draw",
                SR: "Cpu",
                SP: "You",
            };

            // Look up the outcome value based on user and CPU options
            let outComeValue = outcomes[userValue + cpuValue];

            // Display the result
            result.textContent = userValue === cpuValue ? "Match Draw" : `${outComeValue} Won!!`;
        }, 2500);
    });
});