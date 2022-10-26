import { setAdFormOff, setAdFormOn } from './togglePageStatus.js';

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

const type = adForm.querySelector('#type');
const price = adForm.querySelector('#price');

const pricesOfHousing = {
  'bungalow': 0,
  'flat': 1000,
  'hotel': 3000,
  'house': 5000,
  'palace': 10000,
};
const setAttributePriceOfType = () => {
  price.setAttribute('min', pricesOfHousing[type.value]);
  price.setAttribute('placeholder', pricesOfHousing[type.value]);
};

setAttributePriceOfType();
type.addEventListener('change', () => {
  setAttributePriceOfType();
  price.value = '';
});


pristine.addValidator(
  price,
  (value) => (value >= pricesOfHousing[type.value]) && (value <= 100000),
  () => `Введите число от ${price.getAttribute('min')} до 100000`,
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
);

pristine.addValidator(
  capacity,
  (value) => placingGuests[roomNumber.value].includes(value),
  (value) => `Комнат: ${roomNumber.value}. Гостей: ${value} `
);

roomNumber.addEventListener('change', () => {
  pristine.validate(roomNumber);
  pristine.validate(capacity);
});
capacity.addEventListener('change', () => {
  pristine.validate(roomNumber);
  pristine.validate(capacity);
});

const timein = adForm.querySelector('#timein');
const timeout = adForm.querySelector('#timeout');

timein.addEventListener('change', (evt) => {
  timeout.value = evt.target.value;
});
timeout.addEventListener('change', (evt) => {
  timein.value = evt.target.value;
});

adForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});

export { setAdFormOff, setAdFormOn };
