
function setDate(element) {
  const date = new Date();
  const options = { weekday: 'long', month: 'long', day: 'numeric' };
  const currentDate = date.toLocaleDateString('en-Br', options);
  element.textContent = currentDate;
}

function setTime(element) {
  const date = new Date();
  const currentTime = date.toLocaleTimeString();
  element.textContent = currentTime;
}

export function startTimer(date, time) {
  setDate(date);
  setTime(time);

  setInterval(() => {
    setDate(date);
    setTime(time);
  }, 1000);
}
