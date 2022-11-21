import { isVildTypeImg } from './valid-arguments.js';
const DEFAULT_PREVIEW = 'img/muffin-grey.svg';
const MIN_TITLE = 30;
const MAX_TITLE = 100;
const MAX_PRICE = 100000;

const adForm = document.querySelector('.ad-form');
const filterForm = document.querySelector('.map__filters');
const fileAvatar = adForm.querySelector('#avatar');
const previewAvatar = adForm.querySelector('.ad-form-header__preview');
const uploaderImg = adForm.querySelector('#images');
const photoAdForm = adForm.querySelector('.ad-form__photo');

const textErrorTitle = `Ведите от ${MIN_TITLE} до ${MAX_TITLE} символов`;
const checkingFieldTitle = (value) => value.length >= MIN_TITLE && value.length <= MAX_TITLE;
const pristine = new Pristine(adForm, {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__element--invalid',
  successClass: 'ad-form__element--valid',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'span',
  errorTextClass: 'text-help'
});
const type = adForm.querySelector('#type');
const price = adForm.querySelector('#price');
const sliderElement = document.querySelector('.ad-form__slider');
const address = document.querySelector('#address');
const body = document.querySelector('body');

const pricesOfHousing = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000,
};
const createdElementImg = (element) => {
  element.innerHTML = '';
  const img = document.createElement('img');
  img.style.maxWidth = '100%';
  img.style.height = 'auto';
  element.append(img);
  return img;
};

const imgChangeHandler = (inputImg, previewImg) => {
  const file = inputImg.files[0];
  const fileName = file.name.toLowerCase();
  if (file && isVildTypeImg(fileName)) {
    const img = previewImg.querySelector('img') ?? createdElementImg(previewImg);
    img.src = URL.createObjectURL(file);
  }
};
const fileAvatarChangeHandler = () => {
  imgChangeHandler(fileAvatar, previewAvatar);
};
const uploaderImgChangeHandler = () => {
  imgChangeHandler(uploaderImg, photoAdForm);
};
fileAvatar.addEventListener('change', fileAvatarChangeHandler);
uploaderImg.addEventListener('change', uploaderImgChangeHandler);

noUiSlider.create(sliderElement, {
  range: {
    min: pricesOfHousing[type.value],
    max: MAX_PRICE,
  },
  start: pricesOfHousing[type.value],
  step: 1,
  connect: 'lower',
});
const setAttributePriceOfType = () => {
  price.setAttribute('min', pricesOfHousing[type.value]);
  price.setAttribute('placeholder', pricesOfHousing[type.value]);
};
setAttributePriceOfType();
const typeChangeHandler = () => {
  setAttributePriceOfType();
  sliderElement.noUiSlider.set(pricesOfHousing[type.value]);
  price.value = '';
};

const initialingTheForm = () => {
  pristine.addValidator(
    adForm.querySelector('#title'),
    checkingFieldTitle,
    textErrorTitle,
    2,
    true
  );

  sliderElement.noUiSlider.on('update', () => {
    price.value = sliderElement.noUiSlider.get();
    pristine.validate(price);
  });


  type.addEventListener('change', typeChangeHandler);

  const checkingFieldPrice = (value) => (value >= pricesOfHousing[type.value]) && (value <= MAX_PRICE);
  const getTextErrorForPrice = () => `Цена от ${price.getAttribute('min')} до ${MAX_PRICE}`;
  pristine.addValidator(
    price,
    checkingFieldPrice,
    getTextErrorForPrice,
    2,
    true
  );

  const roomNumber = adForm.querySelector('#room_number');
  const capacity = adForm.querySelector('#capacity');
  const placingGuests = {
    1: ['1'],
    2: ['1','2'],
    3: ['1','2','3'],
    100: ['0']
  };

  const checkingFieldRoomNumber = (value) => placingGuests[value].includes(capacity.value);
  const getTextErrorForRoomNumber = (value) => `Комнат: ${value}. Гостей: ${capacity.value}`;
  pristine.addValidator(
    roomNumber,
    checkingFieldRoomNumber,
    getTextErrorForRoomNumber,
  );

  const checkingFieldCapacity = (value) => placingGuests[roomNumber.value].includes(value);
  const getTextErrorCapacity = (value) => `Комнат: ${roomNumber.value}. Гостей: ${value}`;
  pristine.addValidator(
    capacity,
    checkingFieldCapacity,
    getTextErrorCapacity
  );

  const RoomNumberChangeHandler = () => {
    pristine.validate(roomNumber);
    pristine.validate(capacity);
  };
  roomNumber.addEventListener('change', RoomNumberChangeHandler);

  const capacityChangeHandler = () => {
    pristine.validate(roomNumber);
    pristine.validate(capacity);
  };
  capacity.addEventListener('change', capacityChangeHandler);

  const timein = adForm.querySelector('#timein');
  const timeout = adForm.querySelector('#timeout');

  const timeinChangeHandler = (evt) => {
    timeout.value = evt.target.value;
  };
  timein.addEventListener('change', timeinChangeHandler);

  const timeoutChangeHandler = (evt) => {
    timein.value = evt.target.value;
  };
  timeout.addEventListener('change', timeoutChangeHandler);

  const adFormSubmintHandler = (evt) => {
    evt.preventDefault();
    pristine.validate();
  };
  adForm.addEventListener('submit', adFormSubmintHandler);

  const setAdrressReadonly = () => address.setAttribute('readonly', 'readonly');
  setAdrressReadonly();
};

const resetSliderPrice = () => {
  const slider = document.querySelector('.ad-form__slider');
  slider.noUiSlider.reset();
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
  const successTmpl = document.querySelector('#success').content.querySelector('.success');
  const success = successTmpl.cloneNode(true);
  body.append(success);
  hiddeningElementEsc(success);
  hiddeningElementClick(success);
};
const resetAdForm = () => {
  adForm.reset();
  previewAvatar.querySelector('img').src = DEFAULT_PREVIEW;
  photoAdForm.innerHTML = '';
  pristine.reset();
};
const onSuccess = (latLang) => {
  resetAdForm();
  address.value = Object.values(latLang);
  resetSliderPrice();
  showSuccess();
};

const showFail = () => {
  const errorElement = document.querySelector('#error').content.querySelector('.error');
  const error = errorElement.cloneNode(true);
  body.append(error);
  hiddeningElementEsc(error);
  hiddeningElementClick(error);
};

const onSubmitAdForm = (sendAdForm, latLng, resetMainPinMarker,restartGetListAd) => {
  const adformSubmintHandler = (evt) => {
    if(!pristine.validate()) {
      return false;
    }
    sendAdForm(
      new FormData(evt.target),
      latLng,
      onSuccess,
      showFail
    );
    filterForm.reset();
    restartGetListAd();
    resetMainPinMarker();
  };
  adForm.addEventListener('submit', adformSubmintHandler);
};

const onResetAdForm = (latLng, resetMainPinMarker, restartGetListAd) => {
  const buttonReset = adForm.querySelector('.ad-form__reset');
  const buttonResetClickHandler = (evt) => {
    evt.preventDefault();
    resetAdForm();
    address.value = Object.values(latLng);
    sliderElement.noUiSlider.reset();
    filterForm.reset();
    restartGetListAd();
    resetMainPinMarker();
  };
  buttonReset.addEventListener('click', buttonResetClickHandler);
};
export{ initialingTheForm, onSubmitAdForm, onResetAdForm };
