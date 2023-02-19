import { getTimeOfDay } from "./greeting";
import { getRandomNum } from './helper.js';

let currentImage = getRandomNum(21, 1);

const loadBackground = (onLoadCallback) => {
  console.log(currentImage);
  const img = new Image();
  const timeOfDay = getTimeOfDay();
  const backgroundImageNum = currentImage.toString().padStart(2, "0");
  const url = `https://github.com/nvalkovich/stage1-tasks/blob/assets/images/${timeOfDay}/${backgroundImageNum}.jpg?raw=true`;
  
  img.src = url;

  img.addEventListener('load', () => onLoadCallback(url));
}

export const loadRandomBackground = (onLoadCallback) => {
  loadBackground(onLoadCallback);
}

export const loadNextBackground = (onLoadCallback) => {
  currentImage = currentImage < 20 ? currentImage += 1 : currentImage = 1;
  loadBackground(onLoadCallback);
};

export const loadPrevBackground = (onLoadCallback) => {
  currentImage = currentImage > 1 ? currentImage -= 1 : currentImage = 20;
  loadBackground(onLoadCallback);
};
