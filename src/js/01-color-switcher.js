function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

let timerId = null;
const bodyColorRef = document.querySelector('body');
const buttonStartRef = document.querySelector('[data-start]');
const buttonStopRef = document.querySelector('[data-stop]');

const ColorPlay = () => {
  timerId = setInterval(() => {
    const newColor = getRandomHexColor();
    bodyColorRef.style.backgroundColor = newColor;
  }, 1000);
  buttonStartRef.disabled = true;
  buttonStopRef.disabled = false;
};

buttonStartRef.addEventListener('click', ColorPlay);
buttonStopRef.addEventListener('click', () => {
  clearInterval(timerId);
  bodyColorRef.disabled = false;
  buttonStopRef.disabled = true;
});
