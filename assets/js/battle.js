document.addEventListener('DOMContentLoaded', () => {
    const hero = {
        HP: 100,
        ATK: 1,
        DEF: 1,
        POTION: 20,
        POW: 1, 
    };

    const boss = {
        HP: 300,
        ATK: 3,
        DEF: 1
    };

    const hpBar = document.querySelector('.progress-bar.bg-danger');
    const reducedHpBar = document.querySelector('.progress-bar.bg-primary');

    const updateHpBar = () => {
        const hpPercentage = hero.HP;
        hpBar.style.width = `${hpPercentage}%`;
        reducedHpBar.style.width = `${100 - hpPercentage}%`;
    };

    // Example function to reduce HP
    const reduceHp = (amount) => {
        hero.HP = Math.max(0, hero.HP - amount);
        updateHpBar();
    };

    // Initial HP bar update
    updateHpBar();

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

});