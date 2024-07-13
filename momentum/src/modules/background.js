import { getTimeOfDay } from "./greeting";
import { getRandomNum } from './helper';
import { getImageSource } from './storage';

let currentImage = getRandomNum(21, 1);

const imageSource = getImageSource();
const timeOfDay = getTimeOfDay();

const loadBackground = (onLoadCallback) => {
  const img = new Image();
  let url;

  if (imageSource == 'gitHub' || imageSource == 'undefined') {
    const backgroundImageNum = currentImage.toString().padStart(2, "0");
    url = `https://github.com/nvalkovich/stage1-tasks/blob/assets/images/${timeOfDay}/${backgroundImageNum}.jpg?raw=true`;
    img.src = url;
  } else if (imageSource == 'unsplash') {
    getLinkToImageUnspash().then(urlApi => {
      url = urlApi;
      img.src = url;
    });
  } else if (imageSource == 'flickr') {
    getLinkToImageFlickr().then(urlApi => {
      url = urlApi;
      img.src = url;
    });
  }
  img.addEventListener('load', () => onLoadCallback(url));
};

async function getLinkToImageUnspash() {
  const url = `https://api.unsplash.com/photos/random?orientation=landscape&query=${timeOfDay}&client_id=Jv1YPnNlubT2RzfsJA0GZ7t8vZ2a8xl_6BqMYAldUnw`;
  const res = await fetch(url);
  const data = await res.json();
  return data.urls.regular;
}

async function getLinkToImageFlickr() {
  const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=da2ca828d311c8b0dd6bfefe4146559d&tags=${timeOfDay}&extras=url_l&format=json&nojsoncallback=1`;
  const res = await fetch(url);
  const data = await res.json();
  return data.photos.photo[getRandomNum(51, 1)].url_l;
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
