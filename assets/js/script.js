document.addEventListener("DOMContentLoaded", function() {
    let buttons = document.getElementsByTagName("button");

    for (let button of buttons) {
        button.addEventListener("click", function() {
            if (this.getAttribute("data-type") === "quest") {
                loadQuest();
            } else {
                let questMap = this.getAttribute("data-type");
                loadQuestMap(questMap);
            }
        });
    }

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
    // Generate a random number to decide between minigame and combat
    const randomChoice = Math.random();

    if (randomChoice < 0.5) {
        // Handle minigame modal
        // Hide combat modal and detach its event listener
        combatModal.style.display = "none";
        combatStartBtn.removeEventListener("click", startCombatGame);

        // Show a random minigame modal
        showRandomModal();
    } else {
        // Handle combat modal
        // Hide all minigame modals
        modals.forEach((modal) => (modal.style.display = "none"));

        // Ensure the combat modal is ready to start
        combatModal.style.display = "flex";
        combatStartBtn.addEventListener("click", startCombatGame);

        // Reset combat game for a fresh start
        resetCombatGame();
    }
}


// Define a separate function for combat
function startCombatGame() {
    combatModal.style.display = "flex";
    resetCombatGame();
}
