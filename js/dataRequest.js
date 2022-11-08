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

// Добавьте обработчик отправки формы, если ещё этого не сделали, который бы отменял действие формы по умолчанию и отправлял данные формы посредством fetch на сервер.

const adForm = document.querySelector('.ad-form');

const sendAdForm = (body) => {
  fetch(
    URL_SEND,
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        return onSuccess();
      }
      sendAdFormFail();
    });
};


// Реализуйте возвращение формы в исходное состояние при успешной отправке, а также показ сообщения пользователю.
const onSuccess = () => {
  adForm.reset();
  document.querySelector('.ad-form__slider').noUiSlider.reset();
  const successTmpl = document.querySelector('#success').content;
  const success = successTmpl.cloneNode(true);
  document.body.append(success);
  document.addEventListener('keydown', (evt) => {
    if (evt.keyCode === 27 || evt.key === 'Escape') {
    //ваша функция закрытия окна
      console.log(success);
      success.remove();
      console.log('sendAdFormOK');
    }
  });
  console.log('sendAdFormOK');

};

    // Если при отправке данных произошла ошибка запроса, покажите соответствующее сообщение.
const sendAdFormFail = () => console.log('onFail');
    // Похожим образом обработайте нажатие на кнопку сброса.


export { getListAd, sendAdForm };
