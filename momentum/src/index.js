import './index.html';
import './index.css';
import { startTimer } from "./modules/time";
import { getTimeOfDay } from "./modules/greeting";
import {
  setUserName,
  getUserName,
  setCity,
  getCity,
  deleteCity,
} from './modules/storage';
import {
  loadRandomBackground,
  loadNextBackground,
  loadPrevBackground,
} from './modules/background';
import quotes from './assets/content/quotes.json';
import { getQuotes } from './modules/quotes';
import { getWeather } from './modules/weather';
import { playAudio, playNext, playPrev, addAudioEndedEventListener } from './modules/audio';
import playListItems from './modules/playList';

const initTimeAndDate = () => {
  const time = document.querySelector('.time');
  const date = document.querySelector('.date');
  startTimer(date, time);
};

const initGreeting = () => {
  const greeting = document.querySelector('.greeting');
  const name = document.querySelector('.name');

  greeting.textContent = `Good ${getTimeOfDay()}`;

  window.addEventListener('beforeunload', () => setUserName(name.value));
  window.addEventListener('load', () => name.value = getUserName());
};

const initBackgroundImage = () => {
  const body = document.querySelector('body');
  const slideNext = document.querySelector('.slide-next');
  const slidePrev = document.querySelector('.slide-prev');

  loadRandomBackground(onImageLoad);

  slideNext.addEventListener('click', () => loadNextBackground(onImageLoad));
  slidePrev.addEventListener('click', () => loadPrevBackground(onImageLoad));

  function onImageLoad(url) {
    body.style.backgroundImage = `url('${url}')`;
  }
};

const initQuotes = () => {
  const quote = document.querySelector(".quote");
  const author = document.querySelector(".author");
  const changeQuote = document.querySelector(".change-quote");

  getQuotes(quote, author, quotes);
  changeQuote.addEventListener('click', () => getQuotes(quote, author, quotes));
}

const initWeather = () => {
  const cityInput = document.querySelector('.city');
  const weatherIcon = document.querySelector('.weather-icon');
  const temperature = document.querySelector('.temperature');
  const weatherDescription = document.querySelector('.weather-description');
  const wind = document.querySelector('.wind');
  const humidityElement = document.querySelector('.humidity');
  const weatherError = document.querySelector('.weather-error');

  let city = getCity();

  if (!city) {
    city = 'Minsk';
    setCity(city);
  }

  cityInput.value = city;

  getWeather(city, onSuccess, onError);

  function onSuccess({
    id,
    temp,
    description,
    speed,
    humidity,
  }) {
    weatherError.textContent = '';
    weatherIcon.className = 'weather-icon owf';
    weatherIcon.classList.add(`owf-${id}`);
    temperature.textContent = `${temp}°C`;
    weatherDescription.textContent = description;
    wind.textContent = `Wind speed: ${speed} m/s`;
    humidityElement.textContent = `Humidity: ${humidity}%`;
    weatherError.textContent = ''; //??? 
  }

  function onError({ errorMessage }) {
    weatherIcon.className = 'weather-icon owf';
    temperature.textContent = '';
    weatherDescription.textContent = '';
    wind.textContent = '';
    humidityElement.textContent = '';
    deleteCity();
    weatherError.textContent = errorMessage;
  }

  function onCityKeypress(event) {
    if (event.code !== 'Enter') { return; }
    
    const cityValue = cityInput.value;

    setCity(cityValue);
    getWeather(cityValue, onSuccess, onError);
    cityInput.blur();
  }

  cityInput.addEventListener('keypress', (event) => onCityKeypress(event));
}

const initAudioPlayer = () => {
  const btnPlayAudio = document.querySelector('.play');
  const btnPlayPrev = document.querySelector('.play-prev');
  const btnPlayNext = document.querySelector('.play-next');
  const playList = document.querySelector('.play-list');

  let ocum = "";
  playListItems.forEach(item => {
    ocum += `<li class ="play-item"> ${item.title}</li>`;
    playList.innerHTML = ocum;
  });

  const playItems = document.querySelectorAll('.play-item');

  const togglePlay = (isPlay) => {
    if (isPlay) {
      btnPlayAudio.classList.add('pause');
    } else {
      btnPlayAudio.classList.remove('pause');
    }
  };

  const toActivePlayItem = (audioIndex) => {
    for (let i = 0; i < playItems.length; i++) {
     if(i !== audioIndex) {
      playItems[i].classList.remove('item-active');
     } else {
      playItems[i].classList.add('item-active');
     }
    }
  };

  const updateElements = ({ isPlay, audioIndex }) => {
    toActivePlayItem(audioIndex);
    togglePlay(isPlay);
  };

  btnPlayPrev.addEventListener('click', () => {
    updateElements(playPrev());
  });

  btnPlayAudio.addEventListener('click', () => {
    updateElements(playAudio());
  });

  btnPlayNext.addEventListener('click', () => {
    updateElements(playNext());
  });

  addAudioEndedEventListener(updateElements);
}

document.addEventListener('DOMContentLoaded', function () {
  initTimeAndDate();
  initGreeting();
  initBackgroundImage();
  initQuotes();
  initWeather();
  initAudioPlayer();
});

