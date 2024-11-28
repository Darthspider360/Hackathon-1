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

// **QUIZ MINIGAME**

//selecting all required elements
const start_btn = document.querySelector(".quiz-start_btn button");
const info_box = document.querySelector(".quiz-info-box");
const exit_btn = info_box.querySelector(".quiz-buttons .quiz-quit");
const continue_btn = info_box.querySelector(".quiz-buttons .quiz-restart");
const quiz_box = document.querySelector(".quiz-box");
const result_box = document.querySelector(".quiz-result-box");
const option_list = document.querySelector(".quiz-option-list");
const time_line = document.querySelector("header .time-line");
const timeText = document.querySelector(".quiz-timer .time-left-txt");
const timeCount = document.querySelector(".quiz-timer .timer-sec");

// if startQuiz button clicked
start_btn.onclick = ()=>{
    info_box.classList.add("activeInfo"); //show info box
}

// if exitQuiz button clicked
exit_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo"); //hide info box
}

// if continueQuiz button clicked
continue_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo"); //hide info box
    quiz_box.classList.add("activeQuiz"); //show quiz box
    showQuetions(0); //calling showQestions function
    queCounter(1); //passing 1 parameter to queCounter
    startTimer(15); //calling startTimer function
    startTimerLine(0); //calling startTimerLine function
}

let timeValue =  15;
let que_count = 0;
let que_numb = 1;
let userScore = 0;
let counter;
let counterLine;
let widthValue = 0;

const restart_quiz = result_box.querySelector(".quiz-buttons .quiz-restart");
const quit_quiz = result_box.querySelector(".quiz-buttons .quiz-quit");

// if restartQuiz button clicked
restart_quiz.onclick = ()=>{
    quiz_box.classList.add("activeQuiz"); //show quiz box
    result_box.classList.remove("activeResult"); //hide result box
    timeValue = 15; 
    que_count = 0;
    que_numb = 1;
    userScore = 0;
    widthValue = 0;
    showQuetions(que_count); //calling showQestions function
    queCounter(que_numb); //passing que_numb value to queCounter
    clearInterval(counter); //clear counter
    clearInterval(counterLine); //clear counterLine
    startTimer(timeValue); //calling startTimer function
    startTimerLine(widthValue); //calling startTimerLine function
    timeText.textContent = "Time Left"; //change the text of timeText to Time Left
    next_btn.classList.remove("show"); //hide the next button
}

// if quitQuiz button clicked
quit_quiz.onclick = ()=>{
    window.location.reload(); //reload the current window
}

const next_btn = document.querySelector("#footer .quiz-next-btn");
const bottom_ques_counter = document.querySelector("#footer .quiz-total-question");

// if Next Que button clicked
next_btn.onclick = ()=>{
    if(que_count < questions.length - 1){ //if question count is less than total question length
        que_count++; //increment the que_count value
        que_numb++; //increment the que_numb value
        showQuetions(que_count); //calling showQestions function
        queCounter(que_numb); //passing que_numb value to queCounter
        clearInterval(counter); //clear counter
        clearInterval(counterLine); //clear counterLine
        startTimer(timeValue); //calling startTimer function
        startTimerLine(widthValue); //calling startTimerLine function
        timeText.textContent = "Time Left"; //change the timeText to Time Left
        next_btn.classList.remove("show"); //hide the next button
    }else{
        clearInterval(counter); //clear counter
        clearInterval(counterLine); //clear counterLine
        showResult(); //calling showResult function
    }
}

