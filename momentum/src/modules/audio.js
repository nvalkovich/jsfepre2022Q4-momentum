
import playListItems from './playList';

let isPlay = false;
let audioIndex = 0;
const audio = new Audio();


export const playAudio = () => {
  audio.src = playListItems[audioIndex].src;

 
  if (!isPlay) {
    audio.currentTime = 0;
    audio.play();
    isPlay = true;
  } else {
    audio.pause();
    isPlay = false;
  } 


  return {
    isPlay, 
    audioIndex,
  };
}

export const addAudioEndedEventListener = (onAudioEnded) => {
  audio.addEventListener('ended', () => {
    onAudioEnded(playNext());
  })
}

export const playNext = () => {
  if (audioIndex < playListItems.length - 1) {
    audioIndex += 1;
   } else {
    audioIndex = 0;
   }
  isPlay = false;

  return playAudio();
};

export const playPrev = () => {
  if (audioIndex > 0) {
    audioIndex -= 1
  } else {
    audioIndex = playListItems.length - 1;
  } 
  isPlay = false;

  return playAudio();
};




