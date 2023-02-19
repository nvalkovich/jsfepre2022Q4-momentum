import './index.html';
import './index.css';
import { startTimer } from "./modules/time.js";
import { getTimeOfDay } from "./modules/greeting.js"
import { setUserName, getUserName } from './modules/storage.js';
import {
  loadRandomBackground,
  loadNextBackground,
  loadPrevBackground,
} from './modules/background';
import quotes from './assets/content/quotes.json';
import { getQuotes } from './modules/quotes.js';

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

});
