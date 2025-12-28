import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const startBtn = document.querySelector('button');
let userSelectedDate = null;
let timerId = null;
startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    const currentDate = new Date();

    if (userSelectedDate < currentDate) {
      iziToast.error({
        title: 'Error',
        titleColor: '#fff',
        titleSize: '16px',
        titleLineHeight: '1.5',
        message: 'Please choose a date in the future',
        messageColor: '#fff',
        messageSize: '16px',
        messageLineHeight: '1.5',
        backgroundColor: '#ef4040',
        iconUrl: '../img/error.svg',
        iconColor: '#fff',
        position: 'topRight',
        theme: 'dark',
        progressBarColor: '#b51b1b',
        close: true,
        closeOnEscape: true,
      });
      startBtn.disabled = true;
    } else {
      startBtn.disabled = false;
    }
  },
};

const dateInput = flatpickr('#datetime-picker', options);

const daysLine = document.querySelector('.days-line');
const hoursLine = document.querySelector('.hours-line');
const minutesLine = document.querySelector('.minutes-line');
const secondsLine = document.querySelector('.seconds-line');

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

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

startBtn.addEventListener('click', event => {
  startBtn.disabled = true;
  document.querySelector('#datetime-picker').disabled = true;

  timerId = setInterval(() => {
    const now = new Date();
    const dTime = userSelectedDate - now;

    if (dTime <= 0) {
      clearInterval(timerId);
      daysLine.textContent = '00';
      hoursLine.textContent = '00';
      minutesLine.textContent = '00';
      secondsLine.textContent = '00';
      return;
    } else {
      const { days, hours, minutes, seconds } = convertMs(dTime);

      daysLine.textContent = addLeadingZero(days);
      hoursLine.textContent = addLeadingZero(hours);
      minutesLine.textContent = addLeadingZero(minutes);
      secondsLine.textContent = addLeadingZero(seconds);
    }
  }, 1000);
});
