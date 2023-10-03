const mainMenu = document.getElementById("main-menu");
const endingsMenu = document.getElementById("endings-menu");
const startBtn = document.getElementById("start-btn");
const endingsBtn = document.getElementById("endings-btn");
const backToMenuBtn = document.getElementById("back-to-menu-btn");
const finishBtn = document.getElementById("finish-button")
const passageElement = document.getElementById("passage");
const passageImage = document.getElementById("passage-image");
const passageText = document.getElementById("passage-text");
const optionButtons = document.getElementById("option-buttons");
const endingsContainer = document.getElementById("endings-container");

let passages;
let openedEndings = [];
openedEndings.push("end_1") //тестовая концовка

fetch('story_1.json')
    .then(response => response.json())
    .then(jsonResponse => passages = jsonResponse.passages);

startBtn.addEventListener("click", startGame);
endingsBtn.addEventListener("click", openEndingsMenu)
backToMenuBtn.addEventListener("click", backToMenu)

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
    
    let tagsArray = passage.tags.split(" ");
    let imgTag = tagsArray.find(tag => tag.startsWith("img"));
    let endTag = tagsArray.find(tag => tag.startsWith("tag"));
    if (imgTag) {
      var imgNumber = imgTag.slice(3);
      passageImage.src = "resources/" + imgNumber + ".jpg";
    } else {
      passageImage.src = "resources/cat.jpeg";
    }

    if(endTag){
      openedEnding.push(endTag)
    }

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

function openEndingsMenu()
{
  mainMenu.style.display = "none";
  endingsMenu.style.display = "block";

  for (const endingElement of endingsContainer.children) {
    console.log(endingElement.id)
    if (openedEndings.includes(endingElement.id)){
      endingElement.className = "ending-button-opened"
    }
    else {
      endingElement.className = "ending-button-closed"
    }
  }
}

function backToMenu()
{
  mainMenu.style.display = "flex";
  endingsMenu.style.display = "none";
}