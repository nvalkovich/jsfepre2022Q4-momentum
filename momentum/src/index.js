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
import { 
  playAudio,
  playNext,
  playPrev,
  addAudioEndedEventListener,
  updateProgressAudioEventListener,
  setProgressEventListener,
  setVolume,
  toggleVolume,
  // toggleVolumeEventListener
} from './modules/player';
import playListItems from './modules/playList';
import {getMinutesFromSeconds} from './modules/helper';

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
  const currentAudio = document.querySelector('.current-audio-title');
  const timeline = document.querySelector('.timeline');
  const timelineWidth = timeline.offsetWidth;
  const progress = document.querySelector('.progress');
  const currentTimeBlock = document.querySelector('.current-time');
  const durationBlock = document.querySelector('.duration');
  const volumeButton =  document.querySelector('.volume-icon');
  const volumeSlider = document.querySelector(".volume-slider");
  const volumePersentage = document.querySelector(".volume-percent");
  let newVolume;
  
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
      currentAudio.innerHTML = playItems[i].innerHTML;
     }
    }
  };

  const updateProgressAudio = (time, duration) => {
    let persent = time / duration * 100;
    if (persent > 100) {persent = 100};
    progress.style.width = `${persent}%`;
    durationBlock.textContent = getMinutesFromSeconds(duration);
    currentTimeBlock.textContent = getMinutesFromSeconds(time);
  }

  const updateAudioElements = ({isPlay, audioIndex}) => {
    toActivePlayItem(audioIndex);
    togglePlay(isPlay);
  };

  const setProgress = (e, audio, duration) => {
    const clickX = e.offsetX;
    audio.currentTime = (clickX / timelineWidth ) * duration;
  }

  volumeSlider.addEventListener('click', (e) => {
    const sliderWidth = volumeSlider.offsetWidth;
    newVolume = (e.offsetX / parseInt(sliderWidth));
    setVolume(newVolume);
    renderVolume(newVolume);
    if(newVolume <= 0) {
      volumeButton.classList.add('volume-off');
     } else {
      volumeButton.classList.remove ('volume-off');
     }
  });

  const renderVolume = (volume) => {
    console.log(volume);
    volumePersentage.style.width = volume * 100 + '%';
  }

  const toggleVolumeButton = () => {
    const newVolume = toggleVolume();
    if(newVolume){
      volumeButton.classList.remove ('volume-off');
    } else {
      volumeButton.classList.add('volume-off');
    }
    renderVolume(newVolume);
  }

  btnPlayPrev.addEventListener('click', () => {
    updateAudioElements(playPrev());
  });

  btnPlayAudio.addEventListener('click', () => {
    updateAudioElements(playAudio());
  });

  btnPlayNext.addEventListener('click', () => {
    updateAudioElements(playNext());
  });

  addAudioEndedEventListener(updateAudioElements);
  updateProgressAudioEventListener(updateProgressAudio);
  setProgressEventListener(timeline, setProgress);
  
  volumeButton.addEventListener('click', () => {
    toggleVolumeButton();
  });
}

document.addEventListener('DOMContentLoaded', function () {
  initTimeAndDate();
  initGreeting();
  initBackgroundImage();
  initQuotes();
  initWeather();
  initAudioPlayer();
});

