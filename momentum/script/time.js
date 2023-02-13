document.addEventListener('DOMContentLoaded', function () {
  const elTime = document.querySelector('.time');
  const elDate = document.querySelector('.date');
  
  function showTime() {
    const date = new Date();
    const currentTime = date.toLocaleTimeString();
    elTime.textContent = currentTime;
    setTimeout(showTime, 1000);
    showDate();
  }

  function showDate() {
    const date = new Date();
    const options = { weekday: "long",month: 'long', day: 'numeric'};
    const currentDate = date.toLocaleDateString('en-Br', options);
    elDate.textContent = currentDate;
  }

  showTime();
  });
