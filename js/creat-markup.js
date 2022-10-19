import { creatListAdvertisement } from './data.js';

const card = document.querySelector('#card').content;
const advertismentTemplate = card.querySelector('.popup');

const mapCanvas = document.querySelector('#map-canvas');

const advertisements = creatListAdvertisement();

const fragment = document.createDocumentFragment();

const getOfferTypeInRU = (type) => {
  const mapTypeInRU = new Map();
  mapTypeInRU
    .set('flat', 'Квартира')
    .set('bungalow', 'Бунгало')
    .set('house', 'Дом')
    .set('palace', 'Дворец')
    .set('hotel', 'Отель');
  return mapTypeInRU.get(type);
};

advertisements.forEach((element) => {
  const advertisement = advertismentTemplate.cloneNode(true);

  const {
    title,
    address,
    price,
    type,
    rooms,
    guests,
    checkin,
    checkout,
    features,
    description,
    photos,
  } = element.offer;

  advertisement.querySelector('.popup__title').textContent = title;
  advertisement.querySelector('.popup__text--address').textContent = address;
  advertisement.querySelector('.popup__text--price').textContent = `${price} ₽/ночь`;
  advertisement.querySelector('.popup__type').textContent = getOfferTypeInRU(type);
  advertisement.querySelector('.popup__text--capacity').textContent = `${rooms} комнаты для ${guests} гостей`;
  advertisement.querySelector('.popup__text--time').textContent = `Заезд после ${checkin}, выезд до ${checkout}`;
  advertisement.querySelector('.popup__features').textContent = features.join();
  advertisement.querySelector('.popup__description').textContent = description;
  advertisement.querySelector('.popup__photos').textContent = description;
  advertisement.querySelector('.popup__avatar').setAttribute('src', element.author.avatar);


  fragment.append(advertisement);
});

mapCanvas.append(fragment.childNodes[0]);
