const adForm = document.querySelector('.ad-form');
const MIN_TITLE = 30;
const MAX_TITLE = 100;
const MAX_PRICE = 100000;
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
const handleChangeType = () => {
  setAttributePriceOfType();
  sliderElement.noUiSlider.set(pricesOfHousing[type.value]);
  price.value = '';
};

const initForm = () => {
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


  type.addEventListener('change', handleChangeType);

  const checkingFieldPrice = (value) => (value >= pricesOfHousing[type.value]) && (value <= MAX_PRICE);
  const textErrorForPrice = () => `Цена от ${price.getAttribute('min')} до ${MAX_PRICE}`;
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

  const setAdrressReadonly = () => address.setAttribute('readonly', 'readonly');
  setAdrressReadonly();
};

const resetSliderPrice = () => {
  const slider = document.querySelector('.ad-form__slider');
  slider.noUiSlider.reset();
};

const showSuccess = () => {
  const successTmpl = document.querySelector('#success').content.querySelector('.success');
  const success = successTmpl.cloneNode(true);
  body.append(success);

  const handleBodyKeydown = (evt) => {
    if (evt.key === 'Esc' || evt.key === 'Escape') {
      success.classList.add('hidden');
      document.removeEventListener('keydown', handleBodyKeydown);
    }
  };
  document.addEventListener('keydown', handleBodyKeydown);

  success.addEventListener('click', () => {
    success.classList.add('hidden');
  });
};

const onSuccess = (latLang) => {
  adForm.reset();
  address.value = Object.values(latLang);
  resetSliderPrice();
  showSuccess();
};

const showFail = () => {
  const errorTmpl = document.querySelector('#error').content.querySelector('.error');
  const error = errorTmpl.cloneNode(true);
  body.append(error);

  const handleBodyKeydown = (evt) => {
    if (evt.key === 'Esc' || evt.key === 'Escape') {
      error.classList.add('hidden');
      document.removeEventListener('keydown', handleBodyKeydown);
    }
  };
  document.addEventListener('keydown', handleBodyKeydown);

  const errorBtn = error.querySelector('.error__button');
  errorBtn.addEventListener('click', () => {
    error.classList.add('hidden');
  });
};

const onSubmitAdForm = (sendAdForm, latLng, resetMainPinMarker) => {
  adForm.addEventListener('submit', (evt) => {
    if(!pristine.validate()) {
      return showFail();
    }
    sendAdForm(
      new FormData(evt.target),
      latLng,
      onSuccess,
      showFail
    );
    resetMainPinMarker();
  });
};

const onResetAdForm = (latLng, resetMainPinMarker) => {
  const reset = adForm.querySelector('.ad-form__reset');
  reset.addEventListener('click', (evt) => {
    evt.preventDefault();
    adForm.reset();
    address.value = Object.values(latLng);
    sliderElement.noUiSlider.reset();
    resetMainPinMarker();
  });
};
export{ initForm, onSubmitAdForm, onResetAdForm};
