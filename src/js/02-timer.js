import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const refs = {
    startButton: document.querySelector('button[data-start]'),
    input: document.querySelector('#datetime-picker'),
    days: document.querySelector('span[data-days]'),
    hours: document.querySelector('span[data-hours]'),
    mins: document.querySelector('span[data-minutes]'),
    secs: document.querySelector('span[data-seconds]'),
}

 let intervalId = null;

 refs.startButton.disabled = true;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose([selectedDates]) {

      if (selectedDates < Date.now()) {
        refs.startButton.disabled = true;
        Notiflix.Notify.failure('Please choose a date in the future');
        return;
      }
        refs.startButton.disabled = false;

    },
  };

  refs.startButton.addEventListener('click', () => {
  
    intervalId = setInterval(() => {
        const intervalInTime = new Date(refs.input.value) - Date.now();

        if (intervalInTime < 1000) {
            clearInterval(intervalId);
          }

          const result = convertMs(intervalInTime);
          console.log(result);
          updateTime(result);
        }, 1000);
});

flatpickr('#datetime-picker', options);


function updateTime({ days, hours, minutes, seconds }) {
    
        refs.days.textContent = `${days}`;
        refs.hours.textContent = `${hours}`;
        refs.mins.textContent = `${minutes}`;
        refs.secs.textContent = `${seconds}`;
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
    const days = addLeadingZero(Math.floor(ms / day));
    // Remaining hours
    const hours = addLeadingZero(Math.floor((ms % day) / hour));
    // Remaining minutes
    const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
    // Remaining seconds
    const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));
  
    return { days, hours, minutes, seconds };
  }