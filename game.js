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
const popupEnding = document.getElementById('popup-ending');
const closePopupButton = document.getElementById('close-popup');
const popupEndingHeader = document.getElementById('popup-ending-header');
const popupEndingText = document.getElementById('popup-ending-text');

let passages;
let openedEndings = [];
let endings = {
  end_1: {header: "h1", text: "t1" },
  end_2: {header: "h2", text: "t2" },
  end_3: {header: "h3", text: "t3" },
  end_4: {header: "h4", text: "t4" },
  end_5: {header: "h5", text: "t5" },
  end_6: {header: "h6", text: "t6" },
  end_7: {header: "h7", text: "t7" },
  end_8: {header: "h8", text: "t8" },
  end_9: {header: "h9", text: "t9" },
};

openedEndings.push("end_2") //добавили открытую концовку для теста

fetch('story_1.json')
    .then(response => response.json())
    .then(jsonResponse => passages = jsonResponse.passages);

startBtn.addEventListener("click", startGame);
endingsBtn.addEventListener("click", openEndingsMenu)
backToMenuBtn.addEventListener("click", backToMenu)
closePopupButton.addEventListener('click', () => {
  popupEnding.style.display = 'none';
});

for (const endingElement of endingsContainer.children) {
  endingElement.addEventListener("click", function () {
    showEndingPopup(endingElement.id)
  })
}

function showEndingPopup(id) {
  popupEnding.style.display = 'block'
  if (!openedEndings.includes(id)){
    popupEndingHeader.innerHTML = "Концовка не открыта"
    popupEndingText.innerHTML = "Концовка не открыта!"
    return
  }
  popupEndingHeader.innerHTML = endings[id].header
  popupEndingText.innerHTML = endings[id].text
}

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