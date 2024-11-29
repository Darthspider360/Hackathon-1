const startQuestBtn = document.getElementById("quest");

document.addEventListener("DOMContentLoaded", function() {
    let buttons = document.getElementsByTagName("button");

    for (let button of buttons) {
        button.addEventListener("click", function() {
            let questMap = this.getAttribute("data-type");
                loadQuestMap(questMap);
        });

    }
    startQuestBtn.addEventListener("click", () => {
        loadQuest();
    }); 

    document.getElementById("backButton").addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            loadQuestMap();
        }
    });
});

function loadQuestMap(questMap) {
    if (questMap === "boat") {
        window.location.href = 'boatMap.html';
    } else if (questMap === "tree") {
        window.location.href = 'forestMap.html';
    } else if (questMap === "mountain") {
        window.location.href = 'mountainMap.html';
    } else if (questMap === "fort") {
        window.location.href = 'castleMap.html';
    } else if (questMap === "skull") {
        window.location.href = 'bossMap.html';
    } 
}



// Function to randomly choose between showing a random minigame or starting the combat game
function loadQuest() {
    // Generate a random number between 0 and 1
    const randomChoice = Math.random();

    // If randomChoice is less than 0.5, show a random minigame modal
    if (randomChoice < 0.5) {
        // Ensure the combat event listener is only attached once
        combatStartBtn.removeEventListener("click", startCombatGame); 
        showRandomModal();
    } else {
        // Otherwise, start the combat game
        // Ensure the minigame modal isn't triggered when setting up the combat event listener
        combatStartBtn.addEventListener("click", startCombatGame);
    }
}

// Define a separate function for combat
function startCombatGame() {
    combatModal.style.display = "flex";
    resetCombatGame();
}
