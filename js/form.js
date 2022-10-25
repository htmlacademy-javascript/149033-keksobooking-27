import { setAdFormOff, setAdFormOn } from './togglePageStstus.js';

const adForm = document.querySelector('.ad-form');

const pristine = new Pristine(adForm, {
  classTo: 'ad-form__element',
  errorClass: 'form__element--invalid',
  successClass: 'form__element--valid',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'span',
});

const validateTitle = (value) => value.length >= 30 && value.length <= 100;

pristine.addValidator(
  adForm.querySelector('#title'),
  validateTitle,
  '11111111'
);

adForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  pristine.validate();
});

//setAdFormOn();
//setAdFormOff();

export { setAdFormOff, setAdFormOn };
