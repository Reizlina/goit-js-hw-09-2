import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('.form');

function onFormSubmit(e) {
  e.preventDefault();

  const formEl = e.currentTarget.elements;

  let amount = Number(formEl.amount.value);
  let delay = Number(formEl.delay.value);
  let step = Number(formEl.step.value);

  // console.log(valuesResult);
  // console.log(valuesResult.step);

  for (let i = 1; i <= amount; i += 1) {
    createPromise(i, delay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    delay += step;
  }
}

form.addEventListener('submit', onFormSubmit);

function createPromise(position, delay, step) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ delay, position });
      } else {
        reject({ delay, position });
      }
    }, delay);
  });
}
