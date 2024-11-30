/**
*working file for battle, please don't touch this file for now!! 
*for pair programming ask Jeff Chen 29/11/2024-->
*/

document.addEventListener('DOMContentLoaded', () => {
    const hero = {
        HP: 100,
        currentHP: 100,
        ATK: 1,
        DEF: 1,
        POTION: 20,
        POW: 2, 
    };

    hero.POW = hero.ATK;

    const boss = {
        HP: 300,
        currentHP: 300,
        ATK: 3,
        DEF: 1,
        img: 'assets/images/battle/testboss.png'
    };

    const minion = {
        HP: 100,
        currentHP: 100,
        ATK: 2,
        DEF: 1,
        img: 'assets/images/battle/minion.png'
    };

    const enemies = { boss, minion };

    const hpBar = document.querySelector('.progress-bar.bg-danger');
    const reducedHpBar = document.querySelector('.progress-bar.bg-primary');
    const powBar = document.querySelector('#battle .d-flex.mt-2 .d-flex');
    const enemyImage = document.querySelector('#battle img[alt="Enemy"]');
    const enemyTypeSelect = document.getElementById('enemyType');
    const enemyHpBar = document.getElementById('enemyHpBar');
    const enemyReducedHpBar = document.getElementById('enemyReducedHpBar');

    const updateHpBar = () => {
        const hpPercentage = (hero.currentHP / hero.HP) * 100;
        hpBar.style.width = `${hpPercentage}%`;
        reducedHpBar.style.width = `${100 - hpPercentage}%`;
    };

    const updatePowBar = () => {
        powBar.innerHTML = '';
        for (let i = 0; i < hero.POW; i++) {
            const img = document.createElement('img');
            img.src = 'assets/images/battle/sword.png';
            img.alt = `Power Level ${i + 1}`;
            img.classList.add('img-fluid', 'me-1');
            powBar.appendChild(img);
        }
    };

    const updateEnemyImage = () => {
        const selectedEnemy = enemyTypeSelect.value;
        enemyImage.src = enemies[selectedEnemy].img;
        updateEnemyHpBar(enemies[selectedEnemy].currentHP);
    };

    const updateEnemyHpBar = (hp) => {
        const selectedEnemy = enemyTypeSelect.value;
        const hpPercentage = (hp / enemies[selectedEnemy].HP) * 100;
        enemyHpBar.style.width = `${hpPercentage}%`;
        enemyReducedHpBar.style.width = `${100 - hpPercentage}%`;
    };

    // Example function to reduce HP
    const reduceHp = (amount) => {
        hero.currentHP = Math.max(0, hero.currentHP - amount);
        updateHpBar();
    };

    // Initial HP bar update
    updateHpBar();
    updatePowBar();
    updateEnemyImage();

    // Example usage: reduce HP by 20
    reduceHp(0);

    const atkButton = document.getElementById('atkButton');
    atkButton.addEventListener('click', () => {
        reduceHp(10); // Example action: reduce HP by 10
    });

    const defButton = document.getElementById('defButton');
    defButton.addEventListener('click', () => {
        // Example action: increase DEF by 1
        hero.DEF += 1;
        console.log(`DEF increased to ${hero.DEF}`);
    });

    const healButton = document.getElementById('healButton');
    healButton.addEventListener('click', () => {
        // Empty click event listener
    });

    const fleeButton = document.getElementById('fleeButton');
    fleeButton.addEventListener('click', () => {
        // Empty click event listener
    });

    enemyTypeSelect.addEventListener('change', updateEnemyImage);

    // Load enemy type from select menu on page reload
    window.addEventListener('load', () => {
        updateEnemyImage();
    });
});