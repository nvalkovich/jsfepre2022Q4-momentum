import './index.html';
import './index.css';
import { startTimer } from "./modules/time";
import { getTimeOfDay } from "./modules/greeting"
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

document.addEventListener('DOMContentLoaded', function () {
  const time = document.querySelector('.time');
  const date = document.querySelector('.date');
  const greeting = document.querySelector('.greeting');
  const name = document.querySelector('.name');
  const body = document.querySelector('body');
  const slideNext = document.querySelector('.slide-next');
  const slidePrev = document.querySelector('.slide-prev');
  const quote = document.querySelector(".quote");
  const author = document.querySelector(".author");
  const changeQuote = document.querySelector(".change-quote");

  startTimer(date, time);
  greeting.textContent = `Good ${getTimeOfDay()}`;

  window.addEventListener('beforeunload', () => setUserName(name.value));
  window.addEventListener('load', () => name.value = getUserName());

  loadRandomBackground(onImageLoad);

  slideNext.addEventListener('click', () => loadNextBackground(onImageLoad));
  slidePrev.addEventListener('click', () => loadPrevBackground(onImageLoad));

  function onImageLoad(url) {
    body.style.backgroundImage = `url('${url}')`;
  }

  getQuotes(quote, author, quotes);
  changeQuote.addEventListener('click', () => getQuotes(quote, author, quotes));

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

  function onError({errorMessage }) {
    weatherIcon.className = 'weather-icon owf';
    temperature.textContent = '';
    weatherDescription.textContent = '';
    wind.textContent = '';
    humidityElement.textContent = '';
    deleteCity();
    weatherError.textContent = errorMessage;
  }

  function onCityKeypress(event) {
    if (event.code !== 'Enter') {
      return;
    }

    const cityValue = cityInput.value;

    setCity(cityValue);
    getWeather(cityValue, onSuccess, onError);
    cityInput.blur();
  }

  cityInput.addEventListener('keypress', (event) => onCityKeypress(event));

});
