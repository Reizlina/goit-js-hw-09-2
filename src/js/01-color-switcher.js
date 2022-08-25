const start = document.querySelector('[data-start]');
const stop = document.querySelector('[data-stop]');
const body = document.querySelector('body');

stop.disabled = true;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function changeBodyColor() {
  timerId = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
  }, 1000);
  start.disabled = true;
  stop.disabled = false;
}

function stopChangeBodyColor() {
  clearInterval(timerId);
  start.disabled = false;
  stop.disabled = true;
}

start.addEventListener('click', changeBodyColor);
stop.addEventListener('click', stopChangeBodyColor);
