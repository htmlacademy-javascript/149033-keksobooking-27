const URL_SEND = 'https://27.javascript.pages.academy/keksobooking';
const URL_GET_DATA = 'https://27.javascript.pages.academy/keksobooking/data';

const getListAd = (creatMap, errorMessageMarkers) =>
  fetch(URL_GET_DATA)
    .then((response) => {
      if (response.ok) {
        return response;
      }
      throw new Error(`${response.status}. Ошибка получения обявлений по ссылке ${URL_GET_DATA}`);
    })
    .then((response) => response.json())
    .then((data) => creatMap(data))
    .catch((err) => {
      errorMessageMarkers(err);
    });

const adForm = document.querySelector('.ad-form');
const onSuccess = (latLang) => {
  adForm.reset();
  adForm.querySelector('#address').value = Object.values(latLang);
  const slider = document.querySelector('.ad-form__slider');
  slider.noUiSlider.reset();
  const successTmpl = document.querySelector('#success').content.querySelector('.success');
  const success = successTmpl.cloneNode(true);
  const body = document.querySelector('body');
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

const sendAdFormFail = () => {
  const errorTmpl = document.querySelector('#error').content.querySelector('.error');
  const error = errorTmpl.cloneNode(true);
  const body = document.querySelector('body');
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

const sendAdForm = (body, latLang) => {
  fetch(
    URL_SEND,
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        return onSuccess(latLang);
      }
      sendAdFormFail(latLang);
    });
};

export { getListAd, sendAdForm };
