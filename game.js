document.addEventListener("contextmenu", function(event) {
  event.preventDefault();
});

const phrases = [
  "Готов к экшену?",
  "Ты будешь рассказывать об этом внукам 💯",
  "Пр кд чд",
  "Играй уже!",
  "1000-7",
  "Другие игры фуфло!"
];
const mainText = document.getElementById("main-text");
const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];
mainText.textContent = randomPhrase;

const STORAGE_KEY = "game_saves";
//localStorage.removeItem(STORAGE_KEY) -- стереть все сейвы

const views = {
  MAIN_MENU: "view-main-menu",
  PASSAGE: "view-passage",
  ENDINGS: "view-endings-menu",
  POPUP_ENDING: "popup-ending",
};

const views_styles = {
  MAIN_MENU: "flex",
  PASSAGE: "block",
  ENDINGS: "block",
  POPUP_ENDING: "block",
};

const view_state = {
  currentScreen: null,
  openedPopups: [],
};

function showView(viewId, displayStyle) {
  if (view_state.currentScreen) {
    view_state.currentScreen.style.display = "none";
  }

  const newScreen = document.getElementById(viewId);
  if (newScreen) {
    newScreen.style.display = displayStyle;
    view_state.currentScreen = newScreen;
  }

  view_state.openedPopups.forEach(popup => {
    popup.style.display = "none";
  });
  view_state.openedPopups.length = 0; // очистка массива
}

function showPopup(popupId, displayStyle) {
  const popup = document.getElementById(popupId);
  if (view_state.openedPopups.includes(popup)) {
    return;
  }
  view_state.openedPopups.push(popup);
  popup.style.display = displayStyle;
}

function hidePopup(popupId){
  const popup = document.getElementById(popupId);
  const index = view_state.openedPopups.indexOf(popup);
  if (index !== -1) {
    view_state.openedPopups.splice(index, 1); // удаляем попап из списка открытых
  }
  if (popup) {
    popup.style.display = "none";
  }
}

const startBtn = document.getElementById("start-btn");
const endingsBtn = document.getElementById("endings-btn");
const backToMenuBtn1 = document.getElementById("back-to-menu-btn1");
const backToMenuBtn = document.getElementById("back-to-menu-btn");
const finishBtn = document.getElementById("finish-button")
const passageImage = document.getElementById("passage-image");
const passageText = document.getElementById("passage-text");
const optionButtons = document.getElementById("option-buttons");
const endingButtonsContainer = document.getElementById("endings-container");
const popupEnding = document.getElementById('popup-ending');
const closePopupButton = document.getElementById('close-popup');
const popupEndingHeader = document.getElementById('popup-ending-header');
const popupEndingText = document.getElementById('popup-ending-text');
const popupEndingImage = document.getElementById('popup-ending-image');

let avatarImage = document.querySelector(".button-avatar");
let avatarImage1 = document.querySelector(".player-avatar");


let openedEndings = [];
let endings = {};
let endingButtons = {};
let passages;

const saveDataJson = localStorage.getItem(STORAGE_KEY);
if (saveDataJson !== null) {
  openedEndings = JSON.parse(saveDataJson);
}

showView(views.MAIN_MENU, views_styles.MAIN_MENU)

fetch('story_1.json')
    .then(response => response.json())
    .then(jsonResponse => {
      passages = jsonResponse.passages;
      loadEndings()
    });


function loadEndings(){
  passages.forEach(passage => {
    let tagsArray = passage.tags.split(" ");
    let endTag = tagsArray.find(tag => tag.startsWith("end"));
    let winTag = tagsArray.find(tag => tag.startsWith("win"));
    let imgTag = tagsArray.find(tag => tag.startsWith("img"));
    if (endTag){
      endings[endTag] = { 
        header: winTag ? 'Ты всех нагнул!' : 'Шож ты так...',
        text: passage.cleanText,
        image: imgTag ? 'resources/' + imgTag.slice(3) + '.jpg' : 'resources/cat.jpeg' };
    }
  });

  for (let i = 1; i <= 26; i++) {
    const button = document.createElement("button");
    button.classList.add("ending-button-closed");
    button.textContent = i;
    endingButtonsContainer.appendChild(button);
    button.addEventListener("click", function () {
      showEndingPopup("end_" + i)
    })
    endingButtons["end_" + i] = button
  }

  Object.entries(endingButtons).forEach(([id, button]) => {
    const ending = endings[id];
    button.style.backgroundImage = `url(${ending.image})`;
    button.style.backgroundSize = "cover";
  });
}

