const TIME_OF_DAY = ['night', 'morning', 'afternoon', 'evening'];

export function getGreeting() {
  const hours = new Date().getHours();
  const timeOfDay = TIME_OF_DAY[Math.floor(hours / 6)];

  return `Good ${timeOfDay}`;
}
