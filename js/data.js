import {getRandomIntInclusive, getRandomFloat, shuffleRandomLength, getRandomArrayElement} from './util.js';

const LIST_AD_LENGTH = 10;
const TITLE_OFFER = [
  'Сдаю в аренду',
  'Хорошое жилье',
  'Принимаю гостей',
  'Жилье в любое время',
];
const LOCATION = {
  MAX_LONGITUDE : 139.8,
  MIN_LONGITUDE : 139.7,
  MIN_LATITUDE : 35.65,
  MAX_LATITUDE : 35.7
};
const TYPE_OF_REALTY = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const PRICE_LIMIT = 100000;
const ROOMS_LIMIT = 50;
const NUMBER_GUESTS_LIMIT = 100;
const CHECKIN = ['12:00', '13:00', '14:00'];
const CHECKOUT = ['12:00', '13:00', '14:00'];
const FEATURES_OFFERS = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];
const DESCRITION_OFFERS = [
  'Рядом с метро',
  'Хорошый вид из окна',
  'Удобная парковка',
];
const PHOTOS_OFFERS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

const creatLocationData = () => ({
  lat: getRandomFloat( LOCATION.MIN_LATITUDE, LOCATION.MAX_LATITUDE, 5),
  lng: getRandomFloat( LOCATION.MIN_LONGITUDE, LOCATION.MAX_LONGITUDE, 5)
});

const creatUrlAvatar = () =>
  `img/avatars/user${String(getRandomIntInclusive(1, 10)).padStart(2, '0')}.png`;

const createAd = () => {
  const location = creatLocationData();
  return {
    author: {
      avatar:creatUrlAvatar()
    },
    offer: {
      title: getRandomArrayElement(TITLE_OFFER),
      address: `${location.lat},${location.lng}`,
      price: getRandomIntInclusive(0, PRICE_LIMIT),
      type: getRandomArrayElement(TYPE_OF_REALTY),
      rooms: getRandomIntInclusive(0, ROOMS_LIMIT),
      guests: getRandomIntInclusive(0, NUMBER_GUESTS_LIMIT),
      checkin: getRandomArrayElement(CHECKIN),
      checkout: getRandomArrayElement(CHECKOUT),
      features: shuffleRandomLength(FEATURES_OFFERS),
      description: getRandomArrayElement(DESCRITION_OFFERS),
      photos: shuffleRandomLength(PHOTOS_OFFERS),
    },
    location: location,
  };
};

const creatListAd = () => Array.from(
  { length: LIST_AD_LENGTH },
  createAd
);

export {creatListAd};
