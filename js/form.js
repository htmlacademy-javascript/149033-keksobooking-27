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
  (value) => (value >= 0) && (value <= 100000),
  'Введите число от 0 до 100000',
  2,
  true
);

const roomNumber = adForm.querySelector('#room_number');
const capacity = adForm.querySelector('#capacity');
const placingGuests = {
  '1': ['1'],
  '2': ['1','2'],
  '3': ['1','2','3'],
  '100': ['0']
};
pristine.addValidator(
  roomNumber,
  (value) => placingGuests[value].includes(capacity.value),
  (value) => `Комнат: ${value}. Гостей: ${capacity.value}`,
  2,
  true
);

pristine.addValidator(
  capacity,
  (value) => placingGuests[roomNumber.value].includes(value),
  (value) => `Гостей: ${value}. Комнат: ${roomNumber.value}`,
  2,
  true
);

roomNumber.addEventListener('change', () => {
  pristine.validate();
});

capacity.addEventListener('change', () => {
  pristine.validate();
});

adForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});

export { setAdFormOff, setAdFormOn };
