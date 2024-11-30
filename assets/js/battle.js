/**
*working file for battle, please don't touch this file for now!! 
*for pair programming ask Jeff Chen 29/11/2024-->
*/

document.addEventListener('DOMContentLoaded', () => {
    const hero = {
        hp: 100,
        currentHp: 100,
        atk: 1,
        def: 1,
        potion: 20,
        pow: 1, 
    };

    hero.pow = hero.atk;

    const boss = {
        hp: 300,
        currentHp: 300,
        atk: 3,
        def: 1,
        img: 'assets/images/battle/testboss.png'
    };

    const minion = {
        hp: 100,
        currentHp: 100,
        atk: 2,
        def: 1,
        img: 'assets/images/battle/minion.png'
    };

    const enemies = { boss, minion };

    const heroHpBar = document.getElementById('heroHpBar');
    const heroReducedHpBar = document.getElementById('heroReducedHpBar');
    const enemyHpBar = document.getElementById('enemyHpBar');
    const enemyReducedHpBar = document.getElementById('enemyReducedHpBar');
    const powBar = document.querySelector('#battle .d-flex.mt-2 .d-flex');
    const enemyImage = document.querySelector('#battle img[alt="Enemy"]');
    const enemyTypeSelect = document.getElementById('enemyType');

    let currentEnemy;

    const updateHpBar = () => {
        const hpPercentage = (hero.currentHp / hero.hp) * 100;
        heroHpBar.style.width = `${hpPercentage}%`;
        heroReducedHpBar.style.width = `${100 - hpPercentage}%`;
    };

    const updatePowBar = () => {
        powBar.innerHTML = '';
        for (let i = 0; i < hero.pow; i++) {
            const img = document.createElement('img');
            img.src = 'assets/images/battle/sword.png';
            img.alt = `Power Level ${i + 1}`;
            img.classList.add('img-fluid', 'me-1');
            powBar.appendChild(img);
        }
    };

    const updateEnemyImage = () => {
        const selectedEnemy = enemyTypeSelect.value;
        currentEnemy = enemies[selectedEnemy];
        enemyImage.src = currentEnemy.img;
        updateEnemyHpBar(currentEnemy.currentHp);
    };

    const updateEnemyHpBar = (hp) => {
        const hpPercentage = (hp / currentEnemy.hp) * 100;
        enemyHpBar.style.width = `${hpPercentage}%`;
        enemyReducedHpBar.style.width = `${100 - hpPercentage}%`;
    };

    // Example function to reduce HP
    const reduceHp = (amount) => {
        hero.currentHp = Math.max(0, hero.currentHp - amount);
        updateHpBar();
    };

    const reduceEnemyHp = (amount) => {
        currentEnemy.currentHp = Math.max(0, currentEnemy.currentHp - amount);
        updateEnemyHpBar(currentEnemy.currentHp);
    };

    // Initial HP bar update
    updateHpBar();
    updatePowBar();
    updateEnemyImage();

    // Example usage: reduce HP by 20
    reduceHp(0);

    const rollDice = () => Math.floor(Math.random() * 6) + 1;

    const showBattleMessage = (message) => {
        const battleMsg = document.getElementById('battleMsg');
        battleMsg.innerText = message;
        battleMsg.style.display = 'block';
        setTimeout(() => {
            battleMsg.style.display = 'none';
        }, 3000);
    };

    const atkButton = document.getElementById('atkButton');
    atkButton.addEventListener('click', () => {
        let dice1 = rollDice();
        if (dice1==6) dice1*=2; //critical hit
        let dice2 = rollDice();
        if (dice2==6) dice2*=2; //critical hit
        let dice3 = rollDice();
        if (dice3==6) dice3*=2; //critical hit
        let dice4 = rollDice();
        if (dice4==6) dice4*=2; //critical hit        
        let dice5 = rollDice();
        if (dice5==6) dice5*=2; //critical hit
        let dice6 = rollDice();
        if (dice6==6) dice6*=2; //critical hit

        let heroAtk = dice1;
        if (hero.pow >= 2) heroAtk += dice2;
        if (hero.pow >= 3) heroAtk += dice3;

        let enemyAtk = dice4;
        if (currentEnemy.atk >= 2) enemyAtk += dice5;
        if (currentEnemy.atk >= 3) enemyAtk += dice6;

        console.log(`Hero ATK: ${heroAtk}`);
        console.log(`Enemy ATK: ${enemyAtk}`);
        showBattleMessage(`Hero attacks with ${heroAtk} power! Enemy attacks with ${enemyAtk} power!`);
        
        // Reduce enemy HP by heroAtk and hero HP by enemyAtk
        reduceEnemyHp(heroAtk);
        reduceHp(enemyAtk);
    });

    const defButton = document.getElementById('defButton');
    defButton.addEventListener('click', () => {
        // Example action: increase DEF by 1
        hero.def += 1;
        console.log(`DEF increased to ${hero.def}`);
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