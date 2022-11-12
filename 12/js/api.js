const MAIN_URL = 'https://27.javascript.pages.academy/keksobooking';

const getListAd = (onSuccess, onFail) =>
  fetch(`${MAIN_URL}/data`)
    .then((response) => {
      if (response.ok) {
        return response;
      }
      throw new Error(`${response.status}. Ошибка получения обявлений по ссылке ${MAIN_URL}/data`);
    })
    .then((response) => response.json())
    .then((data) => onSuccess(data))
    .catch((err) => {
      onFail(err);
    });

const sendAdForm = (body, latLang, onSuccess, onFail) => {
  fetch(
    MAIN_URL,
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        return onSuccess(latLang);
      }
      onFail();
    })
    .catch(() => {
      onFail();
    });
};

export { getListAd, sendAdForm };
