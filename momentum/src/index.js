import './index.html';
import './index.css';
import { startTimer, setDate, setTime } from "./modules/time.js";
import { getGreeting } from "./modules/greeting.js"
import { setUserName, getUserName } from './modules/storage';

document.addEventListener('DOMContentLoaded', function () {
  const time = document.querySelector('.time');
  const date = document.querySelector('.date');
  const greeting = document.querySelector('.greeting');
  const name = document.querySelector('.name');

  startTimer(date, time);
  greeting.textContent = getGreeting();

  window.addEventListener('beforeunload', () => setUserName(name.value));
  window.addEventListener('load', () =>  name.value = getUserName());
});

