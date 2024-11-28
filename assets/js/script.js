document.addEventListener("DOMContentLoaded", function() {
    let buttons = document.getElementsByTagName("button");

    for (let button of buttons) {
        button.addEventListener("click", function() {
            if (this.getAttribute("data-type") === "submit") {
                checkAnswer();
            } else {
                let questMap = this.getAttribute("data-type");
                loadQuestMap(questMap);
            }
        });
    }
    document.getElementById("backButton").addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            loadQuestMap();
        }
    });
});

function loadQuestMap(questMap) {
    if (questMap === "boat") {
        window.location.href = 'boatMap.html';
    } else if (questMap === "tree") {
        window.location.href = 'forestMap.html';
    } else if (questMap === "mountain") {
        window.location.href = 'mountainMap.html';
    } else if (questMap === "fort") {
        window.location.href = 'castleMap.html';
    } else if (questMap === "skull") {
        window.location.href = 'bossMap.html';
    } else {
        alert(`Unknown game type: ${gameType}`);
        throw `Unknown game type: ${gameType}. Aborting!`;
    }
}