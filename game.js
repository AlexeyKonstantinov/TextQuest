const mainMenu = document.getElementById("main-menu");
const startBtn = document.getElementById("start-btn");
const finishBtn = document.getElementById("finish-button")
const passageElement = document.getElementById("passage");
const passageImage = document.getElementById("passage-image");
const passageText = document.getElementById("passage-text");
const optionButtons = document.getElementById("option-buttons");

let passages;

fetch('story_1.json')
    .then(response => response.json())
    .then(jsonResponse => passages = jsonResponse.passages);

startBtn.addEventListener("click", startGame);

function startGame() {
    console.log("start-game");
    mainMenu.style.display = "none";
    passageElement.style.display = "block";

    var startPassage = passages.find(x => x.tags.includes("start"));
    console.log(startPassage.name);
    loadPassage(startPassage.name);
}

function loadPassage(passageName)
{
    var passage = passages.find(x => x.name == passageName);
    passageText.innerHTML = passage.cleanText

    while(optionButtons.firstChild) {
        optionButtons.removeChild(optionButtons.firstChild);
    }

    passage.links.forEach(link => {
        let button = document.createElement('button');
        button.innerText = link.linkText;
        button.classList.add('option-button');
        button.addEventListener('click', () => loadPassage(link.passageName));
        optionButtons.appendChild(button);
    });
}