const TIME_OF_DAY = ['night', 'morning', 'afternoon', 'evening'];

export function getTimeOfDay() {
  const hours = new Date().getHours();
  const timeOfDay = TIME_OF_DAY[Math.floor(hours / 6)];

  return timeOfDay;
}
