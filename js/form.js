import { setOnImgChangeHandler, resetImgAvatar } from './photo.js';

const MIN_TITLE = 30;
const MAX_TITLE = 100;
const MAX_PRICE = 100000;

const adFormElement = document.querySelector('.ad-form');
const filterFormElement = document.querySelector('.map__filters');

const textErrorTitle = `Ведите от ${MIN_TITLE} до ${MAX_TITLE} символов`;
const checkingFieldTitle = (value) => value.length >= MIN_TITLE && value.length <= MAX_TITLE;
const pristine = new Pristine(adFormElement, {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__element--invalid',
  successClass: 'ad-form__element--valid',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'span',
  errorTextClass: 'text-help'
});
const typeElement = adFormElement.querySelector('#type');
const priceElement = adFormElement.querySelector('#price');
const sliderElement = document.querySelector('.ad-form__slider');
const addressElement = document.querySelector('#address');
const bodyElement = document.querySelector('body');

const pricesOfHousing = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000,
};

setOnImgChangeHandler();

noUiSlider.create(sliderElement, {
  range: {
    min: pricesOfHousing[typeElement.value],
    max: MAX_PRICE,
  },
  start: pricesOfHousing[typeElement.value],
  step: 1,
  connect: 'lower',
});
const setAttributePriceOfType = () => {
  priceElement.setAttribute('min', pricesOfHousing[typeElement.value]);
  priceElement.setAttribute('placeholder', pricesOfHousing[typeElement.value]);
};
setAttributePriceOfType();
const typeElementChangeHandler = () => {
  setAttributePriceOfType();
  sliderElement.noUiSlider.set(pricesOfHousing[typeElement.value]);
  priceElement.value = '';
};

const initialingTheForm = () => {
  pristine.addValidator(
    adFormElement.querySelector('#title'),
    checkingFieldTitle,
    textErrorTitle,
    2,
    true
  );

  sliderElement.noUiSlider.on('update', () => {
    priceElement.value = sliderElement.noUiSlider.get();
    pristine.validate(priceElement);
  });


  typeElement.addEventListener('change', typeElementChangeHandler);

  const checkingFieldPrice = (value) => (value >= pricesOfHousing[typeElement.value]) && (value <= MAX_PRICE);
  const getTextErrorForPrice = () => `Цена от ${priceElement.getAttribute('min')} до ${MAX_PRICE}`;
  pristine.addValidator(
    priceElement,
    checkingFieldPrice,
    getTextErrorForPrice,
    2,
    true
  );

  const roomNumberElement = adFormElement.querySelector('#room_number');
  const capacityElement = adFormElement.querySelector('#capacity');
  const placingGuests = {
    1: ['1'],
    2: ['1','2'],
    3: ['1','2','3'],
    100: ['0']
  };

  const checkingFieldRoomNumber = (value) => placingGuests[value].includes(capacityElement.value);
  const getTextErrorForRoomNumber = (value) => `Комнат: ${value}. Гостей: ${capacityElement.value}`;
  pristine.addValidator(
    roomNumberElement,
    checkingFieldRoomNumber,
    getTextErrorForRoomNumber,
  );

  const checkingFieldCapacity = (value) => placingGuests[roomNumberElement.value].includes(value);
  const getTextErrorCapacity = (value) => `Комнат: ${roomNumberElement.value}. Гостей: ${value}`;
  pristine.addValidator(
    capacityElement,
    checkingFieldCapacity,
    getTextErrorCapacity
  );

  const RoomNumberElementChangeHandler = () => {
    pristine.validate(roomNumberElement);
    pristine.validate(capacityElement);
  };
  roomNumberElement.addEventListener('change', RoomNumberElementChangeHandler);

  const capacityElementChangeHandler = () => {
    pristine.validate(roomNumberElement);
    pristine.validate(capacityElement);
  };
  capacityElement.addEventListener('change', capacityElementChangeHandler);

  const timeinElement = adFormElement.querySelector('#timein');
  const timeoutElement = adFormElement.querySelector('#timeout');

  const timeinElementChangeHandler = (evt) => {
    timeoutElement.value = evt.target.value;
  };
  timeinElement.addEventListener('change', timeinElementChangeHandler);

  const timeoutElementChangeHandler = (evt) => {
    timeinElement.value = evt.target.value;
  };
  timeoutElement.addEventListener('change', timeoutElementChangeHandler);

  const adFormElementSubmintHandler = (evt) => {
    evt.preventDefault();
    pristine.validate();
  };
  adFormElement.addEventListener('submit', adFormElementSubmintHandler);

  const setAdrressReadonly = () => addressElement.setAttribute('readonly', 'readonly');
  setAdrressReadonly();
};

const resetSliderPrice = () => {
  const sliderAdFormElement = document.querySelector('.ad-form__slider');
  sliderAdFormElement.noUiSlider.reset();
};
const elementClickHandler = (evt) => {
  if(evt.currentTarget.matches('.success') || evt.currentTarget.matches('.error') ) {
    evt.target.classList.add('hidden');
  }
};
const hiddeningElementClick = (element) => element.addEventListener('click', elementClickHandler);

const hiddeningElementEsc = (element) => {
  const handleBodyKeydown = (evt) => {
    if (evt.key === 'Esc' || evt.key === 'Escape') {
      element.classList.add('hidden');
      document.removeEventListener('keydown', handleBodyKeydown);
    }
  };
  document.addEventListener('keydown', handleBodyKeydown);
};

const showSuccess = () => {
  const successTmplElement = document.querySelector('#success').content.querySelector('.success');
  const success = successTmplElement.cloneNode(true);
  bodyElement.append(success);
  hiddeningElementEsc(success);
  hiddeningElementClick(success);
};
const resetAdForm = () => {
  adFormElement.reset();
  resetImgAvatar();
  pristine.reset();
};
const onSuccess = (latLang) => {
  resetAdForm();
  addressElement.value = Object.values(latLang);
  resetSliderPrice();
  showSuccess();
};

const showFail = () => {
  const errorElement = document.querySelector('#error').content.querySelector('.error');
  const error = errorElement.cloneNode(true);
  bodyElement.append(error);
  hiddeningElementEsc(error);
  hiddeningElementClick(error);
};

const onSubmitAdForm = (sendAdForm, latLng, resetMainPinMarker,restartGetListAd) => {
  const adFormElementSubmintHandler = (evt) => {
    if(!pristine.validate()) {
      return false;
    }
    sendAdForm(
      new FormData(evt.target),
      latLng,
      onSuccess,
      showFail
    );
    filterFormElement.reset();
    restartGetListAd();
    resetMainPinMarker();
  };
  adFormElement.addEventListener('submit', adFormElementSubmintHandler);
};

const onResetAdForm = (latLng, resetMainPinMarker, restartGetListAd) => {
  const buttonResetElement = adFormElement.querySelector('.ad-form__reset');
  const buttonResetElementClickHandler = (evt) => {
    evt.preventDefault();
    resetAdForm();
    addressElement.value = Object.values(latLng);
    sliderElement.noUiSlider.reset();
    filterFormElement.reset();
    restartGetListAd();
    resetMainPinMarker();
  };
  buttonResetElement.addEventListener('click', buttonResetElementClickHandler);
};
export{ initialingTheForm, onSubmitAdForm, onResetAdForm };
