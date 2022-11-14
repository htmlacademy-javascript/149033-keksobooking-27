const MAIN_URL = 'https://27.javascript.pages.academy/keksobooking';
const GET_DATA_URL = `${MAIN_URL}/data`;
const getListAd = (onSuccess, onFail) =>
  fetch(GET_DATA_URL)
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
      throw new Error(`${response.status}. Ошибка получения обявлений по ссылке ${MAIN_URL}`);
    })
    .catch(() => {
      onFail();
    });
};

export { getListAd, sendAdForm };
