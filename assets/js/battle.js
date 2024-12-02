/**
*working file for battle, please don't touch this file for now!! 
*for pair programming ask Jeff Chen 29/11/2024-->
*/

document.addEventListener('DOMContentLoaded', () => {
    // Retrieve hero object from local storage
    const hero = JSON.parse(localStorage.getItem('hero')) || {
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
        img: 'assets/images/battle/testboss.png',
        flee: 0.1,
    };

    const vampire = {
        hp: 200,
        currentHp: 200,
        atk: 2,
        def: 1,
        img: 'assets/images/bosscastle/vampire.png',
        flee: 0.3,
    };

    const deathknight = {
        hp: 150,
        currentHp: 150,
        atk: 2,
        def: 1,
        img: 'assets/images/bosscastle/deathknight.png',
        flee: 0.5,
    };

    const eyeball = {
        hp: 100,
        currentHp: 100,
        atk: 1,
        def: 1,
        img: 'assets/images/bosscastle/eyeball.png',
        flee: 0.7,
    };

    const angel = {
        hp: 500,
        currentHp: 500,
        atk: 3,
        def: 1,
        img: 'assets/images/bosscastle/angel.png',
        flee: 0.8,
    };

    const enemies = { boss, vampire, deathknight, eyeball, angel };

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

    const updatePotionCount = () => {
        document.getElementById('potionCount').innerText = hero.potion;
    };

    const updateEnemyImage = () => {
        const selectedEnemy = enemyTypeSelect.value;
        currentEnemy = enemies[selectedEnemy];
        enemyImage.src = currentEnemy.img;
        updateEnemyHpBar(currentEnemy.currentHp); // Ensure the correct parameter is passed
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
    updatePotionCount();

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
        if (hero.pow >= 4) heroAtk = heroAtk*2;
        if (hero.pow > hero.atk) {
            hero.pow--;
            updatePowBar();
        }


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
        let dice1 = rollDice();
        if (dice1 == 6) dice1 *= 2; // critical block
        let dice2 = rollDice();
        if (dice2 == 6) dice2 *= 2; // critical block
        let dice3 = rollDice();
        if (dice3 == 6) dice3 *= 2; // critical block

        let heroDef = dice1;
        if (hero.pow >= 2) heroDef += dice2;
        if (hero.pow >= 3) heroDef += dice3;

        let dice4 = rollDice();
        if (dice4 == 6) dice4 *= 2; // critical hit
        let dice5 = rollDice();
        if (dice5 == 6) dice5 *= 2; // critical hit
        let dice6 = rollDice();
        if (dice6 == 6) dice6 *= 2; // critical hit

        let enemyAtk = dice4;
        if (currentEnemy.atk >= 2) enemyAtk += dice5;
        if (currentEnemy.atk >= 3) enemyAtk += dice6;

        console.log(`Hero DEF: ${heroDef}`);
        console.log(`Enemy ATK: ${enemyAtk}`);
        showBattleMessage(`Hero blocks with ${heroDef} power! Enemy attacks with ${enemyAtk} power!`);

        // Stack a power level if hero blocks
        if (hero.pow < 4) {
            hero.pow += 1;
            updatePowBar();
        }

        // Reduce hero HP by the remaining enemy attack after block
        enemyAtk = Math.max(0, enemyAtk - heroDef);
        reduceHp(enemyAtk);
    });

    const healButton = document.getElementById('healButton');
    healButton.addEventListener('click', () => {
        if (hero.potion > 0) {
            hero.potion -= 1;
            hero.currentHp = Math.min(hero.hp, hero.currentHp + 40);
            updateHpBar();
            updatePotionCount();
            console.log(`Healed! Current HP: ${hero.currentHp}, Potions left: ${hero.potion}`);
        } else {
            console.log('No potions left!');
        }
    });

    const fleeButton = document.getElementById('fleeButton');
    fleeButton.addEventListener('click', () => {
        const fleeSuccess = Math.random() < currentEnemy.flee;
        if (fleeSuccess) {
            showBattleMessage('You successfully fled the battle!');
            setTimeout(() => {
                localStorage.setItem('hero', JSON.stringify(hero)); // Save hero state
                window.location.href = 'explore.html';
            }, 2000);
        } else {
            let dice4 = rollDice();
            if (dice4 == 6) dice4 *= 2; // critical hit
            let dice5 = rollDice();
            if (dice5 == 6) dice5 *= 2; // critical hit
            let dice6 = rollDice();
            if (dice6 == 6) dice6 *= 2; // critical hit

            let enemyAtk = dice4;
            if (currentEnemy.atk >= 2) enemyAtk += dice5;
            if (currentEnemy.atk >= 3) enemyAtk += dice6;

            const damage = Math.floor(enemyAtk / 2);
            reduceHp(damage);
            showBattleMessage(`Flee failed! You took ${damage} damage.`);
        }
    });

    enemyTypeSelect.addEventListener('change', updateEnemyImage);

    // Load enemy type from select menu on page reload
    window.addEventListener('load', () => {
        updateEnemyImage();
    });
});