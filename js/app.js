'use strict';

//Problems
//1. greetings - change greetings by time
//2. get name and save it to local storage
//3. get the date
//4. get weather api
//5. get time
//6. get random photos displayed
//7. get random quotes and author displayed
//8. todo list (add item, remove item)

const greet = document.querySelector('.greeting');
const userName = document.querySelector('#heading input');
const setName = document.querySelector('.name');
const editName = document.querySelector('.modify');
const today = new Date();
const date = document.querySelector('#left .date');

//1
function greetings() {
  let time = today.getHours();
  if (time >= 18) {
    greet.innerHTML = `Good Evening 🌙`;
  } else if (time >= 12) {
    greet.innerHTML = `Good Afternoon 🥳`;
  } else if (time > 0 && time < 4) {
    greet.innerHTML = `Good Morning 🌈`;
  } else {
    greet.innerHTML = `Good Morning 🌈`;
  }
}
greetings();

//2
userName.addEventListener('keyup', function (e) {
  if (e.keyCode === 13) {
    userName.classList.toggle('hidden');
    setName.innerHTML = `${userName.value}`;
    localStorage.setItem('username', userName.value);
    setName.classList.toggle('hidden');
    editName.classList.toggle('hidden');
  }
});

//check if there is username saved
const savedUsername = localStorage.getItem('username');
if (savedUsername !== null) {
  setName.classList.toggle('hidden');
  userName.classList.toggle('hidden');
  editName.classList.toggle('hidden');
  setName.innerHTML = savedUsername;
}

//edit name
editName.addEventListener('click', function () {
  localStorage.removeItem('username');
  setName.classList.toggle('hidden');
  userName.classList.toggle('hidden');
  editName.classList.toggle('hidden');
  userName.value = '';
});

//3

const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const days = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

date.innerHTML = `${days[today.getDay()]} ${
  monthNames[today.getMonth()]
} ${today.getDate()}, ${today.getFullYear()}`;

//4 - weather api
function onGeoOk(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const weather = document.querySelector('.weather');
      const location = document.querySelector('.location');
      weather.innerText = `${Math.round(data.main.temp)}°C ${
        data.weather[0].main
      }`;
      location.innerText = `${data.name}`;
    });
}
function onGeoError() {
  console.log('Allow location');
}
navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);

const API_KEY = '230638eecf67cba9f64dcabe623a6c05';

//5
function getClock() {
  const date = new Date();
  const clock = document.querySelector('.clock');
  const hours = String(date.getHours());
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  clock.innerText = `${hours}:${minutes}:${seconds} ${
    hours >= 12 ? 'PM' : 'AM'
  }`;
}

setInterval(getClock, 1000);

//6
const images = [
  {
    url: 'images/choon_01.jpeg',
  },
  {
    url: 'images/choon_02.jpeg',
  },
  {
    url: 'images/choon_03.jpeg',
  },
  {
    url: 'images/choon_04.GIF',
  },
  {
    url: 'images/choon_05.GIF',
  },
];

const quoteImages = document.querySelector('.quotes-images');
const randomNumber = Math.floor(Math.random() * images.length);
quoteImages.src = `${images[randomNumber].url}`;

//7
const quotes = [
  {
    id: 0,
    quotes:
      '“ You never know what is enough unless you know what is more than enough ”',
    author: 'William Blake',
  },
  {
    id: 1,
    quotes:
      "“You know you're in love when you can't fall asleep because reality is finally better than your dreams.”",
    author: 'Dr. Seuss',
  },
  {
    id: 2,
    quotes:
      '“The world of reality has its limits; the world of imagination is boundless.”',
    author: 'Jean-Jacques Rousseau',
  },
  {
    id: 3,
    quotes:
      "“Be who you are and say what you feel, because those who mind don't matter, and those who matter don't mind.”",
    author: 'Bernard M. Baruch',
  },
  {
    id: 4,
    quotes:
      '“To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment.”',
    author: 'Ralph Waldo Emerson',
  },
  {
    id: 5,
    quotes: '“Life is what happens to us while we are making other plans.”',
    author: 'Allen Saunders',
  },
  {
    id: 6,
    quotes:
      '“It’s only after you’ve stepped outside your comfort zone that you begin to change, grow, and transform.”',
    author: 'Roy T. Bennett',
  },
];

const quote = document.querySelector('.quotes');
const author = document.querySelector('.author');

function displayQuote() {
  const randomNumber = Math.floor(Math.random() * quotes.length);
  quote.innerHTML = `${quotes[randomNumber].quotes}`;
  author.innerHTML = `― ${quotes[randomNumber].author}`;
}

displayQuote();

