const MIN_TITLE = 30;
const MAX_TITLE = 100;
const MAX_PRICE = 100000;
const adForm = document.querySelector('.ad-form');

const pristine = new Pristine(adForm, {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__element--invalid',
  successClass: 'ad-form__element--valid',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'span',
  errorTextClass: 'text-help'
});

const textErrorTitle = `Ведите от ${MIN_TITLE} до ${MAX_TITLE} символов`;
const checkingFieldTitle = (value) => value.length >= MIN_TITLE && value.length <= MAX_TITLE;
pristine.addValidator(
  adForm.querySelector('#title'),
  checkingFieldTitle,
  textErrorTitle,
  2,
  true
);

const type = adForm.querySelector('#type');
const price = adForm.querySelector('#price');


const pricesOfHousing = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000,
};


const sliderElement = document.querySelector('.ad-form__slider');

noUiSlider.create(sliderElement, {
  range: {
    min: pricesOfHousing[type.value],
    max: MAX_PRICE,
  },
  start: pricesOfHousing[type.value],
  step: 1,
  connect: 'lower',
});
sliderElement.noUiSlider.on('update', () => {
  price.value = sliderElement.noUiSlider.get();
});

const setAttributePriceOfType = () => {
  price.setAttribute('min', pricesOfHousing[type.value]);
  price.setAttribute('placeholder', pricesOfHousing[type.value]);
};

setAttributePriceOfType();
const handleChangeType = () => {
  setAttributePriceOfType();
  sliderElement.noUiSlider.set(pricesOfHousing[type.value]);
  price.value = '';

};
type.addEventListener('change', handleChangeType);

const checkingFieldPrice = (value) => (value >= pricesOfHousing[type.value]) && (value <= MAX_PRICE);
const textErrorForPrice = () => `Введите число от ${price.getAttribute('min')} до ${MAX_PRICE}`;
pristine.addValidator(
  price,
  checkingFieldPrice,
  textErrorForPrice,
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

const checkingFieldRoomNumber = (value) => placingGuests[value].includes(capacity.value);
const textErrorForRoomNumber = (value) => `Комнат: ${value}. Гостей: ${capacity.value}`;
pristine.addValidator(
  roomNumber,
  checkingFieldRoomNumber,
  textErrorForRoomNumber,
);

const checkingFieldCapacity = (value) => placingGuests[roomNumber.value].includes(value);
const textErrorCapacity = (value) => `Комнат: ${roomNumber.value}. Гостей: ${value}`;
pristine.addValidator(
  capacity,
  checkingFieldCapacity,
  textErrorCapacity
);

const handleChangeRoomNumber = () => {
  pristine.validate(roomNumber);
  pristine.validate(capacity);
};
roomNumber.addEventListener('change', handleChangeRoomNumber);

const handleChangeCapacity = () => {
  pristine.validate(roomNumber);
  pristine.validate(capacity);
};
capacity.addEventListener('change', handleChangeCapacity);

const timein = adForm.querySelector('#timein');
const timeout = adForm.querySelector('#timeout');

const handleChangeTimein = (evt) => {
  timeout.value = evt.target.value;
};
timein.addEventListener('change', handleChangeTimein);

const handleChangeTimeout = (evt) => {
  timein.value = evt.target.value;
};
timeout.addEventListener('change', handleChangeTimeout);

const handleSubmintAdform = (evt) => {
  evt.preventDefault();
  pristine.validate();
};
adForm.addEventListener('submit', handleSubmintAdform);

const setAdrressReadonly = () => document.querySelector('#address').setAttribute('readonly', 'readonly');
setAdrressReadonly();


