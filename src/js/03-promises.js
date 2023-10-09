import Notiflix from 'notiflix';
const form = document.querySelector(".form");

form.addEventListener("submit", onSubmitForm);

function createPromise(position, delay) {
  return new Promise ((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
  
  setTimeout(() => {
      if (shouldResolve) {
        // Fulfill
      resolve({ position, delay });
      } else {
        // Reject
        reject({ position, delay })
      }
    }, delay);
  });
  };

function onSubmitForm(event) {
  event.preventDefault();

  const { delay, step, amount } = event.currentTarget.elements;
  
    for (let i = 0; i < amount.value; i++) {
      let position = i + 1;
      const delays = Number(delay.value) + step.value * i;

createPromise(position, delays)
.then(({ position, delay }) => {
  Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
  .catch(({ position, delay }) => {
    Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
  });
}
}