// getting questions and options from array
function showQuetions(index){
    const que_text = document.querySelector(".que_text");

    //creating a new span and div tag for question and option and passing the value using array index
    let que_tag = '<span>'+ questions[index].numb + ". " + questions[index].question +'</span>';
    let option_tag = '<div class="option"><span>'+ questions[index].options[0] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[1] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[2] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[3] +'</span></div>';
    que_text.innerHTML = que_tag; //adding new span tag inside que_tag
    option_list.innerHTML = option_tag; //adding new div tag inside option_tag
    
    const option = option_list.querySelectorAll(".option");

    // set onclick attribute to all available options
    for(i=0; i < option.length; i++){
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}
// creating the new div tags which for icons
let tickIconTag = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIconTag = '<div class="icon cross"><i class="fas fa-times"></i></div>';

//if user clicked on option
function optionSelected(answer){
    clearInterval(counter); //clear counter
    clearInterval(counterLine); //clear counterLine
    let userAns = answer.textContent; //getting user selected option
    let correcAns = questions[que_count].answer; //getting correct answer from array
    const allOptions = option_list.children.length; //getting all option items
    
    if(userAns == correcAns){ //if user selected option is equal to array's correct answer
        userScore += 1; //upgrading score value with 1
        answer.classList.add("correct"); //adding green color to correct selected option
        answer.insertAdjacentHTML("beforeend", tickIconTag); //adding tick icon to correct selected option
        console.log("Correct Answer");
        console.log("Your correct answers = " + userScore);
    }else{
        answer.classList.add("incorrect"); //adding red color to correct selected option
        answer.insertAdjacentHTML("beforeend", crossIconTag); //adding cross icon to correct selected option
        console.log("Wrong Answer");

        for(i=0; i < allOptions; i++){
            if(option_list.children[i].textContent == correcAns){ //if there is an option which is matched to an array answer 
                option_list.children[i].setAttribute("class", "option correct"); //adding green color to matched option
                option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); //adding tick icon to matched option
                console.log("Auto selected correct answer.");
            }
        }
    }
    for(i=0; i < allOptions; i++){
        option_list.children[i].classList.add("disabled"); //once user select an option then disabled all options
    }
    next_btn.classList.add("show"); //show the next button if user selected any option
}

function showResult(){
    info_box.classList.remove("activeInfo"); //hide info box
    quiz_box.classList.remove("activeQuiz"); //hide quiz box
    result_box.classList.add("activeResult"); //show result box
    const scoreText = result_box.querySelector(".score_text");
    if (userScore > 3){ // if user scored more than 3
        //creating a new span tag and passing the user score number and total question number
        let scoreTag = '<span>and congrats! , You got <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;  //adding new span tag inside score_Text
    }
    else if(userScore > 1){ // if user scored more than 1
        let scoreTag = '<span>and nice , You got <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }
    else{ // if user scored less than 1
        let scoreTag = '<span>and sorry , You got only <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }
}

function startTimer(time){
    counter = setInterval(timer, 1000);
    function timer(){
        timeCount.textContent = time; //changing the value of timeCount with time value
        time--; //decrement the time value
        if(time < 9){ //if timer is less than 9
            let addZero = timeCount.textContent; 
            timeCount.textContent = "0" + addZero; //add a 0 before time value
        }
        if(time < 0){ //if timer is less than 0
            clearInterval(counter); //clear counter
            timeText.textContent = "Time Off"; //change the time text to time off
            const allOptions = option_list.children.length; //getting all option items
            let correcAns = questions[que_count].answer; //getting correct answer from array
            for(i=0; i < allOptions; i++){
                if(option_list.children[i].textContent == correcAns){ //if there is an option which is matched to an array answer
                    option_list.children[i].setAttribute("class", "option correct"); //adding green color to matched option
                    option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); //adding tick icon to matched option
                    console.log("Time Off: Auto selected correct answer.");
                }
            }
            for(i=0; i < allOptions; i++){
                option_list.children[i].classList.add("disabled"); //once user select an option then disabled all options
            }
            next_btn.classList.add("show"); //show the next button if user selected any option
        }
    }
}

function startTimerLine(time){
    counterLine = setInterval(timer, 29);
    function timer(){
        time += 1; //upgrading time value with 1
        time_line.style.width = time + "px"; //increasing width of time_line with px by time value
        if(time > 549){ //if time value is greater than 549
            clearInterval(counterLine); //clear counterLine
        }
    }
}

function queCounter(index){
    //creating a new span tag and passing the question number and total question
    let totalQueCounTag = '<span><p>'+ index +'</p> of <p>'+ questions.length +'</p> Questions</span>';
    bottom_ques_counter.innerHTML = totalQueCounTag;  //adding new span tag inside bottom_ques_counter
}