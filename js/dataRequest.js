const URL_DATA = 'https://27.javascript.pages.academy/keksobooking/data';
const STYLE_ERROR = {
  backgroundColor: 'white',
  color: 'red',
  position: 'absolute',
  width: '100%',
  textAlign: 'center',
  zIndex: '999',
};


const errorMessageMarkers = (err) => {
  const mapCanvas = document.querySelector('.map__canvas');
  const div = document.createElement('div');
  Object.assign(div.style, STYLE_ERROR);
  div.textContent = `${err}`;
  const toggleError = () => div.classList.toggle('hidden');
  setInterval(toggleError, 2000);
  mapCanvas.append(div);
};
const getListAd = (cbCreatMap) =>

  fetch(URL_DATA)
    .then((response) => {
      if (response.ok) {
        return response;
      }
      throw new Error(`${response.status}. Ошибка получения обявлений по ссылке ${URL_DATA}`);
    })
    .then((response) => response.json())
    .then((data) => cbCreatMap(data))
    .catch((err) => {
      errorMessageMarkers(err);
    });

// Добавьте обработчик отправки формы, если ещё этого не сделали, который бы отменял действие формы по умолчанию и отправлял данные формы посредством fetch на сервер.
// Данные для отправки
const sendAdFormOK = () => console.log('sendAdFormOK');
const sendAdFormFail = () => console.log('onFail');

const URL_SEND = 'https://27.javascript.pages.academy/keksobooking';
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
        return sendAdFormOK();
      }
      sendAdFormFail();
    })
    .catch(sendAdFormFail);
};

    // Реализуйте возвращение формы в исходное состояние при успешной отправке, а также показ сообщения пользователю.

    // Если при отправке данных произошла ошибка запроса, покажите соответствующее сообщение.

    // Похожим образом обработайте нажатие на кнопку сброса.


export { getListAd, sendAdForm };
