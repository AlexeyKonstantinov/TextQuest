const mainMenu = document.getElementById("main-menu");
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

const endingsMenu = document.getElementById("endings-menu");
const startBtn = document.getElementById("start-btn");
const endingsBtn = document.getElementById("endings-btn");
const backToMenuBtn1 = document.getElementById("back-to-menu-btn1");
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
const popupEndingImage = document.getElementById('popup-ending-image');

for (let i = 1; i <= 26; i++) {
  const button = document.createElement("button");
  button.classList.add("ending-button-closed");
  button.id = "end_" + i;
  button.textContent = i;
  endingsContainer.appendChild(button);
} //добавляем кнопки концовок

const endingButtons = document.querySelectorAll(".ending-button-closed, .ending-button-opened");
// Получаем все кнопки концовок

let avatarImage = document.querySelector(".button-avatar");
let avatarImage1 = document.querySelector(".player-avatar");

let openedEndings = [];
let endings = {};

for (let i = 1; i <= 26; i++) {
  endings["end_" + i] = { header: "h" + i, text: "t" + i, image: "img" };
} //создаём массив для концовок

let player;

    ysdk.getPlayer().then(_player => {
        player = _player;
        player.getData(['endings', 'Openedendings', 'avatar']).then(data => {
          if (data.Openedendings) 
  {
          console.log('Loaded data:', data);
          // Обработка загруженных данных
          let loadedEndings = data.endings;
          let loadedOpenedEndings = data.Openedendings;
          let loadedAvatar = data.avatar;
          
          // Здесь можно выполнить нужные действия с загруженными данными
          endings = endings;
          openedEndings = loadedOpenedEndings;
          avatarImage.src = loadedAvatar || 'resources/av1.png';
          avatarImage1.src = loadedAvatar || 'resources/av1.png';

  }
  else {

  }
      }).catch(err => {
          console.error('Error loading data:', err);
      });  
    }).catch(err => {
  // Ошибка при инициализации объекта Player.
    });


let passages;


// Проходимся по каждой кнопке и устанавливаем фоновую картинку
endingButtons.forEach(button => {
  const endingId = button.id;
  const ending = endings[endingId];
  button.style.backgroundImage = `url(${ending.image})`;
  button.style.backgroundSize = "cover";
});

//openedEndings.push("end_2") //добавили открытую концовку для теста

fetch('story_1.json')
    .then(response => response.json())
    .then(jsonResponse => passages = jsonResponse.passages);

startBtn.addEventListener("click", startGame);
endingsBtn.addEventListener("click", openEndingsMenu)
backToMenuBtn1.addEventListener("click", backToMenu1)
backToMenuBtn.addEventListener("click", backToMenu)
closePopupButton.addEventListener('click', () => {
  popupEnding.style.display = 'none';
});
document.addEventListener("contextmenu", function(event) {
  event.preventDefault();
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
    mainMenu.style.display = "none";
    passageElement.style.display = "block";
    var Avpopup = document.querySelector('.av-popup');
    Avpopup.style.display = 'none';

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
    let endTag = tagsArray.find(tag => tag.startsWith("end_"));
    if (imgTag) {
      var imgNumber = imgTag.slice(3);
      passageImage.src = "resources/" + imgNumber + ".jpg";
    } else {
      passageImage.src = "resources/1.jpg";
    } //картинки пассажам

    if(endTag){
      openedEndings.push(endTag)
      var endNumber = endTag.slice(4)
      let winTag = tagsArray.find(tag => tag.startsWith("win"));
      if (winTag){
        eval("endings.end_" + endNumber + ".header = 'Ты всех нагнул!';");
      } else {
        eval("endings.end_" + endNumber + ".header = 'Шож ты так...';");
      }
      eval("endings.end_" + endNumber + ".text = passage.cleanText;");
      if (imgTag) {
        var imgNumber = imgTag.slice(3);
        eval("endings.end_" + endNumber + ".image = 'resources/" + imgNumber + ".jpg';");
      } else {
        eval("endings.end_" + endNumber + ".image = 'resources/cat.jpeg';");
      }
      player.setData({
        endings: endings,
        Openedendings: openedEndings,
        avatar: avatarImage.src
      }).then(() => {
        console.log('Data is set');
      }).catch(err => {
        console.error('Error setting data:', err);
      });
    } //грузим только что открытую концовку

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
  passageElement.style.display = "none";
  var Avpopup = document.querySelector('.av-popup');
  Avpopup.style.display = 'none';

  // Проходимся по каждой кнопке и устанавливаем фоновую картинку
endingButtons.forEach(button => {
  const endingId = button.id;
  const ending = endings[endingId];
  button.style.backgroundImage = `url(${ending.image})`;
  button.style.backgroundSize = "cover";
});

  for (const endingElement of endingsContainer.children) {
    if (openedEndings.includes(endingElement.id)){
      endingElement.className = "ending-button-opened"
    }
    else {
      endingElement.className = "ending-button-closed"
    }
  }
}

function backToMenu1()
{
  mainMenu.style.display = "flex";
  passageElement.style.display = "none";
  const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];
  mainText.textContent = randomPhrase; //рандомная фраза в меню
} 

function backToMenu()
{
  mainMenu.style.display = "flex";
  endingsMenu.style.display = "none";
  popupEnding.style.display = "none"; 
  //без багов, если открыта концовка в меню, то закрывает и её.
  const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];
  mainText.textContent = randomPhrase; //рандомная фраза в меню
} 