// Initial stats
let combatPlayerHp = 100;
let combatEnemyHp = 100;
const combatMaxHp = 100;

// DOM Elements
const combatStartBtn = document.getElementById("combat-start-btn");
const combatModal = document.getElementById("combat-modal");
const combatCloseModalBtn = document.getElementById("combat-close-modal");
const combatMessageEl = document.getElementById("combat-message");
const combatPlayerHpEl = document.getElementById("combat-player-hp");
const combatEnemyHpEl = document.getElementById("combat-enemy-hp");
const combatPlayerHealthBar = document.getElementById("combat-player-health");
const combatEnemyHealthBar = document.getElementById("combat-enemy-health");
const combatAttackBtn = document.getElementById("combat-attack-btn");
const combatHealBtn = document.getElementById("combat-heal-btn");

// Function to update health
function updateCombatHealth() {
    combatPlayerHpEl.textContent = `HP: ${combatPlayerHp}`;
    combatEnemyHpEl.textContent = `HP: ${combatEnemyHp}`;
    combatPlayerHealthBar.style.width = `${(combatPlayerHp / combatMaxHp) * 100}%`;
    combatEnemyHealthBar.style.width = `${(combatEnemyHp / combatMaxHp) * 100}%`;
}

// Enemy turn logic
function combatEnemyTurn() {
    const damage = Math.floor(Math.random() * 15) + 5;
    combatPlayerHp = Math.max(0, combatPlayerHp - damage);
    combatMessageEl.textContent = `Enemy attacks for ${damage} damage!`;
    updateCombatHealth();
    checkCombatGameOver();

    setTimeout(() => {
        combatAttackBtn.disabled = false;
        combatHealBtn.disabled = false;
        if (combatPlayerHp > 0) combatMessageEl.textContent = "It's your turn!";
    }, 1000);
}

// Check if the game is over
function checkCombatGameOver() {
    if (combatPlayerHp <= 0) {
        combatMessageEl.textContent = "You lost! Game over!";
        combatAttackBtn.disabled = true;
        combatHealBtn.disabled = true;
    } else if (combatEnemyHp <= 0) {
        combatMessageEl.textContent = "You won! Congratulations!";
        combatAttackBtn.disabled = true;
        combatHealBtn.disabled = true;
    }
}

// Player attack
combatAttackBtn.addEventListener("click", () => {
    const damage = Math.floor(Math.random() * 20) + 5;
    combatEnemyHp = Math.max(0, combatEnemyHp - damage);
    combatMessageEl.textContent = `You attack for ${damage} damage!`;
    updateCombatHealth();
    checkCombatGameOver();

    if (combatEnemyHp > 0) {
        combatAttackBtn.disabled = true;
        combatHealBtn.disabled = true;
        setTimeout(combatEnemyTurn, 1000);
    }
});

// Player heal
combatHealBtn.addEventListener("click", () => {
    const healAmount = Math.floor(Math.random() * 15) + 10;
    combatPlayerHp = Math.min(combatMaxHp, combatPlayerHp + healAmount);
    combatMessageEl.textContent = `You heal yourself for ${healAmount} HP!`;
    updateCombatHealth();

    combatAttackBtn.disabled = true;
    combatHealBtn.disabled = true;
    setTimeout(combatEnemyTurn, 1000);
});

// Open modal
combatStartBtn.addEventListener("click", () => {
    combatModal.style.display = "flex";
    resetCombatGame();
});

// Close modal
combatCloseModalBtn.addEventListener("click", () => {
    combatModal.style.display = "none";
});

// Reset game function
function resetCombatGame() {
    combatPlayerHp = combatMaxHp;
    combatEnemyHp = combatMaxHp;
    updateCombatHealth();
    combatMessageEl.textContent = "Battle begins! It's your turn!";
    combatAttackBtn.disabled = false;
    combatHealBtn.disabled = false;
}

// Initialize health bars
updateCombatHealth();
