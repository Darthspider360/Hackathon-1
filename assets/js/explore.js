document.addEventListener('DOMContentLoaded', () => {
    // Retrieve hero object from local storage
    const hero = JSON.parse(localStorage.getItem('hero'));

    const updateHeroHp = (amount) => {
        hero.currentHp = Math.max(0, hero.currentHp - amount);
        document.getElementById('hero-hp').textContent = `HP: ${hero.currentHp}`;
        // Save updated hero object to local storage
        localStorage.setItem('hero', JSON.stringify(hero));
    };

    const updateHeroAtk = () => {
        document.getElementById('hero-atk').textContent = `ATK: ${hero.atk}`;
    };

    const updateHeroPotion = () => {
        document.getElementById('hero-potion').textContent = `Potion: ${hero.potion}`;
    };

    // Initialize hero stats display
    updateHeroHp(0);
    updateHeroAtk();
    updateHeroPotion();

    const locations = Object.freeze({
        bosscastle: 0,
        mountain: 1,
    });

    const currentLocation = locations.bosscastle;

    const exploreButton = document.getElementById('explore-button');
    const carouselImage = document.querySelector('.carousel-image');
    const miniMapCells = document.querySelectorAll('.mini-map-cell');
    const locationSelect = document.getElementById('location-select');
    const imagePaths = [
        [
            'assets/images/bosscastle/1 angel .png',
            'assets/images/bosscastle/2 bossgate .png',
            'assets/images/bosscastle/3 deathknight .png',
            'assets/images/bosscastle/4 eyeball .png',
            'assets/images/bosscastle/5 puzzle 1.png',
            'assets/images/bosscastle/6 trap 1.png',
            'assets/images/bosscastle/7 trap 2.png',
            'assets/images/bosscastle/8 trap 3.png',
            'assets/images/bosscastle/9 vampire .png',
        ],
        [
            'assets/images/mt/mt-1-center path-top-cloggy.png',
            'assets/images/mt/mt-2-center path-top-sunny.png',
            'assets/images/mt/mt-3-center path-mid-sunny.png',
            'assets/images/mt/mt-4-side path water-low-sunny.png',
            'assets/images/mt/mt-5-center path-top-rocky.png',
            'assets/images/mt/mt-6-center path-mid-sunny.png',
            'assets/images/mt/mt-7-center path-top-rocky-boss.png',
            'assets/images/mt/mt-8-round path-mid-tree.png',
            'assets/images/mt/mt-9-side path-mid-no habitation.png',
            'assets/images/mt/mt-10-side path-mid-no habitation.png',
        ],


        // Add more image paths as needed
    ];
    let currentPosition = {
        row: 2,
        col: 1
    };

    const loadImages = () => {
        const location = locationSelect.value === 'mountain' ? locations.mountain : locations.bosscastle;
        carouselImage.src = imagePaths[location][7]; // 7 is the index of the bosscastle image and start point
    };

    exploreButton.addEventListener('click', loadImages);
    locationSelect.addEventListener('change', loadImages);

    const moveCarousel = (direction) => {
        switch (direction) {
            case 'left':
                if (currentPosition.col > 0) currentPosition.col--;
                break;
            case 'right':
                if (currentPosition.col < 2) currentPosition.col++;
                break;
            case 'up':
                if (currentPosition.row > 0) currentPosition.row--;
                break;
            case 'down':
                if (currentPosition.row < 2) currentPosition.row++;
                break;
        }
        updateCarousel();
    };

    const createDialogueBubble = () => {
        const dialogueBubble = document.createElement('div');
        dialogueBubble.classList.add('dialogue-bubble');
        dialogueBubble.style.position = 'fixed';
        dialogueBubble.style.top = '50%';
        dialogueBubble.style.left = '50%';
        dialogueBubble.style.transform = 'translate(-50%, -50%)';
        dialogueBubble.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
        dialogueBubble.style.border = '1px solid black';
        dialogueBubble.style.padding = '10px';
        dialogueBubble.style.borderRadius = '10px';
        dialogueBubble.style.display = 'none';
        document.body.appendChild(dialogueBubble);
        return dialogueBubble;
    };

    const dialogueBubble = createDialogueBubble();

    const showDialogueBubble = (content) => {
        dialogueBubble.innerHTML = content;
        dialogueBubble.style.display = 'block';
    };

    const hideDialogueBubble = () => {
        dialogueBubble.style.display = 'none';
    };

    const updateCarousel = () => {
        const index = currentPosition.row * 3 + currentPosition.col;
        carouselImage.src = imagePaths[currentLocation][index];
        miniMapCells.forEach((cell, i) => {
            cell.classList.toggle('active', i === index);
        });

        if (carouselImage.src.includes("bossgate")) {
            showDialogueBubble(`
                <p>Do you want to fight the final Demon Boss?</p>
                <button id="fight-boss">Yes</button>
                <button id="cancel">Not now</button>
            `);

            document.getElementById('fight-boss').addEventListener('click', () => {
                window.location.href = 'battle.html?currentEnemy=boss';
            });

            document.getElementById('cancel').addEventListener('click', hideDialogueBubble);
        } else {
            hideDialogueBubble();
        }
    };

    document.getElementById('carousel-left').addEventListener('click', () => moveCarousel('left'));
    document.getElementById('carousel-right').addEventListener('click', () => moveCarousel('right'));
    document.getElementById('carousel-up').addEventListener('click', () => moveCarousel('up'));
    document.getElementById('carousel-down').addEventListener('click', () => moveCarousel('down'));

    document.addEventListener('keydown', (event) => {
        switch (event.key) {
            case 'ArrowLeft':
                moveCarousel('left');
                break;
            case 'ArrowRight':
                moveCarousel('right');
                break;
            case 'ArrowUp':
                moveCarousel('up');
                break;
            case 'ArrowDown':
                moveCarousel('down');
                break;
        }
    });

    // Heal button functionality
    document.getElementById('heal-button').addEventListener('click', () => {
        if (hero.potion > 0) {
            hero.potion -= 1;
            hero.currentHp = Math.min(hero.hp, hero.currentHp + 40);
            updateHeroHp(0);
            updateHeroPotion();
            console.log(`Healed! Current HP: ${hero.currentHp}, Potions left: ${hero.potion}`);
        } else {
            console.log('No potions left!');
        }
    });

    // Load images when the page is loaded
    loadImages();

    const playMinigame = () => {
        const rpsMinigame = new bootstrap.Modal(document.getElementById('rps-minigame'));
        rpsMinigame.show();

        const userResultImg = document.querySelector('.rps-user_result img');
        const cpuResultImg = document.querySelector('.rps-cpu_result img');
        const resultText = document.querySelector('.rps-result');
        const optionImages = document.querySelectorAll('.rps-option_image img');

        const playRound = () => {
            optionImages.forEach((image) => {
                image.addEventListener('click', (e) => {
                    const userChoice = e.target.alt.toLowerCase();
                    userResultImg.src = e.target.src;

                    const choices = ['rock', 'paper', 'scissors'];
                    const cpuChoice = choices[Math.floor(Math.random() * 3)];
                    cpuResultImg.src = `assets/minigame-images/rps-images/${cpuChoice}.png`;

                    let result;
                    if (userChoice === cpuChoice) {
                        result = 'Draw';
                    } else if (
                        (userChoice === 'rock' && cpuChoice === 'scissors') ||
                        (userChoice === 'paper' && cpuChoice === 'rock') ||
                        (userChoice === 'scissors' && cpuChoice === 'paper')
                    ) {
                        result = 'You Won';
                    } else {
                        result = 'You Lost';
                    }

                    resultText.textContent = result;

                    setTimeout(() => {
                        if (result === 'Draw') {
                            playRound(); // Restart the game if it's a draw
                        } else {
                            rpsMinigame.hide();
                            if (result === 'You Won') {
                                console.log('Player won the minigame');
                            } else {
                                const damage = Math.floor(Math.random() * 6) + 1;
                                updateHeroHp(damage);
                                console.log('Player lost the minigame');
                            }
                        }
                    }, 2000);
                });
            });
        };

        playRound();
    };

    document.getElementById('test-rps-button').addEventListener('click', playMinigame);

});