// Initial stats
let playerHp = 100;
let enemyHp = 100;
const maxHp = 100;
const messageEl = document.getElementById("message");
const playerHpEl = document.getElementById("player-hp");
const enemyHpEl = document.getElementById("enemy-hp");
const playerHealthBar = document.getElementById("player-health");
const enemyHealthBar = document.getElementById("enemy-health");
const attackBtn = document.getElementById("attack-btn");
const healBtn = document.getElementById("heal-btn");

function updateHealth() {
    // Update health text
    playerHpEl.textContent = `HP: ${playerHp}`;
    enemyHpEl.textContent = `HP: ${enemyHp}`;
    // Update health bars
    playerHealthBar.style.width = `${(playerHp / maxHp) * 100}%`;
    enemyHealthBar.style.width = `${(enemyHp / maxHp) * 100}%`;
}

function enemyTurn() {
    // Enemy attacks
    const damage = Math.floor(Math.random() * 15) + 5; // Random damage between 5-20
    playerHp = Math.max(0, playerHp - damage); // Prevent HP from going negative
    messageEl.textContent = `Enemy attacks for ${damage} damage!`;
    updateHealth();
    checkGameOver();

    // Enable buttons again after enemy turn
    setTimeout(() => {
        attackBtn.disabled = false;
        healBtn.disabled = false;
        messageEl.textContent = "It's your turn!";
    }, 1000);
}

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

// Player attack action
attackBtn.addEventListener("click", () => {
    const damage = Math.floor(Math.random() * 20) + 5; // Random damage between 5-25
    enemyHp = Math.max(0, enemyHp - damage); // Prevent HP from going negative
    messageEl.textContent = `You attack for ${damage} damage!`;
    updateHealth();
    checkGameOver();

    if (enemyHp > 0) {
        // Disable buttons during enemy turn
        attackBtn.disabled = true;
        healBtn.disabled = true;
        setTimeout(enemyTurn, 1000);
    }
});

// Player heal action
healBtn.addEventListener("click", () => {
    const healAmount = Math.floor(Math.random() * 15) + 10; // Random heal between 10-25
    playerHp = Math.min(maxHp, playerHp + healAmount); // Prevent exceeding max HP
    messageEl.textContent = `You heal yourself for ${healAmount} HP!`;
    updateHealth();

    // Disable buttons during enemy turn
    attackBtn.disabled = true;
    healBtn.disabled = true;
    setTimeout(enemyTurn, 1000);
});

// Initialize the game
updateHealth();