//8
const newTaskDaily = document.querySelector('.todolist-daily--box .js_todo');
const newTaskDailyInput = document.querySelector('.todolist-daily--box input');
const todoTopDaily = document.querySelector('.todolist-daily--box .top');
let arrTodo = [];
const TODOS_KEY = 'todos';

const newTaskWeekly = document.querySelector('.todolist-weekly--box .js_todo');
const newTaskWeeklyInput = document.querySelector(
  '.todolist-weekly--box input'
);
const todoTopWeekly = document.querySelector('.todolist-weekly--box .top');
let arrTodoWeekly = [];
const TODOS_KEY_WEEKLY = 'weeklytodos';

//Daily Todo
function saveToDos() {
  localStorage.setItem('todos', JSON.stringify(arrTodo));
}

function deleteToDo(event) {
  const ulDelete = event.target.parentElement.parentNode;
  ulDelete.remove();
  arrTodo = arrTodo.filter((toDo) => toDo.id !== parseInt(ulDelete.id));
  saveToDos();
}
function paintTodo(newTodo) {
  const ul = document.createElement('ul');
  ul.id = newTodo.id;
  const liItem = document.createElement('li');
  liItem.classList.add('item');
  const liDelete = document.createElement('li');
  liDelete.classList.add('delete');
  liItem.innerText = newTodo.text;
  liDelete.innerHTML = `<i class="far fa-trash-alt"></i>`;
  ul.appendChild(liItem);
  ul.appendChild(liDelete);
  todoTopDaily.appendChild(ul);
  liDelete.addEventListener('click', deleteToDo);
}

function handleToDoSubmit(event) {
  event.preventDefault();
  const newTodo = newTaskDailyInput.value;
  newTaskDailyInput.value = '';
  const newTodoObj = {
    text: newTodo,
    id: Date.now(),
  };
  arrTodo.push(newTodoObj);
  paintTodo(newTodoObj);
  saveToDos();
}

newTaskDaily.addEventListener('submit', handleToDoSubmit);

const savedToDos = localStorage.getItem(TODOS_KEY);

if (savedToDos !== null) {
  const parsedToDos = JSON.parse(savedToDos);
  arrTodo = parsedToDos;
  parsedToDos.forEach(paintTodo);
}

//Weekly Todo

function saveToDosW() {
  localStorage.setItem('weeklytodos', JSON.stringify(arrTodoWeekly));
}

function deleteToDoW(event) {
  const ulDelete = event.target.parentElement.parentNode;
  ulDelete.remove();
  arrTodoWeekly = arrTodoWeekly.filter(
    (toDo) => toDo.id !== parseInt(ulDelete.id)
  );
  saveToDosW();
}
function paintTodoW(newTodo) {
  const ul = document.createElement('ul');
  ul.id = newTodo.id;
  const liItem = document.createElement('li');
  liItem.classList.add('item');
  const liDelete = document.createElement('li');
  liDelete.classList.add('delete');
  liItem.innerText = newTodo.text;
  liDelete.innerHTML = `<i class="far fa-trash-alt"></i>`;
  ul.appendChild(liItem);
  ul.appendChild(liDelete);
  todoTopWeekly.appendChild(ul);
  liDelete.addEventListener('click', deleteToDoW);
}

function handleToDoSubmitW(event) {
  event.preventDefault();
  const newTodo = newTaskWeeklyInput.value;
  newTaskWeeklyInput.value = '';
  const newTodoObj = {
    text: newTodo,
    id: Date.now(),
  };
  arrTodoWeekly.push(newTodoObj);
  paintTodoW(newTodoObj);
  saveToDosW();
}

newTaskWeekly.addEventListener('submit', handleToDoSubmitW);

const savedToDosW = localStorage.getItem(TODOS_KEY_WEEKLY);

if (savedToDosW !== null) {
  const parsedToDos = JSON.parse(savedToDosW);
  arrTodoWeekly = parsedToDos;
  parsedToDos.forEach(paintTodoW);
}

// Music player
const musicPlayer = document.querySelector('.music');
const playMusic = document.querySelector('.music li:first-child');
const stopMusic = document.querySelector('.music li:nth-child(2)');

musicPlayer.addEventListener('click', function () {
  const audio = document.getElementById('audio');
  if (audio.paused) {
    audio.play();
    playMusic.classList.toggle('hidden');
    stopMusic.classList.toggle('hidden');
  } else {
    audio.pause();
    playMusic.classList.toggle('hidden');
    stopMusic.classList.toggle('hidden');
  }
});

musicPlayer.addEventListener(
  'ended',
  function () {
    this.currentTime = 0;
    this.play();
  },
  false
);
