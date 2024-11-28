document.addEventListener('DOMContentLoaded', () => {
    const exploreButton = document.getElementById('explore-button');
    const carouselImage = document.querySelector('.carousel-image');
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
    let currentPosition = 0;

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
            case 'up':
                if (currentPosition > 0) currentPosition--;
                break;
            case 'right':
            case 'down':
                if (currentPosition < imagePaths.length - 1) currentPosition++;
                break;
        }
        updateCarousel();
    };

    const updateCarousel = () => {
        carouselImage.src = imagePaths[currentPosition];
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