import { setAdFormOff, setAdFormOn } from './togglePageStstus.js';

const adForm = document.querySelector('.ad-form');

const pristine = new Pristine(adForm, {
  classTo: 'ad-form__element',
  errorClass: 'form__element--invalid',
  successClass: 'form__element--valid',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'span',
  errorTextClass: 'text-help'
});

pristine.addValidator(
  adForm.querySelector('#title'),
  (value) => value.length >= 30 && value.length <= 100,
  'Введите от 30 до 100 символов',
  2,
  true
);

pristine.addValidator(
  adForm.querySelector('#price'),
  (value) => value >= 0 && value <= 100000,
  'Введите число от 0 до 100000',
  2,
  true
);

const roomNumber = adForm.querySelector('#room_number');
const capacity = adForm.querySelector('#capacity');
const roomNumberValue = parseInt(roomNumber.value);
const capacityF = (value) => {
  console.log(value);
  return roomNumberValue >= parseInt(value.match(/[1-3]/))
};
pristine.addValidator(
  capacity,
  capacityF,
  'Введите правильное поле',
  2,
  true
);

adForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});

//setAdFormOn();
//setAdFormOff();

export { setAdFormOff, setAdFormOn };
