import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');

iziToast.info({
  title: 'Hello',
  message: 'Welcome!',
  titleColor: '#fff',
  messageColor: '#fff',
  backgroundColor: '#09f',
  position: 'topRight',
  progressBarColor: '#0071BD',
  iconUrl: '../img/bell.svg',
  iconColor: '#fff',
  theme: 'dark',
  close: true,
});

form.addEventListener('submit', event => {
  event.preventDefault();

  const delay = Number(event.currentTarget.elements.delay.value);
  const state = event.currentTarget.elements.state.value;

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });

  promise
    .then(value => {
      iziToast.success({
        title: 'OK',
        titleColor: '#fff',
        message: `Fulfilled promise in ${value}ms`,
        messageColor: '#fff',
        backgroundColor: '#59a10d',
        iconUrl: new URL('../img/success.svg', import.meta.url).href,
        iconColor: '#fff',
        position: 'topRight',
        progressBarColor: '#326101',
        close: true,
        theme: 'dark',
      });
    })
    .catch(value => {
      iziToast.error({
        title: 'Error',
        titleColor: '#fff',
        titleSize: '16px',
        titleLineHeight: '1.5',
        message: `Rejected promise in ${delay}ms`,
        messageColor: '#fff',
        messageSize: '16px',
        messageLineHeight: '1.5',
        backgroundColor: '#ef4040',
        iconUrl: new URL('../img/error.svg', import.meta.url).href,
        iconColor: '#fff',
        position: 'topRight',
        theme: 'dark',
        progressBarColor: '#b51b1b',
        close: true,
        closeOnEscape: true,
      });
    });
});
