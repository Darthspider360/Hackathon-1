// Initial stats
let playerHp = 100;
let enemyHp = 100;
const maxHp = 100;

// DOM Elements
const startCombatBtn = document.getElementById("start-combat-btn");
const combatModal = document.getElementById("combat-modal");
const closeModalBtn = document.getElementById("close-modal");
const messageEl = document.getElementById("message");
const playerHpEl = document.getElementById("player-hp");
const enemyHpEl = document.getElementById("enemy-hp");
const playerHealthBar = document.getElementById("player-health");
const enemyHealthBar = document.getElementById("enemy-health");
const attackBtn = document.getElementById("attack-btn");
const healBtn = document.getElementById("heal-btn");

// Function to update health
function updateHealth() {
    playerHpEl.textContent = `HP: ${playerHp}`;
    enemyHpEl.textContent = `HP: ${enemyHp}`;
    playerHealthBar.style.width = `${(playerHp / maxHp) * 100}%`;
    enemyHealthBar.style.width = `${(enemyHp / maxHp) * 100}%`;
}

// Enemy turn logic
function enemyTurn() {
    const damage = Math.floor(Math.random() * 15) + 5;
    playerHp = Math.max(0, playerHp - damage);
    messageEl.textContent = `Enemy attacks for ${damage} damage!`;
    updateHealth();
    checkGameOver();

    setTimeout(() => {
        attackBtn.disabled = false;
        healBtn.disabled = false;
        if (playerHp > 0) messageEl.textContent = "It's your turn!";
    }, 1000);
}

// Check if the game is over
function checkGameOver() {
    if (playerHp <= 0) {
        messageEl.textContent = "You lost! Game over!";
        attackBtn.disabled = true;
        healBtn.disabled = true;
    } else if (enemyHp <= 0) {
        messageEl.textContent = "You won! Congratulations!";
        attackBtn.disabled = true;
        healBtn.disabled = true;
    }
}

// Player attack
attackBtn.addEventListener("click", () => {
    const damage = Math.floor(Math.random() * 20) + 5;
    enemyHp = Math.max(0, enemyHp - damage);
    messageEl.textContent = `You attack for ${damage} damage!`;
    updateHealth();
    checkGameOver();

    if (enemyHp > 0) {
        attackBtn.disabled = true;
        healBtn.disabled = true;
        setTimeout(enemyTurn, 1000);
    }
});

// Player heal
healBtn.addEventListener("click", () => {
    const healAmount = Math.floor(Math.random() * 15) + 10;
    playerHp = Math.min(maxHp, playerHp + healAmount);
    messageEl.textContent = `You heal yourself for ${healAmount} HP!`;
    updateHealth();

    attackBtn.disabled = true;
    healBtn.disabled = true;
    setTimeout(enemyTurn, 1000);
});

// Open modal
startCombatBtn.addEventListener("click", () => {
    combatModal.style.display = "flex";
    resetGame();
});

// Close modal
closeModalBtn.addEventListener("click", () => {
    combatModal.style.display = "none";
});

// Reset game function
function resetGame() {
    playerHp = maxHp;
    enemyHp = maxHp;
    updateHealth();
    messageEl.textContent = "Battle begins! It's your turn!";
    attackBtn.disabled = false;
    healBtn.disabled = false;
}

// Initialize health bars
updateHealth();
