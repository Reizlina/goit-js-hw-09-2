import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const startBtn = document.querySelector('[data-start]');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');

const domElemConfig = {
  days: daysEl,
  hours: hoursEl,
  minutes: minutesEl,
  seconds: secondsEl,
};

startBtn.disabled = true;

let timerId = null;
let userDate = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < options.defaultDate) {
      Notify.failure('Please choose a date in the future &#128064');
    } else {
      startBtn.disabled = false;
    }
    userDate = selectedDates[0];
  },
};

flatpickr('#datetime-picker', options);

function startTimer() {
  let userDateInMilliseconds = userDate.getTime();
  startBtn.disabled = true;

  timerId = setInterval(() => {
    const delta = userDateInMilliseconds - Date.now();

    renderTimer(convertMs(delta));

    if (delta <= 0) {
      Notify.success('YEY!');
      renderTimer(convertMs(0));
      clearInterval(timerId);
    }
  }, 1000);
}

startBtn.addEventListener('click', startTimer);

function setTextContent(domEl, text) {
  domEl.textContent = addLeadingZero(text);
}

function renderTimer(allValues) {
  for (const key in allValues) {
    setTextContent(domElemConfig[key], allValues[key]);
  }
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
