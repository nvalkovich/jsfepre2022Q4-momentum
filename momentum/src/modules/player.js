
import playListItems from './playList';

let isPlay = false;
let audioIndex = 0;
let currentTime = 0;
const audio = new Audio;


export const playAudio = () => {
  audio.src = playListItems[audioIndex].src;
  audio.currentTime = currentTime;
  if (!isPlay) {
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

export const updateProgressAudioEventListener = (updateProgressAudio) => {
  audio.addEventListener('timeupdate', () => {
    currentTime = audio.currentTime;
    updateProgressAudio(audio.currentTime, playListItems[audioIndex].duration);
  })
}

export const setProgressEventListener = (timeline, setProgress) => {
  timeline.addEventListener('click', (e) => {
    setProgress(e, audio, playListItems[audioIndex].duration);
  })
}

export const playNext = () => {

  if (audioIndex < playListItems.length - 1) {
    audioIndex += 1;
   } else {
    audioIndex = 0;
   }
  isPlay = false;
  currentTime = 0;

  return playAudio();
};

export const playPrev = () => {
  if (audioIndex > 0) {
    audioIndex -= 1
  } else {
    audioIndex = playListItems.length - 1;
  } 
  isPlay = false;
  currentTime = 0;

  return playAudio();
};


let playerVolume = 0.75;

export const setVolume = (volume) => {
  playerVolume = volume;
  audio.volume = playerVolume;
}

export const toggleVolume = () => {
  playerVolume = playerVolume !== 0 ? playerVolume : 0.5;
  audio.volume = audio.volume <= 0 ? playerVolume : 0;

  return audio.volume;
}

