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

const sendAdForm = (body, latLang, onSuccess, sendAdFormFail) => {
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
