// **GENERATE RANDOM MODALS**

// Retrieve all modals and the button
const modals = document.querySelectorAll(".minigame");
const showModalBtn = document.getElementById("show-minigame-btn");

// Function to show a random minigame modal
function showRandomModal() {
    // Hide all minigame modals
    modals.forEach(modal => {
        modal.style.display = "none"; // Corrected to use `style`
    });

    // Randomly select a minigame
    const randomModalIndex = Math.floor(Math.random() * modals.length);
    const randomMinigame = modals[randomModalIndex];

    // Show the selected minigame modal
    randomMinigame.style.display = "block"; // Corrected to use `style`

    // Add an event listener to the close button
    const closeBtn = randomMinigame.querySelector(".close-btn");
    if (closeBtn) {
        closeBtn.onclick = () => {
            randomMinigame.style.display = "none"; // Close the modal
        };
    }
}

// Add event listener to the open button
showModalBtn.addEventListener("click", showRandomModal);
