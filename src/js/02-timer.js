import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const startEl = document.querySelector('[data-start]');
const daysEl = document.querySelector('[data-days]');

const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');
const timerEl = document.querySelector('.timer');
const fieldEl = document.querySelectorAll('.field');
const valueEl = document.querySelectorAll('.value');
const labelEl = document.querySelectorAll('.label');

timerEl.style.cssText = 'display: flex; column-gap: 30px;';
fieldEl.forEach(el => {
  el.style.display = 'flex';
  el.style.flexDirection = 'column';
  el.style.alignItems = 'center';
});
valueEl.forEach(el => {
  el.style.fontSize = '40px';
  el.style.fontWeight = '700';
});
labelEl.forEach(el => {
  el.style.fontSize = '12px';
});

startEl.setAttribute('disabled', '');

let selectedDate;

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < options.defaultDate) {
      //   window.alert('Please choose a date in the future');
      Notiflix.Notify.warning('Виберіть дату з майбутнього!');
      return;
    }
    startEl.removeAttribute('disabled');
    selectedDate = selectedDates[0].getTime();
  },
};

function addLeadingZero() {
  const difference = selectedDate - new Date().getTime();
  const { days, hours, minutes, seconds } = convertMs(difference);
  daysEl.textContent = String(days).padStart(2, 0);
  hoursEl.textContent = String(hours).padStart(2, 0);
  minutesEl.textContent = String(minutes).padStart(2, 0);
  secondsEl.textContent = String(seconds).padStart(2, 0);
}

startEl.addEventListener(
  'click',
  () => {
    Notiflix.Notify.success('Відлік почався!');
    const timer = setInterval(() => {
      startEl.setAttribute('disabled', '');
      addLeadingZero();

      if (
        daysEl.textContent === '00' &&
        hoursEl.textContent === '00' &&
        minutesEl.textContent === '00' &&
        secondsEl.textContent === '00'
      ) {
        clearInterval(timer);
        Notiflix.Notify.failure('Ваш час сплинув! За вами вже виїхали!');
      }
    });
  },
  1000
);

flatpickr('#datetime-picker', { ...options });
