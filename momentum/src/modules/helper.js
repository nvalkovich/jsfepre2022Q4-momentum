export const getRandomNum = (max, min) => {
  return Math.floor(Math.random() * (max - min) + min);
}

export const getMinutesFromSeconds = (seconds) => {
  let sec = parseInt(seconds);
  let min = parseInt(sec / 60);
  sec -= min * 60;

  return `${min}:${String(sec % 60).padStart(2, 0)}`;
};
