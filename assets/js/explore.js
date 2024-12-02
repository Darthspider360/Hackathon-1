document.addEventListener('DOMContentLoaded', () => {
    // Retrieve hero object from local storage
    const hero = JSON.parse(localStorage.getItem('hero'));
    const boss = JSON.parse(localStorage.getItem('boss')) || { currentHp: 300 };
    const boss = JSON.parse(localStorage.getItem('boss')) || { currentHp: 300 };

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
            'assets/images/bosscastle/3 deathknight .png',
            'assets/images/bosscastle/2 bossgate .png',
            'assets/images/bosscastle/2 bossgate .png',
            'assets/images/bosscastle/4 eyeball .png',
            'assets/images/bosscastle/6 trap 1.png',
            'assets/images/bosscastle/7 trap 2.png',
            'assets/images/bosscastle/5 puzzle 1.png',
            'assets/images/bosscastle/5 puzzle 1.png',
            'assets/images/bosscastle/8 trap 3.png',
            'assets/images/bosscastle/9 vampire .png',
            'assets/images/bosscastle/10 herotomb .png',
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
        col: 0
        col: 0
    };

    const loadImages = () => {
        const location = locationSelect.value === 'mountain' ? locations.mountain : locations.bosscastle;
        carouselImage.src = imagePaths[location][6]; // 6 is the index of the bosscastle image and start point
        carouselImage.src = imagePaths[location][6]; // 6 is the index of the bosscastle image and start point
    };

    exploreButton.addEventListener('click', loadImages);
    locationSelect.addEventListener('change', loadImages);

    const moveCarousel = (direction) => {
        if (carouselImage.src.includes("trap")) {
            const damage = Math.floor(Math.random() * 60) + 1;
            updateHeroHp(damage);
            hideDialogueBubble();
        }

        if (carouselImage.src.includes("trap")) {
            const damage = Math.floor(Math.random() * 60) + 1;
            updateHeroHp(damage);
            hideDialogueBubble();
        }

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

    let justFinishedBattle = localStorage.getItem('justFinishedBattle') === 'true';

    const defaultHero = {
        hp: 100,
        currentHp: 100,
        atk: 1,
        def: 1,
        potion: 3,
        pow: 1,
    };

    const updateCarousel = () => {
        let index = currentPosition.row * 3 + currentPosition.col;
        if (hero.currentHp == 0) index = 9; // Show hero tomb image if hero is dead
        let index = currentPosition.row * 3 + currentPosition.col;
        if (hero.currentHp == 0) index = 9; // Show hero tomb image if hero is dead
        carouselImage.src = imagePaths[currentLocation][index];
        miniMapCells.forEach((cell, i) => {
            cell.classList.toggle('active', i === index);
        });

        if (justFinishedBattle) {
            justFinishedBattle = false;
            localStorage.setItem('justFinishedBattle', 'false');
            const savedIndex = localStorage.getItem('currentImageIndex');
            if (savedIndex !== null) {
                index = parseInt(savedIndex, 10);
                carouselImage.src = imagePaths[currentLocation][index];
                miniMapCells.forEach((cell, i) => {
                    cell.classList.toggle('active', i === index);
                });
            }
            return;
        }

        if (carouselImage.src.includes("bossgate")) {
            showDialogueBubble(`
                <p>Do you want to fight the final Demon Boss? Current HP: ${boss.currentHp}</p>
                <p>Do you want to fight the final Demon Boss? Current HP: ${boss.currentHp}</p>
                <button id="fight-boss">Yes</button>
                <button id="cancel">Not now</button>
            `);

            document.getElementById('fight-boss').addEventListener('click', () => {
                localStorage.setItem('currentEnemy', 'boss');
                localStorage.setItem('currentPosition', JSON.stringify(currentPosition));
                localStorage.setItem('currentImageIndex', index);
                window.location.href = 'battle.html';
            });

            document.getElementById('cancel').addEventListener('click', hideDialogueBubble);
        } else if (carouselImage.src.includes("deathknight")) {
            localStorage.setItem('currentEnemy', 'deathknight');
            localStorage.setItem('currentPosition', JSON.stringify(currentPosition));
            localStorage.setItem('currentImageIndex', index);
            window.location.href = 'battle.html';
        } else if (carouselImage.src.includes("trap")) {
            showDialogueBubble(`
                <p>Oops, you encountered a trap!</p>
                <button id="dodge-trap">Dodge the trap</button>
                <button id="ignore-trap">Ignore</button>
            `);

            document.getElementById('dodge-trap').addEventListener('click', () => {
                hideDialogueBubble();
                playMinigame();
            });

            document.getElementById('ignore-trap').addEventListener('click', () => {
                const damage = Math.floor(Math.random() * 60) + 1;
                const damage = Math.floor(Math.random() * 60) + 1;
                updateHeroHp(damage);
                hideDialogueBubble();
            });
        } else if (carouselImage.src.includes("angel")) {
            showDialogueBubble(`
                <p>Greetings, brave adventurer! I am Sir Fluffington, your celestial guide with a bit of extra fluff. 🌟 Today, you have three trials to choose from:</p>
                <button id="potion-trial">The Potion Trial</button>
                <button id="sword-trial">The Sword Trial</button>
                <button id="defeat-angel">Defeat Angel</button>
            `);

            document.getElementById('potion-trial').addEventListener('click', () => {
                hideDialogueBubble();
                playMinigame(true); // Pass true to indicate it's an angel trial
            });

            const swordTrialButton = document.getElementById('sword-trial');
            if (hero.atk >= 3) {
                swordTrialButton.disabled = true;
            } else {
                swordTrialButton.addEventListener('click', () => {
                    hideDialogueBubble();
                    playHangmanGame(true); // Pass true to indicate it's an angel trial
                });
            }

            document.getElementById('defeat-angel').addEventListener('click', () => {
                localStorage.setItem('currentEnemy', 'angel');
                localStorage.setItem('currentPosition', JSON.stringify(currentPosition));
                localStorage.setItem('currentImageIndex', index);
                window.location.href = 'battle.html';
            });

            // Refill hero's HP to full when meeting the angel
            hero.currentHp = hero.hp;
            updateHeroHp(0);
        } else if (carouselImage.src.includes("herotomb")) {
            showDialogueBubble(`
                <p>After the long journey, our hero had reached to the destiny, R.I.P.</p>
                <button id="restart-trial">Restart Trial</button>
            `);

            document.getElementById('restart-trial').addEventListener('click', () => {
                hero.potion = defaultHero.potion;
                hero.currentHp = hero.hp;
                currentPosition = { row: 2, col: 0 }; // Set hero to starting position
                localStorage.setItem('hero', JSON.stringify(hero));
                localStorage.setItem('currentPosition', JSON.stringify(currentPosition));
                location.reload();
            });
        } else {
            hideDialogueBubble();
        }
    };

    const savedPosition = JSON.parse(localStorage.getItem('currentPosition'));
    if (savedPosition) {
        currentPosition = savedPosition;
        updateCarousel();
    }

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

    const playMinigame = (isAngelTrial = false) => {
    const playMinigame = (isAngelTrial = false) => {
        const rpsMinigame = new bootstrap.Modal(document.getElementById('rps-minigame'));
        rpsMinigame.show();

        const userResultImg = document.querySelector('.rps-user_result img');
        const cpuResultImg = document.querySelector('.rps-cpu_result img');
        const resultText = document.querySelector('.rps-result');
        const optionImages = document.querySelectorAll('.rps-option_image img');

        const resetGame = () => {
            userResultImg.src = 'assets/minigame-images/rps-images/rock.png';
            cpuResultImg.src = 'assets/minigame-images/rps-images/rock.png';
            resultText.textContent = 'Play';
        };

        const playRound = (userChoice) => {
            const choices = ['rock', 'paper', 'scissors'];
            const cpuChoice = choices[Math.floor(Math.random() * 3)];
            cpuResultImg.src = `assets/minigame-images/rps-images/${cpuChoice}.png`;
        const resetGame = () => {
            userResultImg.src = 'assets/minigame-images/rps-images/rock.png';
            cpuResultImg.src = 'assets/minigame-images/rps-images/rock.png';
            resultText.textContent = 'Play';
        };

        const playRound = (userChoice) => {
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
            resultText.textContent = result;

            if (result === 'Draw') {
                resultText.textContent = 'Play Again';
            } else {
                setTimeout(() => {
                    if (result === 'You Won') {
                        console.log('Player won the minigame');
                        if (isAngelTrial) {
                            hero.potion += 1;
                            updateHeroPotion();
                            console.log('You won a potion!');
                        }
                    } else {
                        console.log('Player lost the minigame');
                        if (!isAngelTrial) {
                            const damage = Math.floor(Math.random() * 24) + 1;
                            updateHeroHp(damage);
                        }
                    }
                    rpsMinigame.hide();
                    resetGame();
                }, 2000); // Delay hiding the modal to allow result display
            }
        };

        optionImages.forEach((image) => {
            image.addEventListener('click', (e) => {
                const userChoice = e.target.alt.toLowerCase();
                userResultImg.src = e.target.src;
                playRound(userChoice);
            });
        });

        resetGame(); // Reset the game when the modal is shown
    };
            if (result === 'Draw') {
                resultText.textContent = 'Play Again';
            } else {
                setTimeout(() => {
                    if (result === 'You Won') {
                        console.log('Player won the minigame');
                        if (isAngelTrial) {
                            hero.potion += 1;
                            updateHeroPotion();
                            console.log('You won a potion!');
                        }
                    } else {
                        console.log('Player lost the minigame');
                        if (!isAngelTrial) {
                            const damage = Math.floor(Math.random() * 24) + 1;
                            updateHeroHp(damage);
                        }
                    }
                    rpsMinigame.hide();
                    resetGame();
                }, 2000); // Delay hiding the modal to allow result display
            }
        };

        optionImages.forEach((image) => {
            image.addEventListener('click', (e) => {
                const userChoice = e.target.alt.toLowerCase();
                userResultImg.src = e.target.src;
                playRound(userChoice);
            });
        });

        resetGame(); // Reset the game when the modal is shown
    };

    const playHangmanGame = (isAngelTrial = false) => {
    const playHangmanGame = (isAngelTrial = false) => {
        const hangmanMinigame = new bootstrap.Modal(document.getElementById('hangman-minigame'));
        hangmanMinigame.show();

        const input = document.querySelector('.guess-input');
        const guess = document.querySelector('.guess');
        const checkButton = document.querySelector('.guess-btn');
        const remainChances = document.querySelector('.guess-chances');

        const resetGame = () => {
            randomNum = Math.floor(Math.random() * 100); // Generate a new random number
            chance = 8; // Reset chances to 5
            chance = 8; // Reset chances to 5
            input.disabled = false; // Enable input field
            remainChances.textContent = chance; // Update chances display
            guess.textContent = ""; // Clear guess display
            guess.style.color = "#333"; // Reset guess text color
            input.value = ""; // Clear input field
            checkButton.textContent = "Check"; // Reset button text
        };

        let randomNum = Math.floor(Math.random() * 100);
        let chance = 8; // Set initial chances to 5
        let chance = 8; // Set initial chances to 5

        checkButton.addEventListener("click", () => {
            if (input.disabled) {
                resetGame();
                return;
            }

            chance--;
            let inputValue = input.value;

            if (inputValue == randomNum) {
                [guess.textContent, input.disabled] = ["Congrats! You found the number.", true];
                [checkButton.textContent, guess.style.color] = ["Replay", "#27ae60"];
                if (isAngelTrial && hero.atk < 3) {
                    hero.atk += 1;
                    updateHeroAtk();
                    console.log('Your attack increased!');
                    if (hero.atk >= 3) {
                        document.getElementById('sword-trial').disabled = true;
                    }
                }
                if (isAngelTrial && hero.atk < 3) {
                    hero.atk += 1;
                    updateHeroAtk();
                    console.log('Your attack increased!');
                    if (hero.atk >= 3) {
                        document.getElementById('sword-trial').disabled = true;
                    }
                }
            } else if (inputValue > randomNum && inputValue < 100) {
                [guess.textContent, remainChances.textContent] = ["Your guess is high", chance];
                guess.style.color = "#333";
            } else if (inputValue < randomNum && inputValue > 0) {
                [guess.textContent, remainChances.textContent] = ["Your guess is low", chance];
                guess.style.color = "#333";
            } else {
                [guess.textContent, remainChances.textContent] = ["Your number is invalid", chance];
                guess.style.color = "#e74c3c";
            }

            if (chance == 0) {
                [checkButton.textContent, input.disabled, inputValue] = ["Replay", true, ""];
                [guess.textContent, guess.style.color] = ["You lost the game", "#e74c3c"];
            }
        });

        resetGame(); // Reset the game when the modal is shown

        resetGame(); // Reset the game when the modal is shown
    };

    document.getElementById('test-rps-button').addEventListener('click', playMinigame);
    document.getElementById('test-hangman-button').addEventListener('click', playHangmanGame);
});