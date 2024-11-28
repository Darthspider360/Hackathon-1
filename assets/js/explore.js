document.addEventListener('DOMContentLoaded', () => {
    const exploreButton = document.getElementById('explore-button');
    const carouselImages = document.querySelectorAll('.carousel-image');
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

    exploreButton.addEventListener('click', () => {
        carouselImages.forEach(img => {
            const randomIndex = Math.floor(Math.random() * imagePaths.length);
            img.src = imagePaths[randomIndex];
        });
    });

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
        carouselImages.forEach((img, i) => {
            img.classList.toggle('active', i === index);
        });
    };

    document.querySelector('.carousel-button.left').addEventListener('click', () => moveCarousel('left'));
    document.querySelector('.carousel-button.right').addEventListener('click', () => moveCarousel('right'));
    document.querySelector('.carousel-button.up').addEventListener('click', () => moveCarousel('up'));
    document.querySelector('.carousel-button.down').addEventListener('click', () => moveCarousel('down'));

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
});