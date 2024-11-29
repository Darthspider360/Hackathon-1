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

    const exploreButton = document.getElementById('explore-button');
    const carouselImage = document.querySelector('.carousel-image');
    const miniMapCells = document.querySelectorAll('.mini-map-cell');
    const imagePaths = [
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
        // Add more image paths as needed
    ];
    let currentPosition = { row: 1, col: 1 };

    const loadImages = () => {
        const usedIndices = new Set();
        let randomIndex;
        do {
            randomIndex = Math.floor(Math.random() * imagePaths.length);
        } while (usedIndices.has(randomIndex));
        usedIndices.add(randomIndex);
        carouselImage.src = imagePaths[randomIndex];
    };

    exploreButton.addEventListener('click', loadImages);

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

    const updateCarousel = () => {
        const index = currentPosition.row * 3 + currentPosition.col;
        carouselImage.src = imagePaths[index];
        miniMapCells.forEach((cell, i) => {
            cell.classList.toggle('active', i === index);
        });
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

    // Load images when the page is loaded
    loadImages();
});