startBtn.addEventListener("click", startGame);
endingsBtn.addEventListener("click", openEndingsMenu)
backToMenuBtn1.addEventListener("click", backToMenu)
backToMenuBtn.addEventListener("click", backToMenu)
closePopupButton.addEventListener('click', () => {
  hidePopup(views.POPUP_ENDING)
});


function showEndingPopup(id) {
  console.log('showEndingPopup ' + id)
  showPopup(views.POPUP_ENDING, views_styles.POPUP_ENDING)

  if (!openedEndings.includes(id)){
    popupEndingHeader.innerHTML = "Концовка не открыта"
    popupEndingText.innerHTML = "Концовка не открыта!"
    //popupEndingImage.src = endings[id].image;
    popupEndingImage.src = "resources/22.png"; 
    return
  }
  popupEndingHeader.innerHTML = endings[id].header
  popupEndingText.innerHTML = endings[id].text
  popupEndingImage.src = endings[id].image;
}

function openPopup() {
  var avatarButton = document.querySelector('.avatar-button');
  var Avpopup = document.querySelector('.av-popup');
  
  // Проверяем текущее состояние popup окна
  if (Avpopup.style.display === 'block') {
    // Если popup окно уже открыто, то закрываем его
    Avpopup.style.display = 'none';
  } else {
    // Получаем координаты кнопки выбора аватара
    var buttonRect = avatarButton.getBoundingClientRect();
  
    // Устанавливаем позицию popup окна в зависимости от ориентации экрана
    if (window.innerWidth > window.innerHeight) {
      // Горизонтальная ориентация экрана
      Avpopup.style.top = (buttonRect.top + buttonRect.height + avatarButton.offsetHeight) + 'px';
      //Avpopup.style.left = buttonRect.left + 'px';
      Avpopup.style.left = (buttonRect.left + buttonRect.width + avatarButton.offsetWidth) + 'px';
    } else {
      // Вертикальная ориентация экрана
      Avpopup.style.top = (buttonRect.top + buttonRect.height) + 'px';
      Avpopup.style.left = (buttonRect.left + buttonRect.width + avatarButton.offsetWidth) + 'px';
    }
  
    // Отображаем popup окно
    Avpopup.style.display = 'block';
  }
}


function selectAvatar(avatarPath) {
  // Действия при выборе аватара
  console.log('Выбран аватар:', avatarPath);
  //var avatarImage = document.querySelector(".button-avatar");
  //var avatarImage1 = document.querySelector(".player-avatar");
  avatarImage.src = avatarPath;
  avatarImage1.src = avatarPath; //на аву ставим
  
  // Закрываем popup окно
  var Avpopup = document.querySelector('.av-popup');
  Avpopup.style.display = 'none';
}
//function selectAvatar(avatarPath) {
  //var avatarImage = document.querySelector(".button-avatar");
 // avatarImage.src = avatarPath;

  //var Avpopup = document.getElementById("avatar-popup");
  //Avpopup.style.display = "none";
//}

function startGame() {
    console.log("start-game");
    showView(views.PASSAGE, views_styles.PASSAGE)
    var startPassage = passages.find(x => x.tags.includes("start"));
    loadPassage(startPassage.name);
}

function loadPassage(passageName)
{
    var passage = passages.find(x => x.name == passageName);
    passageText.innerHTML = passage.cleanText
    
    let tagsArray = passage.tags.split(" ");
    let imgTag = tagsArray.find(tag => tag.startsWith("img"));
    let endTag = tagsArray.find(tag => tag.startsWith("end_"));
    if (imgTag) {
      var imgNumber = imgTag.slice(3);
      passageImage.src = "resources/" + imgNumber + ".jpg";
    } else {
      passageImage.src = "resources/1.jpg";
    } //картинки пассажам

    if(endTag){
      if (!openedEndings.includes(endTag)) {
        openedEndings.push(endTag);
        const saveDataJson = JSON.stringify(openedEndings);
        localStorage.setItem(STORAGE_KEY, saveDataJson);
      }
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
  showView(views.ENDINGS, views_styles.ENDINGS)

  Object.entries(endingButtons).forEach(([id, button]) => {
    if (openedEndings.includes(id)){
      button.className = "ending-button-opened";
      button.style.backgroundImage = `url(${endings[id].image})`;
      button.style.backgroundSize = "cover";
    }
    else {
      button.className = "ending-button-closed"
      button.style.backgroundImage = 'none';
    }
  });
}

function backToMenu()
{
  showView(views.MAIN_MENU, views_styles.MAIN_MENU)
  const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];
  mainText.textContent = randomPhrase;
} 
